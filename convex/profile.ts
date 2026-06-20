import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const profilePicId = (user as any)?.profilePicId || client?.profilePicId;
    const crestId = (user as any)?.crestId || client?.crestId;

    let profilePicUrl: string | null = null;
    let crestUrl: string | null = null;
    if (profilePicId) {
      profilePicUrl = await ctx.storage.getUrl(profilePicId) ?? null;
    }
    if (crestId) {
      crestUrl = await ctx.storage.getUrl(crestId) ?? null;
    }

    return {
      userId,
      name: user?.name || "",
      email: user?.email || "",
      isAdmin: user?.isAdmin || false,
      tier: client?.tier || null,
      isActivated: user?.isAdmin ? true : client?.isActivated || false,
      deliveryStatus: client?.deliveryStatus || "pending",
      deliveryDate: client?.deliveryDate || null,
      phoneNumber: (user as any)?.contactPhone || client?.phoneNumber || "",
      emailNotifications: (user as any)?.emailNotifications !== false,
      profilePicUrl,
      crestUrl,
    };
  },
});

export const updateNotificationPreference = mutation({
  args: { emailNotifications: v.boolean() },
  handler: async (ctx, { emailNotifications }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(userId, { emailNotifications });
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    profilePicId: v.optional(v.id("_storage")),
    crestId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Write directly to the user record so this works whether or not a
    // clients row exists (admins, or any account before it's been added
    // as a client, previously had these saves silently discarded).
    const userPatch: Record<string, unknown> = {};
    if (args.name !== undefined) userPatch.name = args.name;
    if (args.phoneNumber !== undefined) userPatch.contactPhone = args.phoneNumber;
    if (args.profilePicId !== undefined) userPatch.profilePicId = args.profilePicId;
    if (args.crestId !== undefined) userPatch.crestId = args.crestId;
    if (Object.keys(userPatch).length > 0) {
      await ctx.db.patch(userId, userPatch);
    }

    // Also keep the clients record in sync if one exists, for any
    // older code path still reading from it.
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (client) {
      const clientPatch: Record<string, unknown> = {};
      if (args.phoneNumber !== undefined) clientPatch.phoneNumber = args.phoneNumber;
      if (args.profilePicId !== undefined) clientPatch.profilePicId = args.profilePicId;
      if (args.crestId !== undefined) clientPatch.crestId = args.crestId;
      if (Object.keys(clientPatch).length > 0) {
        await ctx.db.patch(client._id, clientPatch);
      }
    }
  },
});

export const ensureClient = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (!existing) {
      await ctx.db.insert("clients", {
        userId,
        tier: "vault",
        isActivated: false,
      });
    }
    return { success: true };
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});
