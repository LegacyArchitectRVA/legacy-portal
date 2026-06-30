/**
 * Custom, on-brand iconography for the seven Life Manual chapters.
 *
 * Before this, every chapter was represented only by a small colored dot
 * (sidebar, dashboard cards, chapter header) — no actual icon existed at
 * the chapter level anywhere in the app (only individual sub-sections had
 * generic icon-library glyphs). These are original marks, not pulled from
 * an icon library, designed to read clearly from 14px (sidebar nav) up to
 * 28px (chapter header), built from a consistent geometric/architectural
 * vocabulary rather than generic SaaS icon-pack shapes:
 *
 *   Digital Life        — three connected nodes (a small network)
 *   Emergency            — a compass with cardinal ticks (calm orientation,
 *                          deliberately not an alert/warning glyph)
 *   Financial & Asset    — a simple ledger/bar mark
 *   Household Continuity — a roofline
 *   Vital Records        — a document with a seal
 *   Legacy & Wishes       — a single symmetric sprout
 *   Business Continuity   — a column/pillar
 *
 * Colors are intentionally NOT baked in here — each chapter's existing
 * color (chapters.ts) is passed in via the `color` prop, the same value
 * already used everywhere else for that chapter, so this never goes out
 * of sync with the rest of the app's chapter color system.
 */

interface ChapterIconProps {
  chapterId: string;
  color: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PATHS: Record<string, string> = {
  digital: `<circle cx="6" cy="6" r="2.1"/><circle cx="18" cy="6" r="2.1"/><circle cx="12" cy="18" r="2.1"/><line x1="7.6" y1="7.3" x2="10.6" y2="16"/><line x1="16.4" y1="7.3" x2="13.4" y2="16"/><line x1="8" y1="6" x2="16" y2="6"/>`,
  emergency: `<circle cx="12" cy="12" r="8.5"/><line x1="12" y1="4.7" x2="12" y2="6.3"/><line x1="12" y1="17.7" x2="12" y2="19.3"/><line x1="4.7" y1="12" x2="6.3" y2="12"/><line x1="17.7" y1="12" x2="19.3" y2="12"/><polygon points="12,7.3 14,12 12,16.7 10,12" fill="currentColor" stroke="none"/>`,
  financial: `<line x1="5" y1="18" x2="5" y2="11"/><line x1="11" y1="18" x2="11" y2="6"/><line x1="17" y1="18" x2="17" y2="14"/><line x1="3.5" y1="18" x2="18.5" y2="18"/>`,
  household: `<polyline points="4,12 12,5.5 20,12"/><line x1="6.5" y1="10.5" x2="6.5" y2="18.5"/><line x1="17.5" y1="10.5" x2="17.5" y2="18.5"/><line x1="6.5" y1="18.5" x2="17.5" y2="18.5"/>`,
  vitals: `<rect x="6" y="3.5" width="12" height="17" rx="1"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="11.5" x2="15" y2="11.5"/><circle cx="15.5" cy="16.2" r="2.6"/>`,
  context: `<path d="M12 19 V10"/><path d="M12 14 C9.3 14 8.2 11.8 8.2 9.8 C10.6 9.8 12 11.5 12 14Z" fill="currentColor" stroke="none"/><path d="M12 14 C14.7 14 15.8 11.8 15.8 9.8 C13.4 9.8 12 11.5 12 14Z" fill="currentColor" stroke="none"/><circle cx="12" cy="7.3" r="1.3" fill="currentColor" stroke="none"/>`,
  business: `<line x1="5" y1="20" x2="19" y2="20"/><line x1="6.5" y1="20" x2="6.5" y2="6.5"/><line x1="17.5" y1="20" x2="17.5" y2="6.5"/><line x1="5" y1="6.5" x2="19" y2="6.5"/><line x1="12" y1="6.5" x2="12" y2="4"/>`,
};

export function ChapterIcon({ chapterId, color, size = 18, className = "", style }: ChapterIconProps) {
  const path = PATHS[chapterId];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color, flexShrink: 0, ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
