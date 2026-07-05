import {
  BLUEPRINT_PILLARS,
  STATUS_META,
  type BlueprintCheckpoint,
  type CheckStatus,
} from "../data/blueprintPillars";
import type { Block, ParsedDocument } from "./documentConverter";

export interface SessionAssessment {
  checkpointId: string;
  status: CheckStatus;
  note?: string;
}

export interface SessionAction {
  id: string;
  title: string;
  detail?: string;
  day: 1 | 2 | 3;
  pillarId: string;
  done: boolean;
}

export interface PillarScore {
  pillarId: string;
  title: string;
  number: string;
  color: string;
  handled: number;
  partial: number;
  exposed: number;
  assessed: number;
  /** 0 (fully handled) to 100 (fully exposed) across assessed checkpoints. */
  riskPct: number;
  exposedItems: { checkpoint: BlueprintCheckpoint; note?: string }[];
  partialItems: { checkpoint: BlueprintCheckpoint; note?: string }[];
}

const byId = new Map<string, { checkpoint: BlueprintCheckpoint; pillarId: string }>();
for (const p of BLUEPRINT_PILLARS) {
  for (const c of p.checkpoints) byId.set(c.id, { checkpoint: c, pillarId: p.id });
}

export function scorePillars(assessments: SessionAssessment[]): PillarScore[] {
  const amap = new Map(assessments.map((a) => [a.checkpointId, a]));
  return BLUEPRINT_PILLARS.map((p) => {
    let handled = 0, partial = 0, exposed = 0, risk = 0, assessed = 0;
    const exposedItems: PillarScore["exposedItems"] = [];
    const partialItems: PillarScore["partialItems"] = [];
    for (const c of p.checkpoints) {
      const a = amap.get(c.id);
      if (!a || a.status === "na") continue;
      assessed++;
      risk += STATUS_META[a.status].risk;
      if (a.status === "handled") handled++;
      else if (a.status === "partial") { partial++; partialItems.push({ checkpoint: c, note: a.note }); }
      else if (a.status === "exposed") { exposed++; exposedItems.push({ checkpoint: c, note: a.note }); }
    }
    return {
      pillarId: p.id,
      title: p.title,
      number: p.number,
      color: p.color,
      handled, partial, exposed, assessed,
      riskPct: assessed === 0 ? 0 : Math.round((risk / (assessed * 2)) * 100),
      exposedItems,
      partialItems,
    };
  });
}

/**
 * Builds a draft 72-Hour Action Plan from the assessment. Exposed items
 * come first (ranked by their pillar's overall risk so the most broken
 * area leads), then partials fill remaining slots. Quick fixes front-load
 * Day 1 so the plan opens with visible momentum; involved items land on
 * Day 2 and 3 where there's room to work. Craig edits from there.
 */
export function generatePlan(assessments: SessionAssessment[]): SessionAction[] {
  const scores = scorePillars(assessments);
  const ranked = [...scores].sort((a, b) => b.riskPct - a.riskPct);

  type Candidate = { checkpoint: BlueprintCheckpoint; pillarId: string; weight: number };
  const candidates: Candidate[] = [];
  ranked.forEach((s, pillarRank) => {
    for (const item of s.exposedItems) {
      candidates.push({ checkpoint: item.checkpoint, pillarId: s.pillarId, weight: 100 - pillarRank * 10 });
    }
  });
  ranked.forEach((s, pillarRank) => {
    for (const item of s.partialItems) {
      candidates.push({ checkpoint: item.checkpoint, pillarId: s.pillarId, weight: 40 - pillarRank * 4 });
    }
  });

  // Cap at nine actions: three per day keeps the plan achievable, which is
  // the entire point of a 72-hour window.
  const chosen = candidates.slice(0, 9);

  const effortRank = { quick: 0, moderate: 1, involved: 2 };
  chosen.sort((a, b) => {
    const w = b.weight - a.weight;
    if (w !== 0) return w;
    return effortRank[a.checkpoint.effort] - effortRank[b.checkpoint.effort];
  });

  return chosen.map((c, i) => ({
    id: c.checkpoint.id,
    title: c.checkpoint.fix,
    detail: c.checkpoint.label,
    day: (Math.floor(i / 3) + 1) as 1 | 2 | 3,
    pillarId: c.pillarId,
    done: false,
  }));
}

function pillarTitle(pillarId: string): string {
  return BLUEPRINT_PILLARS.find((p) => p.id === pillarId)?.title ?? pillarId;
}

/**
 * Assembles the combined Blueprint Session deliverable (Gap Map followed by
 * the 72-Hour Action Plan) as a ParsedDocument, ready for renderToPdfLib's
 * guaranteed-text PDF output or the branded HTML renderer.
 */
export function buildDeliverable(
  prospectName: string,
  sessionDate: number,
  assessments: SessionAssessment[],
  actions: SessionAction[]
): ParsedDocument {
  const scores = scorePillars(assessments);
  const ranked = [...scores].filter((s) => s.assessed > 0).sort((a, b) => b.riskPct - a.riskPct);
  const blocks: Block[] = [];

  const dateStr = new Date(sessionDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  blocks.push({ type: "paragraph", text: `Prepared for ${prospectName} following the Blueprint Session on ${dateStr}. This document maps where things stand today and lays out the seventy-two hours that follow. It organizes information and next steps; it is not legal, financial, or medical advice.` });

  // ---- Part 1: Gap Map ----
  blocks.push({ type: "heading", level: 1, text: "The Gap Map" });
  blocks.push({ type: "paragraph", text: "Seven areas, assessed together, one sitting. Handled means a successor could act on it today. Partial means the information exists but is scattered or stale. Exposed means it lives in one person's head." });

  blocks.push({
    type: "table",
    headers: ["Area", "Handled", "Partial", "Exposed", "Exposure"],
    rows: ranked.map((s) => [
      `${s.number} ${s.title}`,
      String(s.handled),
      String(s.partial),
      String(s.exposed),
      s.assessed === 0 ? "Not assessed" : `${s.riskPct}%`,
    ]),
  });

  for (const s of ranked) {
    if (s.exposedItems.length === 0 && s.partialItems.length === 0) continue;
    blocks.push({ type: "heading", level: 2, text: `${s.number} ${s.title}` });
    for (const item of s.exposedItems) {
      blocks.push({ type: "paragraph", text: `EXPOSED: ${item.checkpoint.label}. ${item.checkpoint.impact}${item.note ? ` Session note: ${item.note}` : ""}` });
    }
    for (const item of s.partialItems) {
      blocks.push({ type: "paragraph", text: `PARTIAL: ${item.checkpoint.label}.${item.note ? ` Session note: ${item.note}` : ""}` });
    }
  }

  // ---- Part 2: 72-Hour Action Plan ----
  blocks.push({ type: "hr" });
  blocks.push({ type: "heading", level: 1, text: "The 72-Hour Action Plan" });
  blocks.push({ type: "paragraph", text: "The highest-exposure items from the Gap Map, sequenced across three days. Each step is small on purpose. The goal isn't perfection in a weekend; it's moving the worst risks from exposed to handled while the momentum is fresh." });

  for (const day of [1, 2, 3] as const) {
    const dayActions = actions.filter((a) => a.day === day);
    if (dayActions.length === 0) continue;
    blocks.push({ type: "heading", level: 2, text: `Day ${day}` });
    blocks.push({
      type: "list",
      ordered: true,
      items: dayActions.map((a) => `${a.title} (${pillarTitle(a.pillarId)})${a.detail ? `. Closes: ${a.detail}` : ""}`),
    });
  }

  blocks.push({ type: "hr" });
  blocks.push({ type: "paragraph", text: "When you're ready to move from a plan to a finished Life Manual, the $249 from this session comes right off the top of any edition. Order in Your Absence." });

  return { title: `Blueprint Session: ${prospectName}`, blocks };
}
