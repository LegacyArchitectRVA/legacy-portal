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

export default crons;
