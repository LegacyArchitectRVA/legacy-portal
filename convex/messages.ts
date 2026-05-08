import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMyMessages = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);
    if (user?.isAdmin) {
      // Admin sees all messages
      return await ctx.db.query("messages").withIndex("by_createdAt").order("desc").collect();
    }
    // Client sees messages they sent or received
    const sent = await ctx.db
      .query("messages")
      .withIndex("by_fromUserId", (q) => q.eq("fromUserId", userId))
      .collect();
    const received = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", (q) => q.eq("toUserId", userId))
      .collect();
    const all = [...sent, ...received];
    all.sort((a, b) => a.createdAt - b.createdAt);
    return all;
  },
});

export const sendMessage = mutation({
  args: { content: v.string(), toUserId: v.optional(v.id("users")) },
  handler: async (ctx, { content, toUserId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("messages", {
      fromUserId: userId,
      toUserId,
      content,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

export const markRead = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(messageId, { isRead: true });
  },
});

export const markAllRead = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", (q) => q.eq("toUserId", userId))
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();
    for (const msg of messages) {
      await ctx.db.patch(msg._id, { isRead: true });
    }
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return 0;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", (q) => q.eq("toUserId", userId))
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();
    return messages.length;
  },
});
