// Both the pre-login "Forgot password?" flow (LoginPage.tsx) and the
// signed-in "Change Password" flow (SettingsPage.tsx) call Convex Auth's
// signIn() with flow: "reset" to send a one-time code. That call flips
// Convex's isAuthenticated state as a side effect, even though the user
// hasn't verified anything yet -- and PublicOnlyRoute / ProtectedRoute
// react to that state instantly, redirecting the user away before the
// calling page's own state update has a chance to show the code-entry
// screen. This is what "sends the email but immediately exits the page"
// was: a route guard reacting to a transient auth flip, not lost state.
//
// The fix is for the two flows to mark "a reset is actively in progress"
// in sessionStorage before they ever call signIn(), and for both route
// guards to check that flag and stand down while it's set. Marking it
// before the call, not after it resolves, is what closes the race --
// there's no gap where the guard can see the auth flip without also
// seeing the flag.
const RESET_ACTIVE_KEYS = ["la_reset_flow", "settings_pw_reset_state"];
const RESET_ACTIVE_MAX_AGE_MS = 15 * 60 * 1000; // matches the server OTP window

export function isPasswordResetActive(): boolean {
  try {
    for (const key of RESET_ACTIVE_KEYS) {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { savedAt?: number };
      if (
        typeof parsed.savedAt === "number" &&
        Date.now() - parsed.savedAt <= RESET_ACTIVE_MAX_AGE_MS
      ) {
        return true;
      }
    }
  } catch {
    // sessionStorage unavailable (private browsing, etc). Nothing to
    // recover -- the route guards just fall back to normal behavior.
  }
  return false;
}
