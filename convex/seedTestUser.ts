import { createAccount, retrieveAccount } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Scrypt } from "lucia";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

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

const VERIFY_USER = {
  email: "disposable-verify-test@legacyarchitectrva.com",
  password: "DisposableTest123!",
  name: "Disposable Verify Test",
} as const;

/**
 * A second, throwaway account specifically using the real "password"
 * provider (unlike TEST_USER above, which uses a separate "test" provider
 * for instant dev login). Needed to safely verify admin password-management
 * features (setTemporaryPassword, etc.) against a genuine password-provider
 * account without touching any real client's or admin's actual password.
 * Internal only. Delete via deleteVerifyTestUser when done.
 */
export const seedVerifyTestUser = internalAction({
  args: {},
  handler: async (ctx) => {
    try {
      await retrieveAccount(ctx, {
        provider: "password",
        account: { id: VERIFY_USER.email },
      });
      return { success: true, message: "Verify test user already exists" };
    } catch {
      // doesn't exist yet, create it
    }
    await createAccount(ctx, {
      provider: "password",
      account: {
        id: VERIFY_USER.email,
        secret: VERIFY_USER.password, // plaintext — the Password provider hashes this internally, same as a real signup
      },
      profile: {
        email: VERIFY_USER.email,
        name: VERIFY_USER.name,
        emailVerificationTime: Date.now(),
      },
      shouldLinkViaEmail: false,
    });
    // createAccount only marks the *user* as verified (emailVerificationTime).
    // The Password provider's sign-in flow actually checks emailVerified on
    // the authAccounts row itself (a separate field), so without patching
    // that directly, every sign-in attempt silently redirects into the
    // email-verification flow instead of completing — confirmed by reading
    // node_modules/@convex-dev/auth's Password.js source after a real
    // login attempt against this account failed with no visible error.
    await ctx.runMutation(internal.seedTestUser.markVerifyAccountEmailVerified, {});
    return { success: true, message: "Verify test user created" };
  },
});

export const markVerifyAccountEmailVerified = internalMutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", VERIFY_USER.email))
      .unique();
    if (!user) return { patched: false };
    const account = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", user._id).eq("provider", "password"))
      .unique();
    if (!account) return { patched: false };
    await ctx.db.patch(account._id, { emailVerified: VERIFY_USER.email });
    return { patched: true };
  },
});

export const debugVerifyTestUser = internalQuery({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", VERIFY_USER.email))
      .unique();
    if (!user) return { user: null };
    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", user._id))
      .collect();
    return {
      user: { id: user._id, email: user.email, emailVerificationTime: user.emailVerificationTime },
      accounts: accounts.map((a) => ({
        provider: a.provider,
        providerAccountId: a.providerAccountId,
        hasSecret: !!a.secret,
        secretLength: a.secret?.length ?? 0,
        emailVerified: a.emailVerified,
      })),
    };
  },
});

export const deleteVerifyTestUser = internalMutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", VERIFY_USER.email))
      .unique();
    if (!user) return { deleted: false };
    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", user._id))
      .collect();
    for (const a of accounts) await ctx.db.delete(a._id);
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", (q) => q.eq("userId", user._id))
      .collect();
    for (const s of sessions) await ctx.db.delete(s._id);
    await ctx.db.delete(user._id);
    return { deleted: true };
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
 * Temporarily grants/revokes admin on the test account, purely so the
 * admin-only UI (User Access page, etc.) can be exercised end-to-end via
 * real login rather than only code review. Internal only — never reachable
 * from the browser. Should be set back to false after verification; this
 * account is meant to represent a client for other testing purposes.
 */
export const setTestUserAdminStatus = internalMutation({
  args: { isAdmin: v.boolean() },
  handler: async (ctx, { isAdmin }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", TEST_USER.email))
      .unique();
    if (!user) throw new Error("Test user doesn't exist yet — run seedTestUser first.");
    await ctx.db.patch(user._id, { isAdmin });
    return { isAdmin };
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
