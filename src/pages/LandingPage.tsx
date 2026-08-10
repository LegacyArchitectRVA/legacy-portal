import { RiArrowRightLine as ArrowRight } from "@remixicon/react";
import { useConvexAuth, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { EditableText } from "../components/EditableText";
import {
  EncryptedIcon,
  PrivateIcon,
  ZeroKnowledgeIcon,
} from "../components/TrustIcons";
import { useEditMode } from "../contexts/EditModeContext";
import { useCmsValue } from "../hooks/useCms";

export default function LandingPage() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black border-b border-[#e8c869]/15">
        <div className="container flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Legacy Architect RVA"
              className="w-14 h-14 rounded-lg object-contain"
            />
            <span className="text-sm font-heading tracking-wider text-gold-primary hidden sm:block">
              LEGACY ARCHITECT
              <br />
              <span className="text-[11.5px] sm:text-[10px] tracking-[0.2em] text-gold-muted">
                RVA
              </span>
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
        {/* Compass video background, matching the main site's hero treatment */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hero-compass-poster.jpg"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 38%" }}
          >
            <source src="/videos/hero-compass-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.6) 40%, rgba(0,0,0,.72) 100%)",
            }}
          />
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_60%)] animate-aurora" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_60%)] animate-aurora-delayed" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8c869]/15 to-transparent animate-shimmer" />
          <div
            className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8c869]/8 to-transparent animate-shimmer"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.012)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#e8c869] blur-3xl opacity-15 animate-subtle-shimmer" />
              <img
                src="/logo.png"
                alt="Legacy Architect RVA"
                className="relative h-[110px] md:h-[142px] w-auto"
                onError={e => {
                  // Fallback if logo.png not found
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `
                    <div class="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#e8c869] to-[#7D6224] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0f0c08" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                    </div>`;
                }}
              />
            </div>
          </div>

          <div className="space-y-5">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                fontVariant: "small-caps",
              }}
            >
              <EditableText cmsKey="landing_hero_title" preserveLineBreaks />
            </h1>

            <EditableText
              cmsKey="landing_hero_subtitle"
              as="p"
              className="text-base md:text-lg text-[#c1b085] max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            />

            <EditableText
              cmsKey="app_tagline"
              as="p"
              className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#e8c869]/50"
              style={{ fontFamily: "Cinzel, serif" }}
            />
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
                <EditableText cmsKey="landing_cta_text" />
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Divider with tagline */}
      <div className="relative flex items-center justify-center py-8">
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#e8c869]/20 to-transparent" />
        <p
          className="absolute text-center text-xs md:text-sm tracking-[0.3em] uppercase text-[#e8c869]/50 bg-black px-8"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Your life is planned. Your absence isn't.
        </p>
      </div>

      {/* Feature Cards */}
      <section className="py-16 md:py-24 relative">
        <div className="container">
          <TrustCardsGrid />
        </div>
      </section>

      {/* All Life Manuals include */}
      <section className="py-8 text-center">
        <EditableText
          cmsKey="footer_text"
          as="p"
          className="text-xs md:text-sm text-[#c1b085]/60 max-w-3xl mx-auto leading-relaxed px-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8c869]/15 py-10">
        <div className="container">
          <p className="text-center text-xs text-[#f2ede2]/75">
            © {new Date().getFullYear()} Legacy Architect RVA. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const TRUST_CARD_DEFS: Record<string, { icon: typeof EncryptedIcon }> = {
  encrypted: { icon: EncryptedIcon },
  zeroknowledge: { icon: ZeroKnowledgeIcon },
  private: { icon: PrivateIcon },
};
const DEFAULT_ORDER = ["encrypted", "zeroknowledge", "private"];

function TrustCardsGrid() {
  const { active } = useEditMode();
  const orderRaw = useCmsValue(
    "trust_cards_order",
    JSON.stringify(DEFAULT_ORDER),
  );
  const updateCMS = useMutation(api.admin.updateCMS);

  let order: string[];
  try {
    order = JSON.parse(orderRaw);
    if (!Array.isArray(order) || order.length !== DEFAULT_ORDER.length)
      order = DEFAULT_ORDER;
  } catch {
    order = DEFAULT_ORDER;
  }

  const moveCard = (index: number, direction: -1 | 1) => {
    const next = [...order];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateCMS({ key: "trust_cards_order", value: JSON.stringify(next) });
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {order.map((cardId, index) => {
        const def = TRUST_CARD_DEFS[cardId];
        if (!def) return null;
        const Icon = def.icon;
        return (
          <div
            key={cardId}
            className="group relative rounded-lg bg-[#171208] border border-[#e8c869]/10 p-6 transition-all duration-300 hover:border-[#e8c869]/25 hover:shadow-[0_0_30px_rgba(232, 200, 105,0.05)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8c869]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
            {active && (
              <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    moveCard(index, -1);
                  }}
                  disabled={index === 0}
                  className="w-6 h-6 flex items-center justify-center rounded bg-black/60 text-gold-primary disabled:opacity-30 hover:bg-black/80"
                  title="Move left/up"
                >
                  ↑
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    moveCard(index, 1);
                  }}
                  disabled={index === order.length - 1}
                  className="w-6 h-6 flex items-center justify-center rounded bg-black/60 text-gold-primary disabled:opacity-30 hover:bg-black/80"
                  title="Move right/down"
                >
                  ↓
                </button>
              </div>
            )}
            <div className="relative space-y-4 text-center">
              <div className="flex justify-center">
                <Icon size={30} />
              </div>
              <EditableText
                cmsKey={`trust_card_${cardId}_title`}
                as="h3"
                className="text-sm tracking-[0.15em] uppercase text-[#f2ede2]"
                style={{ fontFamily: "Cinzel, serif" }}
              />
              <EditableText
                cmsKey={`trust_card_${cardId}_desc`}
                as="p"
                className="text-sm text-[#c1b085] leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
