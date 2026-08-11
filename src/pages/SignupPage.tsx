import { useAuthActions } from "@convex-dev/auth/react";
import {
  RiEyeLine as Eye,
  RiEyeOffLine as EyeOff,
  RiLoader4Line as Loader2,
} from "@remixicon/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditableInput } from "../components/EditableInput";
import { EditableText } from "../components/EditableText";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const provider = email.endsWith("@test.local") ? "test" : "password";
      await signIn(provider, { email, password, flow: "signUp", name });
      navigate("/dashboard");
    } catch (err: any) {
      if (err instanceof ConvexError) {
        setError(err.data as string);
      } else {
        setError("Could not create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
            width={65}
            height={65}
            className="mx-auto w-[65px] h-[65px] object-contain"
          />
          <h1 className="font-heading text-2xl text-[#f2ede2] tracking-wide uppercase">
            <EditableText cmsKey="signup_title" as="span" />
          </h1>
          <p className="text-sm text-[#f2ede2]/80">
            <EditableText cmsKey="signup_subtitle" as="span" />
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Footer */}
        <p className="text-center text-xs text-[#f2ede2]/75">
          <EditableText cmsKey="signup_footer_prompt" as="span" />{" "}
          <Link
            to="/login"
            className="text-gold-primary hover:text-gold-bright transition-colors"
          >
            <EditableText cmsKey="signup_footer_link" as="span" />
          </Link>
        </p>
      </div>
    </div>
  );
}
