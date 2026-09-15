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
 * Ninth design of this component, still a spacing/sizing pass, not
 * another look at the visual language:
 *
 *   - The badge behind each pillar icon (a photographic crystal/gem
 *     texture, not flat vector art) had a colored ring drawn around it
 *     by CSS, border-[2px] with borderColor set to the pillar's status
 *     color. Craig wants that ring gone. The circular crop itself
 *     (rounded-full, overflow-hidden, the dark backing fill) stays,
 *     since the source images are square photos with soft edges, not
 *     already-circular medallions, removing the crop too would turn
 *     each icon into a square tile rather than a clean circle with no
 *     outline. Just the border and its color are dropped.
 *   - Icon wrapper sized up from 60% of the column width to 70%.
 *   - Pillar title line-height loosened from 1.15 to 1.4. Multi-word
 *     titles that wrap ("Emergency & Successor," "Financial & Assets")
 *     were stacking their two lines close enough to read as one dense
 *     block instead of two legible lines.
 *   - The shield emblem next to the "Gap Map" heading (favicon-180.png)
 *     sized up from 40px to 50px, matching a same-image size bump made
 *     to the nav logo elsewhere in the app. Both source files are plain
 *     square PNGs with the artwork already reaching the canvas edges;
 *     neither was ever stretched or cropped oddly, they were just
 *     rendered small.
 *
 * Earlier fixes (columns flex-1 instead of fixed-width so six vs seven
 * columns both fill the row cleanly; card widened to max-w-[760px]; bar
 * height 130px; shortened display title for the one long pillar name)
 * are unchanged from the eighth pass, not revisited here.
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
          roughly the same icon-to-bar ratio the wider bars had. No
          border here anymore, just the circular crop and dark backing;
          the ring that used to trace this circle in the pillar's status
          color is gone. */}
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
      <div
        className="mt-[7px] text-center font-serif leading-[1.4] text-[10.5px]"
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
