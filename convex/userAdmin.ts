import {
  createAccount,
  invalidateSessions,
  modifyAccountCredentials,
} from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
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
    if (!user) throw new ConvexError("User not found");
    if (!user.email)
      throw new ConvexError(
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
    if (!user) throw new ConvexError("User not found");
    if (!user.email) throw new ConvexError("This user has no email on file.");

    const temporaryPassword = generateTemporaryPassword();
    await modifyAccountCredentials(ctx as any, {
      provider: "password",
      account: { id: user.email, secret: temporaryPassword },
    });

    const apiKey = process.env.AUTH_RESEND_KEY;
    if (!apiKey)
      throw new ConvexError("AUTH_RESEND_KEY environment variable not configured.");
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
      throw new ConvexError(`Failed to send reset email via Resend: ${error}`);
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
    if (!user) throw new ConvexError("User not found");

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

/**
 * Admin-only: create a brand new portal account from scratch, or from a
 * HubSpot contact's details (the caller passes name/email/phone either
 * way — HubSpot is just where the values came from). Always creates the
 * login (a "password" auth account, same primitive setTemporaryPassword
 * and sendPasswordResetEmail already use), optionally also creates the
 * clients record so the account shows up as an actual client immediately
 * instead of needing a second "Add Client" step. Emails the new user
 * their temporary password the same way a password reset does, and also
 * returns it once so the admin has it in hand right away.
 */
export const createAccountAdmin = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    tier: v.optional(
      v.union(v.literal("personal"), v.literal("business")),
    ),
    hubspotId: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { name, email, phone, tier, hubspotId },
  ): Promise<{
    userId: string;
    temporaryPassword: string;
    emailSent: boolean;
  }> => {
    await requireAdminInAction(ctx);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      throw new ConvexError("A valid email address is required.");
    }
    if (!name.trim()) {
      throw new ConvexError("A name is required.");
    }

    const existing: any = await ctx.runQuery(
      internal.userAdmin.getUserByEmailInternal,
      { email: cleanEmail },
    );
    if (existing) {
      throw new ConvexError(
        `An account already exists for ${cleanEmail}. Use that account instead of creating a new one.`,
      );
    }

    const temporaryPassword = generateTemporaryPassword();

    const trimmedPhone = phone?.trim();
    let userId: string;
    try {
      const result = await createAccount(ctx as any, {
        provider: "password",
        account: { id: cleanEmail, secret: temporaryPassword },
        profile: {
          email: cleanEmail,
          name: name.trim(),
          ...(trimmedPhone ? { contactPhone: trimmedPhone } : {}),
        },
      });
      userId = result.user._id;
    } catch (err: any) {
      throw new ConvexError(
        err?.message || "Could not create the account credentials.",
      );
    }

    if (tier) {
      await ctx.runMutation(internal.userAdmin.insertClientInternal, {
        userId: userId as any,
        tier,
        hubspotId,
      });
    }

    let emailSent = false;
    const apiKey = process.env.AUTH_RESEND_KEY;
    if (apiKey) {
      const greetingName = name.trim().split(" ")[0];
      const loginUrl = "https://portal.legacyarchitectrva.com/login";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${APP_NAME} <noreply@legacyarchitectrva.com>`,
          to: [cleanEmail],
          subject: `Your ${APP_NAME} portal account is ready`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">
              <p>Hi ${greetingName},</p>
              <p>An account has been set up for you in the ${APP_NAME} client portal. Here is your temporary password:</p>
              <p style="font-family: monospace; font-size: 18px; background: #f5f5f5; padding: 12px 16px; border-radius: 6px;">${temporaryPassword}</p>
              <p style="font-size: 13px; color: #666;">Copy and paste this exactly as shown — it's case-sensitive and has no spaces, even though it may look spaced out in some email apps.</p>
              <p style="text-align: center; margin: 28px 0;">
                <a href="${loginUrl}" style="display: inline-block; background: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-family: Georgia, serif;">Sign In to the Portal</a>
              </p>
              <p style="font-size: 13px; color: #666;">Or go to ${loginUrl} directly, using ${cleanEmail} as the email.</p>
              <p>Once you're in, update the password to something only you know from Settings.</p>
              <p>Best,<br/>Craig</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
              <p style="color: #999; font-size: 12px;">This email was sent by ${APP_NAME}</p>
            </div>
          `,
          text: `Hi ${greetingName},\n\nAn account has been set up for you in the ${APP_NAME} client portal. Your temporary password is:\n\n${temporaryPassword}\n\nCopy and paste this exactly as shown — it's case-sensitive and has no spaces.\n\nSign in here: ${loginUrl}, using ${cleanEmail} as the email.\n\nOnce you're in, update the password to something only you know from Settings.\n\nBest,\nCraig`,
        }),
      });
      emailSent = response.ok;
    }

    return { userId, temporaryPassword, emailSent };
  },
});

export const getUserByEmailInternal = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .withIndex("email", q => q.eq("email", email))
      .unique();
  },
});

export const insertClientInternal = internalMutation({
  args: {
    userId: v.id("users"),
    tier: v.union(
      v.literal("personal"),
      v.literal("business"),
    ),
    hubspotId: v.optional(v.string()),
  },
  handler: async (ctx, { userId, tier, hubspotId }) => {
    await ctx.db.insert("clients", {
      userId,
      tier,
      isActivated: true,
      hubspotId,
    });
  },
});

/**
 * Admin-only: permanently and completely delete a portal account — the
 * login, the client record, every chapter of their Life Manual data, their
 * messages, notes, passkeys, legal document flags, and their uploaded
 * profile picture / family crest. This is irreversible, so the frontend
 * requires the admin to type the account's exact email before calling
 * this (checked again here server-side, not just trusted from the UI).
 *
 * Deliberately refuses to delete admin accounts or the caller's own
 * account — this panel is for managing clients, not for admins to
 * accidentally lock each other, or themselves, out.
 */
export const deleteAccountAdmin = action({
  args: { targetUserId: v.id("users"), confirmEmail: v.string() },
  handler: async (
    ctx,
    { targetUserId, confirmEmail },
  ): Promise<{ success: boolean; deletedEmail: string }> => {
    const callerId = await requireAdminInAction(ctx);
    if (callerId === targetUserId) {
      throw new ConvexError(
        "You can't delete your own account from here. Use Settings > Delete Account instead.",
      );
    }

    const user: any = await ctx.runQuery(internal.admin.getUserInternal, {
      userId: targetUserId,
    });
    if (!user) throw new ConvexError("User not found.");
    if (user.isAdmin) {
      throw new ConvexError("Admin accounts can't be deleted from this panel.");
    }
    const actualEmail = (user.email || "").trim().toLowerCase();
    if (!actualEmail || confirmEmail.trim().toLowerCase() !== actualEmail) {
      throw new ConvexError(
        "The typed email doesn't match this account's email. Nothing was deleted.",
      );
    }

    await ctx.runMutation(internal.userAdmin.cascadeDeleteAccountInternal, {
      targetUserId,
    });

    return { success: true, deletedEmail: actualEmail };
  },
});

export const cascadeDeleteAccountInternal = internalMutation({
  args: { targetUserId: v.id("users") },
  handler: async (ctx, { targetUserId }) => {
    const user = await ctx.db.get(targetUserId);

    // Uploaded files — best effort, a already-missing storage id shouldn't
    // block the rest of the deletion.
    const profilePicId = (user as any)?.profilePicId;
    const crestId = (user as any)?.crestId;
    if (profilePicId) {
      try {
        await ctx.storage.delete(profilePicId);
      } catch {
        // already gone or never existed cleanly — continue
      }
    }
    if (crestId) {
      try {
        await ctx.storage.delete(crestId);
      } catch {
        // already gone or never existed cleanly — continue
      }
    }

    const sectionRows = await ctx.db
      .query("sectionRows")
      .withIndex("by_userId", q => q.eq("userId", targetUserId))
      .collect();
    for (const row of sectionRows) await ctx.db.delete(row._id);

    const sectionFields = await ctx.db
      .query("sectionFields")
      .withIndex("by_userId", q => q.eq("userId", targetUserId))
      .collect();
    for (const field of sectionFields) await ctx.db.delete(field._id);

    const sentMessages = await ctx.db
      .query("messages")
      .withIndex("by_fromUserId", q => q.eq("fromUserId", targetUserId))
      .collect();
    for (const m of sentMessages) await ctx.db.delete(m._id);

    const receivedMessages = await ctx.db
      .query("messages")
      .withIndex("by_toUserId", q => q.eq("toUserId", targetUserId))
      .collect();
    for (const m of receivedMessages) await ctx.db.delete(m._id);

    const notes = await ctx.db
      .query("clientNotes")
      .withIndex("by_clientUserId", q => q.eq("clientUserId", targetUserId))
      .collect();
    for (const n of notes) await ctx.db.delete(n._id);

    const passkeys = await ctx.db
      .query("webauthnCredentials")
      .withIndex("by_userId", q => q.eq("userId", targetUserId))
      .collect();
    for (const p of passkeys) await ctx.db.delete(p._id);

    const legalDocs = await ctx.db
      .query("legalDocuments")
      .withIndex("by_userId", q => q.eq("userId", targetUserId))
      .collect();
    for (const d of legalDocs) await ctx.db.delete(d._id);

    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", targetUserId))
      .unique();
    if (client) await ctx.db.delete(client._id);

    const authAccounts = await ctx.db
      .query("authAccounts")
      .filter(q => q.eq(q.field("userId"), targetUserId))
      .collect();
    for (const a of authAccounts) await ctx.db.delete(a._id);

    const authSessions = await ctx.db
      .query("authSessions")
      .filter(q => q.eq(q.field("userId"), targetUserId))
      .collect();
    for (const s of authSessions) await ctx.db.delete(s._id);

    await ctx.db.delete(targetUserId);
  },
});
