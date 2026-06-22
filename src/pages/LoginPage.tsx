import { useAuthActions } from "@convex-dev/auth/react";
import { startAuthentication, browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { RiEyeLine as Eye, RiEyeOffLine as EyeSlash, RiFingerprintLine as Fingerprint, RiLoader4Line as CircleNotch } from "@remixicon/react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { EditableText } from "../components/EditableText";
import { EditableInput } from "../components/EditableInput";

function getProvider(email: string): string {
  return email.endsWith("@test.local") ? "test" : "password";
}

type Mode = "signin" | "forgot-request" | "forgot-verify";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const getAuthenticationOptions = useAction(api.webauthnNode.getAuthenticationOptions);
  const verifyAuthentication = useAction(api.webauthnNode.verifyAuthentication);
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [passkeySupported, setPasskeySupported] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);

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
        setError("Could not sign in with a passkey. Try your email and password instead.");
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,204,160,0.04)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <img
            src="/logo.png"
            alt="Legacy Architect RVA"
            className="mx-auto w-24 h-24 object-contain"
          />
          <h1 className="font-heading text-2xl text-[#e8e6e1] tracking-wide uppercase">
            {mode === "signin" ? (
              <EditableText cmsKey="login_title" as="span" />
            ) : (
              "Reset Password"
            )}
          </h1>
          <p className="text-sm text-[#e8e6e1]/80">
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
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gold-border/30" />
                  <span className="text-[10px] text-[#e8e6e1]/80 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-gold-border/30" />
                </div>
              </>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading block mb-1">
                  <EditableText cmsKey="login_email_label" as="span" />
                </label>
                <EditableInput
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/80 focus:border-gold-primary/50 focus:outline-none"
                  placeholderCmsKey="login_email_placeholder"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading">
                    <EditableText cmsKey="login_password_label" as="span" />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot-request");
                      setError("");
                      setInfo("");
                    }}
                    className="text-[11px] text-gold-primary hover:text-gold-bright transition-colors"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 pr-10 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/80 focus:border-gold-primary/50 focus:outline-none"
                    placeholderCmsKey="login_password_placeholder"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8e6e1]/80 hover:text-[#e8e6e1]/80"
                  >
                    {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
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
                  <span className="text-[10px] text-[#e8e6e1]/80 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-gold-border/30" />
                </div>

                {/* Test User (internal testing builds only) */}
                <button
                  onClick={handleTestUser}
                  disabled={loading}
                  className="w-full border border-gold-border/40 text-[#e8e6e1]/80 hover:text-gold-primary hover:border-gold-primary/30 font-heading text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  Continue as Test User
                </button>
              </>
            )}

            {/* Footer */}
            <p className="text-center text-xs text-[#e8e6e1]/75">
              <EditableText cmsKey="login_footer_prompt" as="span" />{" "}
              <Link to="/signup" className="text-gold-primary hover:text-gold-bright transition-colors">
                <EditableText cmsKey="login_footer_link" as="span" />
              </Link>
            </p>
          </>
        )}

        {mode === "forgot-request" && (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/80 focus:border-gold-primary/50 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? <CircleNotch className="w-4 h-4 animate-spin mx-auto" /> : "Send Reset Code"}
            </button>

            <button
              type="button"
              onClick={backToSignIn}
              className="w-full text-center text-xs text-[#e8e6e1]/75 hover:text-[#e8e6e1] transition-colors"
            >
              &larr; Back to sign in
            </button>
          </form>
        )}

        {mode === "forgot-verify" && (
          <form onSubmit={handleCompleteReset} className="space-y-4">
            {info && (
              <p className="text-xs text-gold-primary bg-gold-primary/10 rounded-lg px-3 py-2">{info}</p>
            )}
            <div>
              <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading block mb-1">
                Reset Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/80 focus:border-gold-primary/50 focus:outline-none tracking-widest"
                placeholder="6-digit code"
              />
            </div>
            <div>
              <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading block mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/80 focus:border-gold-primary/50 focus:outline-none"
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? <CircleNotch className="w-4 h-4 animate-spin mx-auto" /> : "Reset Password & Sign In"}
            </button>

            <button
              type="button"
              onClick={backToSignIn}
              className="w-full text-center text-xs text-[#e8e6e1]/75 hover:text-[#e8e6e1] transition-colors"
            >
              &larr; Back to sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
