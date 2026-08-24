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

/** Shared with BlueprintSessionPage's checkpoint status chips, so the live
 * handled/partial/exposed labels use the exact same palette as the map
 * itself instead of an independently-chosen set of colors. */
export const STATUS_COLORS = {
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
 * homepage pillar walk (legacyarchitectrva.com), embedded as base64 data URIs
 * rather than referenced by file path. This SVG gets serialized to a blob URL
 * and rasterized to canvas for the PDF deliverable (see gapMapToPng below),
 * and external image references don't reliably resolve/load in that pipeline,
 * so the whole thing has to stay self-contained, same as the rest of this
 * component always was. Downsized to 120x120 before encoding since they only
 * ever render at 30px here; the full-size originals would have bloated the
 * bundle by ~20x for no visual benefit.
 * The Gap Map's seven pillar IDs come from the Readiness Check taxonomy,
 * which doesn't name-for-name match the main site's Life Manual chapter
 * names, so each is mapped to the closest conceptual match: health -> Vital
 * Records (medical directives live there on the main site) and legal ->
 * Emergency & Successor Access (will/POA/succession overlap with that
 * pillar's "who steps in" framing). */
const PILLAR_ICON_SRC: Record<string, string> = {
  digital:
    "data:image/webp;base64,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",
  financial:
    "data:image/webp;base64,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",
  household:
    "data:image/webp;base64,UklGRhgEAABXRUJQVlA4IAwEAADwFwCdASp4AHgAPmEsk0ekIiahJBIJ2NAMCWUA1ehxVhlvtux5gPOu88DUAOlJK+uNC/5Xm5/Jv9B7An6s/8b1ZupV/ZkfZERERMfeaG85LTxigkrNCXolLpLiI34E1YygAq7KwSnYQig00HQlQySrTZ5Usv5hQqcEA+7CjF+NhlgvQyPucnsGX55RrT7/u5qqbq7U+hj+SXzMWvSoPw62i4fXHdIfLIqJCCwOb0k4fY6HIZV3iNch8zZJDUPbvFtN3jrB00brwAD+/SDXSpSbxQEK8bS9XnlQF5SDp+PJJDwgJQZJ32F/99hSUdExQ+F/E/piUbdh5BIk6PwtQ/LTgH9gF2/t3PVVcFCPse1pzKbt9qc4Iu4wcvQvEH+2+3dY+V82aEGx/fj5m/hZjbtB5Q+HV3AGT/J6GqKi3Wl6qKCGlvj5PgdFcMHR2gmmQjvinvV62vbK4iU8/uD51xVNlrc2DwcYv4Dhun+7XkvTmvA1dNUqECweiku3MfKRzoZcT4KO+d7a8nLkIGmOxkTYYjhAToFIhC5YC/n9k8vZe/ib8Eatx+GmOHAbyWJmMTDy05bvdfaE30xA/QaG11rqjP0l55V7DBjae2CcnQwmzs2CQt3iJFGZ/Pttdxm37kOK1tcZzkNvKxQ5r1EWSrSgIUrl2NH+AL8HOk1imfboXvJ+7Mx8+v3ZFlW/Pfi1K+3Ax99k3ssua/YE5W1jx0+eXWscpmLmovk9tvOnwzlC4/qgxWbZApLNBYnVxeTFaIggyASpsPX+l5N2+qw+Doq4i/39eKhp6fabfnwRXISXyHwAzGsaDK5f4XbKv+WQzj/plAptBbO5ZHxlWKHLO/sZ7ZbC8ytA4rEYt4M9ED/BYxluPS5qfTdNImWNm7YdG2oB3HaIr7Fv7ZrlGeOlqtF23xMCVeut9CWknXTZbRGbuTq7d4LNT0/aRzKOy3R/VD1ZuU2R2+63RXM23dxTU1vn2Vjm0FLLeFgJnPWZjRpGl+OduMSEH0HydTGDi4BJiEpPbx89/nxt6pVJJtckoxtlaHZaW9xOD2x7suQGkUUyrP21mJblrXSsLuKzhLFqWr2/eMFCDPGzz3mq92/fATG4uH/AhJKYnCTa6SGGpwoGXCwEQ/CSsPNuf7ZWjYDOfVinAMWynLqagg7wVJFUtwQLVP4yFeKOVQ9dPqDKWbTBHmwn/9F30SP0UkrO6j57GdavFzsb0+snDg6QR0Z5ugmimPIKwUk9P5/YAAiwh/NiHKhutMkY1G9R1VMgmD6fG62i4TQNKbcFryXL/KpyhL4rDWmkmBgBGT/xUZejtYWlPylU54hE1sL1Kw8tkXweTuiHpx+HyszKvZ3V1CGgTo1HpHGJhZ9/Eth8AAAA",
  health:
    "data:image/webp;base64,UklGRuAFAABXRUJQVlA4INQFAADwHgCdASp4AHgAPmEuk0akIqGhJhlaUIAMCWMA1eyKUFys7o/gPWuu6PYMxf5vvp+gzbt+Zvz5/Pg9NXJkf8NkvO5/GcbmX34QodwkLleNNqoJ+sZIg82n+pmV6t5wPwjF1WX6xsRowoUOIcJgzpgy4sSsH8JneoVpQJ7q9tFEkaPkyOE9pD9cK1sVovavEtSOkUr91ajw4I7XFcYCGzbgCmwlcL4D2Kvs1f+c2g//lNE1z0Aq4YEtaiYQbw+dhNoLSXENPPxDy311dh4pjo5SpYfxFTGbUuv4sEjH3//c94miNZggUi4erBtNJM/YkkoyZJHZ1m17HN1xKWAgBlbAAP79NmyqyLce57oVrfWwCeyIYrW4X7eiz9x+oChAiRr2rEZXGRVZ+uj0DUNv+4HK298XOYACFhAfB9SCFCCwO7BA9I6jkz/z3HY+jUFzDzsw4uctO3SdNARAp89CLksepQlbhom9mEpFQDK1eCHFI2bAaN89YVsbTsjdGibabH+r8V7xlXw5B2sH2mSASJVn9obpOikaoFeLZgA/hacPnb6zdrW31xAOQpokVbRlXmU+tWWtTTP4lCb231KFnvg341V7CJIrcTcJ4IqGD8/ip2kK02PdGaBvnfSrddMnFCnEiO17/KFMdoz4l2mbbFPKyoStqFBc9AVr52T9eV87yssONLGeLUzG4sbugJWH6po4hUTcdp4Ixx2kwFJ/M479wy5pxSM5O6Mbp0U7df5sn/mdJiMfbJ9X5Ti42uFNc1h9J+pmD4muer/UwC3RtbIJwwTtTLf97/0FuHSAhEGViNaI7y72gL5eHetX0HlAm5eK52mM4XL51qvRMHFV48VFS076PlegnYeE5uK4JZwVbCKpRzYqgPPCBG+RhEhszUGqaQh7eV2YdT+dRkRktczvritL9xVP+la4/6Eses1wx1zZNkiJKQScBJbfMIMFjXaFclZ7+k9yYfs2OAmD3jM0XltME3dSaIj4O7HWNRViEmnasjIES7JDI5CfmBO9St/A9nsTKHcYR0LO0c/KwV8twRcUdXmJ3R6ErM7sIkpsDgpGvuM53o0Qtw9QcXCqpqsxS7vctMq4GF/kD53qudOw454+0DAmzrRIbKN5u3yhSnoSjHcvMfo5Kk6AIqCFoMuuspn4vKq0NHuPZT+TSJLEMk+EKHALdXc/PIHW1twhZ+37puNz2WO9o4OTe/lE5D09YK4I+0WxDtF2Ae5cicXJwTp+gzs/ch3zA7sjnxpOodztG+dPlg/JXzKa/jWqwilFZaUXgeujWSzaiqaEqhqUraHJMoWu7GYwRQKV6Yks/C9dFbGbwM0AlrQZJQ1bcyaZ7mxC287QSTPLPnQ4yF/GOkJa81PqP5mcaYRgDpk2w1i5D4JKF7KPtGhFL9/XQW7W8R07YwXaQSj0hnR15wyk9K2KabFzt6hRhEyJyN6+knMOcdJ8OJCvhzIsdIL1/tdjXiIHl0khJTD5TbRLvfbOL19iD/XTp6+5DchAWposdMAuNVFEE3SGCyC985gGXHld6J9M+MkCF7hFWBQWsSec0d50ItvtN/jCO3I66XgUHvCMx5bWBIdVs0ocYuIPASIMD1jgXG4LA6fGHVLR5+ca7q/vKRsEiyM1LtkzV58M5LZxVBDP8bhWaczMrVs9NvYRmy9PYCLwtzLFk3QPpAKoiAhZ5Ul63iM1ofUJYxZxaeXDcB6Uel+zswl+zFAvXit6TclV3NWjNH2Sqk7qiTXbxA5Y+AvJoXgxzJHhSx7tHmcJ/TNiS5FeMaKiudBwi/ljUzC0pZZh+wcvvK1/4Nf7/iq+OTAnkaGh9cqv3f4StOXcgY+C9pWnCrFg9qGHqm4zk/JdayLSLX+IasAqxUHh86NSoVFrgdXLbiD9a47Y1BV6IYmNKa095RalpBnpgBai7xqekot90wQ6f8VIsBAnvQcW60dxTdaKEQO/P+ta5MC4FW0cmp/IOzQAAAABzGwAAAAA",
  legal:
    "data:image/webp;base64,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",
  business:
    "data:image/webp;base64,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",
  legacy:
    "data:image/webp;base64,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",
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
        width="460"
        height="460"
        style={{ display: "block", width: "100%", maxWidth: 680, height: "auto", margin: "0 auto" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Transparent canvas -- no background rect, the Gap Map sits directly
            on whatever it's placed against, in-app or in the PDF. */}

        {/* Radar rings and spokes */}
        {[64, 108, RING].map(r => (
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
        <circle
          cx={CX}
          cy={CY}
          r={52}
          fill="#0b0b0b"
          stroke="#d4b661"
          strokeOpacity={0.35}
          strokeWidth={1}
        />
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
          y={CY + 3}
          textAnchor="middle"
          fontSize={30}
          fontFamily="'Crimson Pro', serif"
          fill="#e8c869"
          fontWeight={700}
        >
          {readiness}%
        </text>
        <text
          x={CX}
          y={CY + 24}
          textAnchor="middle"
          fontSize={9.5}
          letterSpacing={2.5}
          fontFamily="'Crimson Pro', serif"
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
          const lineHeight = 12.5;
          // Chip sits on the hub-facing side of the node, along the spoke,
          // so it can never collide with labels, which always face outward.
          const chipX = x - (NODE_R - 1) * Math.cos(ang);
          const chipY = y - (NODE_R - 1) * Math.sin(ang);
          // Label block is projected radially outward from the node along
          // the same spoke angle, at a fixed distance from the ring. This
          // keeps every one of the seven positions the same gap from its
          // node regardless of where it sits on the circle, instead of the
          // old top/bottom/middle-band special cases that left two of the
          // seven nodes (the ones nearest 3 and 9 o'clock) visually closer
          // to their labels than the rest.
          const labelGap = 22;
          const labelCenterX = x + (NODE_R + labelGap) * Math.cos(ang);
          const labelCenterY = y + (NODE_R + labelGap) * Math.sin(ang);
          const blockHeight = lines.length * lineHeight;
          const labelStartY = labelCenterY - blockHeight / 2 + lineHeight * 0.75;
          const pct = s.assessed === 0 ? "" : `${100 - s.riskPct}%`;

          return (
            <g key={s.pillarId}>
              {/* Glow */}
              <circle
                cx={x}
                cy={y}
                r={NODE_R + 8}
                fill={color}
                fillOpacity={0.13}
              />
              {/* Node */}
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                fill="#0d0d0d"
                stroke={color}
                strokeWidth={1.8}
              />
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
              <circle
                cx={chipX}
                cy={chipY}
                r={8}
                fill="#0d0d0d"
                stroke={color}
                strokeWidth={1.2}
              />
              <text
                x={chipX}
                y={chipY + 3}
                textAnchor="middle"
                fontSize={9.5}
                fontFamily="'Crimson Pro', serif"
                fill={color}
                fontWeight={700}
              >
                {s.number.replace(/^0/, "")}
              </text>
              {/* Label, radially projected so spacing reads evenly at every position */}
              {lines.map((ln, li) => (
                <text
                  key={li}
                  x={labelCenterX}
                  y={labelStartY + li * lineHeight}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="'Crimson Pro', serif"
                  fill="#f2ede2"
                  fillOpacity={0.9}
                  letterSpacing={0.4}
                >
                  {ln.toUpperCase()}
                </text>
              ))}
              {/* Status + score */}
              <text
                x={labelCenterX}
                y={labelStartY + lines.length * lineHeight + 1}
                textAnchor="middle"
                fontSize={9.5}
                fontFamily="'Crimson Pro', serif"
                fill={color}
                letterSpacing={0.6}
              >
                {statusWord(s).toUpperCase()}
                {pct ? `  ${pct}` : ""}
              </text>
            </g>
          );
        })}
      </svg>
    );
  },
);

/**
 * Rasterizes the rendered Gap Map SVG into a PNG data URI at 2x resolution,
 * ready to drop into the PDF deliverable as an image block.
 */
export function gapMapToPng(
  svgEl: SVGSVGElement,
): Promise<{ src: string; width: number; height: number }> {
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
      resolve({
        src: canvas.toDataURL("image/png"),
        width: canvas.width,
        height: canvas.height,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not rasterize the Gap Map"));
    };
    img.src = url;
  });
}
