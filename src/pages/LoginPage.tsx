import { useAuthActions } from "@convex-dev/auth/react";
import { ConvexError } from "convex/values";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function getProvider(email: string): string {
  return email.endsWith("@test.local") ? "test" : "password";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,204,160,0.04)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-gold-bright to-gold-dark flex items-center justify-center">
            <Shield className="w-7 h-7 text-[#0a0a0a]" />
          </div>
          <h1 className="font-heading text-2xl text-[#e8e6e1] tracking-wide uppercase">
            Welcome Back
          </h1>
          <p className="text-sm text-[#e8e6e1]/60">
            Sign in to your Life Manual portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[#e8e6e1]/50 uppercase tracking-wider font-heading block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/60 focus:border-gold-primary/50 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs text-[#e8e6e1]/50 uppercase tracking-wider font-heading block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gold-border/40 rounded-lg px-3 py-2.5 pr-10 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/60 focus:border-gold-primary/50 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8e6e1]/60 hover:text-[#e8e6e1]/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gold-border/30" />
          <span className="text-[10px] text-[#e8e6e1]/60 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-gold-border/30" />
        </div>

        {/* Test User */}
        <button
          onClick={handleTestUser}
          disabled={loading}
          className="w-full border border-gold-border/40 text-[#e8e6e1]/60 hover:text-gold-primary hover:border-gold-primary/30 font-heading text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          Continue as Test User
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-[#e8e6e1]/50">
          New client?{" "}
          <Link to="/signup" className="text-gold-primary hover:text-gold-bright transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
