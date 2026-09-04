import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

/**
 * The Gap Map: seven status bars, one per Blueprint pillar, using the exact
 * same bar/fill/glow markup as the Dashboard's chapter progress bars so the
 * two feel like one visual language across the portal instead of two.
 *
 * Replaces the earlier lit 3D gem scene. That version looked sharp on a
 * desktop monitor but read as illegible noise at phone scale, which is how
 * Craig and every client actually look at it, so it's retired in favor of
 * this. Colored by live exposure level via nodeColor(), same as before.
 *
 * Renders as plain DOM (no canvas), so capturing it for the PDF deliverable
 * goes through html2canvas (see gapMapToPng below) instead of a direct
 * WebGL buffer read.
 */

interface GapMapBarsProps {
  scores: PillarScore[];
  /** Overall readiness 0-100 (already computed from the scores). Accepted
   * for API parity with the retired component; not currently rendered here,
   * there's no readiness dial in the bar layout. */
  readiness: number;
}

export const GapMapBars = forwardRef<HTMLDivElement, GapMapBarsProps>(
  ({ scores }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    return (
      <div
        ref={containerRef}
        className="relative rounded-lg border border-gold-border overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/videos/hero-compass-poster.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "70% 30%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(8,7,6,0.88) 0%, rgba(10,9,7,0.82) 45%, rgba(10,9,7,0.90) 100%)",
          }}
        />
        <div className="relative p-4 md:p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src="/logo.png"
              alt="Legacy Architect RVA emblem"
              width={44}
              height={44}
              className="w-11 h-11 rounded object-contain shrink-0"
            />
            <h2 className="font-heading text-lg text-gold-primary">
              Gap Map
            </h2>
          </div>

          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {scores.map(s => {
              const color = nodeColor(s);
              const handledPct = s.assessed === 0 ? 0 : 100 - s.riskPct;
              const iconSrc = PILLAR_ICON_SRC[s.pillarId];

              return (
                <div
                  key={s.pillarId}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="relative w-8 md:w-9 h-28 md:h-32 rounded-md border overflow-hidden"
                    style={{
                      borderColor: `${color}40`,
                      background: "rgba(0,0,0,0.4)",
                    }}
                    title={`${s.title}: ${
                      s.assessed === 0 ? "not assessed" : `${handledPct}%`
                    }`}
                  >
                    {handledPct > 0 && (
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-b-sm"
                        style={{
                          height: `${handledPct}%`,
                          background: `linear-gradient(to top, ${color}, ${color}88)`,
                          boxShadow: `0 0 8px ${color}50, 0 -2px 12px ${color}30, inset 0 0 10px ${color}20`,
                        }}
                      />
                    )}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        // Plain rgba gradient, not a Tailwind opacity-slash
                        // utility: Tailwind v4 compiles those to
                        // color-mix(in oklab, ...), which html2canvas can't
                        // parse and throws during gapMapToPng's rasterize.
                        background:
                          "linear-gradient(to right, rgba(255,255,255,0.03), transparent)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-[9px] md:text-[10px] font-heading font-bold drop-shadow-lg"
                        style={{
                          color: handledPct > 40 ? "#000" : "#f2ede2",
                        }}
                      >
                        {s.assessed === 0 ? "\u2014" : `${handledPct}%`}
                      </span>
                    </div>
                  </div>

                  <div
                    className="w-[32.5px] h-[32.5px] rounded-full border-2 overflow-hidden shrink-0 bg-black"
                    style={{
                      borderColor: color,
                      boxShadow: `0 0 6px ${color}60`,
                    }}
                  >
                    {iconSrc && (
                      <img
                        src={iconSrc}
                        alt={s.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <span className="text-[9px] md:text-[10px] text-[#c9c3b6] font-heading text-center leading-tight w-[58px] md:w-[62px]">
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

GapMapBars.displayName = "GapMapBars";

/**
 * Captures the rendered Gap Map card as a PNG data URI, ready to drop into
 * the PDF deliverable as an image block. This is plain DOM now instead of a
 * WebGL canvas, so the capture goes through html2canvas rather than a
 * direct canvas buffer read (see the old gapMapToPng in the retired
 * GapMapVisual.tsx for that version). Loaded dynamically, same as the
 * document converter's own html2canvas usage, to keep it out of the main
 * bundle for anyone who never opens a Blueprint Session.
 */
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
