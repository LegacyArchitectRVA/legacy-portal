import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { createAccount, retrieveAccount } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import { Scrypt } from "lucia";
import type { DataModel } from "./_generated/dataModel";

const TEST_EMAIL_DOMAIN = "test.local";

function isTestEmail(email: string): boolean {
  return email.endsWith(`@${TEST_EMAIL_DOMAIN}`);
}

// This provider is a real, unauthenticated account-creation path: anyone
// who can reach this Convex deployment's signIn action (not just the
// frontend, ANY client speaking the Convex protocol) can call it directly
// with provider "test" and skip every check the Password provider has.
// The frontend hides its "Continue as Test User" button behind
// VITE_IS_PREVIEW, but that's a Vite build-time flag baked into the
// browser bundle. It is never sent to, or checked by, this backend
// function, so it stops nobody who isn't using the button.
//
// ALLOW_TEST_AUTH is a separate, server-side Convex environment variable.
// It does not exist on the production deployment today, so this defaults
// to disabled there with no action needed. To use this provider on a
// staging/preview Convex deployment, set ALLOW_TEST_AUTH=true on that
// deployment specifically, in the Convex dashboard, never in code.
function assertTestAuthAllowed() {
  if (process.env.ALLOW_TEST_AUTH !== "true") {
    throw new ConvexError("Test auth is disabled on this deployment.");
  }
}

export const TestCredentials = ConvexCredentials<DataModel>({
  id: "test",
  crypto: {
    async hashSecret(password: string) {
      return await new Scrypt().hash(password);
    },
    async verifySecret(password: string, hash: string) {
      return await new Scrypt().verify(hash, password);
    },
  },
  authorize: async (params, ctx) => {
    assertTestAuthAllowed();

    const email = params.email as string;
    const password = params.password as string;
    const flow = params.flow as string;

    if (!email || !isTestEmail(email)) {
      throw new ConvexError("Only @test.local emails allowed for test auth");
    }

    if (!password || password.length < 6) {
      throw new ConvexError("Password must be at least 6 characters");
    }

    if (flow === "signUp") {
      try {
        const existing = await retrieveAccount(ctx, {
          provider: "test",
          account: {
            id: email,
            secret: password,
          },
        });
        return { userId: existing.user._id };
      } catch {
        // Account doesn't exist or password doesn't match, create new
      }

      const { user } = await createAccount(ctx, {
        provider: "test",
        account: {
          id: email,
          secret: password,
        },
        profile: {
          email,
          name: (params.name as string) || "Test User",
          emailVerificationTime: Date.now(),
        },
        shouldLinkViaEmail: false,
      });

      return { userId: user._id };
    }

    try {
      const result = await retrieveAccount(ctx, {
        provider: "test",
        account: {
          id: email,
          secret: password,
        },
      });

      return { userId: result.user._id };
    } catch {
      // Account doesn't exist, create it
      const { user } = await createAccount(ctx, {
        provider: "test",
        account: {
          id: email,
          secret: password,
        },
        profile: {
          email,
          name: (params.name as string) || "Test User",
          emailVerificationTime: Date.now(),
        },
        shouldLinkViaEmail: false,
      });

      return { userId: user._id };
    }
  },
});
