import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./admin";
import { chapters } from "../src/data/chapters";

/** Admin only: search every registered user by name or email. */
export const searchClients = query({
  args: { search: v.string() },
  handler: async (ctx, { search }) => {
    await requireAdmin(ctx);
    const term = search.trim().toLowerCase();
    if (!term) return [];

    const allUsers = await ctx.db.query("users").collect();
    const allClients = await ctx.db.query("clients").collect();
    const clientByUserId = new Map(allClients.map((c) => [c.userId.toString(), c]));

    return allUsers
      .filter((u) => !u.isAdmin)
      .filter((u) => {
        const name = (u.name || "").toLowerCase();
        const email = (u.email || "").toLowerCase();
        return name.includes(term) || email.includes(term);
      })
      .slice(0, 20)
      .map((u) => {
        const client = clientByUserId.get(u._id.toString());
        return {
          userId: u._id,
          name: u.name || "",
          email: u.email || "Unknown",
          isClient: !!client,
          tier: client?.tier || null,
          isActivated: client?.isActivated || false,
        };
      });
  },
});

/** Admin only: full detail view for one client/user. */
export const getClientDetail = query({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const user = await ctx.db.get(clientUserId);
    if (!user) return null;
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();

    let profilePicUrl: string | null = null;
    const profilePicId = (user as any)?.profilePicId || client?.profilePicId;
    if (profilePicId) {
      profilePicUrl = (await ctx.storage.getUrl(profilePicId)) ?? null;
    }

    const legalDocs = await ctx.db
      .query("legalDocuments")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();

    return {
      userId: clientUserId,
      name: user.name || "",
      email: user.email || "",
      phone: (user as any)?.contactPhone || client?.phoneNumber || "",
      profilePicUrl,
      isClient: !!client,
      tier: client?.tier || null,
      isActivated: client?.isActivated || false,
      deliveryStatus: client?.deliveryStatus || "pending",
      deliveryDate: client?.deliveryDate || null,
      hubspotId: client?.hubspotId || null,
      hubspotSyncedAt: client?.hubspotSyncedAt || null,
      legalDocuments: legalDocs.map((d) => ({
        documentType: d.documentType,
        inForce: d.inForce,
        notes: d.notes,
      })),
    };
  },
});

/** Admin only: chapter-by-chapter completion summary for one client. */
export const getClientProgressSummary = query({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const rows = await ctx.db
      .query("sectionRows")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();

    const progress: Record<string, { rows: number; fields: number; sections: Set<string> }> = {};
    for (const row of rows) {
      progress[row.chapterId] ||= { rows: 0, fields: 0, sections: new Set() };
      progress[row.chapterId].rows++;
      progress[row.chapterId].sections.add(row.sectionId);
    }
    for (const field of fields) {
      if (field.value && field.value.trim() !== "") {
        progress[field.chapterId] ||= { rows: 0, fields: 0, sections: new Set() };
        progress[field.chapterId].fields++;
        progress[field.chapterId].sections.add(field.sectionId);
      }
    }

    return chapters.map((ch) => {
      const p = progress[ch.id];
      return {
        chapterId: ch.id,
        chapterNumber: ch.chapterNumber,
        title: ch.title,
        rowsAndFieldsCompleted: (p?.rows || 0) + (p?.fields || 0),
        sectionsStarted: p?.sections.size || 0,
        totalSections: ch.subSections.length,
      };
    });
  },
});

/** Admin only: notes about a client, most recent first. */
/** Admin only: every row and field a client has actually entered, for generating their real manual. */
export const getClientManualData = query({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const rows = await ctx.db
      .query("sectionRows")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();
    const fields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .collect();

    // Group rows by "chapterId:sectionId" -> array of parsed data objects
    const rowsBySection: Record<string, Record<string, string>[]> = {};
    for (const row of rows) {
      const key = `${row.chapterId}:${row.sectionId}`;
      rowsBySection[key] ||= [];
      try {
        rowsBySection[key].push(JSON.parse(row.data));
      } catch {
        // skip malformed row data rather than fail the whole manual
      }
    }

    // Group fields by "chapterId:sectionId" -> { fieldId: value }
    const fieldsBySection: Record<string, Record<string, string>> = {};
    for (const field of fields) {
      if (!field.value || field.value.trim() === "") continue;
      const key = `${field.chapterId}:${field.sectionId}`;
      fieldsBySection[key] ||= {};
      fieldsBySection[key][field.fieldId] = field.value;
    }

    return { rowsBySection, fieldsBySection };
  },
});

export const getClientNotes = query({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    await requireAdmin(ctx);
    const notes = await ctx.db
      .query("clientNotes")
      .withIndex("by_clientUserId", (q) => q.eq("clientUserId", clientUserId))
      .collect();
    notes.sort((a, b) => b.createdAt - a.createdAt);
    return notes;
  },
});

export const addClientNote = mutation({
  args: { clientUserId: v.id("users"), content: v.string() },
  handler: async (ctx, { clientUserId, content }) => {
    const authorId = await requireAdmin(ctx);
    if (!content.trim()) throw new Error("Note can't be empty.");
    await ctx.db.insert("clientNotes", {
      clientUserId,
      authorId,
      content: content.trim(),
      createdAt: Date.now(),
    });
  },
});

export const deleteClientNote = mutation({
  args: { noteId: v.id("clientNotes") },
  handler: async (ctx, { noteId }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(noteId);
  },
});
