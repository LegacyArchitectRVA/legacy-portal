import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";
import { nodeColor, PILLAR_ICON_SRC } from "../lib/gapMapStatus";

/**
 * The Gap Map: a 2-column grid of pillar cells (icon, title, exposure bar,
 * percentage), Business Continuity spanning the final row alone rather
 * than sitting next to an empty cell. Matches the page-1 sample on the
 * marketing site (legacyarchitectrva.com/services) exactly.
 *
 * Third design of this component. First was a 7-column horizontal strip
 * (1600:470, too wide for a 400px sidebar or a portrait PDF page). Second
 * was a single-column list of 7 stacked rows (fit the width fine, but
 * read as unnecessarily tall/vertical). This is the middle ground: still
 * narrow enough for the sidebar, but two pillars per row instead of one,
 * roughly halving the height and reading as a grid instead of a list.
 * Same live data, same nodeColor()/riskPct math as both predecessors.
 *
 * Renders as plain DOM (no canvas), so capturing it for the PDF
 * deliverable goes through html2canvas (see gapMapToPng below). Font
 * sizes here are fixed px on purpose, not clamp()/vw: html2canvas doesn't
 * reliably compute those and it previously caused title text to render
 * oversized and overlap the bar beneath it. Learned that the hard way,
 * not repeating it.
 */

interface GapMapBarsProps {
  scores: PillarScore[];
  /** Overall readiness 0-100 (already computed from the scores). Accepted
   * for API parity with the retired components; not currently rendered
   * here, there's no readiness dial in the grid layout. */
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

function Cell({ s, full }: { s: PillarScore; full?: boolean }) {
  const color = nodeColor(s);
  const handledPct =
    s.assessed === 0 ? 0 : Math.max(0, Math.min(100, 100 - s.riskPct));
  const icon = PILLAR_ICON_SRC[s.pillarId];

  return (
    <div className={"flex h-full flex-col justify-between" + (full ? " col-span-2" : "")}>
      <div className="flex items-center gap-[10px]">
        <div
          className="h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full border-[2px] bg-[#050505]"
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
          className="font-serif leading-[1.15] text-[13px]"
          style={{ color: "#f2ede2" }}
        >
          {s.title}
        </div>
      </div>
      <div className="mt-[7px] flex items-center gap-[8px]">
        <div
          className="relative h-[11px] w-full overflow-hidden rounded-full border"
          style={{ background: "rgba(0,0,0,.5)", borderColor: color }}
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
        <div
          className="w-[36px] shrink-0 text-right font-sans text-[13px] font-bold"
          style={{ color }}
        >
          {s.assessed === 0 ? "—" : `${handledPct}%`}
        </div>
      </div>
    </div>
  );
}

export const GapMapBars = forwardRef<HTMLDivElement, GapMapBarsProps>(
  ({ scores }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // Business Continuity drops out entirely when nothing in it was
    // assessed, rather than showing as a seventh "not assessed" cell.
    // That's specific to this one pillar, not a general rule: the other
    // six always apply, so an unassessed one there still means "Craig
    // didn't get to it," which is worth showing. Business Continuity is
    // the one pillar that's genuinely conditional, not every client has
    // a business, so silence there means "doesn't apply," not "skipped."
    const ordered = PILLAR_ORDER.map((id) =>
      scores.find((s) => s.pillarId === id),
    ).filter((s): s is PillarScore => {
      if (!s) return false;
      if (s.pillarId === "business" && s.assessed === 0) return false;
      return true;
    });

    // Only peel off a solo full-width cell when the count is actually
    // odd. With Business Continuity dropped, six pillars pair off clean
    // and nothing needs to span.
    const isOdd = ordered.length % 2 === 1;
    const pairs = isOdd ? ordered.slice(0, -1) : ordered;
    const last = isOdd ? ordered[ordered.length - 1] : null;

    return (
      <div ref={containerRef} className="w-full max-w-[520px] mx-auto">
        <div
          className="relative w-full rounded-[14px] border px-[6%] pb-[5%] pt-[5.5%]"
          style={{ background: "#090806", borderColor: "#6d5b2b" }}
        >
          <div className="flex items-center gap-4">
            <img src="/favicon-180.png" alt="" className="h-[40px] w-[40px] shrink-0" />
            <div className="font-serif text-[22px]" style={{ color: "#d4b661" }}>
              Gap Map
            </div>
          </div>
          <div className="mt-[3%] border-t" style={{ borderColor: "rgba(109,91,43,.5)" }} />

          <div className="mt-[4%] grid grid-cols-2 gap-x-[5%] gap-y-[4.5%]">
            {pairs.map((s) => (
              <Cell key={s.pillarId} s={s} />
            ))}
            {last && <Cell s={last} full />}
          </div>

          <div className="mt-[9%] border-t pt-[4%]" style={{ borderColor: "rgba(109,91,43,.5)" }}>
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
