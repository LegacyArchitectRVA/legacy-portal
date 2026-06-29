import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Extend users table with isAdmin (override from authTables)
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    isAdmin: v.optional(v.boolean()),
    crestId: v.optional(v.id("_storage")),
    profilePicId: v.optional(v.id("_storage")),
    emailNotifications: v.optional(v.boolean()),
  }).index("email", ["email"]).index("phone", ["phone"]),

  // Client profile / tier / activation
  clients: defineTable({
    userId: v.id("users"),
    tier: v.union(
      v.literal("vault"),
      v.literal("archive"),
      v.literal("legacy"),
    ),
    isActivated: v.boolean(),
    deliveryStatus: v.optional(v.string()),
    deliveryTimestamp: v.optional(v.number()),
    deliveryDate: v.optional(v.string()),
    lastReviewedAt: v.optional(v.number()),
    reviewReminderSentForCycle: v.optional(v.number()),
    profilePhotoStorageId: v.optional(v.id("_storage")),
    profilePicId: v.optional(v.id("_storage")),
    crestId: v.optional(v.id("_storage")),
    phoneNumber: v.optional(v.string()),
    hubspotId: v.optional(v.string()),
    hubspotSyncedAt: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  // Structured table row data per sub-section
  sectionRows: defineTable({
    userId: v.id("users"),
    chapterId: v.string(),
    sectionId: v.string(),
    rowId: v.string(),
    data: v.string(),
    sortOrder: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_section", ["userId", "chapterId", "sectionId"])
    .index("by_userId", ["userId"]),

  // Free-form field data (textarea fields, checkbox fields)
  sectionFields: defineTable({
    userId: v.id("users"),
    chapterId: v.string(),
    sectionId: v.string(),
    fieldId: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  })
    .index("by_user_section", ["userId", "chapterId", "sectionId"])
    .index("by_userId", ["userId"]),

  // Client <-> Admin messaging
  messages: defineTable({
    fromUserId: v.id("users"),
    toUserId: v.optional(v.id("users")),
    content: v.string(),
    isRead: v.boolean(),
    isHidden: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_fromUserId", ["fromUserId"])
    .index("by_toUserId", ["toUserId"])
    .index("by_createdAt", ["createdAt"]),

  // CMS content (admin-editable text blocks)
  cmsContent: defineTable({
    key: v.string(),
    value: v.string(),
    metadata: v.optional(v.string()),
  }).index("by_key", ["key"]),

  // App settings
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  // Referral leads / prospects — not registered portal users, just
  // people and contacts being tracked before (or instead of) becoming
  // an actual client
  prospects: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.optional(v.string()),
    hubspotId: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("follow_up"),
      v.literal("converted"),
      v.literal("inactive"),
    ),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_hubspotId", ["hubspotId"]),

  // Admin notes about a specific client (CRM feature)
  clientNotes: defineTable({
    clientUserId: v.id("users"),
    authorId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_clientUserId", ["clientUserId"]),

  // WebAuthn / passkey credentials registered per user
  webauthnCredentials: defineTable({
    userId: v.id("users"),
    credentialId: v.string(), // base64url
    publicKey: v.string(), // base64url
    counter: v.number(),
    deviceType: v.optional(v.string()),
    backedUp: v.optional(v.boolean()),
    name: v.optional(v.string()),
    createdAt: v.number(),
    lastUsedAt: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_credentialId", ["credentialId"]),

  // Short-lived WebAuthn challenges, keyed by a random client-side token
  webauthnChallenges: defineTable({
    token: v.string(),
    challenge: v.string(),
    purpose: v.union(v.literal("registration"), v.literal("authentication")),
    userId: v.optional(v.id("users")),
    createdAt: v.number(),
  }).index("by_token", ["token"]),

  // Single-use tickets bridging a verified passkey assertion to the
  // ConvexCredentials sign-in flow, since the heavy WebAuthn crypto
  // verification needs the Node runtime but the credentials provider's
  // authorize callback does not.
  passkeyTickets: defineTable({
    ticket: v.string(),
    userId: v.id("users"),
    used: v.boolean(),
    expiresAt: v.number(),
  }).index("by_ticket", ["ticket"]),

  // Legal documents currently in force (Will, Trust, Power of Attorney, Healthcare Directive)
  legalDocuments: defineTable({
    userId: v.id("users"),
    documentType: v.string(),
    inForce: v.boolean(),
    notes: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
});

export default schema;
