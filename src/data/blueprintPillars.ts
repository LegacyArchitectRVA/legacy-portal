/**
 * Blueprint Session assessment bank.
 *
 * Seven pillars in the locked Readiness Check order. Three of these titles
 * were deliberately aligned to Life Manual chapter names per Craig
 * (Household & Property -> Household Operations, Legal & Estate -> Vital
 * Records, Health & Medical -> Emergency & Successor Orientation),
 * specifically for the Blueprint Session and nowhere else. "Orientation"
 * instead of "Access" is intentional: the Blueprint Session is a
 * diagnostic conversation, not the Life Manual document itself, so the
 * pillar is framed around whether a successor is oriented, not around
 * granting access.
 *
 * Pillar 04's underlying `id` ("health") and `color` are unchanged from
 * before the rename to avoid orphaning any Blueprint Session already run
 * under the old title. Its checkpoints were fully replaced (the old
 * healthcare-directive / medications / providers content didn't belong
 * under a successor-orientation heading), so those four checkpoint `id`s
 * are new rather than reused.
 *
 * Order: Digital Life, Financial & Assets, Household Operations,
 * Emergency & Successor Orientation, Vital Records, Legacy & Wishes (06),
 * Business Continuity (07). (Pillars 6 and 7 transposed from the original
 * Readiness Check quiz order, per Craig, for the Gap Map and Blueprint
 * Session specifically.)
 *
 * Each checkpoint carries a `fix`: the concrete step that moves that item
 * from exposed to handled. Fixes are written in the brand's plain-spoken
 * voice, facilitation language only, no advisory framing, and they feed
 * the 72-Hour Action Plan generator.
 */

export interface BlueprintCheckpoint {
  id: string;
  label: string;
  /** What the successor faces if this stays exposed. Shown in the Gap Map. */
  impact: string;
  /** The concrete step that closes this gap. Feeds the 72-Hour Plan. */
  fix: string;
  /** Rough effort so the plan generator can balance the three days. */
  effort: "quick" | "moderate" | "involved";
}

export interface BlueprintPillar {
  id: string;
  number: string;
  title: string;
  color: string;
  checkpoints: BlueprintCheckpoint[];
}

export type CheckStatus = "handled" | "partial" | "exposed" | "na";

export const BLUEPRINT_PILLARS: BlueprintPillar[] = [
  {
    id: "digital",
    number: "01",
    title: "Digital Life",
    color: "#3B82F6",
    checkpoints: [
      {
        id: "dg_password_manager",
        label: "A password manager exists and someone trusted can reach it",
        impact: "Every account becomes a locked door with no key.",
        fix: "Set up a password manager and document its emergency access path in one place.",
        effort: "moderate",
      },
      {
        id: "dg_primary_email",
        label: "Primary email recovery is documented",
        impact:
          "Email is the master key to everything else. Lose it and resets stop working.",
        fix: "Write down where primary email recovery lives and confirm the recovery phone and backup codes are current.",
        effort: "quick",
      },
      {
        id: "dg_devices",
        label: "Phone and computer unlock paths are documented",
        impact: "The devices holding everything stay sealed.",
        fix: "Document device PINs' storage location and enable legacy contact features where available.",
        effort: "quick",
      },
      {
        id: "dg_2fa",
        label: "2FA recovery codes are stored somewhere findable",
        impact: "Two-factor turns from protection into a permanent lockout.",
        fix: "Print or export recovery codes for critical accounts and store them with the vital records.",
        effort: "moderate",
      },
      {
        id: "dg_subscriptions",
        label: "Recurring subscriptions and renewals are inventoried",
        impact:
          "Money keeps leaving the account for services nobody knows exist.",
        fix: "Pull the last three months of statements and list every recurring charge in one table.",
        effort: "moderate",
      },
      {
        id: "dg_online_presence",
        label: "Social and online accounts have a handling plan",
        impact:
          "Profiles linger with no one authorized to close or memorialize them.",
        fix: "List active profiles and note the preferred outcome for each: close, memorialize, or transfer.",
        effort: "quick",
      },
    ],
  },
  {
    id: "financial",
    number: "02",
    title: "Financial & Assets",
    color: "#D4AF37",
    checkpoints: [
      {
        id: "fn_account_map",
        label: "Every account and institution is listed in one place",
        impact: "Assets go unclaimed because nobody knows they exist.",
        fix: "Build a single table of institutions, account types, and purpose. No balances or credentials, only the map.",
        effort: "moderate",
      },
      {
        id: "fn_beneficiaries",
        label: "Beneficiary designations are current and verified",
        impact:
          "Money flows to an ex-spouse or an estate fight instead of the intended people.",
        fix: "Pull each account's beneficiary page and confirm names match current intent.",
        effort: "involved",
      },
      {
        id: "fn_bills",
        label: "Bills and obligations are documented with due dates",
        impact:
          "Mortgage, insurance, and utilities lapse during the worst possible window.",
        fix: "List recurring obligations, amounts, due dates, and how each is paid.",
        effort: "moderate",
      },
      {
        id: "fn_ownership",
        label: "Titles and ownership structures are documented",
        impact:
          "Nobody can establish authority over the house, vehicles, or accounts.",
        fix: "Record how each major asset is titled and where the title documents physically live.",
        effort: "involved",
      },
      {
        id: "fn_insurance",
        label: "Insurance policies are inventoried with claim contacts",
        impact: "Coverage that was paid for never gets claimed.",
        fix: "List each policy, carrier, policy number location, and the first call to make.",
        effort: "moderate",
      },
    ],
  },
  {
    id: "household",
    number: "03",
    title: "Household Operations",
    color: "#10B981",
    checkpoints: [
      {
        id: "hh_shutoffs",
        label: "Utility shut-offs and home systems are documented",
        impact:
          "A burst pipe or gas issue becomes a crisis because nobody knows where the valves are.",
        fix: "Photograph and note the locations of water, gas, and electrical shut-offs.",
        effort: "quick",
      },
      {
        id: "hh_access",
        label: "Keys, codes, and security access are findable",
        impact: "The family stands outside their own house.",
        fix: "Document where spare keys live and how alarm and gate codes are stored.",
        effort: "quick",
      },
      {
        id: "hh_vendors",
        label: "Service providers and maintenance schedule are listed",
        impact:
          "The lawn guy, HVAC contract, and pest service all go dark or keep billing.",
        fix: "List active vendors, what they do, how they're paid, and renewal dates.",
        effort: "moderate",
      },
      {
        id: "hh_vehicles",
        label: "Vehicle information and title locations are recorded",
        impact: "Cars sit undriveable and unsellable.",
        fix: "Record each vehicle, where the title and spare key live, and any loan details.",
        effort: "quick",
      },
      {
        id: "hh_pets",
        label: "Pet care has a named short-term plan",
        impact:
          "The animals nobody planned for become an emergency of their own.",
        fix: "Name the short-term caretaker and write one page of feeding, vet, and routine notes.",
        effort: "quick",
      },
    ],
  },
  {
    id: "health",
    number: "04",
    title: "Emergency & Successor Orientation",
    color: "#F43F5E",
    checkpoints: [
      {
        id: "es_named_successor",
        label: "A named successor knows the role is theirs",
        impact:
          "In an emergency, everyone waits because no one was ever formally handed the job.",
        fix: "Name the person directly and tell them in plain terms what they're responsible for.",
        effort: "quick",
      },
      {
        id: "es_starting_point",
        label: "The successor knows exactly where to start",
        impact:
          "A fully documented life is worthless if nobody knows where the documents live.",
        fix: "Point to one starting location, a folder, binder, or portal, and confirm the successor knows how to reach it.",
        effort: "moderate",
      },
      {
        id: "es_backup_named",
        label: "A backup successor is named in case the first can't act",
        impact:
          "One person becomes unreachable and the whole plan stalls with them.",
        fix: "Name a second person and write down how authority passes if the first can't step in.",
        effort: "quick",
      },
      {
        id: "es_first_moves",
        label: "The first moves in an emergency are written down",
        impact: "The first hours get spent guessing instead of acting.",
        fix: "Write the ordered first steps: who to call, what to secure, and what can wait.",
        effort: "quick",
      },
    ],
  },
  {
    id: "legal",
    number: "05",
    title: "Vital Records",
    color: "#A78BFA",
    checkpoints: [
      {
        id: "lg_will",
        label: "A will exists and its location is known",
        impact: "The state decides everything, slowly and publicly.",
        fix: "Confirm the will exists and record exactly where the signed original lives.",
        effort: "involved",
      },
      {
        id: "lg_poa",
        label: "Financial power of attorney is in force and findable",
        impact:
          "Bills can't be paid and accounts can't be touched during incapacity.",
        fix: "Confirm the POA is signed and current, and document its location.",
        effort: "involved",
      },
      {
        id: "lg_vital_docs",
        label: "Birth certificates, deeds, and vital records are located",
        impact: "Every process stalls waiting on paperwork hunts.",
        fix: "Gather originals into one documented location and list what lives there.",
        effort: "moderate",
      },
      {
        id: "lg_contacts",
        label: "Attorney and key professional contacts are listed",
        impact: "The people who know the details never get the call.",
        fix: "List professional contacts, their role, and when to involve each one.",
        effort: "quick",
      },
    ],
  },
  {
    id: "legacy",
    number: "06",
    title: "Legacy & Wishes",
    color: "#A855F7",
    checkpoints: [
      {
        id: "lw_final_wishes",
        label: "Service and remembrance preferences are written down",
        impact: "Grieving people guess at big decisions and pay rush prices.",
        fix: "Write one page of preferences: service style, remembrance, anything already arranged.",
        effort: "quick",
      },
      {
        id: "lw_messages",
        label: "Personal messages or letters exist for the people who matter",
        impact: "The words that mattered most never get said.",
        fix: "Note whether letters exist and where they're kept. Writing them can wait; the pointer can't.",
        effort: "quick",
      },
      {
        id: "lw_items",
        label: "Sentimental items have named recipients",
        impact: "The watch and the ring become the family argument.",
        fix: "List the items that carry meaning and who each is meant for.",
        effort: "quick",
      },
    ],
  },
  {
    id: "business",
    number: "07",
    title: "Business Continuity",
    color: "#F59E0B",
    checkpoints: [
      {
        id: "bz_authority",
        label: "Someone can act with authority if the owner can't",
        impact: "Payroll, contracts, and the bank all freeze.",
        fix: "Document who holds signing authority and where that authorization lives.",
        effort: "involved",
      },
      {
        id: "bz_access",
        label: "Business banking and system access are documented",
        impact: "The business dies of lockout, not of anything structural.",
        fix: "Map the systems that keep revenue moving and where their access paths are recorded.",
        effort: "moderate",
      },
      {
        id: "bz_relationships",
        label: "Key clients, vendors, and contracts are listed",
        impact: "Relationships walk out the door with the owner.",
        fix: "List the relationships and obligations a successor must know in week one.",
        effort: "moderate",
      },
      {
        id: "bz_stabilization",
        label: "A first-week stabilization sequence exists",
        impact: "The successor improvises in front of employees and clients.",
        fix: "Write the ordered first moves: who to call, what to hold steady, what to pause.",
        effort: "moderate",
      },
    ],
  },
];

export const STATUS_META: Record<
  CheckStatus,
  { label: string; short: string; risk: number }
> = {
  handled: { label: "Handled", short: "H", risk: 0 },
  partial: { label: "Partial", short: "P", risk: 1 },
  exposed: { label: "Exposed", short: "E", risk: 2 },
  na: { label: "N/A", short: "-", risk: 0 },
};

/** Cycle order when tapping a status chip during the live session. */
export const STATUS_CYCLE: CheckStatus[] = [
  "exposed",
  "partial",
  "handled",
  "na",
];
