import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

/**
 * The Gap Map: seven vertical exposure bars in a row, icon and chapter
 * number beneath each, over a compass-and-map background photo with a
 * dark overlay. Same thermometer-bar visual language as the seventh
 * design, per Craig that part isn't changing again: the pill/stadium bar
 * ends were tried and rejected as a generic AI-dashboard tell, a phone
 * battery indicator rather than an instrument gauge, and that verdict
 * stands.
 *
 * Thirteenth pass, and the one that actually resolves the label
 * overlap after three failed attempts at it:
 *
 *   - The column labels are chapter numbers now ("Ch. 1" through
 *     "Ch. 7"), not pillar titles, in BOTH editions. The overlap was
 *     never a spacing or width bug, it was arithmetic: at seven
 *     columns on a phone each column is roughly 37px wide, and
 *     "Operations" / "Household" / "Continuity" need more than that at
 *     10.5px. No amount of gap or width fixes text that's physically
 *     wider than its box, which is why the eleventh pass (wider gap)
 *     and twelfth pass (w-full on the label) both changed real things
 *     and fixed nothing. Craig ruled out shrinking the text, so the
 *     label itself had to get shorter. "Ch. N" fits at any column
 *     count with room to spare.
 *   - Numbering follows the Life Manual's chapters, and the
 *     Introduction is not a chapter, so Digital Life is Ch. 1 and the
 *     map runs Ch. 1 through Ch. 7. This ordering is already what
 *     PILLAR_ORDER encodes, so the number is just the index.
 *   - The eleventh pass's conditional wider gap at seven columns is
 *     reverted to a flat 2%. It was introduced to fight the overlap,
 *     didn't, and actively made it worse by narrowing the columns it
 *     was trying to give room to. With short labels there's no reason
 *     to keep it.
 *   - The twelfth pass's w-full on the label div stays. It didn't fix
 *     the overlap on its own, but holding the label to its column's
 *     real width is correct regardless, and it's what keeps a
 *     centered "Ch. N" centered on its own column rather than on its
 *     own text box.
 *   - SHORT_TITLE is gone, it existed only to trim "Emergency &
 *     Successor Orientation" down for this layout, and nothing here
 *     renders a title anymore. Full pillar titles are untouched in
 *     blueprintPillars.ts and still render in full in the assessment
 *     accordion and the PDF deliverable, which is where a client
 *     actually reads what each chapter covers. On the map the icon
 *     plus the chapter number carry it.
 *
 * Tenth pass, still in effect, unchanged here:
 *
 *   - Business Continuity's visibility is keyed to edition, not to
 *     whether it's been assessed. Always present for Business edition
 *     (as an empty dash column until it's actually assessed, same as
 *     any other pillar), never present for Personal. So Personal runs
 *     Ch. 1 through Ch. 6 and Business runs Ch. 1 through Ch. 7.
 *
 * Ninth pass, still in effect, unchanged here:
 *
 *   - No ring around the pillar icons (border and its status color
 *     dropped; the circular crop itself stays, the source images are
 *     square photos, not already-circular medallions).
 *   - Icon wrapper at 70% of column width, was 60%.
 *   - Label line-height at 1.4, was 1.15.
 *   - Shield emblem next to the "Gap Map" heading at 50px, was 40px.
 *
 * Earlier fixes (columns flex-1 instead of fixed-width so six vs seven
 * columns both fill the row cleanly; card widened to max-w-[760px]; bar
 * height 130px) are unchanged, not revisited here.
 *
 * Renders as plain DOM (no canvas), so capturing it for the PDF
 * deliverable goes through html2canvas (see gapMapToPng below). Font
 * sizes here are fixed px on purpose, not clamp()/vw: that's what caused
 * title text to overlap bars in an earlier version, html2canvas doesn't
 * reliably compute those. The background photo is a plain <img>, not a
 * CSS background-image, matching how the pillar icons and favicon are
 * already captured successfully rather than introducing a second, less
 * tested pattern.
 */

interface GapMapBarsProps {
  scores: PillarScore[];
  /** Overall readiness 0-100 (already computed from the scores). Accepted
   * for API parity with the retired components; not currently rendered
   * here, there's no readiness dial in the bar layout. */
  readiness: number;
  /** Which edition this prospect is being blueprinted toward. Renders as
   * a small line under the "Gap Map" heading, and also decides whether
   * the Business Continuity column (Ch. 7) appears at all. */
  edition: "personal" | "business";
}

// Also the chapter numbering: index 0 is Ch. 1. The Life Manual's
// Introduction is not a chapter, so Digital Life is Ch. 1 and this list
// maps one-to-one onto Ch. 1 through Ch. 7.
const PILLAR_ORDER = [
  "digital",
  "health",
  "financial",
  "household",
  "legal",
  "legacy",
  "business",
];

const EDITION_LABEL: Record<"personal" | "business", string> = {
  personal: "Personal Edition",
  business: "Business Edition",
};

const LEGEND = [
  { color: "#5f8f6a", label: "Handled — 71%+ handled" },
  { color: "#b6752f", label: "Watch — 41–70% handled" },
  { color: "#8a3a3a", label: "Exposed — 40% or less" },
  { color: "#6b6558", label: "Not assessed yet" },
];

/**
 * Fill gradient stops per status color, top (darker, near the fill line)
 * to bottom (richer, at the base of the bar). Sampled directly from
 * Craig's reference screenshot rather than derived from the flat status
 * color, since a simple lighten/darken of the base hue didn't reproduce
 * the actual look.
 */
const FILL_GRADIENT: Record<string, [string, string]> = {
  "#5f8f6a": ["#2c6d4d", "#3fae7a"], // handled / green
  "#b6752f": ["#7d5a24", "#d9a83f"], // watch / copper
  "#8a3a3a": ["#6d2c26", "#b8443a"], // exposed / oxblood
};

function Column({ s, chapter }: { s: PillarScore; chapter: number }) {
  const color = nodeColor(s);
  const handledPct =
    s.assessed === 0 ? 0 : Math.max(0, Math.min(100, 100 - s.riskPct));
  const icon = PILLAR_ICON_SRC[s.pillarId];
  const gradient = FILL_GRADIENT[color] ?? [color, color];

  return (
    <div className="flex flex-1 min-w-0 flex-col items-center">
      <div
        className="relative mx-auto overflow-hidden rounded-[6px] border-[1.5px]"
        style={{
          width: "68%",
          height: "130px",
          background: "rgba(0,0,0,.55)",
          borderColor: color,
        }}
      >
        {s.assessed === 0 ? (
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-sans text-[12px] font-bold"
            style={{ color: "#8a8478" }}
          >
            —
          </div>
        ) : (
          <div
            className="absolute inset-x-0 bottom-0 flex items-start justify-center pt-[5px]"
            style={{
              height: `${handledPct}%`,
              background: `linear-gradient(to bottom, ${gradient[0]}, ${gradient[1]})`,
            }}
          >
            <span
              className="font-sans text-[10px] font-bold"
              style={{ color: "#0a0806" }}
            >
              {handledPct}%
            </span>
          </div>
        )}
      </div>
      {/* Sized off the column, not the (narrower) bar, tuned to land at
          roughly the same icon-to-bar ratio the wider bars had. No
          border here, just the circular crop and dark backing; the ring
          that used to trace this circle in the pillar's status color is
          gone. */}
      <div
        className="mx-auto mt-[10px] aspect-square w-[70%] shrink-0 overflow-hidden rounded-full bg-[#050505]"
      >
        {icon && (
          <img
            src={icon}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      {/* w-full holds this to the column's real width so "Ch. N" centers
          on the column rather than on its own text box. */}
      <div
        className="mt-[7px] w-full text-center font-serif leading-[1.4] text-[10.5px]"
        style={{ color: "#f2ede2" }}
      >
        Ch. {chapter}
      </div>
    </div>
  );
}

export const GapMapBars = forwardRef<HTMLDivElement, GapMapBarsProps>(
  ({ scores, edition }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // Business Continuity's presence is keyed to edition, not to
    // whether it's been assessed. A Business edition session always
    // gets all seven columns, the same as the other six pillars it
    // shows an empty dash bar until something's actually assessed in
    // it. A Personal edition session never gets this column at all,
    // it isn't part of that edition's structure.
    //
    // The chapter number comes from the pillar's position in
    // PILLAR_ORDER, captured before filtering, so it's the pillar's
    // own fixed chapter number rather than its position in whatever
    // subset renders. That distinction doesn't bite today (Business
    // Continuity is last, so dropping it just truncates at Ch. 6), but
    // it keeps the numbers stable if a pillar is ever hidden from the
    // middle of the list.
    const ordered = PILLAR_ORDER.map((id, i) => {
      const s = scores.find((sc) => sc.pillarId === id);
      return s ? { score: s, chapter: i + 1 } : null;
    }).filter((entry): entry is { score: PillarScore; chapter: number } => {
      if (!entry) return false;
      if (entry.score.pillarId === "business" && edition !== "business")
        return false;
      return true;
    });

    return (
      <div ref={containerRef} className="w-full max-w-[760px] mx-auto">
        <div
          className="relative w-full overflow-hidden rounded-[14px] border"
          style={{ borderColor: "#6d5b2b" }}
        >
          <img
            src="/gap-map-bg.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(9,8,6,.86)" }}
          />

          <div className="relative px-[4%] pb-[5%] pt-[5.5%]">
            <div className="flex items-center gap-4">
              <img src="/favicon-180.png" alt="" className="h-[50px] w-[50px] shrink-0" />
              <div>
                <div className="font-serif text-[22px] leading-tight" style={{ color: "#d4b661" }}>
                  Gap Map
                </div>
                <div
                  className="text-[10px] uppercase tracking-widest font-heading"
                  style={{ color: "#9a8f6d" }}
                >
                  {EDITION_LABEL[edition]}
                </div>
              </div>
            </div>
            <div className="mt-[3%] border-t" style={{ borderColor: "rgba(109,91,43,.5)" }} />

            <div className="mt-[6%] flex items-start gap-[2%]">
              {ordered.map(({ score, chapter }) => (
                <Column key={score.pillarId} s={score} chapter={chapter} />
              ))}
            </div>

            <div className="mt-[7%] border-t pt-[4%]" style={{ borderColor: "rgba(109,91,43,.5)" }}>
              <div className="flex flex-col gap-[9px]">
                {LEGEND.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-[9px] font-serif text-[13px]"
                    style={{ color: "#c9c3b6" }}
                  >
                    <span
                      className="h-[9px] w-[9px] shrink-0 rounded-full"
                      style={{ background: item.color }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
GapMapBars.displayName = "GapMapBars";

export async function gapMapToPng(
  el: HTMLDivElement,
): Promise<{ src: string; width: number; height: number }> {
  const html2canvas = (await import("html2canvas")).default;
  await document.fonts.ready;
  const canvas = await html2canvas(el, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });
  return {
    src: canvas.toDataURL("image/png"),
    width: canvas.width,
    height: canvas.height,
  };
}
