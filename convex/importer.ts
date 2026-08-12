import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireAdmin } from "./admin";

/**
 * Writes imported Life Manual content into a client's portal data.
 *
 * Used by the admin PDF import flow: an old manual PDF is parsed in the
 * browser, the admin reviews and assigns every piece of recovered content
 * in a preview, and only then does this mutation persist it. Field values
 * overwrite by design (the admin saw exactly what would land in the
 * preview); table rows append after any existing rows so nothing already
 * in the portal is destroyed.
 */
export const importManualContent = mutation({
  args: {
    clientUserId: v.id("users"),

    fields: v.array(
      v.object({
        chapterId: v.string(),
        sectionId: v.string(),
        fieldId: v.string(),
        value: v.string(),
      }),
    ),
    rows: v.array(
      v.object({
        chapterId: v.string(),
        sectionId: v.string(),
        data: v.string(), // JSON object keyed by the section's column keys
      }),
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const now = Date.now();

    // The uploaded manual IS the manual: everything the client's
    // sections held before clears first, so imports can never stack on
    // top of old data.
    {
      const oldFields = await ctx.db
        .query("sectionFields")
        .withIndex("by_user_section", q => q.eq("userId", args.clientUserId))
        .collect();
      for (const f of oldFields) await ctx.db.delete(f._id);
      const oldRows = await ctx.db
        .query("sectionRows")
        .withIndex("by_user_section", q => q.eq("userId", args.clientUserId))
        .collect();
      for (const r of oldRows) await ctx.db.delete(r._id);
    }

    for (const f of args.fields) {
      const existing = await ctx.db
        .query("sectionFields")
        .withIndex("by_user_section", q =>
          q
            .eq("userId", args.clientUserId)
            .eq("chapterId", f.chapterId)
            .eq("sectionId", f.sectionId),
        )
        .filter(q => q.eq(q.field("fieldId"), f.fieldId))
        .first();
      if (existing) {
        await ctx.db.patch(existing._id, { value: f.value, updatedAt: now });
      } else {
        await ctx.db.insert("sectionFields", {
          userId: args.clientUserId,
          chapterId: f.chapterId,
          sectionId: f.sectionId,
          fieldId: f.fieldId,
          value: f.value,
          updatedAt: now,
        });
      }
    }

    // Rows append after whatever the section already holds.
    const maxOrder = new Map<string, number>();
    for (const r of args.rows) {
      const key = `${r.chapterId}/${r.sectionId}`;
      if (!maxOrder.has(key)) {
        const existing = await ctx.db
          .query("sectionRows")
          .withIndex("by_user_section", q =>
            q
              .eq("userId", args.clientUserId)
              .eq("chapterId", r.chapterId)
              .eq("sectionId", r.sectionId),
          )
          .collect();
        maxOrder.set(
          key,
          existing.reduce((m, x) => Math.max(m, x.sortOrder), 0),
        );
      }
      const order = (maxOrder.get(key) || 0) + 1;
      maxOrder.set(key, order);
      await ctx.db.insert("sectionRows", {
        userId: args.clientUserId,
        chapterId: r.chapterId,
        sectionId: r.sectionId,
        rowId: `import-${now}-${order}-${Math.random().toString(36).slice(2, 8)}`,
        data: r.data,
        sortOrder: order,
        updatedAt: now,
      });
    }

    return { fieldsWritten: args.fields.length, rowsWritten: args.rows.length };
  },
});
