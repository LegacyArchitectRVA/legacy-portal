import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation, so without
 * this, going from a long scrolled-down page into a new route lands you
 * wherever the previous page happened to leave the scrollbar.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Some pages scroll their own inner container rather than the window
    // (e.g. chat-style layouts), so reset the most likely scrollable
    // ancestor too.
    document.querySelector("main")?.scrollTo?.(0, 0);
  }, [pathname]);

  return null;
}
