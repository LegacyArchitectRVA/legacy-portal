import { useQuery } from "convex/react";
import { ArrowRight, Check, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { tiers } from "../data/tiers";
import { chapters } from "../data/chapters";
import { canAccessChapter } from "../data/tiers";

const reviewPrices: Record<string, number> = {
  vault: 400,
  archive: 800,
  legacy: 1200,
};

const tierImages: Record<string, string> = {
  vault: "/tier-vault.png",
  archive: "/tier-archive.png",
  legacy: "/tier-legacy.png",
};

// Edition color scheme: bronze=vault, silver=archive, gold=legacy
const tierColors: Record<string, { accent: string; accentRgb: string; label: string; gradient: string; border: string }> = {
  vault: {
    accent: "#CD7F32",
    accentRgb: "205, 127, 50",
    label: "Bronze",
    gradient: "from-[#CD7F32] to-[#8B5E3C]",
    border: "border-[#CD7F32]/30",
  },
  archive: {
    accent: "#C0C0C0",
    accentRgb: "192, 192, 192",
    label: "Silver",
    gradient: "from-[#C0C0C0] to-[#808080]",
    border: "border-[#C0C0C0]/30",
  },
  legacy: {
    accent: "#FFD700",
    accentRgb: "255, 215, 0",
    label: "Gold",
    gradient: "from-[#FFD700] to-[#DAA520]",
    border: "border-[#FFD700]/30",
  },
};

export default function UpgradePage() {
  const navigate = useNavigate();
  const profile = useQuery(api.profile.getMyProfile);
  const currentTier = profile?.tier || "vault";

  const tierOrder = ["vault", "archive", "legacy"];
  const currentIndex = tierOrder.indexOf(currentTier);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-gold-gradient">
          Upgrade Your Life Manual
        </h1>
        <p className="text-[#e8e6e1]/60 mt-2 leading-relaxed max-w-2xl">
          Expand your Life Manual to cover more of your life. Each tier builds on
          the previous one. Your existing data carries forward.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((tier, idx) => {
          const isCurrent = tier.id === currentTier;
          const isUpgrade = idx > currentIndex;
          const isLower = idx < currentIndex;
          const reviewPrice = reviewPrices[tier.id];
          const tierImage = tierImages[tier.id];
          const colors = tierColors[tier.id];

          return (
            <div
              key={tier.id}
              className={`bg-[#0a0a0a] rounded-xl border p-5 relative overflow-hidden transition-all duration-300 ${
                isCurrent
                  ? `${colors.border} shadow-[0_0_25px_rgba(${colors.accentRgb},0.12)]`
                  : "border-gold-border hover:border-gold-border/40"
              }`}
              style={isCurrent ? {
                boxShadow: `0 0 25px rgba(${colors.accentRgb}, 0.12), 0 0 60px rgba(${colors.accentRgb}, 0.04)`
              } : undefined}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(217,204,160,0.04),_transparent_60%)]" />

              <div className="relative space-y-4">
                {/* Tier Image */}
                {tierImage && (
                  <div className="flex justify-center py-3">
                    <img
                      src={tierImage}
                      alt={tier.name}
                      className="h-32 w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                )}

                {isCurrent && (
                  <div className="flex justify-center">
                    <span
                      className="inline-block text-[10px] font-heading uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `rgba(${colors.accentRgb}, 0.1)`,
                        color: colors.accent,
                        borderColor: `rgba(${colors.accentRgb}, 0.25)`,
                      }}
                    >
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3
                    className="font-heading text-xl text-[#e8e6e1]"
                    style={{ fontVariant: "small-caps" }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className="font-heading text-3xl mt-1"
                    style={{ color: colors.accent }}
                  >
                    {tier.priceLabel}
                  </p>
                </div>

                <p className="text-xs text-[#e8e6e1]/60 leading-relaxed text-center">{tier.description}</p>

                {/* Annual review info */}
                <div className="text-xs text-center">
                  <p className="italic text-[#e8e6e1]/50">Annual review available upon request</p>
                  <p className="font-medium mt-0.5" style={{ color: `rgba(${colors.accentRgb}, 0.7)` }}>
                    Annual Review: ${reviewPrice}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-[#e8e6e1]/70">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: colors.accent }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {isUpgrade && (
                  <button
                    type="button"
                    onClick={() => navigate(`/payment?tier=${tier.id}`)}
                    className="w-full flex items-center justify-center gap-2 text-[#0a0a0a] font-heading text-sm font-semibold py-3 rounded-full hover:opacity-90 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`,
                      boxShadow: `0 0 20px rgba(${colors.accentRgb}, 0.2)`,
                    }}
                  >
                    Upgrade to {tier.name}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {isCurrent && (
                  <div
                    className="w-full flex items-center justify-center gap-2 font-heading text-sm py-3 rounded-full cursor-default border"
                    style={{
                      backgroundColor: `rgba(${colors.accentRgb}, 0.08)`,
                      color: colors.accent,
                      borderColor: `rgba(${colors.accentRgb}, 0.2)`,
                    }}
                  >
                    <Shield className="w-4 h-4" /> Active
                  </div>
                )}

                {isLower && (
                  <div className="w-full text-center text-xs text-[#e8e6e1]/50 py-2">
                    Included in your current plan
                  </div>
                )}

                {/* Chapters Included Section */}
                <div className="border-t border-gold-border/30 pt-3 space-y-2">
                  <h4 className="font-heading text-[10px] tracking-widest uppercase" style={{ color: `rgba(${colors.accentRgb}, 0.6)` }}>
                    Chapters Included
                  </h4>
                  <ul className="space-y-1.5">
                    {chapters.map((ch) => {
                      const included = canAccessChapter(tier.id, ch.chapterNumber);
                      return (
                        <li
                          key={ch.id}
                          className={`flex items-center gap-2 text-xs ${
                            included ? "text-[#e8e6e1]/80" : "text-[#e8e6e1]/35"
                          }`}
                        >
                          {included ? (
                            <Check
                              className="w-3.5 h-3.5 shrink-0 check-glow"
                              style={{ color: colors.accent }}
                            />
                          ) : (
                            <Lock className="w-3 h-3 text-[#e8e6e1]/30 shrink-0" />
                          )}
                          <span>Ch. {ch.chapterNumber}: {ch.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Info */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 text-center">
        <p className="text-sm text-[#e8e6e1]/60 leading-relaxed">
          Upgrades are based on the price difference between tiers. Annual review fees can be
          credited toward a future tier upgrade.
        </p>
      </div>

      {/* Inclusions */}
      <div className="text-center text-xs text-[#e8e6e1]/50 py-4">
        All Life Manuals include: Secure Client Portal access, premium branded PDF,
        and 72-hour data self-destruct after delivery.
      </div>
    </div>
  );
}
