import * as React from "react";

// Covers phones AND tablets (portrait and landscape up to a typical
// iPad's 1024px), so the sidebar collapses behind the hamburger menu on
// both, reserving the always-open desktop sidebar for genuine laptop/
// wide-screen widths. This hook is only consumed by the sidebar, so
// raising it doesn't affect any other responsive behavior in the app.
const MOBILE_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
