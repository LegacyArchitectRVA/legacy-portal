import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const STANDARD_DOCUMENT_TYPES = [
  // Personal estate documents
  "Will",
  "Trust",
  "Financial Power of Attorney",
  "Healthcare Power of Attorney",
  "Living Will (Advance Directive)",
  "HIPAA Authorization",
  "Guardianship Designation",
  "Beneficiary Designations",
  "Letter of Intent",
  // Business continuity documents
  "Business Succession Plan",
] as const;

export const DOCUMENT_GROUPS: { label: string; types: readonly string[] }[] = [
  {
    label: "Personal Documents",
    types: [
      "Will",
      "Trust",
      "Financial Power of Attorney",
      "Healthcare Power of Attorney",
      "Living Will (Advance Directive)",
      "HIPAA Authorization",
      "Guardianship Designation",
      "Beneficiary Designations",
      "Letter of Intent",
    ],
  },
  {
    label: "Business Documents",
    types: ["Business Succession Plan"],
  },
];

/**
 * Returns the current user's legal document records, one per standard
 * type, defaulting any type with no saved record yet to inForce: false
 * so the UI always has something to render.
 */
export const getMyLegalDocuments = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const saved = await ctx.db
      .query("legalDocuments")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    return STANDARD_DOCUMENT_TYPES.map((documentType) => {
      const existing = saved.find((d) => d.documentType === documentType);
      return (
        existing || {
          _id: null,
          documentType,
          inForce: false,
          notes: "",
          updatedAt: 0,
        }
      );
    });
  },
});

/**
 * Toggles or updates notes for a single document type. Creates the
 * record if it doesn't exist yet, otherwise updates it in place.
 */
export const upsertLegalDocument = mutation({
  args: {
    documentType: v.string(),
    inForce: v.boolean(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { documentType, inForce, notes }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("legalDocuments")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("documentType"), documentType))
      .unique();

    const updatedAt = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, { inForce, notes, updatedAt });
    } else {
      await ctx.db.insert("legalDocuments", {
        userId,
        documentType,
        inForce,
        notes,
        updatedAt,
      });
    }
  },
});
