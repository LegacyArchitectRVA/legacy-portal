import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

// Helper to verify admin status (for queries/mutations, where ctx.db exists directly)
export async function requireAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Not authenticated");
  const user = await ctx.db.get(userId);
  if (!user?.isAdmin) throw new ConvexError("Not authorized, admin only");
  return userId;
}

// Helper to verify admin status from within an action, where ctx.db isn't
// directly available, so this must go through getAuthUserId's own action
// support plus a query for the user record.
export async function requireAdminInAction(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Not authenticated");
  const user = await ctx.runQuery(internal.admin.getUserInternal, { userId });
  if (!user?.isAdmin) throw new ConvexError("Not authorized, admin only");
  return userId;
}

export const getUserInternal = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});

export const isAdmin = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const user = await ctx.db.get(userId);
    return user?.isAdmin === true;
  },
});

export const listClients = query({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    const clients = await ctx.db.query("clients").collect();
    const result = [];
    for (const client of clients) {
      const user = await ctx.db.get(client.userId);
      if (!user) continue;
      // Count completed sections
      const rows = await ctx.db
        .query("sectionRows")
        .withIndex("by_userId", q => q.eq("userId", client.userId))
        .collect();
      const fields = await ctx.db
        .query("sectionFields")
        .withIndex("by_userId", q => q.eq("userId", client.userId))
        .collect();
      result.push({
        ...client,
        userName: user.name || user.email || "Unknown",
        hasRealName: !!user.name,
        userEmail: user.email,
        totalRows: rows.length,
        totalFields: fields.filter(f => f.value && f.value.trim() !== "")
          .length,
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
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new ConvexError("Client not found");
    await ctx.db.patch(client._id, { isActivated });
  },
});

export const setClientTier = mutation({
  args: {
    clientUserId: v.id("users"),
    tier: v.union(
      v.literal("vault"),
      v.literal("archive"),
      v.literal("legacy"),
    ),
  },
  handler: async (ctx, { clientUserId, tier }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new ConvexError("Client not found");
    await ctx.db.patch(client._id, { tier });
  },
});

export const markDelivered = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new ConvexError("Client not found");
    await ctx.db.patch(client._id, {
      deliveryStatus: "delivered",
      deliveryTimestamp: Date.now(),
    });
  },
});

export const markReviewComplete = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new ConvexError("Client not found");
    await ctx.db.patch(client._id, {
      lastReviewedAt: Date.now(),
      reviewReminderSentForCycle: undefined,
    });
  },
});

export const cancelDelivery = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    if (!client) throw new ConvexError("Client not found");
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
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .collect();
    for (const row of rows) {
      await ctx.db.delete(row._id);
    }
    // Delete all section fields
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .collect();
    for (const field of fields) {
      await ctx.db.delete(field._id);
    }
    // Update client status
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    if (client) {
      await ctx.db.patch(client._id, { deliveryStatus: "purged" });
    }
  },
});

// Get a specific client's section data (for admin Life Manual view)
export const getClientSectionRows = query({
  args: {
    clientUserId: v.id("users"),
    chapterId: v.string(),
    sectionId: v.string(),
  },
  handler: async (ctx, { clientUserId, chapterId, sectionId }) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", clientUserId)
          .eq("chapterId", chapterId)
          .eq("sectionId", sectionId),
      )
      .collect();
  },
});

export const getClientSectionFields = query({
  args: {
    clientUserId: v.id("users"),
    chapterId: v.string(),
    sectionId: v.string(),
  },
  handler: async (ctx, { clientUserId, chapterId, sectionId }) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("sectionFields")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", clientUserId)
          .eq("chapterId", chapterId)
          .eq("sectionId", sectionId),
      )
      .collect();
  },
});

// Make a user admin (one-time setup)
export const makeAdmin = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    // Only allow if no admins exist yet, or caller is already admin
    const user = await ctx.db.get(userId);
    const allUsers = await ctx.db.query("users").collect();
    const hasAdmin = allUsers.some(u => u.isAdmin === true);
    if (hasAdmin && !user?.isAdmin) {
      throw new ConvexError(
        "Admins already exist. Only an admin can create new admins.",
      );
    }
    // Find user by email
    const target = allUsers.find(u => u.email === email);
    if (!target) throw new ConvexError("User not found with that email");
    await ctx.db.patch(target._id, { isAdmin: true });
    return { success: true };
  },
});

// Aliases for frontend compatibility
/** Admin only: registered users who don't have a clients record yet, for the Add Client picker. */
export const listAddableUsers = query({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    const allUsers = await ctx.db.query("users").collect();
    const allClients = await ctx.db.query("clients").collect();
    const existingClientUserIds = new Set(
      allClients.map(c => c.userId.toString()),
    );
    return allUsers
      .filter(u => !u.isAdmin && !existingClientUserIds.has(u._id.toString()))
      .map(u => ({
        userId: u._id,
        name: u.name || "",
        email: u.email || "Unknown",
      }));
  },
});

/** Admin only: creates a clients record for an existing registered user. */
export const addClient = mutation({
  args: {
    userId: v.id("users"),
    tier: v.union(
      v.literal("vault"),
      v.literal("archive"),
      v.literal("legacy"),
    ),
  },
  handler: async (ctx, { userId, tier }) => {
    await requireAdmin(ctx);
    const user = await ctx.db.get(userId);
    if (!user) throw new ConvexError("User not found");
    const existing = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .unique();
    if (existing) throw new ConvexError("This person is already a client.");
    const clientId = await ctx.db.insert("clients", {
      userId,
      tier,
      isActivated: true,
    });
    return { clientId };
  },
});

export const updateClientTier = mutation({
  args: { clientId: v.id("clients"), tier: v.string() },
  handler: async (ctx, { clientId, tier }) => {
    await requireAdmin(ctx);
    const client = await ctx.db.get(clientId);
    if (!client) throw new ConvexError("Client not found");
    await ctx.db.patch(clientId, { tier: tier as any });
  },
});

export const activateClient = mutation({
  args: { clientId: v.id("clients"), isActivated: v.boolean() },
  handler: async (ctx, { clientId, isActivated }) => {
    await requireAdmin(ctx);
    const client = await ctx.db.get(clientId);
    if (!client) throw new ConvexError("Client not found");
    await ctx.db.patch(clientId, { isActivated });
  },
});

// CMS Content Management
export const listCMS = query({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    return await ctx.db.query("cmsContent").collect();
  },
});

export const getCMS = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const cms = await ctx.db
      .query("cmsContent")
      .withIndex("by_key", q => q.eq("key", key))
      .unique();
    return cms;
  },
});

export const updateCMS = mutation({
  args: {
    key: v.string(),
    value: v.string(),
    metadata: v.optional(v.string()),
  },
  handler: async (ctx, { key, value, metadata }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("cmsContent")
      .withIndex("by_key", q => q.eq("key", key))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value, metadata });
    } else {
      await ctx.db.insert("cmsContent", { key, value, metadata });
    }
  },
});

export const deleteCMS = mutation({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("cmsContent")
      .withIndex("by_key", q => q.eq("key", key))
      .unique();
    if (existing) {
      // Image entries store a storage id as their value — deleting just
      // the row without also deleting the blob leaves it orphaned in
      // storage forever, taking up space with nothing ever pointing to
      // it again. updateCMSImage already protects against this on
      // replace; resetting to default needs the same protection.
      if (existing.metadata === "image") {
        try {
          await ctx.storage.delete(existing.value as Id<"_storage">);
        } catch {
          // Already gone or never a valid storage id — fine to ignore.
        }
      }
      await ctx.db.delete(existing._id);
    }
  },
});

/** Admin-only: generates a short-lived URL the browser can POST a file to directly. */
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

/** Saves the uploaded file's storage ID against a CMS key, replacing any previous image for that key. */
export const updateCMSImage = mutation({
  args: { key: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, { key, storageId }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("cmsContent")
      .withIndex("by_key", q => q.eq("key", key))
      .unique();
    // Clean up the previous file, if any, so replacing an image doesn't
    // leave orphaned storage blobs behind.
    if (existing) {
      try {
        await ctx.storage.delete(existing.value as Id<"_storage">);
      } catch {
        // Previous value might not be a valid storage ID (e.g. never
        // customized before) — fine to ignore.
      }
      await ctx.db.patch(existing._id, { value: storageId, metadata: "image" });
    } else {
      await ctx.db.insert("cmsContent", {
        key,
        value: storageId,
        metadata: "image",
      });
    }
  },
});

/** Resolves a CMS image key to its actual serving URL, or null if never customized. */
export const getCMSImageUrl = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const cms = await ctx.db
      .query("cmsContent")
      .withIndex("by_key", q => q.eq("key", key))
      .unique();
    if (cms?.metadata !== "image") return null;
    return await ctx.storage.getUrl(cms.value as Id<"_storage">);
  },
});

// HubSpot Integration (placeholder for API key)
export const getHubSpotConfig = query({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", q => q.eq("key", "hubspot_api_key"))
      .unique();
    return settings?.value || null;
  },
});

export const setHubSpotConfig = mutation({
  args: { apiKey: v.string() },
  handler: async (ctx, { apiKey }) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", q => q.eq("key", "hubspot_api_key"))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value: apiKey });
    } else {
      await ctx.db.insert("settings", {
        key: "hubspot_api_key",
        value: apiKey,
      });
    }
  },
});

/**
 * Ops-only role toggle, callable exclusively via deploy key (never from
 * clients). Exists so admin-gated pages can be visually verified with the
 * dedicated test account flipped to admin for the duration of a check and
 * flipped back after. Not reachable from any UI.
 */
export const setAdminByEmail = internalMutation({
  args: { email: v.string(), isAdmin: v.boolean() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
    if (!user) throw new ConvexError("No user with that email");
    await ctx.db.patch(user._id, { isAdmin: args.isAdmin });
    return { userId: user._id, isAdmin: args.isAdmin };
  },
});
