import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

/**
 * The Gap Map: seven vertical exposure bars in a row, icon and title
 * beneath each, over a compass-and-map background photo with a dark
 * overlay. Same thermometer-bar visual language as the seventh design,
 * per Craig that part isn't changing again: the pill/stadium bar ends
 * were tried and rejected as a generic AI-dashboard tell, a phone battery
 * indicator rather than an instrument gauge, and that verdict stands.
 *
 * Eighth design of this component, and it's a spacing fix, not another
 * pass at the visual language. Two concrete bugs, both about layout math,
 * not aesthetics:
 *
 *   - Each column was a fixed 13% width with the row set to
 *     justify-between. That's fine at all seven columns, but Business
 *     Continuity is conditionally hidden when nothing in it was assessed
 *     (a rule that isn't changing), which drops the row to six columns.
 *     Fixed-width children under justify-between don't grow to fill the
 *     freed-up space, that space becomes extra gap between columns
 *     instead, so the six-column state reads sparser and less deliberate
 *     than the seven-column one it was tuned against. Columns are now
 *     flex-1 (equal share of the full row) so the layout self-adjusts
 *     cleanly at either count, no leftover dead space either way.
 *   - The card was capped at max-w-[520px], which at 13% put each column
 *     at roughly 67px. Fine for "Vital Records," not for "Emergency &
 *     Successor Orientation," which wrapped four-plus lines and read as
 *     cramped. The card is wider now (max-w-[760px]) so a normal-length
 *     title fits in two lines without help, and the one outlier
 *     ("Emergency & Successor Orientation," at 32 characters nearly half
 *     again the length of the next-longest title) gets a shortened
 *     display form local to this component, dropping "Orientation." Nothing
 *     else needed shortening. This doesn't touch the title stored in
 *     blueprintPillars.ts, that's still the full name everywhere else
 *     (the pillar list on this same page, the PDF deliverable); it's a
 *     display-only accommodation for a column this narrow.
 *
 * Also trimmed the bar's max height slightly (150px to 130px). Mostly
 * matters on a fresh, nothing-assessed-yet session: a fully-unassessed
 * bar is just a centered dash in an otherwise empty tube, and at 150px
 * tall times six or seven columns that's a lot of empty card before any
 * real content. Still tall enough to read clearly once a pillar's
 * actually been assessed and has a fill.
 *
 * New this version: an edition line under the "Gap Map" heading,
 * "Personal Edition" or "Business Edition" depending on which edition
 * the prospect is being blueprinted toward (BlueprintSessionPage passes
 * session.edition through). Small, uppercase, letter-spaced, same muted
 * treatment as other small-caps labels elsewhere in the app rather than
 * competing with the heading itself.
 *
 * Same live data, same nodeColor()/riskPct math as every version before
 * it. Business Continuity still drops out entirely when nothing in it
 * was assessed, that rule doesn't change with the layout.
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
   * a small line under the "Gap Map" heading. */
  edition: "personal" | "business";
}

const PILLAR_ORDER = [
  "digital",
  "health",
  "financial",
  "household",
  "legal",
  "legacy",
  "business",
];

// Display-only shortening for this narrow-column layout. Everywhere else
// in the app (the pillar accordion on this same page, the PDF
// deliverable) still uses the full title from blueprintPillars.ts; this
// map is not a replacement for that data, just a rendering accommodation
// for the one title that's meaningfully longer than the other six.
const SHORT_TITLE: Partial<Record<string, string>> = {
  health: "Emergency & Successor",
};

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

function Column({ s }: { s: PillarScore }) {
  const color = nodeColor(s);
  const handledPct =
    s.assessed === 0 ? 0 : Math.max(0, Math.min(100, 100 - s.riskPct));
  const icon = PILLAR_ICON_SRC[s.pillarId];
  const gradient = FILL_GRADIENT[color] ?? [color, color];
  const title = SHORT_TITLE[s.pillarId] ?? s.title;

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
          roughly the same icon-to-bar ratio the wider bars had. */}
      <div
        className="mx-auto mt-[10px] aspect-square w-[60%] shrink-0 overflow-hidden rounded-full border-[2px] bg-[#050505]"
        style={{ borderColor: color }}
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
      <div
        className="mt-[7px] text-center font-serif leading-[1.15] text-[10.5px]"
        style={{ color: "#f2ede2" }}
      >
        {title}
      </div>
    </div>
  );
}

export const GapMapBars = forwardRef<HTMLDivElement, GapMapBarsProps>(
  ({ scores, edition }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // Business Continuity drops out entirely when nothing in it was
    // assessed, rather than showing as a seventh empty column. Specific
    // to this one pillar, the other six always apply. Columns are flex-1
    // below, so whichever count renders (six or seven) fills the row
    // evenly, no fixed-width leftover gap either way.
    const ordered = PILLAR_ORDER.map((id) =>
      scores.find((s) => s.pillarId === id),
    ).filter((s): s is PillarScore => {
      if (!s) return false;
      if (s.pillarId === "business" && s.assessed === 0) return false;
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
              <img src="/favicon-180.png" alt="" className="h-[40px] w-[40px] shrink-0" />
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
              {ordered.map((s) => (
                <Column key={s.pillarId} s={s} />
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
