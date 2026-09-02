import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
} from "./_generated/server";
import { requireAdmin, requireAdminInAction } from "./admin";

const HUBSPOT_BASE = "https://api.hubapi.com";

export const getApiKeyInternal = internalQuery({
  args: {},
  handler: async ctx => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", q => q.eq("key", "hubspot_api_key"))
      .unique();
    return setting?.value || null;
  },
});

function splitName(name: string | undefined): {
  firstname: string;
  lastname: string;
} {
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
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
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
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
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
/** Fetches every contact from HubSpot, paginated, capped for safety. */
async function fetchAllHubSpotContacts(apiKey: string): Promise<any[]> {
  const all: any[] = [];
  let after: string | undefined;
  let pages = 0;

  do {
    const url = new URL(`${HUBSPOT_BASE}/crm/v3/objects/contacts`);
    url.searchParams.set("limit", "100");
    url.searchParams.set("properties", "email,firstname,lastname,phone");
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new ConvexError(
        `HubSpot contacts list failed (${res.status}): ${body.slice(0, 300)}`,
      );
    }
    const data = await res.json();
    all.push(...(data.results || []));
    after = data.paging?.next?.after;
    pages++;
  } while (after && pages < 20); // safety cap: 2000 contacts

  return all;
}

/** Core sync logic, shared by the manual button and the scheduled cron. */
async function runProspectSync(ctx: any): Promise<{
  created: number;
  updated: number;
  linked: number;
  skipped: number;
}> {
  const apiKey: string | null = await ctx.runQuery(
    internal.hubspot.getApiKeyInternal,
    {},
  );
  if (!apiKey)
    throw new ConvexError("HubSpot Private App Token not configured.");

  const contacts = await fetchAllHubSpotContacts(apiKey);
  const clientEmails: string[] = await ctx.runQuery(
    internal.prospects.getAllClientEmailsInternal,
    {},
  );
  const clientEmailSet = new Set(clientEmails.filter(Boolean));

  let created = 0,
    updated = 0,
    linked = 0,
    skipped = 0;

  for (const contact of contacts) {
    const email = (contact.properties?.email || "").toLowerCase();
    if (email && clientEmailSet.has(email)) {
      skipped++; // already an actual client, not a prospect
      continue;
    }
    const firstname = contact.properties?.firstname || "";
    const lastname = contact.properties?.lastname || "";
    const name =
      `${firstname} ${lastname}`.trim() || email || "Unnamed Contact";

    const result = await ctx.runMutation(
      internal.prospects.upsertProspectFromHubSpot,
      {
        hubspotId: contact.id,
        name,
        email: contact.properties?.email || undefined,
        phone: contact.properties?.phone || undefined,
      },
    );
    if (result.action === "created") created++;
    else if (result.action === "linked") linked++;
    else updated++;
  }

  return { created, updated, linked, skipped };
}

/** Manual "Sync Now" button — admin only. */
export const syncProspectsFromHubSpot = action({
  args: {},
  handler: async (
    ctx,
  ): Promise<{
    created: number;
    updated: number;
    linked: number;
    skipped: number;
  }> => {
    await requireAdminInAction(ctx);
    return await runProspectSync(ctx);
  },
});

/** Scheduled automatic sync — no user context, runs as the system. */
export const scheduledProspectSync = internalAction({
  args: {},
  handler: async ctx => {
    try {
      await runProspectSync(ctx);
    } catch (err) {
      // Swallow errors from the scheduled run (e.g. no API key configured
      // yet) so a missing integration doesn't show up as a failed cron.
      console.error("Scheduled HubSpot prospect sync skipped:", err);
    }
  },
});

export const testConnection = action({
  args: {},
  handler: async (
    ctx,
  ): Promise<{ connected: boolean; message: string; portalId?: number }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(
      internal.hubspot.getApiKeyInternal,
      {},
    );
    if (!apiKey)
      return { connected: false, message: "No HubSpot Service Key saved yet." };

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
    { clientUserId },
  ): Promise<{ success: boolean; message: string; hubspotId?: string }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(
      internal.hubspot.getApiKeyInternal,
      {},
    );
    if (!apiKey) throw new ConvexError("HubSpot Service Key not configured.");

    const info: any = await ctx.runQuery(
      internal.hubspot.getClientInfoInternal,
      { clientUserId },
    );
    if (!info?.email)
      throw new ConvexError("This client has no email on file to sync with.");

    const { firstname, lastname } = splitName(info.name);

    const res = await fetch(
      `${HUBSPOT_BASE}/crm/v3/objects/contacts/batch/upsert`,
      {
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
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new ConvexError(
        `HubSpot sync failed (${res.status}): ${body.slice(0, 300)}`,
      );
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
    { email },
  ): Promise<{
    found: boolean;
    properties?: Record<string, string | null>;
    message?: string;
  }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(
      internal.hubspot.getApiKeyInternal,
      {},
    );
    if (!apiKey) throw new ConvexError("HubSpot Service Key not configured.");

    const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: email }],
          },
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
      throw new ConvexError(
        `HubSpot search failed (${res.status}): ${body.slice(0, 300)}`,
      );
    }

    const data = await res.json();
    const contact = data?.results?.[0];
    if (!contact) {
      return {
        found: false,
        message: `No HubSpot contact found for ${email}.`,
      };
    }

    return { found: true, properties: contact.properties };
  },
});

/** Generates a short-lived upload URL for a note attachment. The client
 * uploads the file directly to this URL (bypassing the action's own request
 * size limits) and gets back a storageId to pass to addNoteToHubSpot. */
export const generateNoteAttachmentUploadUrl = mutation({
  args: {},
  handler: async ctx => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

/** Looks up a client's HubSpot contact id, pushing them to HubSpot first
 * if they haven't been synced yet, so this never fails just because nobody
 * pressed "sync" first. */
async function ensureHubSpotId(
  ctx: any,
  clientUserId: string,
): Promise<string> {
  const existing: any = await ctx.runQuery(
    internal.hubspot.getClientRecordInternal,
    { clientUserId },
  );
  if (existing?.hubspotId) return existing.hubspotId;

  const pushResult: { success: boolean; message: string; hubspotId?: string } =
    await ctx.runAction(api.hubspot.pushClientToHubSpot, { clientUserId });
  if (!pushResult.hubspotId) {
    throw new ConvexError(
      pushResult.message || "Couldn't find or create this client in HubSpot.",
    );
  }
  return pushResult.hubspotId;
}

/** Creates a note on a client's HubSpot contact timeline, with an optional
 * file attachment. Mirrors the two-step approach HubSpot's own Notes API
 * requires: upload the file to HubSpot's Files API first, then reference
 * the returned file id on the note itself via hs_attachment_ids. */
export const addNoteToHubSpot = action({
  args: {
    clientUserId: v.id("users"),
    note: v.string(),
    attachmentStorageId: v.optional(v.id("_storage")),
    attachmentName: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { clientUserId, note, attachmentStorageId, attachmentName },
  ): Promise<{
    success: boolean;
    message: string;
    hubspotNoteUrl?: string;
  }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(
      internal.hubspot.getApiKeyInternal,
      {},
    );
    if (!apiKey) throw new ConvexError("HubSpot Service Key not configured.");
    if (!note.trim() && !attachmentStorageId)
      throw new ConvexError("Add note text or a file, at least one.");

    const hubspotId = await ensureHubSpotId(ctx, clientUserId);

    let attachmentFileId: string | undefined;
    if (attachmentStorageId) {
      const fileBlob = await ctx.storage.get(attachmentStorageId);
      if (!fileBlob)
        throw new ConvexError(
          "That attachment couldn't be found, try uploading it again.",
        );

      const form = new FormData();
      form.append("file", fileBlob, attachmentName || "attachment");
      form.append(
        "options",
        JSON.stringify({ access: "PRIVATE", ttl: "P3M", overwrite: false }),
      );

      const uploadRes = await fetch(`${HUBSPOT_BASE}/files/v3/files`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
      });
      if (!uploadRes.ok) {
        const body = await uploadRes.text();
        throw new ConvexError(
          `HubSpot file upload failed (${uploadRes.status}): ${body.slice(0, 300)}`,
        );
      }
      const uploadData = await uploadRes.json();
      attachmentFileId = uploadData?.id;
    }

    const noteRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          hs_note_body: note.trim() || `Attached: ${attachmentName}`,
          hs_timestamp: Date.now(),
          ...(attachmentFileId ? { hs_attachment_ids: attachmentFileId } : {}),
        },
        associations: [
          {
            to: { id: hubspotId },
            // Default HubSpot association type for note -> contact.
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 202,
              },
            ],
          },
        ],
      }),
    });

    if (!noteRes.ok) {
      const body = await noteRes.text();
      throw new ConvexError(
        `HubSpot note creation failed (${noteRes.status}): ${body.slice(0, 300)}`,
      );
    }

    const noteData = await noteRes.json();
    return {
      success: true,
      message: attachmentFileId
        ? "Note and file added to HubSpot."
        : "Note added to HubSpot.",
      hubspotNoteUrl: noteData?.id
        ? `https://app.hubspot.com/contacts/0/contact/${hubspotId}`
        : undefined,
    };
  },
});

export const getClientRecordInternal = internalQuery({
  args: { clientUserId: v.id("users") },
  handler: async (ctx, { clientUserId }) => {
    const client = await ctx.db
      .query("clients")
      .withIndex("by_userId", q => q.eq("userId", clientUserId))
      .unique();
    return client ? { hubspotId: client.hubspotId } : null;
  },
});

/** Search HubSpot contacts by name or email, for the "create account from
 * HubSpot" picker on the User Access page. Uses HubSpot's free-text
 * `query` search (matches across name/email/phone/company on their end)
 * rather than the exact-match filter pullContactFromHubSpot uses, since
 * this is for browsing/picking rather than looking up one known email. */
export const searchHubSpotContacts = action({
  args: { query: v.string() },
  handler: async (
    ctx,
    { query },
  ): Promise<{
    results: Array<{
      id: string;
      email: string;
      name: string;
      phone: string;
    }>;
  }> => {
    await requireAdminInAction(ctx);
    const apiKey: string | null = await ctx.runQuery(
      internal.hubspot.getApiKeyInternal,
      {},
    );
    if (!apiKey) throw new ConvexError("HubSpot Service Key not configured.");

    const trimmed = query.trim();
    if (!trimmed) return { results: [] };

    const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: trimmed,
        properties: ["email", "firstname", "lastname", "phone"],
        limit: 10,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new ConvexError(
        `HubSpot search failed (${res.status}): ${body.slice(0, 300)}`,
      );
    }

    const data = await res.json();
    const results = (data.results || []).map((c: any) => {
      const first = c.properties?.firstname || "";
      const last = c.properties?.lastname || "";
      return {
        id: c.id,
        email: c.properties?.email || "",
        name: `${first} ${last}`.trim() || c.properties?.email || "Unnamed",
        phone: c.properties?.phone || "",
      };
    });

    return { results };
  },
});
