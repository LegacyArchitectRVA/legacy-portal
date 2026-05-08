import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper to verify admin status
async function requireAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  const user = await ctx.db.get(userId);
  if (!user?.isAdmin) throw new Error("Not authorized — admin only");
  return userId;
}

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const user = await ctx.db.get(userId);
    return user?.isAdmin === true;
  },
});

export const listClients = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const clients = await ctx.db.query("clients").collect();
    const result = [];
    for (const client of clients) {
      const user = await ctx.db.get(client.userId);
      if (!user) continue;
      // Count completed sections
      const rows = await ctx.db
        .query("sectionRows")
        .withIndex("by_userId", (q) => q.eq("userId", client.userId))
        .collect();
      const fields = await ctx.db
        .query("sectionFields")
        .withIndex("by_userId", (q) => q.eq("userId", client.userId))
        .collect();
      result.push({
        ...client,
        userName: user.name || user.email || "Unknown",
        userEmail: user.email,
        totalRows: rows.length,
        totalFields: fields.filter((f) => f.value && f.value.trim() !== "").length,
      });
    }
    return result;
  },
});

export const setClientActivation = mutation({
  args: { clientUserId: v.id("users"), isActivated: v.boolean() },
  handler: async (ctx, { clientUserId, isActivated }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new Error("Client not found");
    await ctx.db.patch(client._id, { isActivated });
  },
});

export const setClientTier = mutation({
  args: {
    clientUserId: v.id("users"),
    tier: v.union(v.literal("vault"), v.literal("archive"), v.literal("legacy")),
  },
  handler: async (ctx, { clientUserId, tier }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new Error("Client not found");
    await ctx.db.patch(client._id, { tier });
  },
});

export const markDelivered = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new Error("Client not found");
    await ctx.db.patch(client._id, {
      deliveryStatus: "delivered",
      deliveryTimestamp: Date.now(),
    });
  },
});

export const cancelDelivery = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new Error("Client not found");
    await ctx.db.patch(client._id, {
      deliveryStatus: "pending",
      deliveryTimestamp: undefined,
    });
  },
});

export const purgeClient = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    // Delete all section rows
    const rows = await ctx.db
      .query("sectionRows")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();
    for (const row of rows) {
      await ctx.db.delete(row._id);
    }
    // Delete all section fields
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();
    for (const field of fields) {
      await ctx.db.delete(field._id);
    }
    // Update client status
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    if (client) {
      await ctx.db.patch(client._id, { deliveryStatus: "purged" });
    }
  },
});

// Get a specific client's section data (for admin Life Manual view)
export const getClientSectionRows = query({
  args: { clientUserId: v.id("users"), chapterId: v.string(), sectionId: v.string() },
  handler: async (ctx, { clientUserId, chapterId, sectionId }) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", (q) =>
        q.eq("userId", clientUserId).eq("chapterId", chapterId).eq("sectionId", sectionId),
      )
      .collect();
  },
});

export const getClientSectionFields = query({
  args: { clientUserId: v.id("users"), chapterId: v.string(), sectionId: v.string() },
  handler: async (ctx, { clientUserId, chapterId, sectionId }) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("sectionFields")
      .withIndex("by_user_section", (q) =>
        q.eq("userId", clientUserId).eq("chapterId", chapterId).eq("sectionId", sectionId),
      )
      .collect();
  },
});

// Make a user admin (one-time setup)
export const makeAdmin = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    // Only allow if no admins exist yet, or caller is already admin
    const user = await ctx.db.get(userId);
    const allUsers = await ctx.db.query("users").collect();
    const hasAdmin = allUsers.some((u) => u.isAdmin === true);
    if (hasAdmin && !user?.isAdmin) {
      throw new Error("Admins already exist. Only an admin can create new admins.");
    }
    // Find user by email
    const target = allUsers.find((u) => u.email === email);
    if (!target) throw new Error("User not found with that email");
    await ctx.db.patch(target._id, { isAdmin: true });
    return { success: true };
  },
});

// Aliases for frontend compatibility
export const updateClientTier = mutation({
  args: { clientId: v.id("clients"), tier: v.string() },
  handler: async (ctx, { clientId, tier }) => {
    await requireAdmin(ctx);
    const client = await ctx.db.get(clientId);
    if (!client) throw new Error("Client not found");
    await ctx.db.patch(clientId, { tier: tier as any });
  },
});

export const activateClient = mutation({
  args: { clientId: v.id("clients"), isActivated: v.boolean() },
  handler: async (ctx, { clientId, isActivated }) => {
    await requireAdmin(ctx);
    const client = await ctx.db.get(clientId);
    if (!client) throw new Error("Client not found");
    await ctx.db.patch(clientId, { isActivated });
  },
});
