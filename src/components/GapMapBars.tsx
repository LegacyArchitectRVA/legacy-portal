import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, statusWord, STATUS_COLORS, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

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

    const order = ["digital","health","financial","household","legal","legacy","business"];
    const ordered = order.map(id => scores.find(s => s.pillarId === id)).filter(Boolean) as PillarScore[];

    return (
      <div ref={containerRef} className="w-full max-w-[1600px] mx-auto overflow-x-auto">
        <div
          className="relative mx-auto w-full min-w-[760px] max-w-[1600px] overflow-hidden rounded-[10px] border"
          style={{ aspectRatio: "1600 / 470", background: "#090806", borderColor: "#6d5b2b" }}
        >
          <div className="absolute left-[3.75%] top-[10.2%] text-[clamp(14px,1.7vw,27px)] font-serif text-[#d4b661]">
            Gap Map
          </div>

          <div className="absolute left-[8.73%] right-[8.73%] top-[20.2%] bottom-[8%] grid grid-cols-7 gap-[1.25%]">
            {ordered.map((s) => {
              const color = nodeColor(s);
              const handledPct = s.assessed === 0 ? 0 : Math.max(0, Math.min(100, 100 - s.riskPct));
              const icon = PILLAR_ICON_SRC[s.pillarId];

              return (
                <div key={s.pillarId} className="min-w-0 flex h-full flex-col items-center">
                  <div
                    className="mb-[4%] flex h-[8%] min-h-[18px] items-center justify-center text-center font-sans font-bold"
                    style={{ color, fontSize: "clamp(7px,0.75vw,12px)" }}
                  >
                    {statusWord(s)}
                  </div>

                  <div
                    className="relative w-[32%] min-w-[28px] flex-1 max-h-[170px] rounded-[8px] border-2 overflow-hidden"
                    style={{ borderColor: color, background: "rgba(0,0,0,.5)" }}
                  >
                    <div
                      className="absolute inset-x-0 bottom-0"
                      style={{ height: `${handledPct}%`, background: color, opacity: .9 }}
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-sans font-bold"
                      style={{ color: handledPct >= 50 ? "#111" : "#f2ede2", fontSize: "clamp(7px,0.75vw,12px)" }}
                    >
                      {s.assessed === 0 ? "—" : `${handledPct}%`}
                    </span>
                  </div>

                  <div
                    className="mt-[4%] aspect-square w-[52%] max-w-[84px] overflow-hidden rounded-full border-[3px] bg-[#050505]"
                    style={{ borderColor: color }}
                  >
                    {icon && <img src={icon} alt={s.title} className="h-full w-full object-cover" loading="lazy" />}
                  </div>

                  <div
                    className="mt-[2%] min-h-[30px] w-full text-center font-serif leading-[1.08] text-[#c9c3b6]"
                    style={{ fontSize: "clamp(7px,0.7vw,11px)" }}
                  >
                    {s.title}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-[2.5%] left-0 right-0 flex justify-center gap-[3%] text-center font-sans" style={{ fontSize: "clamp(6px,0.65vw,10px)", color: "#c9c3b6" }}>
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{background:STATUS_COLORS.strong}} />Green: Strong</span>
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{background:STATUS_COLORS.watch}} />Yellow: Watch</span>
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{background:STATUS_COLORS.exposed}} />Red: Exposed</span>
          </div>
        </div>
      </div>
    );
  }
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
