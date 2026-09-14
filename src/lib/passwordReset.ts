// Both the pre-login "Forgot password?" flow (LoginPage.tsx) and the
// signed-in "Change Password" flow (SettingsPage.tsx) call Convex Auth's
// signIn() with flow: "reset" to send a one-time code. That call flips
// Convex's isAuthenticated state as a side effect, even though the user
// hasn't verified anything yet -- and PublicOnlyRoute / ProtectedRoute
// react to that state instantly, redirecting the user away before the
// calling page's own state update has a chance to show the code-entry
// screen. This is what "sends the email but immediately exits the page"
// is: a route guard reacting to a transient auth flip, not lost state.
//
// The fix is for the two flows to mark "a reset is actively in progress"
// before they ever call signIn(), and for both route guards to check that
// flag and stand down while it's set. Marking it before the call, not
// after it resolves, is what closes the race -- there's no gap where the
// guard can see the auth flip without also seeing the flag.
//
// The flag itself is a plain in-memory variable, not sessionStorage. It
// only needs to survive across re-renders within the same live tab to
// close this race, not across a reload, so storage was never actually
// required for this part -- and using it was its own bug: browsers with
// aggressive privacy settings (Brave Shields, strict private-browsing
// modes) can block storage APIs outright, which would make the flag
// silently never get seen and reproduce the exact "still exits
// immediately" symptom this is supposed to fix. A module-level variable
// can't be blocked that way.
//
// sessionStorage is kept as a second, independent layer purely for the
// separate "tab got backgrounded and reloaded while checking email"
// scenario (see loadPersistedResetState in LoginPage.tsx and
// loadPersistedPwMode in SettingsPage.tsx) -- a real reload wipes the
// in-memory flag along with everything else, so that scenario still
// needs storage specifically, and still degrades gracefully (just doesn't
// survive the reload) if storage is unavailable there too.
let resetInFlight = false;
let resetInFlightSetAt = 0;
const RESET_IN_FLIGHT_MAX_AGE_MS = 15 * 60 * 1000; // matches the server OTP window

export function setPasswordResetInProgress(active: boolean) {
  resetInFlight = active;
  resetInFlightSetAt = active ? Date.now() : 0;
}

const RESET_ACTIVE_STORAGE_KEYS = ["la_reset_flow", "settings_pw_reset_state"];

function isPersistedResetActive(): boolean {
  try {
    for (const key of RESET_ACTIVE_STORAGE_KEYS) {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { savedAt?: number };
      if (
        typeof parsed.savedAt === "number" &&
        Date.now() - parsed.savedAt <= RESET_IN_FLIGHT_MAX_AGE_MS
      ) {
        return true;
      }
    }
  } catch {
    // sessionStorage unavailable -- fall through, the in-memory flag
    // above is the layer that actually matters for the redirect race.
  }
  return false;
}

export function isPasswordResetActive(): boolean {
  if (resetInFlight) {
    if (Date.now() - resetInFlightSetAt <= RESET_IN_FLIGHT_MAX_AGE_MS) {
      return true;
    }
    resetInFlight = false;
  }
  return isPersistedResetActive();
}
