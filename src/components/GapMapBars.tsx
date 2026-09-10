import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

/**
 * The Gap Map: seven vertical exposure bars in a row, icon and title
 * beneath each, over a compass-and-map background photo with a dark
 * overlay. Restores the original pre-redesign visual (a thermometer-
 * style fill bar per pillar) per Craig, corrected against his reference
 * sample rather than approximated.
 *
 * Seventh design of this component. Sixth added the background photo and
 * narrowed the columns; this version changes one more thing on top of
 * that: the bar corners went from a full stadium/pill (rounded-[999px])
 * to a modest 6px radius. The pill shape is what Craig's own reference
 * sample used, measured directly off it, but per Craig it reads as a
 * generic AI-dashboard tell at this size, a phone battery indicator
 * rather than an instrument gauge. Worth noting this is a deliberate
 * departure from that reference, not a miss in reading it. Icon size and
 * fill gradients (fifth version) are unchanged here, both were confirmed
 * against pixel samples from the reference and matched. Two things the
 * sixth version fixed, still true here:
 *   - The bar "tubes" read too wide; each one is now 68% of its column
 *     instead of the full width, centered. The icon is sized off the
 *     column too (60%), tuned to land at roughly the same icon-to-bar
 *     ratio as before now that the bar itself is narrower.
 *   - The card had a flat solid background (#090806), which read as
 *     generic next to the reference's actual compass-and-map photo
 *     behind the bars. Card background is now that photo (Craig's
 *     asset, copied into the portal's own public/ so it's same-origin,
 *     same reason the pillar icons and favicon live there rather than
 *     being pulled from the marketing site: this portal's CSP blocks
 *     cross-origin image embeds), with a dark overlay on top so the
 *     text and bars stay legible. The overlay is deliberately heavy,
 *     the photo should read as atmosphere behind the data, not compete
 *     with it.
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

  return (
    <div className="flex flex-col items-center" style={{ width: "13%" }}>
      <div
        className="relative mx-auto overflow-hidden rounded-[6px] border-[1.5px]"
        style={{
          width: "68%",
          height: "150px",
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
      {/* Sized off the column, not the (now narrower) bar, tuned to land
          at roughly the same icon-to-bar ratio the wider bars had. */}
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
        {s.title}
      </div>
    </div>
  );
}

export const GapMapBars = forwardRef<HTMLDivElement, GapMapBarsProps>(
  ({ scores }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // Business Continuity drops out entirely when nothing in it was
    // assessed, rather than showing as a seventh empty column. Specific
    // to this one pillar, the other six always apply.
    const ordered = PILLAR_ORDER.map((id) =>
      scores.find((s) => s.pillarId === id),
    ).filter((s): s is PillarScore => {
      if (!s) return false;
      if (s.pillarId === "business" && s.assessed === 0) return false;
      return true;
    });

    return (
      <div ref={containerRef} className="w-full max-w-[520px] mx-auto">
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
              <div className="font-serif text-[22px]" style={{ color: "#d4b661" }}>
                Gap Map
              </div>
            </div>
            <div className="mt-[3%] border-t" style={{ borderColor: "rgba(109,91,43,.5)" }} />

            <div className="mt-[6%] flex items-start justify-between gap-[1%]">
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
