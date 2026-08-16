"use node";

import { getAuthUserId } from "@convex-dev/auth/server";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";

declare const process: { env: Record<string, string | undefined> };

function getRpId(): string {
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) {
    try {
      return new URL(siteUrl).hostname;
    } catch {
      // fall through to default
    }
  }
  return "portal.legacyarchitectrva.com";
}

function getOrigin(): string {
  const siteUrl = process.env.SITE_URL;
  return siteUrl || "https://portal.legacyarchitectrva.com";
}

const RP_NAME = "Legacy Architect RVA";

/**
 * Step 1 of registering a new passkey: must be called while already
 * signed in (e.g. from the Settings page). Returns options to pass into
 * @simplewebauthn/browser's startRegistration().
 */
export const getRegistrationOptions = action({
  args: {},
  handler: async (ctx): Promise<{ options: unknown; token: string }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");

    const existing: any[] = await ctx
      .runQuery(internal.webauthn.getCredentialIdsForUser, { userId })
      .catch(() => []);

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: getRpId(),
      userID: userId,
      userName: "passkey-user",
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
        authenticatorAttachment: "platform",
      },
      excludeCredentials: (existing || []).map((c: any) => ({
        id: c.credentialId,
        type: "public-key" as const,
      })),
    });

    const token: string = await ctx.runMutation(
      internal.webauthn.saveChallenge,
      {
        challenge: options.challenge,
        purpose: "registration",
        userId,
      },
    );

    return { options, token };
  },
});

/**
 * Step 2 of registering a new passkey: verifies the browser's response
 * and stores the new credential against the current user.
 */
export const verifyRegistration = action({
  args: {
    token: v.string(),
    response: v.any(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { token, response }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");

    const stored: any = await ctx.runMutation(
      internal.webauthn.consumeChallenge,
      { token },
    );
    if (!stored)
      throw new ConvexError("That registration attempt expired. Try again.");

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: stored.challenge,
      expectedOrigin: getOrigin(),
      expectedRPID: getRpId(),
    });

    if (!verification.verified || !verification.registrationInfo) {
      throw new ConvexError("Could not verify passkey registration.");
    }

    const {
      credentialID,
      credentialPublicKey,
      counter,
      credentialDeviceType,
      credentialBackedUp,
    } = verification.registrationInfo;

    await ctx.runMutation(internal.webauthn.saveCredential, {
      userId,
      credentialId: Buffer.from(credentialID).toString("base64url"),
      publicKey: Buffer.from(credentialPublicKey).toString("base64url"),
      counter,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
    });

    return { success: true };
  },
});

/**
 * Step 1 of signing in with a passkey: no email needed, the device's
 * passkey picker handles account selection (discoverable credentials).
 */
export const getAuthenticationOptions = action({
  args: {},
  handler: async (ctx): Promise<{ options: unknown; token: string }> => {
    const options = await generateAuthenticationOptions({
      rpID: getRpId(),
      userVerification: "preferred",
    });

    const token: string = await ctx.runMutation(
      internal.webauthn.saveChallenge,
      {
        challenge: options.challenge,
        purpose: "authentication",
      },
    );

    return { options, token };
  },
});

/**
 * Step 2 of signing in with a passkey: verifies the assertion against
 * the stored credential and, if valid, issues a short-lived ticket that
 * the "passkey" ConvexCredentials provider exchanges for a real session.
 */
export const verifyAuthentication = action({
  args: { token: v.string(), response: v.any() },
  handler: async (ctx, { token, response }): Promise<{ ticket: string }> => {
    const stored: any = await ctx.runMutation(
      internal.webauthn.consumeChallenge,
      { token },
    );
    if (!stored) throw new ConvexError("That sign-in attempt expired. Try again.");

    const credentialId = response.id as string;
    const credential: any = await ctx.runQuery(
      internal.webauthn.getCredentialByCredentialId,
      {
        credentialId,
      },
    );
    if (!credential) throw new ConvexError("Passkey not recognized.");

    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: stored.challenge,
      expectedOrigin: getOrigin(),
      expectedRPID: getRpId(),
      authenticator: {
        credentialID: Buffer.from(credential.credentialId, "base64url"),
        credentialPublicKey: Buffer.from(credential.publicKey, "base64url"),
        counter: credential.counter,
      },
    });

    if (!verification.verified) {
      throw new ConvexError("Could not verify passkey sign-in.");
    }

    await ctx.runMutation(internal.webauthn.updateCredentialCounter, {
      id: credential._id,
      counter: verification.authenticationInfo.newCounter,
    });

    const ticket: string = await ctx.runMutation(
      internal.webauthn.issueTicket,
      {
        userId: credential.userId,
      },
    );

    return { ticket };
  },
});
