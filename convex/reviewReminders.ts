import { v } from "convex/values";
import { internalQuery, internalMutation, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { APP_NAME } from "./constants";
import { tiers } from "../src/data/tiers";

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const REMINDER_WINDOW_BEFORE_MS = 30 * 24 * 60 * 60 * 1000; // start reminding 30 days before due
const REMINDER_WINDOW_AFTER_MS = 60 * 24 * 60 * 60 * 1000; // stop reminding 60 days after due if unresponsive

interface DueReminder {
  clientId: string;
  tier: string;
  dueDate: number;
  email: string;
  name: string | undefined;
}

function tierLabel(tier: string) {
  return tiers.find((t) => t.id === tier)?.name ?? tier;
}

function tierReviewPriceLabel(tier: string) {
  return tiers.find((t) => t.id === tier)?.reviewPriceLabel ?? "";
}

/**
 * Finds delivered clients whose annual review is due (or coming up within
 * the reminder window) and hasn't already had a reminder sent for this
 * specific cycle. Only ever considers clients with deliveryStatus
 * "delivered" — a "pending" client hasn't started their annual clock yet,
 * and a "purged" client's actual Life Manual data has already been
 * deleted per the no-retention policy, so there's nothing left to review.
 */
export const getClientsDueForReminder = internalQuery({
  args: {},
  handler: async (ctx): Promise<DueReminder[]> => {
    const now = Date.now();
    const clients = await ctx.db
      .query("clients")
      .filter((q) => q.eq(q.field("deliveryStatus"), "delivered"))
      .collect();

    const due: DueReminder[] = [];

    for (const client of clients) {
      const anchor = client.lastReviewedAt ?? client.deliveryTimestamp;
      if (!anchor) continue;
      const dueDate = anchor + YEAR_MS;
      const windowStart = dueDate - REMINDER_WINDOW_BEFORE_MS;
      const windowEnd = dueDate + REMINDER_WINDOW_AFTER_MS;
      if (now < windowStart || now > windowEnd) continue;
      if (client.reviewReminderSentForCycle === dueDate) continue;

      const user = await ctx.db.get(client.userId);
      if (!user || !user.email) continue;
      if (user.emailNotifications === false) continue;

      due.push({
        clientId: client._id,
        tier: client.tier,
        dueDate,
        email: user.email,
        name: user.name,
      });
    }

    return due;
  },
});

export const markReminderSent = internalMutation({
  args: { clientId: v.id("clients"), dueDate: v.number() },
  handler: async (ctx, { clientId, dueDate }) => {
    await ctx.db.patch(clientId, { reviewReminderSentForCycle: dueDate });
  },
});

async function sendReviewReminderEmail({
  email,
  name,
  tier,
}: {
  email: string;
  name: string | undefined;
  tier: string;
}) {
  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    throw new Error("AUTH_RESEND_KEY environment variable not configured.");
  }

  const tName = tierLabel(tier);
  const reviewPrice = tierReviewPriceLabel(tier);
  const greetingName = name ? name.split(" ")[0] : "there";

  const subject = `Your ${tName} review is coming up`;
  const bodyText = `Hi ${greetingName},

It's been about a year since your ${tName} Life Manual was completed, and life doesn't sit still for twelve months. Accounts open and close, contacts change, plans shift. The annual review exists for exactly this: a chance to go back through everything and confirm it still matches reality.

The review for ${tName} is ${reviewPrice}. If you upgrade tiers later on, that amount gets credited toward it.

Just reply to this email and we'll get it scheduled.

Best,
Craig`;

  const bodyHtml = `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${greetingName},</p>
      <p>It's been about a year since your ${tName} Life Manual was completed, and life doesn't sit still for twelve months. Accounts open and close, contacts change, plans shift. The annual review exists for exactly this: a chance to go back through everything and confirm it still matches reality.</p>
      <p>The review for ${tName} is ${reviewPrice}. If you upgrade tiers later on, that amount gets credited toward it.</p>
      <p>Just reply to this email and we'll get it scheduled.</p>
      <p>Best,<br/>Craig</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">This email was sent by ${APP_NAME}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${APP_NAME} <noreply@legacyarchitectrva.com>`,
      to: [email],
      subject,
      html: bodyHtml,
      text: bodyText,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send review reminder via Resend: ${error}`);
  }
}

/**
 * Cron-triggered: checks for clients due for their annual review and sends
 * a reminder email for each, once per cycle. See crons.ts for the schedule.
 */
export const sendDueReminders = internalAction({
  args: {},
  handler: async (ctx): Promise<{ checked: number; sent: number }> => {
    const due: DueReminder[] = await ctx.runQuery(internal.reviewReminders.getClientsDueForReminder, {});
    let sent = 0;
    for (const item of due) {
      try {
        await sendReviewReminderEmail({ email: item.email, name: item.name, tier: item.tier });
        await ctx.runMutation(internal.reviewReminders.markReminderSent, {
          clientId: item.clientId as any,
          dueDate: item.dueDate,
        });
        sent++;
      } catch (err) {
        console.error("Failed to send review reminder for client", item.clientId, err);
      }
    }
    return { checked: due.length, sent };
  },
});
