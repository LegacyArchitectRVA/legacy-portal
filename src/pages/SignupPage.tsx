import { useAuthActions } from "@convex-dev/auth/react";
import { RiLoader4Line as Loader2, RiMailLine as Mail } from "@remixicon/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "reicon-react";
import { EditableInput } from "../components/EditableInput";
import { EditableText } from "../components/EditableText";

type Step = "signUp" | { email: string };

function friendlyAuthError(err: unknown): string {
  if (err instanceof ConvexError) {
    const data = err.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && "message" in data) {
      return String((data as { message: unknown }).message);
    }
  }
  const msg = err instanceof Error ? err.message : String(err ?? "");
  const lower = msg.toLowerCase();
  if (
    lower.includes("already exists") ||
    lower.includes("already registered") ||
    lower.includes("account already") ||
    lower.includes("user already") ||
    lower.includes("duplicate")
  ) {
    return "An account with this email already exists. Sign in instead, or use a different email.";
  }
  if (lower.includes("auth_resend_key") || lower.includes("resend")) {
    return "Could not send the verification email. Please try again in a moment, or contact support.";
  }
  if (lower.includes("password") && lower.includes("invalid")) {
    return "Password does not meet requirements. Use at least 8 characters.";
  }
  if (lower.includes("rate") || lower.includes("too many")) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (msg && msg.length < 160 && !lower.includes("failed to fetch")) {
    return msg;
  }
  return "Could not create account. Please try again.";
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<Step>("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isTestEmail = (e: string) => e.endsWith("@test.local");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const provider = isTestEmail(email) ? "test" : "password";
      await signIn(provider, { email, password, flow: "signUp", name });
      if (isTestEmail(email)) {
        navigate("/profile?welcome=1");
      } else {
        setStep({ email });
      }
    } catch (err: unknown) {
      setError(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn("password", {
        email: typeof step === "object" ? step.email : email,
        code,
        flow: "email-verification",
      });
      navigate("/profile?welcome=1");
    } catch (err: unknown) {
      setError(
        friendlyAuthError(err) || "Invalid or expired code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212, 182, 97,0.04)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <img
            src="/logo.png"
            alt="Legacy Architect RVA"
            width={88}
            height={88}
            className="mx-auto w-20 h-20 sm:w-22 sm:h-22 object-contain"
          />
          <h1 className="font-heading text-2xl text-[#f2ede2] tracking-wide uppercase">
            {step === "signUp" ? (
              <EditableText cmsKey="signup_title" as="span" />
            ) : (
              "Check your email"
            )}
          </h1>
          <p className="text-sm text-[#f2ede2]/80">
            {step === "signUp" ? (
              <EditableText cmsKey="signup_subtitle" as="span" />
            ) : (
              <>
                We sent a verification code to{" "}
                <span className="text-gold-primary">
                  {typeof step === "object" ? step.email : email}
                </span>
              </>
            )}
          </p>
        </div>

        {step === "signUp" ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                <EditableText cmsKey="signup_name_label" as="span" />
              </label>
              <EditableInput
                type="text"
                name="name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                placeholderCmsKey="signup_name_placeholder"
              />
            </div>
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                <EditableText cmsKey="signup_email_label" as="span" />
              </label>
              <EditableInput
                type="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                placeholderCmsKey="signup_email_placeholder"
              />
            </div>
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                <EditableText cmsKey="signup_password_label" as="span" />
              </label>
              <div className="relative">
                <EditableInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 pr-10 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                  placeholderCmsKey="signup_password_placeholder"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f2ede2]/80 hover:text-[#f2ede2]/80"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11.5px] sm:text-[10px] text-[#f2ede2]/80 mt-1">
                <EditableText cmsKey="signup_password_hint" as="span" />
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-heading text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                <EditableText cmsKey="signup_submit_button" as="span" />
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex justify-center mb-2">
              <div className="size-12 rounded-full bg-gold-primary/20 flex items-center justify-center">
                <Mail className="size-6 text-gold-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading block mb-1">
                Verification Code
              </label>
              <input
                type="text"
                name="code"
                required
                value={code}
                onChange={e =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                autoComplete="one-time-code"
                inputMode="numeric"
                className="w-full bg-[#0f0c08] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] text-center tracking-[0.4em] font-mono placeholder:text-[#f2ede2]/40 focus:border-gold-primary/50 focus:outline-none"
                placeholder="000000"
              />
              <p className="text-[11px] text-[#f2ede2]/60 mt-1.5 text-center">
                Check your inbox (and spam folder). The code expires in 15
                minutes.
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-heading text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Verify Email"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("signUp");
                setCode("");
                setError("");
              }}
              className="w-full text-center text-xs text-[#f2ede2]/75 hover:text-[#f2ede2] transition-colors"
            >
              &larr; Back to sign up
            </button>
          </form>
        )}

        {step === "signUp" && (
          <p className="text-center text-xs text-[#f2ede2]/75">
            <EditableText cmsKey="signup_footer_prompt" as="span" />{" "}
            <Link
              to="/login"
              className="text-gold-primary hover:text-gold-bright transition-colors"
            >
              <EditableText cmsKey="signup_footer_link" as="span" />
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
