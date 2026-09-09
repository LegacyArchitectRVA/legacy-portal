import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

/**
 * The Gap Map: one row per Blueprint pillar (icon, title, exposure bar,
 * percentage), laid out as a single portrait page rather than a wide
 * horizontal strip. Matches the page-1 sample on the marketing site
 * (legacyarchitectrva.com/services) exactly, same row order, same logo
 * and legend treatment, so a client sees the same design language whether
 * they're looking at the site or their own results.
 *
 * Previously a 7-column grid of bars-over-circles at a fixed 1600:470
 * ratio. That worked as a dashboard graphic but didn't read as "a page"
 * the way every other piece of the deliverable does, and it was too wide
 * to sit naturally as page 1 of a portrait PDF. This is a straight
 * redesign, not a patch: same live data, same nodeColor()/riskPct math,
 * new layout.
 *
 * Renders as plain DOM (no canvas), so capturing it for the PDF
 * deliverable goes through html2canvas (see gapMapToPng below).
 */

interface GapMapBarsProps {
  scores: PillarScore[];
  /** Overall readiness 0-100 (already computed from the scores). Accepted
   * for API parity with the retired component; not currently rendered here,
   * there's no readiness dial in the row layout. */
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
  { color: "#3da977", label: "Handled — under 30% risk" },
  { color: "#d9a441", label: "Watch — 30–59% risk" },
  { color: "#b3413a", label: "Exposed — 60%+ risk" },
  { color: "#6b675e", label: "Not assessed yet" },
];

export const GapMapBars = forwardRef<HTMLDivElement, GapMapBarsProps>(
  ({ scores }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const ordered = PILLAR_ORDER.map((id) =>
      scores.find((s) => s.pillarId === id),
    ).filter(Boolean) as PillarScore[];

    return (
      <div ref={containerRef} className="w-full max-w-[900px] mx-auto">
        <div
          className="relative w-full rounded-[14px] border px-[6%] pb-[5%] pt-[5.5%]"
          style={{ background: "#090806", borderColor: "#6d5b2b" }}
        >
          {/* header: logo + title */}
          <div className="flex items-center gap-4">
            <img
              src="https://legacyarchitectrva.com/assets/favicon-180.png"
              alt=""
              className="h-[46px] w-[46px] shrink-0"
            />
            <div
              className="font-serif text-[clamp(20px,2.6vw,28px)]"
              style={{ color: "#d4b661" }}
            >
              Gap Map
            </div>
          </div>
          <div
            className="mt-[3%] border-t"
            style={{ borderColor: "rgba(109,91,43,.5)" }}
          />

          {/* seven rows: icon, title, bar, percentage */}
          <div className="mt-[3%] flex flex-col gap-[2.6%]">
            {ordered.map((s) => {
              const color = nodeColor(s);
              const handledPct =
                s.assessed === 0
                  ? 0
                  : Math.max(0, Math.min(100, 100 - s.riskPct));
              const icon = PILLAR_ICON_SRC[s.pillarId];

              return (
                <div key={s.pillarId} className="flex items-center gap-4">
                  <div
                    className="h-[58px] w-[58px] shrink-0 overflow-hidden rounded-full border-[2.5px] bg-[#050505]"
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

                  <div className="min-w-0 flex-1">
                    <div
                      className="mb-[6px] truncate font-serif text-[clamp(12px,1.5vw,17px)]"
                      style={{ color: "#f2ede2" }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="relative h-[14px] w-full overflow-hidden rounded-full border"
                      style={{
                        background: "rgba(0,0,0,.5)",
                        borderColor: color,
                        borderOpacity: 0.55,
                      }}
                    >
                      {s.assessed !== 0 && (
                        <div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${handledPct}%`,
                            background: color,
                            opacity: 0.9,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className="w-[52px] shrink-0 text-right font-sans text-[clamp(12px,1.4vw,16px)] font-bold"
                    style={{ color }}
                  >
                    {s.assessed === 0 ? "—" : `${handledPct}%`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* legend / information key */}
          <div
            className="mt-[4%] border-t pt-[4%]"
            style={{ borderColor: "rgba(109,91,43,.5)" }}
          >
            <div className="flex flex-col gap-[10px]">
              {LEGEND.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-[10px] font-serif text-[clamp(10px,1.2vw,15px)]"
                  style={{ color: "#c9c3b6" }}
                >
                  <span
                    className="h-[10px] w-[10px] shrink-0 rounded-full"
                    style={{ background: item.color }}
                  />
                  {item.label}
                </div>
              ))}
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
  // Web fonts must be ready before rasterizing, or Crimson Pro can fall
  // back to the system serif mid-capture.
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
