import { useAuthActions } from "@convex-dev/auth/react";
import { RiLoader4Line as CircleNotch } from "@remixicon/react";
import {
  browserSupportsWebAuthn,
  startAuthentication,
} from "@simplewebauthn/browser";
import { useAction, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff as EyeSlash, Fingerprint } from "reicon-react";
import { api } from "../../convex/_generated/api";
import { EditableInput } from "../components/EditableInput";
import { EditableText } from "../components/EditableText";

function getProvider(email: string): string {
  return email.endsWith("@test.local") ? "test" : "password";
}

type Mode = "signin" | "forgot-request" | "forgot-verify";

const RESET_STATE_KEY = "la_reset_flow";
const RESET_STATE_MAX_AGE_MS = 15 * 60 * 1000; // matches the 15-minute OTP window server-side

function loadPersistedResetState(): { mode: Mode; email: string } | null {
  try {
    const raw = sessionStorage.getItem(RESET_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      mode: Mode;
      email: string;
      savedAt: number;
    };
    if (Date.now() - parsed.savedAt > RESET_STATE_MAX_AGE_MS) {
      sessionStorage.removeItem(RESET_STATE_KEY);
      return null;
    }
    if (parsed.mode !== "forgot-verify") return null;
    return { mode: parsed.mode, email: parsed.email };
  } catch {
    return null;
  }
}

function persistResetState(mode: Mode, email: string) {
  try {
    if (mode === "forgot-verify") {
      sessionStorage.setItem(
        RESET_STATE_KEY,
        JSON.stringify({ mode, email, savedAt: Date.now() }),
      );
    } else {
      sessionStorage.removeItem(RESET_STATE_KEY);
    }
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — the reset flow
    // still works within a single unloaded tab, it just won't survive a
    // background reload. Nothing to recover from here.
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const getAuthenticationOptions = useAction(
    api.webauthnNode.getAuthenticationOptions,
  );
  const verifyAuthentication = useAction(api.webauthnNode.verifyAuthentication);
  const persistedReset = loadPersistedResetState();
  const [mode, setMode] = useState<Mode>(persistedReset?.mode ?? "signin");
  const [email, setEmail] = useState(persistedReset?.email ?? "");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState(
    persistedReset
      ? `We sent a code to ${persistedReset.email}. Check your inbox.`
      : "",
  );
  const [passkeySupported, setPasskeySupported] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const registeredPasskeys = useQuery(api.webauthn.listMyCredentials);
  const hasPasskeys =
    registeredPasskeys !== undefined && registeredPasskeys.length > 0;

  useEffect(() => {
    setPasskeySupported(browserSupportsWebAuthn());
  }, []);

  const handlePasskeySignIn = async () => {
    setPasskeyLoading(true);
    setError("");
    try {
      const { options, token } = await getAuthenticationOptions({});
      const response = await startAuthentication(options as any);
      const { ticket } = await verifyAuthentication({ token, response });
      await signIn("passkey", { ticket });
      navigate("/dashboard");
    } catch (err: any) {
      if (err?.name === "NotAllowedError") {
        // user cancelled, no error needed
      } else {
        setError(
          "Could not sign in with a passkey. Try your email and password instead.",
        );
      }
    } finally {
      setPasskeyLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const provider = getProvider(email);
      await signIn(provider, { email, password, flow: "signIn" });
      navigate("/dashboard");
    } catch (err: any) {
      if (err instanceof ConvexError) {
        setError(err.data as string);
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTestUser = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("test", {
        email: "agent@test.local",
        password: "TestAgent123!",
        flow: "signIn",
      });
      navigate("/dashboard");
    } catch {
      // Auto-create test user on first attempt
      try {
        await signIn("test", {
          email: "agent@test.local",
          password: "TestAgent123!",
          name: "Test Agent",
          flow: "signUp",
        });
        navigate("/dashboard");
      } catch {
        setError("Could not sign in as test user.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    try {
      await signIn("password", { email, flow: "reset" });
      setInfo(`We sent a code to ${email}. Check your inbox.`);
      setMode("forgot-verify");
      persistResetState("forgot-verify", email);
    } catch {
      setError("Could not send a reset code. Check the email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn("password", {
        email,
        code,
        newPassword,
        flow: "reset-verification",
      });
      persistResetState("signin", email);
      navigate("/dashboard");
    } catch {
      setError("That code didn't work. Check it and try again.");
    } finally {
      setLoading(false);
    }
  };

  const backToSignIn = () => {
    setMode("signin");
    setError("");
    setInfo("");
    setCode("");
    setNewPassword("");
    persistResetState("signin", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212, 182, 97,0.04)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <img
            src="/logo.png"
            alt="Legacy Architect RVA"
            width={64}
            height={64}
            className="mx-auto w-16 h-16 object-contain"
          />
          <h1 className="font-heading text-2xl text-[#f2ede2] tracking-wide uppercase">
            {mode === "signin" ? (
              <EditableText cmsKey="login_title" as="span" />
            ) : (
              "Reset Password"
            )}
          </h1>
          <p className="text-sm text-[#f2ede2]/80">
            {mode === "signin" ? (
              <EditableText cmsKey="login_subtitle" as="span" />
            ) : mode === "forgot-request" ? (
              "Enter your email to receive a reset code"
            ) : (
              "Enter the code we sent, and a new password"
            )}
          </p>
        </div>

        {mode === "signin" && (
          <>
            {passkeySupported && (
              <>
                {hasPasskeys ? (
                  <button
                    onClick={handlePasskeySignIn}
                    disabled={passkeyLoading}
                    className="w-full flex items-center justify-center gap-2 border border-gold-border/40 text-gold-primary hover:border-gold-primary/50 font-heading text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {passkeyLoading ? (
                      <CircleNotch className="w-4 h-4 animate-spin" />
                    ) : (
                      <Fingerprint className="w-4 h-4" />
                    )}
                    <EditableText cmsKey="login_passkey_button" as="span" />
                  </button>
                ) : (
                  <p className="text-center text-[11.5px] sm:text-[10px] text-[#f2ede2]/40 tracking-wide">
                    <Fingerprint className="w-3 h-3 inline mr-1 opacity-60" />
                    Face ID and fingerprint sign-in is available. Set it up in{" "}
                    <Link
                      to="/settings"
                      className="text-gold-muted hover:text-gold-primary underline underline-offset-2 transition-colors"
                    >
                      Settings
                    </Link>{" "}
                    after signing in.
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gold-border/30" />
                  <span className="text-[11.5px] sm:text-[10px] text-[#f2ede2]/80 uppercase tracking-widest">
                    or
                  </span>
                  <div className="flex-1 h-px bg-gold-border/30" />
                </div>
              </>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                  <EditableText cmsKey="login_email_label" as="span" />
                </label>
                <EditableInput
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                  placeholderCmsKey="login_email_placeholder"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading">
                    <EditableText cmsKey="login_password_label" as="span" />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot-request");
                      setError("");
                      setInfo("");
                    }}
                    className="text-[12.6px] sm:text-[11px] text-gold-primary hover:text-gold-bright transition-colors"
                  >
                    <EditableText cmsKey="login_forgot_password" as="span" />
                  </button>
                </div>
                <div className="relative">
                  <EditableInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 pr-10 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                    placeholderCmsKey="login_password_placeholder"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f2ede2]/80 hover:text-[#f2ede2]/80"
                  >
                    {showPassword ? (
                      <EyeSlash className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden border border-[rgba(216,199,154,0.6)] bg-[linear-gradient(180deg,#d4c294_0%,#d4b661_55%,#b3a074_100%)] text-[#1a1509] shadow-[0_1px_0_rgba(255,248,230,0.4)_inset,0_4px_12px_rgba(0,0,0,0.28)] font-heading text-sm font-semibold py-2.5 rounded-[2px] hover:brightness-105 hover:-translate-y-px transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <CircleNotch className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  <EditableText cmsKey="login_submit_button" as="span" />
                )}
              </button>
            </form>

            {import.meta.env.VITE_IS_PREVIEW === "true" && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gold-border/30" />
                  <span className="text-[11.5px] sm:text-[10px] text-[#f2ede2]/80 uppercase tracking-widest">
                    or
                  </span>
                  <div className="flex-1 h-px bg-gold-border/30" />
                </div>

                {/* Test User (internal testing builds only) */}
                <button
                  onClick={handleTestUser}
                  disabled={loading}
                  className="w-full border border-gold-border/40 text-[#f2ede2]/80 hover:text-gold-primary hover:border-gold-primary/30 font-heading text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  Continue as Test User
                </button>
              </>
            )}

            {/* Footer */}
            <p className="text-center text-xs text-[#f2ede2]/75">
              <EditableText cmsKey="login_footer_prompt" as="span" />{" "}
              <Link
                to="/signup"
                className="text-gold-primary hover:text-gold-bright transition-colors"
              >
                <EditableText cmsKey="login_footer_link" as="span" />
              </Link>
            </p>
          </>
        )}

        {mode === "forgot-request" && (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden border border-[rgba(216,199,154,0.6)] bg-[linear-gradient(180deg,#d4c294_0%,#d4b661_55%,#b3a074_100%)] text-[#1a1509] shadow-[0_1px_0_rgba(255,248,230,0.4)_inset,0_4px_12px_rgba(0,0,0,0.28)] font-heading text-sm font-semibold py-2.5 rounded-[2px] hover:brightness-105 hover:-translate-y-px transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <CircleNotch className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Send Reset Code"
              )}
            </button>

            <button
              type="button"
              onClick={backToSignIn}
              className="w-full text-center text-xs text-[#f2ede2]/75 hover:text-[#f2ede2] transition-colors"
            >
              &larr; Back to sign in
            </button>
          </form>
        )}

        {mode === "forgot-verify" && (
          <form onSubmit={handleCompleteReset} className="space-y-4">
            {info && (
              <p className="text-xs text-gold-primary bg-gold-primary/10 rounded-lg px-3 py-2">
                {info}
              </p>
            )}
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                Reset Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none tracking-widest"
                placeholder="6-digit code"
              />
            </div>
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden border border-[rgba(216,199,154,0.6)] bg-[linear-gradient(180deg,#d4c294_0%,#d4b661_55%,#b3a074_100%)] text-[#1a1509] shadow-[0_1px_0_rgba(255,248,230,0.4)_inset,0_4px_12px_rgba(0,0,0,0.28)] font-heading text-sm font-semibold py-2.5 rounded-[2px] hover:brightness-105 hover:-translate-y-px transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <CircleNotch className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Reset Password & Sign In"
              )}
            </button>

            <button
              type="button"
              onClick={backToSignIn}
              className="w-full text-center text-xs text-[#f2ede2]/75 hover:text-[#f2ede2] transition-colors"
            >
              &larr; Back to sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
