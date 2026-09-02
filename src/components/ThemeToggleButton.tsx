import { Moon, Sun } from "reicon-react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * A compact sun/moon icon toggle for quick theme switching from the
 * header, rather than burying it in Settings. Shows a sun when dark
 * mode is active (tap to switch to light) and a moon when light mode
 * is active (tap to switch to dark) — the icon always represents the
 * mode you'd switch TO, a common convention for this kind of toggle.
 * Renders nothing if the app's theme isn't switchable at all.
 */
export function ThemeToggleButton({
  size = "default",
}: {
  size?: "default" | "sm";
}) {
  const { theme, toggleTheme, switchable } = useTheme();
  if (!switchable || !toggleTheme) return null;

  const dimensions = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className={`flex items-center justify-center ${dimensions} rounded-full border border-gold-border/30 text-gold-primary hover:bg-gold-dark/10 transition-colors shrink-0`}
    >
      {theme === "dark" ? (
        <Sun className={iconSize} />
      ) : (
        <Moon className={iconSize} />
      )}
    </button>
  );
}
