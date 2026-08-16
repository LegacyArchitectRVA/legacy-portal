import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./admin";

/**
 * Blueprint Session backend.
 *
 * A session captures a live sit-down assessment across the seven Readiness
 * Check pillars, plus the generated 72-Hour Action Plan. All operations are
 * admin-only: the session is run by Legacy Architect RVA during the
 * Blueprint Session product, not self-served by clients.
 */

const assessmentValidator = v.object({
  checkpointId: v.string(),
  status: v.union(
    v.literal("handled"),
    v.literal("partial"),
    v.literal("exposed"),
    v.literal("na"),
  ),
  note: v.optional(v.string()),
});

const actionValidator = v.object({
  id: v.string(),
  title: v.string(),
  detail: v.optional(v.string()),
  day: v.union(v.literal(1), v.literal(2), v.literal(3)),
  pillarId: v.string(),
  done: v.boolean(),
});

export const listSessions = query({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    const sessions = await ctx.db
      .query("blueprintSessions")
      .withIndex("by_updatedAt")
      .order("desc")
      .collect();
    return sessions.map(s => ({
      _id: s._id,
      prospectName: s.prospectName,
      prospectEmail: s.prospectEmail,
      sessionDate: s.sessionDate,
      status: s.status,
      updatedAt: s.updatedAt,
      exposedCount: s.assessments.filter(a => a.status === "exposed").length,
      assessedCount: s.assessments.filter(a => a.status !== "na").length,
      actionCount: s.actions.length,
    }));
  },
});

export const getSession = query({
  args: { sessionId: v.id("blueprintSessions") },
  handler: async (ctx, { sessionId }) => {
    await requireAdmin(ctx);
    return await ctx.db.get(sessionId);
  },
});

export const createSession = mutation({
  args: {
    prospectName: v.string(),
    prospectEmail: v.optional(v.string()),
    sessionDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const now = Date.now();
    return await ctx.db.insert("blueprintSessions", {
      prospectName: args.prospectName.trim(),
      prospectEmail: args.prospectEmail?.trim() || undefined,
      sessionDate: args.sessionDate ?? now,
      status: "draft",
      notes: undefined,
      assessments: [],
      actions: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateSessionMeta = mutation({
  args: {
    sessionId: v.id("blueprintSessions"),
    prospectName: v.optional(v.string()),
    prospectEmail: v.optional(v.string()),
    sessionDate: v.optional(v.number()),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("completed"),
        v.literal("delivered"),
      ),
    ),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { sessionId, ...updates }) => {
    await requireAdmin(ctx);
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [k, val] of Object.entries(updates)) {
      if (val !== undefined) patch[k] = val;
    }
    await ctx.db.patch(sessionId, patch);
  },
});

/** Upserts a single checkpoint's status/note. Called on every chip tap. */
export const setAssessment = mutation({
  args: {
    sessionId: v.id("blueprintSessions"),
    assessment: assessmentValidator,
  },
  handler: async (ctx, { sessionId, assessment }) => {
    await requireAdmin(ctx);
    const session = await ctx.db.get(sessionId);
    if (!session) throw new ConvexError("Session not found");
    const rest = session.assessments.filter(
      a => a.checkpointId !== assessment.checkpointId,
    );
    await ctx.db.patch(sessionId, {
      assessments: [...rest, assessment],
      updatedAt: Date.now(),
    });
  },
});

/** Replaces the full action plan (used by generate, reorder, edit, delete). */
export const setActions = mutation({
  args: {
    sessionId: v.id("blueprintSessions"),
    actions: v.array(actionValidator),
  },
  handler: async (ctx, { sessionId, actions }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(sessionId, { actions, updatedAt: Date.now() });
  },
});

export const deleteSession = mutation({
  args: { sessionId: v.id("blueprintSessions") },
  handler: async (ctx, { sessionId }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(sessionId);
  },
});
