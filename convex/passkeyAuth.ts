import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";

/**
 * Bridges a verified WebAuthn passkey assertion into a real session.
 * The heavy crypto verification happens in webauthnNode.ts (Node
 * runtime); by the time this runs, all that's left is to redeem the
 * single-use ticket it issued.
 */
export const PasskeyCredentials = ConvexCredentials<DataModel>({
  id: "passkey",
  authorize: async (params, ctx): Promise<{ userId: any } | null> => {
    const ticket = params.ticket as string;
    if (!ticket) throw new ConvexError("Missing passkey ticket");

    const userId: any = await ctx.runMutation(internal.webauthn.consumeTicket, {
      ticket,
    });
    if (!userId)
      throw new ConvexError("That passkey sign-in attempt expired. Try again.");

    return { userId };
  },
});
