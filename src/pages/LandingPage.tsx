import { Link } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import { Lock, ShieldCheck, Eye, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black border-b border-[#e8c46a]/15">
        <div className="container flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Legacy Architect RVA"
              className="w-14 h-14 rounded-lg object-contain"
            />
            <span className="text-sm font-heading tracking-wider text-gold-primary hidden sm:block">
              LEGACY ARCHITECT<br />
              <span className="text-[10px] tracking-[0.2em] text-gold-muted">RVA</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-xs font-heading tracking-[0.15em] text-gold-primary hover:text-gold-bright transition-colors uppercase"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn-gold px-5 py-2.5 text-xs tracking-[0.15em] uppercase inline-flex items-center gap-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-24 md:py-36 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_60%)] animate-aurora" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_60%)] animate-aurora-delayed" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8c46a]/15 to-transparent animate-shimmer" />
          <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8c46a]/8 to-transparent animate-shimmer" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.012)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#e8c46a] blur-3xl opacity-15 animate-subtle-shimmer" />
              <img
                src="/logo.png"
                alt="Legacy Architect RVA"
                className="relative h-[110px] md:h-[142px] w-auto"
                onError={(e) => {
                  // Fallback if logo.png not found
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `
                    <div class="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#e8c46a] to-[#b89f6b] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                    </div>`;
                }}
              />
            </div>
          </div>

          <div className="space-y-5">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              style={{ fontFamily: "Cinzel, serif", fontWeight: 700, fontVariant: "small-caps" }}
            >
              When You Can't Be There,
              <br />
              Will They Know What To Do?
            </h1>

            <p
              className="text-base md:text-lg text-[#c1b085] max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              A <strong className="text-[#e8c46a]">Life Manual</strong> puts every account, system, and instruction in one place, so the people you love can act without guessing.
            </p>

            <p
              className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#e8c46a]/50"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              This is the missing map.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn-gold px-8 py-3.5 text-sm tracking-widest uppercase inline-flex items-center gap-3"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn-gold px-8 py-3.5 text-sm tracking-widest uppercase inline-flex items-center gap-3"
              >
                Sign In to Your Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Divider with tagline */}
      <div className="relative flex items-center justify-center py-8">
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#e8c46a]/20 to-transparent" />
        <p
          className="absolute text-center text-xs md:text-sm tracking-[0.3em] uppercase text-[#e8c46a]/50 bg-black px-8"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Your life is planned. Your absence isn't.
        </p>
      </div>

      {/* Feature Cards */}
      <section className="py-16 md:py-24 relative">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group relative rounded-lg bg-[#111111] border border-[#e8c46a]/10 p-6 transition-all duration-300 hover:border-[#e8c46a]/25 hover:shadow-[0_0_30px_rgba(232,196,106,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8c46a]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
              <div className="relative space-y-4 text-center">
                <div className="w-14 h-14 rounded-lg bg-[#e8c46a]/10 flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5 text-[#e8c46a]" />
                </div>
                <h3
                  className="text-sm tracking-[0.15em] uppercase text-[#e8e6e1]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Encrypted & Secure
                </h3>
                <p
                  className="text-sm text-[#c1b085] leading-relaxed"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  Your data is protected with enterprise-grade encryption at rest and in transit.
                </p>
              </div>
            </div>

            <div className="group relative rounded-lg bg-[#111111] border border-[#e8c46a]/10 p-6 transition-all duration-300 hover:border-[#e8c46a]/25 hover:shadow-[0_0_30px_rgba(232,196,106,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8c46a]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
              <div className="relative space-y-4 text-center">
                <div className="w-14 h-14 rounded-lg bg-[#e8c46a]/10 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-5 h-5 text-[#e8c46a]" />
                </div>
                <h3
                  className="text-sm tracking-[0.15em] uppercase text-[#e8e6e1]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Zero-Knowledge Protocol
                </h3>
                <p
                  className="text-sm text-[#c1b085] leading-relaxed"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  After delivery, all files and access are purged. Your information stays with you.
                </p>
              </div>
            </div>

            <div className="group relative rounded-lg bg-[#111111] border border-[#e8c46a]/10 p-6 transition-all duration-300 hover:border-[#e8c46a]/25 hover:shadow-[0_0_30px_rgba(232,196,106,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8c46a]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
              <div className="relative space-y-4 text-center">
                <div className="w-14 h-14 rounded-lg bg-[#e8c46a]/10 flex items-center justify-center mx-auto">
                  <Eye className="w-5 h-5 text-[#e8c46a]" />
                </div>
                <h3
                  className="text-sm tracking-[0.15em] uppercase text-[#e8e6e1]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Private & Confidential
                </h3>
                <p
                  className="text-sm text-[#c1b085] leading-relaxed"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  Limited to 5 clients per month. Your manual receives our full attention and discretion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Life Manuals include */}
      <section className="py-8 text-center">
        <p
          className="text-xs md:text-sm text-[#c1b085]/60 max-w-3xl mx-auto leading-relaxed px-4"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          All Life Manuals include: Secure Client Portal access, premium branded PDF, and 72-hour data self-destruct after delivery.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8c46a]/15 py-10">
        <div className="container">
          <p className="text-center text-xs text-[#e8e6e1]/75">
            © {new Date().getFullYear()} Legacy Architect RVA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
