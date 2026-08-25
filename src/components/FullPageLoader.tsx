/**
 * Replaces the generic spinning-circle loader used across page-level
 * loading states. Uses the real brand logo with a calm breathing animation
 * rather than a spinner -- the brand is classical and unhurried, not urgent.
 *
 * Uses /logo.png from the public folder via an img tag so the asset is NOT
 * bundled inline. A prior version used an inline base64 PNG which added
 * ~280KB to the main bundle; loading it via <img> avoids that cost and
 * reuses the browser's cache across all pages.
 */
export function FullPageLoader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#e8c869]/10 animate-crest-pulse scale-150" />
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          className="relative w-16 h-16 object-contain animate-crest-breathe"
        />
      </div>
      {label && (
        <p className="text-xs text-gold-muted tracking-wide">{label}</p>
      )}
    </div>
  );
}
