import { forwardRef } from "react";
import type { PillarScore } from "../lib/blueprintDeliverable";

/**
 * The Gap Map: a radial network view of the seven Readiness Check pillars.
 *
 * Seven nodes sit on a ring around a central readiness dial. Each node is
 * colored by its live exposure level and updates as statuses are tapped
 * during the sit-down, which makes the map itself a talking point in the
 * session. The whole thing is one self-contained SVG (inline styles, no
 * external CSS classes, font fallbacks declared inline) specifically so it
 * can be serialized and rasterized into the PDF deliverable without losing
 * its appearance.
 */

const STATUS_COLORS = {
  strong: "#3da977",
  watch: "#d9a441",
  exposed: "#b3413a",
  unassessed: "#6b675e",
} as const;

function nodeColor(s: PillarScore): string {
  if (s.assessed === 0) return STATUS_COLORS.unassessed;
  if (s.riskPct >= 60) return STATUS_COLORS.exposed;
  if (s.riskPct >= 30) return STATUS_COLORS.watch;
  return STATUS_COLORS.strong;
}

function statusWord(s: PillarScore): string {
  if (s.assessed === 0) return "Not assessed";
  if (s.riskPct >= 60) return "Exposed";
  if (s.riskPct >= 30) return "Watch";
  return "Strong";
}

/** Minimal geometric icon paths (24x24 grid), matching the portal icon set. */
const PILLAR_ICON_PATHS: Record<string, string> = {
  digital: `<path d="M18 10h-1.3A7 7 0 1 0 8 17h10a4 4 0 0 0 0-8z"/>`,
  financial: `<line x1="4" y1="20" x2="20" y2="20"/><line x1="6" y1="12" x2="6" y2="20"/><line x1="12" y1="12" x2="12" y2="20"/><line x1="18" y1="12" x2="18" y2="20"/><polyline points="4,12 12,5 20,12"/>`,
  household: `<path d="M3 11 L12 4 L21 11"/><path d="M5 10 V20 H19 V10"/><path d="M10 20 V14 H14 V20"/>`,
  health: `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>`,
  legal: `<line x1="12" y1="3" x2="12" y2="21"/><path d="M5 8l7-5 7 5"/><path d="M5 8l-3 7a4 4 0 0 0 6 0z"/><path d="M19 8l3 7a4 4 0 0 1-6 0z"/>`,
  business: `<rect x="4" y="3" width="16" height="18"/><rect x="10" y="15" width="4" height="6"/><line x1="8" y1="7.5" x2="16" y2="7.5"/><line x1="8" y1="11.5" x2="16" y2="11.5"/>`,
  legacy: `<path d="M12 3.5l2 5 5.4.2-4.3 3.3 1.6 5.2L12 14l-4.7 3.2 1.6-5.2L4.6 8.7 10 8.5z"/>`,
};

/** Two-line label splitting for the longer pillar titles. */
function labelLines(title: string): string[] {
  if (title.length <= 14) return [title];
  const at = title.indexOf(" & ");
  if (at > 0) return [title.slice(0, at + 2), title.slice(at + 3)];
  return [title];
}

interface GapMapVisualProps {
  scores: PillarScore[];
  /** Overall readiness 0-100 (already computed from the scores). */
  readiness: number;
}

export const GapMapVisual = forwardRef<SVGSVGElement, GapMapVisualProps>(
  function GapMapVisual({ scores, readiness }, ref) {
    const CX = 230;
    const CY = 225;
    const RING = 152;
    const NODE_R = 24;

    const dialCirc = 2 * Math.PI * 44;
    const dialFill = (readiness / 100) * dialCirc;

    return (
      <svg
        ref={ref}
        viewBox="0 0 460 460"
        width="100%"
        style={{ display: "block", maxWidth: 520, margin: "0 auto" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Canvas */}
        <rect x="0" y="0" width="460" height="460" fill="#070707" rx="14" />

        {/* Radar rings and spokes */}
        {[64, 108, RING].map((r) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="#d9cca0"
            strokeOpacity={0.09}
            strokeWidth={1}
            strokeDasharray="2 5"
          />
        ))}
        {scores.map((_, i) => {
          const ang = (-90 + (360 / 7) * i) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={CX + 58 * Math.cos(ang)}
              y1={CY + 58 * Math.sin(ang)}
              x2={CX + (RING - NODE_R - 3) * Math.cos(ang)}
              y2={CY + (RING - NODE_R - 3) * Math.sin(ang)}
              stroke="#d9cca0"
              strokeOpacity={0.22}
              strokeWidth={1}
            />
          );
        })}

        {/* Center readiness dial */}
        <circle cx={CX} cy={CY} r={52} fill="#0b0b0b" stroke="#d9cca0" strokeOpacity={0.35} strokeWidth={1} />
        <circle
          cx={CX}
          cy={CY}
          r={44}
          fill="none"
          stroke="#1e1c16"
          strokeWidth={5}
        />
        <circle
          cx={CX}
          cy={CY}
          r={44}
          fill="none"
          stroke="#e8c46a"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={`${dialFill} ${dialCirc - dialFill}`}
          transform={`rotate(-90 ${CX} ${CY})`}
        />
        <text
          x={CX}
          y={CY + 2}
          textAnchor="middle"
          fontSize={26}
          fontFamily="Cinzel, Georgia, serif"
          fill="#e8c46a"
          fontWeight={700}
        >
          {readiness}%
        </text>
        <text
          x={CX}
          y={CY + 22}
          textAnchor="middle"
          fontSize={8}
          letterSpacing={2.5}
          fontFamily="Georgia, serif"
          fill="#d9cca0"
          fillOpacity={0.7}
        >
          READINESS
        </text>

        {/* Pillar nodes */}
        {scores.map((s, i) => {
          const ang = (-90 + (360 / 7) * i) * (Math.PI / 180);
          const x = CX + RING * Math.cos(ang);
          const y = CY + RING * Math.sin(ang);
          const color = nodeColor(s);
          const lines = labelLines(s.title);
          // Chip sits on the hub-facing side of the node, along the spoke,
          // so it can never collide with labels, which always face outward.
          const chipX = x - (NODE_R - 1) * Math.cos(ang);
          const chipY = y - (NODE_R - 1) * Math.sin(ang);
          // Push labels outward from the ring so they never collide with it
          const labelY = y > CY + 40 ? y + NODE_R + 14 : y < CY - 40 ? y - NODE_R - 20 - (lines.length - 1) * 11 : y - NODE_R - 22 - (lines.length - 1) * 11;
          const pct = s.assessed === 0 ? "" : `${100 - s.riskPct}%`;

          return (
            <g key={s.pillarId}>
              {/* Glow */}
              <circle cx={x} cy={y} r={NODE_R + 8} fill={color} fillOpacity={0.13} />
              {/* Node */}
              <circle cx={x} cy={y} r={NODE_R} fill="#0d0d0d" stroke={color} strokeWidth={1.8} />
              {/* Icon */}
              <svg
                x={x - 13}
                y={y - 13}
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: PILLAR_ICON_PATHS[s.pillarId] || "" }}
              />
              {/* Number chip, hub side */}
              <circle cx={chipX} cy={chipY} r={8} fill="#0d0d0d" stroke={color} strokeWidth={1.2} />
              <text x={chipX} y={chipY + 3} textAnchor="middle" fontSize={8.5} fontFamily="Georgia, serif" fill={color} fontWeight={700}>
                {s.number.replace(/^0/, "")}
              </text>
              {/* Label */}
              {lines.map((ln, li) => (
                <text
                  key={li}
                  x={x}
                  y={labelY + li * 11}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontFamily="Georgia, serif"
                  fill="#e8e6e1"
                  fillOpacity={0.9}
                  letterSpacing={0.4}
                >
                  {ln.toUpperCase()}
                </text>
              ))}
              {/* Status + score */}
              <text
                x={x}
                y={labelY + lines.length * 11 + 1}
                textAnchor="middle"
                fontSize={8}
                fontFamily="Georgia, serif"
                fill={color}
                letterSpacing={0.6}
              >
                {statusWord(s).toUpperCase()}{pct ? `  ${pct}` : ""}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
);

/**
 * Rasterizes the rendered Gap Map SVG into a PNG data URI at 2x resolution,
 * ready to drop into the PDF deliverable as an image block.
 */
export function gapMapToPng(svgEl: SVGSVGElement): Promise<{ src: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const xml = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = 460 * scale;
      canvas.height = 460 * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve({ src: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not rasterize the Gap Map"));
    };
    img.src = url;
  });
}
