import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./admin";

export const getAllClientEmailsInternal = internalQuery({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map((u) => (u.email || "").toLowerCase());
  },
});

export const getAllProspectsInternal = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("prospects").collect();
  },
});

export const upsertProspectFromHubSpot = internalMutation({
  args: {
    hubspotId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, { hubspotId, name, email, phone }) => {
    const now = Date.now();
    const existingByHubspotId = await ctx.db
      .query("prospects")
      .withIndex("by_hubspotId", (q) => q.eq("hubspotId", hubspotId))
      .unique();

    if (existingByHubspotId) {
      // Keep status/notes (portal-specific enrichment); refresh contact info only.
      await ctx.db.patch(existingByHubspotId._id, { name, email, phone, updatedAt: now });
      return { action: "updated" as const };
    }

    // Not yet tracked locally — check if it matches an existing prospect by
    // email first (e.g. one added manually before a HubSpot sync existed).
    if (email) {
      const all = await ctx.db.query("prospects").collect();
      const matchByEmail = all.find((p) => p.email?.toLowerCase() === email.toLowerCase());
      if (matchByEmail) {
        await ctx.db.patch(matchByEmail._id, { hubspotId, name, phone, updatedAt: now });
        return { action: "linked" as const };
      }
    }

    await ctx.db.insert("prospects", {
      name,
      email,
      phone,
      source: "HubSpot",
      hubspotId,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
    return { action: "created" as const };
  },
});

export const listProspects = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("prospects").collect();
    return all.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const addProspect = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (!args.name.trim()) throw new Error("Name is required.");
    const now = Date.now();
    return await ctx.db.insert("prospects", {
      ...args,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateProspect = mutation({
  args: {
    prospectId: v.id("prospects"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("contacted"),
        v.literal("follow_up"),
        v.literal("converted"),
        v.literal("inactive"),
      ),
    ),
  },
  handler: async (ctx, { prospectId, ...patch }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get(prospectId);
    if (!existing) throw new Error("Prospect not found.");
    await ctx.db.patch(prospectId, { ...patch, updatedAt: Date.now() });
  },
});

export const deleteProspect = mutation({
  args: { prospectId: v.id("prospects") },
  handler: async (ctx, { prospectId }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(prospectId);
  },
});
