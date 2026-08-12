import {
  invalidateSessions,
  modifyAccountCredentials,
} from "@convex-dev/auth/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { requireAdmin, requireAdminInAction } from "./admin";
import { APP_NAME } from "./constants";

/**
 * Every user who can log into the portal — both clients and other admins —
 * with their access/activation state. This is the admin-facing "who has
 * access" list, distinct from admin.listClients (which is scoped to
 * client-record details like tier/progress, not login/account state).
 */
export const listUsersWithAccess = query({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    const users = await ctx.db.query("users").collect();
    const result = [];
    for (const user of users) {
      const client = await ctx.db
        .query("clients")
        .withIndex("by_userId", q => q.eq("userId", user._id))
        .unique();
      result.push({
        userId: user._id,
        name: user.name || "",
        email: user.email || "",
        isAdmin: user.isAdmin === true,
        hasClientRecord: !!client,
        tier: client?.tier || null,
        isActivated: client?.isActivated ?? null,
        deliveryStatus: client?.deliveryStatus || null,
        emailVerified: !!user.emailVerificationTime,
      });
    }
    // Admins first, then clients alphabetically by name/email
    return result.sort((a, b) => {
      if (a.isAdmin !== b.isAdmin) return a.isAdmin ? -1 : 1;
      return (a.name || a.email).localeCompare(b.name || b.email);
    });
  },
});

function generateTemporaryPassword(): string {
  // 12 chars, drawn from a set that avoids visually-ambiguous characters
  // (no 0/O, 1/l/I) since this gets read aloud or typed from a screenshot.
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < 12; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

/**
 * Sets an exact temporary password for a user's "password" auth account,
 * generated server-side and returned once so the admin can hand it to the
 * client. Uses @convex-dev/auth's own modifyAccountCredentials, which
 * hashes the password internally using the same provider config as normal
 * sign-up/sign-in — this never stores or logs the plaintext anywhere.
 */
export const setTemporaryPassword = action({
  args: { targetUserId: v.id("users") },
  handler: async (
    ctx,
    { targetUserId },
  ): Promise<{ temporaryPassword: string }> => {
    await requireAdminInAction(ctx);
    const user: any = await ctx.runQuery(internal.admin.getUserInternal, {
      userId: targetUserId,
    });
    if (!user) throw new Error("User not found");
    if (!user.email)
      throw new Error(
        "This user has no email on file to attach a password account to.",
      );

    const temporaryPassword = generateTemporaryPassword();
    await modifyAccountCredentials(ctx as any, {
      provider: "password",
      account: { id: user.email, secret: temporaryPassword },
    });
    return { temporaryPassword };
  },
});

/**
 * Sends a password-reset email to a user, entirely server-side. This does
 * NOT use the client-side signIn({flow:"reset"}) self-service trigger —
 * testing confirmed that call is tied to the calling browser's own auth
 * session and actually logs the ADMIN out when triggered on someone
 * else's behalf. It also doesn't use @convex-dev/auth's lower-level
 * signInViaProvider primitive directly — that turned out to require
 * internal request context (ctx.auth.config) that's only populated when
 * the library's own HTTP action handles the call, not when invoked from
 * an arbitrary custom action; confirmed via Convex's own function logs
 * after a real, live test threw "Cannot read properties of undefined
 * (reading 'theme')" deep in the library's internals.
 *
 * Instead, this reuses two already-proven building blocks: the same
 * modifyAccountCredentials call setTemporaryPassword uses (verified
 * working end-to-end against a real account), and the same Resend email
 * pattern already used for review reminders. The user gets a new
 * temporary password by email rather than a self-service reset code —
 * a real, working email reset is more useful than a self-service flow
 * that breaks the admin's own session.
 */
export const sendPasswordResetEmail = action({
  args: { targetUserId: v.id("users") },
  handler: async (
    ctx,
    { targetUserId },
  ): Promise<{ sent: boolean; email: string }> => {
    await requireAdminInAction(ctx);
    const user: any = await ctx.runQuery(internal.admin.getUserInternal, {
      userId: targetUserId,
    });
    if (!user) throw new Error("User not found");
    if (!user.email) throw new Error("This user has no email on file.");

    const temporaryPassword = generateTemporaryPassword();
    await modifyAccountCredentials(ctx as any, {
      provider: "password",
      account: { id: user.email, secret: temporaryPassword },
    });

    const apiKey = process.env.AUTH_RESEND_KEY;
    if (!apiKey)
      throw new Error("AUTH_RESEND_KEY environment variable not configured.");
    const greetingName = user.name ? String(user.name).split(" ")[0] : "there";
    const loginUrl = "https://portal.legacyarchitectrva.com/login";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${APP_NAME} <noreply@legacyarchitectrva.com>`,
        to: [user.email],
        subject: `Your password has been reset`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">
            <p>Hi ${greetingName},</p>
            <p>Your password for the ${APP_NAME} client portal has been reset. Here is your new temporary password:</p>
            <p style="font-family: monospace; font-size: 18px; background: #f5f5f5; padding: 12px 16px; border-radius: 6px;">${temporaryPassword}</p>
            <p style="font-size: 13px; color: #666;">Copy and paste this exactly as shown — it's case-sensitive and has no spaces, even though it may look spaced out in some email apps.</p>
            <p style="text-align: center; margin: 28px 0;">
              <a href="${loginUrl}" style="display: inline-block; background: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-family: Georgia, serif;">Sign In to the Portal</a>
            </p>
            <p style="font-size: 13px; color: #666;">Or go to ${loginUrl} directly.</p>
            <p>Once you're in, update your password to something only you know from Settings.</p>
            <p>Best,<br/>Craig</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px;">This email was sent by ${APP_NAME}</p>
          </div>
        `,
        text: `Hi ${greetingName},\n\nYour password for the ${APP_NAME} client portal has been reset. Your new temporary password is:\n\n${temporaryPassword}\n\nCopy and paste this exactly as shown — it's case-sensitive and has no spaces.\n\nSign in here: ${loginUrl}\n\nOnce you're in, update your password to something only you know from Settings.\n\nBest,\nCraig`,
      }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to send reset email via Resend: ${error}`);
    }

    return { sent: true, email: user.email };
  },
});

export const getClientRecordInternal = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .unique();
  },
});

export const setActivatedInternal = internalMutation({
  args: { clientId: v.id("clients"), isActivated: v.boolean() },
  handler: async (ctx, { clientId, isActivated }) => {
    await ctx.db.patch(clientId, { isActivated });
  },
});

/**
 * "Unlock" a client's account. This app has no failed-login-attempt
 * lockout mechanism (nothing in @convex-dev/auth tracks that here), so the
 * two real, concrete things that can leave someone unable to get in are:
 * (1) their client record being deactivated (shows "Agreement Pending"),
 * and (2) a stuck/stale session. This clears both: forces isActivated
 * back to true if there's a client record, and invalidates all of their
 * existing sessions so any broken session state can't interfere with a
 * fresh login.
 */
export const unlockAccount = action({
  args: { targetUserId: v.id("users") },
  handler: async (
    ctx,
    { targetUserId },
  ): Promise<{ reactivated: boolean; sessionsCleared: boolean }> => {
    await requireAdminInAction(ctx);
    const user: any = await ctx.runQuery(internal.admin.getUserInternal, {
      userId: targetUserId,
    });
    if (!user) throw new Error("User not found");

    let reactivated = false;
    const client: any = await ctx.runQuery(
      internal.userAdmin.getClientRecordInternal,
      { userId: targetUserId },
    );
    if (client && !client.isActivated) {
      await ctx.runMutation(internal.userAdmin.setActivatedInternal, {
        clientId: client._id,
        isActivated: true,
      });
      reactivated = true;
    }

    await invalidateSessions(ctx as any, { userId: targetUserId });
    return { reactivated, sessionsCleared: true };
  },
});
