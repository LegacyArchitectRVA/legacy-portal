import {
  getAuthSessionId,
  getAuthUserId,
  invalidateSessions,
} from "@convex-dev/auth/server";
import { action, query } from "./_generated/server";
import { ConvexError } from "convex/values";

/**
 * Lists the current user's active sessions (by creation time), flagging
 * which one is the session making this request.
 */
export const getMySessions = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const currentSessionId = await getAuthSessionId(ctx);

    const sessions = await ctx.db
      .query("authSessions")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    return sessions
      .map(s => ({
        _id: s._id,
        createdAt: s._creationTime,
        expirationTime: (s as any).expirationTime as number | undefined,
        isCurrent: s._id === currentSessionId,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  },
});

/**
 * Signs out every session except the one making this request.
 */
export const signOutOtherSessions = action({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const currentSessionId = await getAuthSessionId(ctx);
    await invalidateSessions(ctx, {
      userId,
      except: currentSessionId ? [currentSessionId] : [],
    });
  },
});
