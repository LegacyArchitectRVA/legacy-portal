import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

const CHALLENGE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const TICKET_TTL_MS = 30 * 1000; // 30 seconds

function randomToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

export const saveChallenge = internalMutation({
  args: {
    challenge: v.string(),
    purpose: v.union(v.literal("registration"), v.literal("authentication")),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { challenge, purpose, userId }) => {
    const token = randomToken();
    await ctx.db.insert("webauthnChallenges", {
      token,
      challenge,
      purpose,
      userId,
      createdAt: Date.now(),
    });
    return token;
  },
});

export const consumeChallenge = internalMutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const row = await ctx.db
      .query("webauthnChallenges")
      .withIndex("by_token", q => q.eq("token", token))
      .unique();
    if (!row) return null;
    await ctx.db.delete(row._id);
    if (Date.now() - row.createdAt > CHALLENGE_TTL_MS) return null;
    return { challenge: row.challenge, userId: row.userId };
  },
});

export const getCredentialByCredentialId = internalQuery({
  args: { credentialId: v.string() },
  handler: async (ctx, { credentialId }) => {
    return await ctx.db
      .query("webauthnCredentials")
      .withIndex("by_credentialId", q => q.eq("credentialId", credentialId))
      .unique();
  },
});

export const getCredentialIdsForUser = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const creds = await ctx.db
      .query("webauthnCredentials")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
    return creds.map(c => ({ credentialId: c.credentialId }));
  },
});

export const saveCredential = internalMutation({
  args: {
    userId: v.id("users"),
    credentialId: v.string(),
    publicKey: v.string(),
    counter: v.number(),
    deviceType: v.optional(v.string()),
    backedUp: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("webauthnCredentials", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateCredentialCounter = internalMutation({
  args: { id: v.id("webauthnCredentials"), counter: v.number() },
  handler: async (ctx, { id, counter }) => {
    await ctx.db.patch(id, { counter, lastUsedAt: Date.now() });
  },
});

export const issueTicket = internalMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const ticket = randomToken();
    await ctx.db.insert("passkeyTickets", {
      ticket,
      userId,
      used: false,
      expiresAt: Date.now() + TICKET_TTL_MS,
    });
    return ticket;
  },
});

export const consumeTicket = internalMutation({
  args: { ticket: v.string() },
  handler: async (ctx, { ticket }) => {
    const row = await ctx.db
      .query("passkeyTickets")
      .withIndex("by_ticket", q => q.eq("ticket", ticket))
      .unique();
    if (!row || row.used || row.expiresAt < Date.now()) return null;
    await ctx.db.patch(row._id, { used: true });
    return row.userId;
  },
});

/** Lists the current user's registered passkeys (no public key material exposed). */
export const listMyCredentials = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const creds = await ctx.db
      .query("webauthnCredentials")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
    return creds.map(c => ({
      _id: c._id,
      name: c.name || "Passkey",
      deviceType: c.deviceType,
      createdAt: c.createdAt,
      lastUsedAt: c.lastUsedAt,
    }));
  },
});

export const deleteCredential = mutation({
  args: { id: v.id("webauthnCredentials") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const cred = await ctx.db.get(id);
    if (!cred || cred.userId !== userId) throw new Error("Not found");
    await ctx.db.delete(id);
  },
});
