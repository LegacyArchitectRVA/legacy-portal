import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function getAdminUserId(ctx: any) {
  const admin = await ctx.db
    .query("users")
    .filter((q: any) => q.eq(q.field("isAdmin"), true))
    .first();
  return admin?._id ?? null;
}

/**
 * For non-admins: the single thread between them and Legacy Architect RVA.
 * For admins: use getConversations + getThreadWithClient instead, this
 * still works for them but returns everything flattened (kept for any
 * existing callers).
 */
export const getMyMessages = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);

    if (user?.isAdmin) {
      const all = await ctx.db
        .query("messages")
        .withIndex("by_createdAt")
        .order("desc")
        .collect();
      return all.filter(m => !m.isHidden);
    }

    const sent = await ctx.db
      .query("messages")
      .withIndex("by_fromUserId", q => q.eq("fromUserId", userId))
      .collect();
    const received = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", q => q.eq("toUserId", userId))
      .collect();
    const all = [...sent, ...received].filter(m => !m.isHidden);
    all.sort((a, b) => a.createdAt - b.createdAt);
    return all;
  },
});

/** Admin only: one row per client they've exchanged messages with. */
export const getConversations = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return [];

    const all = await ctx.db
      .query("messages")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
    const visible = all.filter(m => !m.isHidden);

    const byClient = new Map<
      string,
      { lastMessage: string; lastAt: number; unread: number }
    >();
    for (const m of visible) {
      const clientId = m.fromUserId === userId ? m.toUserId : m.fromUserId;
      if (!clientId) continue;
      const key = clientId.toString();
      const existing = byClient.get(key);
      if (!existing) {
        byClient.set(key, {
          lastMessage: m.content,
          lastAt: m.createdAt,
          unread: m.toUserId === userId && !m.isRead ? 1 : 0,
        });
      } else if (m.toUserId === userId && !m.isRead) {
        existing.unread += 1;
      }
    }

    const results = [];
    for (const [clientId, info] of byClient) {
      const clientUser = await ctx.db.get(clientId as any);
      results.push({
        clientUserId: clientId,
        name: (clientUser as any)?.name || "",
        email: (clientUser as any)?.email || "Unknown",
        lastMessage: info.lastMessage,
        lastAt: info.lastAt,
        unread: info.unread,
      });
    }
    results.sort((a, b) => b.lastAt - a.lastAt);
    return results;
  },
});

/** Admin only: the thread with one specific client. */
export const getThreadWithClient = query({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return [];

    const sent = await ctx.db
      .query("messages")
      .withIndex("by_fromUserId", q => q.eq("fromUserId", userId))
      .collect();
    const received = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", q => q.eq("toUserId", userId))
      .collect();
    const thread = [...sent, ...received]
      .filter(m => !m.isHidden)
      .filter(
        m => m.fromUserId === clientUserId || m.toUserId === clientUserId,
      );
    thread.sort((a, b) => a.createdAt - b.createdAt);
    return thread;
  },
});

/** Admin only: every non-admin user, so a new conversation can be started with anyone, not just existing clients. */
export const listMessageableUsers = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return [];
    const all = await ctx.db.query("users").collect();
    return all
      .filter(u => !u.isAdmin)
      .map(u => ({
        userId: u._id,
        name: u.name || "",
        email: u.email || "Unknown",
      }));
  },
});

export const sendMessage = mutation({
  args: { content: v.string(), toUserId: v.optional(v.id("users")) },
  handler: async (ctx, { content, toUserId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const user = await ctx.db.get(userId);

    let resolvedToUserId = toUserId;
    if (!user?.isAdmin) {
      // Clients always message the admin, regardless of what's passed.
      resolvedToUserId = (await getAdminUserId(ctx)) ?? undefined;
    } else if (!toUserId) {
      throw new ConvexError("Select a conversation to reply to.");
    }

    return await ctx.db.insert("messages", {
      fromUserId: userId,
      toUserId: resolvedToUserId,
      content,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

/** Soft-deletes a message. The sender, or an admin, can remove it. */
export const deleteMessage = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const user = await ctx.db.get(userId);
    const message = await ctx.db.get(messageId);
    if (!message) return;
    if (message.fromUserId !== userId && !user?.isAdmin) {
      throw new ConvexError("You can only remove your own messages.");
    }
    await ctx.db.patch(messageId, { isHidden: true });
  },
});

/** For non-admins: marks every message sent to them as read. */
export const markAllRead = mutation({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", q => q.eq("toUserId", userId))
      .filter(q => q.eq(q.field("isRead"), false))
      .collect();
    for (const msg of messages) {
      await ctx.db.patch(msg._id, { isRead: true });
    }
  },
});

/** Admin only: marks messages from one specific client as read. */
export const markThreadRead = mutation({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_fromUserId", q => q.eq("fromUserId", clientUserId))
      .filter(q => q.eq(q.field("isRead"), false))
      .collect();
    for (const msg of messages) {
      await ctx.db.patch(msg._id, { isRead: true });
    }
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return 0;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", q => q.eq("toUserId", userId))
      .filter(q => q.eq(q.field("isRead"), false))
      .collect();
    return messages.filter(m => !m.isHidden).length;
  },
});
