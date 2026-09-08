import type { PillarScore } from "./blueprintDeliverable";

/**
 * Single source of truth for Gap Map status color and the pillar icon set.
 * Previously lived inside GapMapVisual.tsx (the retired 3D gem scene);
 * pulled out on its own so BlueprintSessionPage's checkpoint chips, the
 * Gap Map bars, and anywhere else that needs "what color is this pillar"
 * all read from the same place instead of three copies drifting apart.
 */
export const STATUS_COLORS = {
  strong: "#3da977",
  watch: "#d9a441",
  exposed: "#b3413a",
  unassessed: "#6b675e",
} as const;

export function nodeColor(s: PillarScore): string {
  if (s.assessed === 0) return STATUS_COLORS.unassessed;
  if (s.riskPct >= 60) return STATUS_COLORS.exposed;
  if (s.riskPct >= 30) return STATUS_COLORS.watch;
  return STATUS_COLORS.strong;
}

export function statusWord(s: PillarScore): string {
  if (s.assessed === 0) return "Not assessed";
  if (s.riskPct >= 60) return "Exposed";
  if (s.riskPct >= 30) return "Watch";
  return "Strong";
}

// Craig deliberately aligned three Blueprint pillar titles to their Life
// Manual chapter names, so all 7 now share an icon with their Life Manual
// counterpart. Pillar 04's underlying id stays "health" (pre-dates the
// title moving to "Emergency & Successor Orientation"), it's the title and
// icon that moved, not the id.
export const PILLAR_ICON_SRC: Partial<Record<string, string>> = {
  digital: "/pillar-digital-v2.webp",
  legal: "/pillar-vital-v2.webp",
  financial: "/pillar-financial-v2.webp",
  household: "/pillar-household-v2.webp",
  health: "/pillar-emergency-v2.webp",
  business: "/pillar-business-v2.webp",
  legacy: "/pillar-legacy-v2.webp",
};
