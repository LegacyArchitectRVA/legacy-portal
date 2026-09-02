import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { PasskeyCredentials } from "./passkeyAuth";
import { ResendPasswordReset, ResendVerificationEmail } from "./ResendEmail";
import { TestCredentials } from "./testAuth";

declare const process: { env: Record<string, string | undefined> };

function decodePrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  if (key.includes("\n")) return key;
  if (key.startsWith("-----BEGIN")) {
    return key
      .replace("-----BEGIN PRIVATE KEY----- ", "-----BEGIN PRIVATE KEY-----\n")
      .replace(" -----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----")
      .split(" ")
      .join("\n");
  }
  try {
    return atob(key);
  } catch {
    return key;
  }
}

const authPrivateKey = process.env.AUTH_PRIVATE_KEY;
if (authPrivateKey) {
  process.env.AUTH_PRIVATE_KEY = decodePrivateKey(authPrivateKey);
}

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
if (jwtPrivateKey) {
  process.env.JWT_PRIVATE_KEY = decodePrivateKey(jwtPrivateKey);
}

// TestCredentials is disabled unless ALLOW_TEST_AUTH=true is set on this
// specific Convex deployment (see testAuth.ts). It isn't set on production,
// so this array excludes it there by default. Kept out of the list
// entirely, rather than left in and only rejecting inside authorize(), so
// the provider doesn't appear in this deployment's auth provider metadata
// at all when disabled.
const providers = [
  Password({
    verify: ResendVerificationEmail,
    reset: ResendPasswordReset,
  }),
  PasskeyCredentials,
];
if (process.env.ALLOW_TEST_AUTH === "true") {
  providers.push(TestCredentials);
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers,
});

export const currentUser = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});
