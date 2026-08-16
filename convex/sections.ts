import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function requireAdmin(ctx: any, onBehalfOf?: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Not authenticated");
  const user = await ctx.db.get(userId);
  if (!user?.isAdmin)
    throw new ConvexError("Chapter sections are view-only for clients");
  return onBehalfOf || userId;
}

// ── Row CRUD (for structured tables) ──

export const getRows = query({
  args: {
    chapterId: v.string(),
    sectionId: v.string(),
    onBehalfOf: v.optional(v.id("users")),
  },
  handler: async (ctx, { chapterId, sectionId, onBehalfOf }) => {
    const authUserId = await getAuthUserId(ctx);
    if (!authUserId) return [];
    let userId = authUserId;
    if (onBehalfOf) {
      const user = await ctx.db.get(authUserId);
      if (!user?.isAdmin) throw new ConvexError("Not authorized");
      userId = onBehalfOf;
    }
    const rows = await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", userId)
          .eq("chapterId", chapterId)
          .eq("sectionId", sectionId),
      )
      .collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const addRow = mutation({
  args: {
    chapterId: v.string(),
    sectionId: v.string(),
    data: v.string(),
    onBehalfOf: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx, args.onBehalfOf);
    // Generate a rowId
    const rowId = `row_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    // Get max sort order
    const existing = await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", userId)
          .eq("chapterId", args.chapterId)
          .eq("sectionId", args.sectionId),
      )
      .collect();
    const maxSort =
      existing.length > 0 ? Math.max(...existing.map(r => r.sortOrder)) : 0;
    return await ctx.db.insert("sectionRows", {
      userId,
      chapterId: args.chapterId,
      sectionId: args.sectionId,
      rowId,
      data: args.data,
      sortOrder: maxSort + 1,
      updatedAt: Date.now(),
    });
  },
});

export const updateRow = mutation({
  args: {
    chapterId: v.string(),
    sectionId: v.string(),
    rowId: v.string(),
    data: v.string(),
    onBehalfOf: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx, args.onBehalfOf);
    const row = await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", userId)
          .eq("chapterId", args.chapterId)
          .eq("sectionId", args.sectionId),
      )
      .filter(q => q.eq(q.field("rowId"), args.rowId))
      .unique();
    if (!row) throw new ConvexError("Row not found");
    await ctx.db.patch(row._id, { data: args.data, updatedAt: Date.now() });
  },
});

export const deleteRow = mutation({
  args: {
    chapterId: v.string(),
    sectionId: v.string(),
    rowId: v.string(),
    onBehalfOf: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx, args.onBehalfOf);
    const row = await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", userId)
          .eq("chapterId", args.chapterId)
          .eq("sectionId", args.sectionId),
      )
      .filter(q => q.eq(q.field("rowId"), args.rowId))
      .unique();
    if (!row) throw new ConvexError("Row not found");
    await ctx.db.delete(row._id);
  },
});

// ── Field CRUD (for textarea/checkbox fields) ──

export const getFields = query({
  args: {
    chapterId: v.string(),
    sectionId: v.string(),
    onBehalfOf: v.optional(v.id("users")),
  },
  handler: async (ctx, { chapterId, sectionId, onBehalfOf }) => {
    const authUserId = await getAuthUserId(ctx);
    if (!authUserId) return {};
    let userId = authUserId;
    if (onBehalfOf) {
      const user = await ctx.db.get(authUserId);
      if (!user?.isAdmin) throw new ConvexError("Not authorized");
      userId = onBehalfOf;
    }
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", userId)
          .eq("chapterId", chapterId)
          .eq("sectionId", sectionId),
      )
      .collect();
    // Return as key-value map
    const result: Record<string, string> = {};
    for (const field of fields) {
      result[field.fieldId] = field.value;
    }
    return result;
  },
});

export const saveField = mutation({
  args: {
    chapterId: v.string(),
    sectionId: v.string(),
    fieldId: v.string(),
    value: v.string(),
    onBehalfOf: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx, args.onBehalfOf);
    // Upsert
    const existing = await ctx.db
      .query("sectionFields")
      .withIndex("by_user_section", q =>
        q
          .eq("userId", userId)
          .eq("chapterId", args.chapterId)
          .eq("sectionId", args.sectionId),
      )
      .filter(q => q.eq(q.field("fieldId"), args.fieldId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("sectionFields", {
        userId,
        chapterId: args.chapterId,
        sectionId: args.sectionId,
        fieldId: args.fieldId,
        value: args.value,
        updatedAt: Date.now(),
      });
    }
  },
});

// ── Progress tracking ──

export const getProgress = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return {};
    const rows = await ctx.db
      .query("sectionRows")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
    // Group by chapter
    const progress: Record<
      string,
      { rows: number; fields: number; sections: Set<string> }
    > = {};
    for (const row of rows) {
      if (!progress[row.chapterId]) {
        progress[row.chapterId] = { rows: 0, fields: 0, sections: new Set() };
      }
      progress[row.chapterId].rows++;
      progress[row.chapterId].sections.add(row.sectionId);
    }
    for (const field of fields) {
      if (field.value && field.value.trim() !== "") {
        if (!progress[field.chapterId]) {
          progress[field.chapterId] = {
            rows: 0,
            fields: 0,
            sections: new Set(),
          };
        }
        progress[field.chapterId].fields++;
        progress[field.chapterId].sections.add(field.sectionId);
      }
    }
    // Convert to serializable
    const result: Record<
      string,
      { rows: number; fields: number; sectionsStarted: number }
    > = {};
    for (const [key, val] of Object.entries(progress)) {
      result[key] = {
        rows: val.rows,
        fields: val.fields,
        sectionsStarted: val.sections.size,
      };
    }
    return result;
  },
});

// ── Purge all data (zero-knowledge protocol) ──

export const purgeAllMyData = mutation({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const rows = await ctx.db
      .query("sectionRows")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
    for (const row of rows) {
      await ctx.db.delete(row._id);
    }
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();
    for (const field of fields) {
      await ctx.db.delete(field._id);
    }
    return { deleted: rows.length + fields.length };
  },
});
