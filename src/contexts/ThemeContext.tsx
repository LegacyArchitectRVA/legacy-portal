import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme | "system";
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      // Guarded: localStorage throws outright (not just returns null) when
      // storage is blocked, which happens in some private/incognito modes,
      // with strict privacy settings, and behind certain content blockers.
      // This runs during the initial render of a provider that wraps the
      // entire app, so an unguarded throw here blanks the whole screen with
      // no visible error at all.
      try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
          return stored;
        }
      } catch {
        // Storage unavailable, fall through to the default below.
      }
    }
    return defaultTheme === "system" ? getSystemTheme() : defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    if (switchable) {
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // Storage unavailable, the theme still applies for this session.
      }
    }
  }, [theme, switchable]);

  useEffect(() => {
    if (defaultTheme !== "system" || switchable) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [defaultTheme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
