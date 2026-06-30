/**
 * Replaces the generic spinning-circle loader used across page-level
 * loading states (Dashboard, Profile, Payment, Upgrade, User Access,
 * Visual Editor — six separate components previously each had their own
 * copy of the same bare <CircleNotch className="animate-spin" />).
 *
 * Deliberately not a spinner: this brand is calm and classical (vault,
 * continuity, "Zero-Knowledge Standard"), not urgent or energetic, so a
 * slow breathing glow on a simple shield mark reads as "this is taking a
 * considered moment" rather than "something is spinning frantically."
 * Built once here so every page-level loading state shares the same
 * treatment instead of drifting independently.
 *
 * Uses a small inline SVG rather than the brand's actual raster crest
 * logo (LOGO_DATA_URI) — that asset is a ~280KB base64 PNG. It's fine to
 * pay for once on the admin-only pages that already use it (Generate
 * Manual, Document Converter), but DashboardPage is the very first thing
 * every client downloads on login, and a loading-spinner replacement
 * isn't worth adding that much weight to that critical path. Confirmed
 * via an actual build size comparison, not assumed — first version of
 * this component used the raster logo and the main bundle grew by
 * ~290KB; switched to this and it returned to baseline.
 */
export function FullPageLoader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#e8c46a]/15 animate-crest-pulse" />
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8c46a"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative opacity-90 animate-crest-breathe"
          aria-hidden="true"
        >
          <path d="M12 3 L19 6 V11.5 C19 16 16 19.5 12 21 C8 19.5 5 16 5 11.5 V6 Z" />
          <path d="M12 7.5 V14.5" />
          <path d="M9 11 L15 11" fill="none" />
        </svg>
      </div>
      {label && <p className="text-xs text-gold-muted tracking-wide">{label}</p>}
    </div>
  );
}
