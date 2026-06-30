import { createAccount, retrieveAccount } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Scrypt } from "lucia";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";

const TEST_USER = {
  email: "agent@test.local",
  password: "TestAgent123!",
  name: "Test Agent",
} as const;

export const seedTestUser = internalAction({
  args: {},
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
  }),
  handler: async ctx => {
    try {
      await retrieveAccount(ctx, {
        provider: "test",
        account: { id: TEST_USER.email },
      });
      return { success: true, message: "Test user already exists" };
    } catch {
      // User doesn't exist, create them
    }

    try {
      const hashedPassword = await new Scrypt().hash(TEST_USER.password);
      await createAccount(ctx, {
        provider: "test",
        account: {
          id: TEST_USER.email,
          secret: hashedPassword,
        },
        profile: {
          email: TEST_USER.email,
          name: TEST_USER.name,
          emailVerificationTime: Date.now(),
        },
        shouldLinkViaEmail: false,
      });
      return { success: true, message: "Test user created successfully" };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create test user: ${error}`,
      };
    }
  },
});

/**
 * Looks up the test user's own users-table row by email. Internal only —
 * this is purely a CLI/scripting convenience for activateTestClient below,
 * never reachable from the browser, so it's safe to expose by raw email
 * lookup without an auth check.
 */
export const getTestUserId = internalQuery({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", TEST_USER.email))
      .unique();
    return user?._id ?? null;
  },
});

/**
 * Seeds one realistic sample row in the test client's Digital Life →
 * Cloud Storage section, purely so there's actual content to look at when
 * verifying the client-facing read-only view end-to-end. Internal only,
 * same reasoning as activateTestClient above. Safe to call repeatedly —
 * checks for an existing row with the same rowId before inserting.
 */
export const seedTestClientSampleRow = internalMutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", TEST_USER.email))
      .unique();
    if (!user) throw new Error("Test user doesn't exist yet — run seedTestUser first.");

    const rowId = "test_seed_row_cloud_storage";
    const existing = await ctx.db
      .query("sectionRows")
      .withIndex("by_user_section", (q) =>
        q.eq("userId", user._id).eq("chapterId", "digital").eq("sectionId", "cloud_storage"),
      )
      .filter((q) => q.eq(q.field("rowId"), rowId))
      .unique();

    const data = JSON.stringify({
      system: "Google Drive",
      impact: "Primary storage for personal documents and shared family files",
      authority: "Managed under primary Google account",
      records: "Organized by category — Financial, Medical, Property",
      transition: "Maintain existing folder structure; do not delete until fully reviewed",
    });

    if (existing) {
      await ctx.db.patch(existing._id, { data, updatedAt: Date.now() });
      return { action: "updated" };
    }

    await ctx.db.insert("sectionRows", {
      userId: user._id,
      chapterId: "digital",
      sectionId: "cloud_storage",
      rowId,
      data,
      sortOrder: 1,
      updatedAt: Date.now(),
    });
    return { action: "created" };
  },
});

/**
 * One-time setup so the test account can actually be used to verify the
 * client-facing portal end-to-end (login, dashboard, chapter pages, the
 * read-only view, etc.) — mirrors exactly what the real admin.addClient
 * mutation does for a real client, minus the admin-session requirement,
 * since this is meant to be run from the CLI/scripts, not the browser.
 * Internal, so it's never reachable as a public mutation regardless.
 */
export const activateTestClient = internalMutation({
  args: { tier: v.union(v.literal("vault"), v.literal("archive"), v.literal("legacy")) },
  handler: async (ctx, { tier }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", TEST_USER.email))
      .unique();
    if (!user) throw new Error("Test user doesn't exist yet — run seedTestUser first.");

    const existing = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { tier, isActivated: true });
      return { clientId: existing._id, action: "updated" };
    }

    const clientId = await ctx.db.insert("clients", {
      userId: user._id,
      tier,
      isActivated: true,
    });
    return { clientId, action: "created" };
  },
});
