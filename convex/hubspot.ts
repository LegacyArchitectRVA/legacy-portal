import { v } from "convex/values";
import { action, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { requireAdminInAction } from "./admin";

const HUBSPOT_BASE = "https://api.hubapi.com";

export const getApiKeyInternal = internalQuery({
  args: {},
  handler: async (ctx) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "hubspot_api_key"))
      .unique();
    return setting?.value || null;
  },
});

function splitName(name: string | undefined): { firstname: string; lastname: string } {
  if (!name) return { firstname: "", lastname: "" };
  const parts = name.trim().split(/\s+/);
  return {
    firstname: parts[0] || "",
    lastname: parts.slice(1).join(" ") || "",
  };
}

export const getClientInfoInternal = internalQuery({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    const user = await ctx.db.get(clientUserId);
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    return {
      email: user?.email || "",
      name: user?.name || "",
      phone: (user as any)?.contactPhone || client?.phoneNumber || "",
    };
  },
});

export const recordSyncInternal = internalMutation({
  args: { clientUserId: v.id("users"), hubspotId: v.optional(v.string()) },
  handler: async (ctx, { clientUserId, hubspotId }) => {
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", clientUserId))
      .unique();
    if (client) {
      await ctx.db.patch(client._id, {
        hubspotId,
        hubspotSyncedAt: Date.now(),
      });
    }
  },
});

/** Verifies the stored key actually works against HubSpot's API. */
export const testConnection = action({
  args: {},
  handler: async (ctx): Promise<{ connected: boolean; message: string; portalId?: number }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(internal.hubspot.getApiKeyInternal, {});
    if (!apiKey) return { connected: false, message: "No HubSpot Service Key saved yet." };

    const res = await fetch(`${HUBSPOT_BASE}/account-info/v3/details`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      const body = await res.text();
      return {
        connected: false,
        message:
          res.status === 401
            ? "HubSpot rejected this key. Double check it was copied correctly and hasn't been revoked."
            : `HubSpot returned an error (${res.status}): ${body.slice(0, 200)}`,
      };
    }

    const data = await res.json();
    return { connected: true, message: "Connected", portalId: data.portalId };
  },
});

/** Push: create or update a HubSpot contact from this client's portal data. */
export const pushClientToHubSpot = action({
  args: { clientUserId: v.id("users") },
  handler: async (
    ctx,
    { clientUserId }
  ): Promise<{ success: boolean; message: string; hubspotId?: string }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(internal.hubspot.getApiKeyInternal, {});
    if (!apiKey) throw new Error("HubSpot Service Key not configured.");

    const info: any = await ctx.runQuery(internal.hubspot.getClientInfoInternal, { clientUserId });
    if (!info?.email) throw new Error("This client has no email on file to sync with.");

    const { firstname, lastname } = splitName(info.name);

    const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts/batch/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          {
            idProperty: "email",
            id: info.email,
            properties: {
              email: info.email,
              firstname,
              lastname,
              phone: info.phone || "",
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`HubSpot sync failed (${res.status}): ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    const hubspotId = data?.results?.[0]?.id;

    await ctx.runMutation(internal.hubspot.recordSyncInternal, {
      clientUserId,
      hubspotId,
    });

    return { success: true, message: "Synced to HubSpot.", hubspotId };
  },
});

/** Pull: fetch a HubSpot contact's current properties by email, for display/cross-reference. */
export const pullContactFromHubSpot = action({
  args: { email: v.string() },
  handler: async (
    ctx,
    { email }
  ): Promise<{ found: boolean; properties?: Record<string, string | null>; message?: string }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(internal.hubspot.getApiKeyInternal, {});
    if (!apiKey) throw new Error("HubSpot Service Key not configured.");

    const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: email }] },
        ],
        properties: [
          "email",
          "firstname",
          "lastname",
          "phone",
          "lifecyclestage",
          "hs_lead_status",
          "createdate",
          "lastmodifieddate",
        ],
        limit: 1,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`HubSpot search failed (${res.status}): ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    const contact = data?.results?.[0];
    if (!contact) {
      return { found: false, message: `No HubSpot contact found for ${email}.` };
    }

    return { found: true, properties: contact.properties };
  },
});
