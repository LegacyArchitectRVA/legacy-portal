import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export interface CmsStyle {
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  bgColor?: string;
  textAlign?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

const SIZE_MAP: Record<string, string> = {
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1rem",
  "text-lg": "1.125rem",
  "text-xl": "1.25rem",
  "text-2xl": "1.5rem",
  "text-3xl": "1.875rem",
  "text-4xl": "2.25rem",
};

function parseMetadata(metadata: string | null | undefined): CmsStyle {
  if (!metadata) return {};
  try {
    const raw = JSON.parse(metadata);
    return {
      fontFamily: raw.fontFamily || undefined,
      fontSize: raw.fontSize || undefined,
      color: raw.textColor || undefined,
      bgColor: raw.bgColor || undefined,
      textAlign: raw.textAlign || undefined,
      bold: !!raw.isBold,
      italic: !!raw.isItalic,
      underline: !!raw.isUnderline,
    };
  } catch {
    return {};
  }
}

/**
 * Reads an admin-editable piece of copy by CMS key, falling back to the
 * given default text if no override has been saved yet (or while the
 * query is still loading, so visitors never see a flash of empty text).
 */
export function useCmsValue(key: string, fallback: string): string {
  const cms = useQuery(api.admin.getCMS, { key });
  if (cms === undefined) return fallback;
  return cms?.value?.trim() ? cms.value : fallback;
}

/**
 * Reads the style override (font, color, alignment, weight, etc.) saved
 * for a CMS key, if any. Returns an empty object when nothing's been
 * customized, so callers can spread the result directly into a style
 * prop with no effect.
 */
export function useCmsStyle(key: string): CmsStyle {
  const cms = useQuery(api.admin.getCMS, { key });
  if (!cms?.metadata) return {};
  return parseMetadata(cms.metadata);
}

/** Builds a React style object from a CmsStyle, ready to spread onto an element. */
export function cmsStyleToCss(s: CmsStyle): React.CSSProperties {
  return {
    ...(s.color
      ? {
          color: s.color,
          background: "none",
          WebkitTextFillColor: s.color,
          backgroundClip: "unset",
          WebkitBackgroundClip: "unset",
        }
      : {}),
    ...(s.bgColor ? { backgroundColor: s.bgColor } : {}),
    ...(s.fontFamily ? { fontFamily: s.fontFamily } : {}),
    ...(s.fontSize ? { fontSize: SIZE_MAP[s.fontSize] || s.fontSize } : {}),
    ...(s.textAlign
      ? { textAlign: s.textAlign as React.CSSProperties["textAlign"] }
      : {}),
    ...(s.bold ? { fontWeight: 700 } : {}),
    ...(s.italic ? { fontStyle: "italic" } : {}),
    ...(s.underline ? { textDecoration: "underline" } : {}),
  };
}
