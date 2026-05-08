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

    let profilePicUrl: string | null = null;
    let crestUrl: string | null = null;
    if (client?.profilePicId) {
      profilePicUrl = await ctx.storage.getUrl(client.profilePicId) ?? null;
    }
    if (client?.crestId) {
      crestUrl = await ctx.storage.getUrl(client.crestId) ?? null;
    }

    return {
      userId,
      name: user?.name || "",
      email: user?.email || "",
      isAdmin: user?.isAdmin || false,
      tier: client?.tier || null,
      isActivated: client?.isActivated || false,
      deliveryStatus: client?.deliveryStatus || "pending",
      deliveryDate: client?.deliveryDate || null,
      phoneNumber: client?.phoneNumber || "",
      profilePicUrl,
      crestUrl,
    };
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
    if (args.name !== undefined) {
      await ctx.db.patch(userId, { name: args.name });
    }
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (client) {
      const patch: Record<string, unknown> = {};
      if (args.phoneNumber !== undefined) patch.phoneNumber = args.phoneNumber;
      if (args.profilePicId !== undefined) patch.profilePicId = args.profilePicId;
      if (args.crestId !== undefined) patch.crestId = args.crestId;
      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(client._id, patch);
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
