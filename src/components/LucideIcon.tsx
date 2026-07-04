/**
 * Section-level icons for the Life Manual chapters.
 *
 * These replace generic Remix/Lucide icon-library glyphs with custom
 * geometric marks that share the same visual language as ChapterIcons:
 * 24x24 viewBox, fill=none, stroke=currentColor, strokeWidth=1.6,
 * strokeLinecap=round, strokeLinejoin=round. Each icon is a minimal,
 * architectural mark — no decorative detail, legible from 14px up.
 *
 * Icon names match the string values used in src/data/chapters.ts so
 * this component can be a drop-in replacement for the old Remix-icon
 * registry without touching the chapter data.
 */

// All paths use the 24x24 coordinate system with strokeWidth 1.6.
const PATHS: Record<string, string> = {
  // --- Communication / Contact ---
  Phone:        `<path d="M6 4h4l1.5 3.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 14v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z"/>`,
  Mail:         `<rect x="3" y="5" width="18" height="14" rx="1"/><polyline points="3,5 12,13 21,5"/>`,
  MessageSquare:`<rect x="3" y="3" width="18" height="14" rx="1.5"/><line x1="7" y1="19" x2="7" y2="17"/><line x1="12" y1="21" x2="7" y2="17"/><line x1="17" y1="19" x2="17" y2="17"/>`,
  Megaphone:    `<polygon points="3,9 3,15 7,15 15,20 15,4 7,9"/><line x1="19" y1="9" x2="19" y2="15"/><line x1="21.5" y1="11.5" x2="21.5" y2="12.5"/>`,

  // --- Documents / Records ---
  FileText:     `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>`,
  FileSignature:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M8 17c0-1 .7-1.5 1.5-1.5S11 16 11 17s-.7 2-1.5 2S8 19 8 17z" fill="currentColor" stroke="none"/><line x1="11" y1="17" x2="16" y2="17"/>`,
  ClipboardList:`<rect x="5" y="3" width="14" height="18" rx="1"/><line x1="9" y1="3" x2="15" y2="3" stroke-width="3"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="13" y2="15"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="7.5" cy="15" r="1" fill="currentColor" stroke="none"/>`,
  Receipt:      `<polyline points="3,4 3,20 7,18 11,20 15,18 19,20 21,19 21,4"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/>`,

  // --- Security / Access ---
  Lock:         `<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none"/>`,
  KeyRound:     `<circle cx="8" cy="12" r="4.5"/><line x1="11.5" y1="12" x2="21" y2="12"/><line x1="18" y1="12" x2="18" y2="15"/><line x1="21" y1="12" x2="21" y2="15"/>`,
  Shield:       `<path d="M12 3L19 6V11.5C19 16 16 19.5 12 21C8 19.5 5 16 5 11.5V6Z"/>`,
  ShieldCheck:  `<path d="M12 3L19 6V11.5C19 16 16 19.5 12 21C8 19.5 5 16 5 11.5V6Z"/><polyline points="9,12 11,14 15,10"/>`,
  ShieldAlert:  `<path d="M12 3L19 6V11.5C19 16 16 19.5 12 21C8 19.5 5 16 5 11.5V6Z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none"/>`,
  Fingerprint:  `<path d="M12 3a9 9 0 0 1 9 9"/><path d="M12 7a5 5 0 0 1 5 5"/><path d="M12 11a1 1 0 0 1 1 1v4"/><path d="M3 12a9 9 0 0 0 5 8.1"/><path d="M7 12a5 5 0 0 0 2 4"/>`,

  // --- Finance / Assets ---
  CreditCard:   `<rect x="2" y="5" width="20" height="14" rx="1.5"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>`,
  Landmark:     `<line x1="4" y1="20" x2="20" y2="20"/><line x1="4" y1="12" x2="4" y2="20"/><line x1="12" y1="12" x2="12" y2="20"/><line x1="20" y1="12" x2="20" y2="20"/><polyline points="4,12 12,5 20,12"/><line x1="2" y1="12" x2="22" y2="12"/>`,
  Scale:        `<line x1="12" y1="3" x2="12" y2="21"/><path d="M5 8l7-5 7 5"/><path d="M5 8l-3 7a4 4 0 0 0 6 0z"/><path d="M19 8l3 7a4 4 0 0 1-6 0z"/>`,
  Receipt2:     `<path d="M3 3h18v14l-3-2-3 2-3-2-3 2-3-2V3z"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/>`,

  // --- People / Users ---
  Users:        `<circle cx="8" cy="9" r="3"/><path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M14 20c0-2.8 1.3-5 3-6"/>`,
  UserCheck:    `<circle cx="9" cy="8" r="4"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><polyline points="16,11 18,13 22,9"/>`,
  Handshake:    `<path d="M9 11l3-3 3 3"/><path d="M12 8v8"/><path d="M5 19L2 22m0-3l3 3"/><path d="M19 19l3 3m0-3l-3 3"/><path d="M2 12C2 7 7 3 12 3s10 4 10 9-5 9-10 9S2 17 2 12z"/>`,

  // --- Medical / Health ---
  Stethoscope:  `<circle cx="12" cy="16" r="3"/><path d="M6 4v4a6 6 0 0 0 6 6"/><path d="M18 4v4a6 6 0 0 1-6 6"/><line x1="6" y1="4" x2="9" y2="4"/><line x1="18" y1="4" x2="15" y2="4"/>`,
  Hospital:     `<rect x="3" y="3" width="18" height="18" rx="1"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="7" y1="12" x2="17" y2="12"/>`,
  Activity:     `<polyline points="3,12 7,12 9,5 12,19 14,9 16,14 18,14 21,12"/>`,
  Heart:        `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>`,

  // --- Home / Household ---
  Crown:        `<polygon points="2,19 6,6 12,14 18,6 22,19"/><line x1="2" y1="19" x2="22" y2="19"/>`,
  PawPrint:     `<circle cx="8" cy="10" r="2"/><circle cx="14" cy="8" r="2"/><circle cx="5.5" cy="6.5" r="1.5"/><circle cx="16.5" cy="6.5" r="1.5"/><path d="M12 20c-3 0-6-2-6-5l2-3h8l2 3c0 3-3 5-6 5z"/>`,

  // --- Technology / Digital ---
  Cloud:        `<path d="M18 10h-1.3A7 7 0 1 0 8 17h10a4 4 0 0 0 0-8z"/>`,
  Laptop:       `<rect x="2" y="4" width="20" height="14" rx="1"/><line x1="2" y1="18" x2="22" y2="18" stroke-width="3"/><line x1="9" y1="22" x2="15" y2="22"/>`,
  Server:       `<rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="7" cy="17" r="1" fill="currentColor" stroke="none"/>`,
  Network:      `<circle cx="12" cy="5" r="2.5"/><circle cx="4" cy="19" r="2.5"/><circle cx="20" cy="19" r="2.5"/><line x1="12" y1="7.5" x2="6.5" y2="17"/><line x1="12" y1="7.5" x2="17.5" y2="17"/><line x1="6.5" y1="19" x2="17.5" y2="19"/>`,
  Globe:        `<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z"/>`,

  // --- Operations ---
  Calendar:     `<rect x="3" y="4" width="18" height="17" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>`,
  Clock:        `<circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 15,15"/>`,
  Car:          `<path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><rect x="6" y="17" width="3" height="2" rx="1"/><rect x="15" y="17" width="3" height="2" rx="1"/><path d="M7 12h10"/>`,
  RefreshCw:    `<polyline points="1,4 1,10 7,10"/><path d="M3.5 15a9 9 0 1 0 .5-6.5"/>`,
  Package:      `<path d="M16.5 9.4l-9-5.2"/><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3,7 12,12 20.7,7"/><line x1="12" y1="22" x2="12" y2="12"/>`,
  Wrench:       `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
  Building:     `<rect x="3" y="2" width="18" height="20"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><rect x="9" y="12" width="6" height="10"/><line x1="7" y1="7" x2="7" y2="7" stroke-width="3"/><line x1="12" y1="7" x2="12" y2="7" stroke-width="3"/><line x1="17" y1="7" x2="17" y2="7" stroke-width="3"/>`,
  Sparkles:     `<path d="M12 3l1 4h4l-3 2.5 1 4-3-2.5-3 2.5 1-4-3-2.5h4z" fill="currentColor" stroke="none"/><circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="18" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="17" r="1" fill="currentColor" stroke="none"/>`,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export function LucideIcon({ name, className = "", style, size = 18 }: DynamicIconProps) {
  const path = PATHS[name];
  if (!path) {
    // Unknown icon -- render a simple dot placeholder so the UI never breaks.
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ flexShrink: 0, ...style }}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
