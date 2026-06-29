import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Keeps the Prospects page current with HubSpot automatically, so it
// never silently drifts out of sync the way the original prospects
// table did.
crons.interval(
  "sync prospects from HubSpot",
  { hours: 6 },
  internal.hubspot.scheduledProspectSync,
  {}
);

// Checks daily for clients whose annual review is due (or within 30 days of
// being due) and sends a reminder email, once per review cycle.
crons.interval(
  "send annual review reminders",
  { hours: 24 },
  internal.reviewReminders.sendDueReminders,
  {}
);

export default crons;
