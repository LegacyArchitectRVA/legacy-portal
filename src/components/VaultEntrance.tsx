import { useEffect, useState } from "react";

const SESSION_KEY = "lrva_vault_opened";

/**
 * Full-screen cinematic entrance shown once per browser session, on the
 * first time a client lands on the dashboard after logging in.
 *
 * Sequence:
 *   0 – 600ms   Still. Black screen, shield icon and wordmark centered.
 *   600ms       The gold dividing line expands from the center outward.
 *   900ms       Left panel slides off-screen left. Right panel slides off-screen right.
 *   1600ms      Overlay fades to transparent.
 *   1900ms      Component unmounts, dashboard content takes over completely.
 *
 * Uses sessionStorage so it fires on every fresh login but not on every
 * navigation to /dashboard within the same session.
 */
export function VaultEntrance({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<
    "still" | "line" | "split" | "fade" | "done"
  >("still");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 600);
    const t2 = setTimeout(() => setPhase("split"), 900);
    const t3 = setTimeout(() => setPhase("fade"), 1600);
    const t4 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Storage blocked, the entrance just replays next login.
      }
      onComplete();
    }, 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const splitting = phase === "split" || phase === "fade";
  const fading = phase === "fade";

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 350ms ease-in 0ms" : "none",
      }}
    >
      {/* Left panel */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#060606]"
        style={{
          transform: splitting ? "translateX(-100%)" : "translateX(0)",
          transition: splitting
            ? "transform 650ms cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
        }}
      />

      {/* Right panel */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#060606]"
        style={{
          transform: splitting ? "translateX(100%)" : "translateX(0)",
          transition: splitting
            ? "transform 650ms cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
        }}
      />

      {/* Center content -- sits above both panels, stays fixed as they slide */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        style={{
          opacity: splitting ? 0 : 1,
          transition: splitting ? "opacity 200ms ease-in" : "none",
        }}
      >
        {/* Official logo */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
          style={{
            filter: "drop-shadow(0 0 16px rgba(232, 200, 105,0.4))",
          }}
        />

        {/* Wordmark */}
        <div className="text-center space-y-1">
          <p
            className="font-heading text-[14.9px] sm:text-[13px] tracking-[0.28em] uppercase text-[#d4b661]"
            style={{ textShadow: "0 0 18px rgba(212, 182, 97,0.25)" }}
          >
            Legacy Architect
          </p>
          <p className="font-heading text-[11.5px] sm:text-[10px] tracking-[0.35em] uppercase text-[rgba(212, 182, 97,0.5)]">
            RVA
          </p>
        </div>

        {/* Expanding gold rule */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-[#d4b661] to-transparent"
          style={{
            width: phase === "still" ? "0px" : "140px",
            transition: phase !== "still" ? "width 350ms ease-out" : "none",
          }}
        />
      </div>
    </div>
  );
}

/** Returns true if the vault entrance should be shown this session. */
export function shouldShowVaultEntrance(): boolean {
  // Guarded: sessionStorage throws when storage is blocked (private mode,
  // strict privacy settings, some content blockers). This is called during
  // the login flow, so an unguarded throw here breaks sign-in entirely.
  try {
    return !sessionStorage.getItem(SESSION_KEY);
  } catch {
    return false;
  }
}
