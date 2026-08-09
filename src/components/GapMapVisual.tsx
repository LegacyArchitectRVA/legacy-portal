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

/** Pillar icon images, the same glowing gold icon set used on the main site's
 * homepage pillar walk (legacyarchitectrva.com). The Gap Map's seven pillar
 * IDs come from the Readiness Check taxonomy, which doesn't name-for-name
 * match the main site's Life Manual chapter names, so each is mapped to the
 * closest conceptual match: health -> Vital Records (medical directives live
 * there on the main site) and legal -> Emergency & Successor Access (will/POA/
 * succession overlap with that pillar's "who steps in" framing). */
const PILLAR_ICON_SRC: Record<string, string> = {
  digital: "/g_digital-e.webp",
  financial: "/g_financial-e.webp",
  household: "/g_household-e.webp",
  health: "/g_vital-e.webp",
  legal: "/g_emergency-e.webp",
  business: "/g_business-e.webp",
  legacy: "/g_legacy-e.webp",
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
        style={{ display: "block", maxWidth: 680, margin: "0 auto" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Transparent canvas -- no background rect, the Gap Map sits directly
            on whatever it's placed against, in-app or in the PDF. */}

        {/* Radar rings and spokes */}
        {[64, 108, RING].map((r) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="#d4b661"
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
              stroke="#d4b661"
              strokeOpacity={0.22}
              strokeWidth={1}
            />
          );
        })}

        {/* Center readiness dial */}
        <circle cx={CX} cy={CY} r={52} fill="#0b0b0b" stroke="#d4b661" strokeOpacity={0.35} strokeWidth={1} />
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
          stroke="#e8c869"
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
          fill="#e8c869"
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
          fill="#d4b661"
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
              {/* Icon, same glowing icon set as the main site's pillar walk */}
              <image
                x={x - 15}
                y={y - 15}
                width={30}
                height={30}
                href={PILLAR_ICON_SRC[s.pillarId] || ""}
                preserveAspectRatio="xMidYMid meet"
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
                  fill="#f2ede2"
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
