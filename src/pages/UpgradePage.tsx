import {
  ArrowRight,
  Check,
  Lock,
  Shield,
} from "reicon-react";
import { useQuery } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { EditableBox } from "../components/EditableBox";
import { EditableIcon } from "../components/EditableIcon";
import { EditableImage } from "../components/EditableImage";
import { EditableText } from "../components/EditableText";
import { FullPageLoader } from "../components/FullPageLoader";
import { useEditMode } from "../contexts/EditModeContext";
import { chapters } from "../data/chapters";
import { canAccessChapter, tiers } from "../data/tiers";

const tierImages: Record<string, string> = {
  vault:
    "https://pub-edbffba3e85240eabfa80aa13a1b8169.r2.dev/Emblems/vault%20emblem.png",
  archive:
    "https://pub-edbffba3e85240eabfa80aa13a1b8169.r2.dev/Emblems/archive%20emblem.png",
  legacy:
    "https://pub-edbffba3e85240eabfa80aa13a1b8169.r2.dev/Emblems/legacy%20emblem.png",
};

const tierRank: Record<string, number> = {
  vault: 1,
  archive: 2,
  legacy: 3,
};

const tierColors: Record<
  string,
  { accent: string; accentRgb: string; label: string; border: string }
> = {
  vault: {
    accent: "#b87333",
    accentRgb: "184, 115, 51",
    label: "Bronze",
    border: "border-[#b87333]/35",
  },
  archive: {
    accent: "#c8c8c8",
    accentRgb: "200, 200, 200",
    label: "Silver",
    border: "border-[#c8c8c8]/35",
  },
  legacy: {
    accent: "#d4b661",
    accentRgb: "214, 168, 79",
    label: "Gold",
    border: "border-[#d4b661]/40",
  },
};

function normalizeTier(tier?: string) {
  return tierRank[tier || ""] ? tier || "vault" : "vault";
}

export default function UpgradePage() {
  const navigate = useNavigate();
  const profile = useQuery(api.profile.getMyProfile);
  const isAdmin = useQuery(api.admin.isAdmin);
  const { active: isEditingInVisualEditor } = useEditMode();

  if (profile === undefined || isAdmin === undefined) {
    return <FullPageLoader />;
  }

  const currentTier = normalizeTier(profile?.tier ?? undefined);
  const currentRank = tierRank[currentTier];
  const isLegacy = currentTier === "legacy";

  const visibleTiers = isLegacy
    ? tiers.filter(tier => tier.id === "legacy")
    : tiers.filter(tier => tierRank[tier.id] >= currentRank);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {isAdmin && !isEditingInVisualEditor && (
        <div className="rounded-xl border border-gold-border bg-[#0f0c08] p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-gold-primary mt-0.5 shrink-0" />
          <p className="text-sm text-[#f2ede2]/75">
            <span className="text-gold-primary font-heading">
              Operator preview.
            </span>{" "}
            Admin accounts bypass tier restrictions everywhere, so nothing here
            applies to you. This is the page exactly as a client sees it, for
            reviewing pricing and layout.
          </p>
        </div>
      )}
      <div>
        <h1 className="font-heading text-3xl text-gold-gradient">
          <EditableText cmsKey="upgrade_title" as="span" />
        </h1>
        <p className="text-[#f2ede2]/80 mt-2 leading-relaxed max-w-2xl">
          Portal upgrades begin with The Vault and move upward. Lower editions
          are not offered once a higher edition is active.
        </p>
      </div>

      {/* Intro video */}
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-xl overflow-hidden border border-[#e8c869]/15 shadow-[0_0_40px_rgba(212,175,55,0.06)]">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/videos/intro-poster.jpg"
            className="w-full aspect-video bg-black"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {isLegacy && (
        <div className="rounded-xl border border-[#d4b661]/35 bg-[#0f0c08] p-5 shadow-[0_0_35px_rgba(214,168,79,0.10)]">
          <p className="font-heading text-[#d4b661] text-lg">
            Current Edition: The Legacy
          </p>
          <p className="text-sm text-[#f2ede2]/65 mt-2 leading-relaxed">
            You are already on the highest Life Manual edition. No Vault or
            Archive upgrade options are available for this account.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {visibleTiers.map(tier => {
          const isCurrent = tier.id === currentTier;
          const isUpgrade = tierRank[tier.id] > currentRank;
          const tierImage = tierImages[tier.id];
          const colors = tierColors[tier.id];

          return (
            <EditableBox
              key={tier.id}
              cmsKey={`upgrade_${tier.id}_card_style`}
              className={`bg-[#0f0c08] rounded-xl border p-5 relative overflow-hidden transition-all duration-300 flex flex-col min-h-full ${
                isCurrent
                  ? colors.border
                  : "border-gold-border hover:border-gold-border/40"
              }`}
              style={
                isCurrent
                  ? {
                      boxShadow: `0 0 25px rgba(${colors.accentRgb}, 0.12), 0 0 60px rgba(${colors.accentRgb}, 0.04)`,
                    }
                  : undefined
              }
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212, 182, 97,0.04),_transparent_60%)]" />

              <div className="relative flex flex-col flex-1 space-y-4">
                <div className="flex justify-center min-h-[120px] items-center py-2">
                  <EditableImage
                    cmsKey={`upgrade_${tier.id}_emblem`}
                    defaultSrc={tierImage}
                    alt={tier.name}
                    className="h-28 w-auto object-contain drop-shadow-lg"
                  />
                </div>

                {isCurrent && (
                  <div className="flex justify-center">
                    <span
                      className="inline-block text-[11.5px] sm:text-[10px] font-heading uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `rgba(${colors.accentRgb}, 0.1)`,
                        color: colors.accent,
                        borderColor: `rgba(${colors.accentRgb}, 0.25)`,
                      }}
                    >
                      <EditableText cmsKey="upgrade_current_badge" as="span" />
                    </span>
                  </div>
                )}

                <div className="text-center min-h-[90px] flex flex-col justify-start">
                  <h3
                    className="font-heading text-2xl text-[#f2ede2] leading-tight"
                    style={{ fontVariant: "small-caps" }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className="font-heading text-3xl mt-2"
                    style={{ color: colors.accent }}
                  >
                    {tier.priceLabel}
                  </p>
                </div>

                <p className="text-xs text-[#f2ede2]/80 leading-relaxed text-center min-h-[52px]">
                  <EditableText
                    cmsKey={`upgrade_${tier.id}_desc`}
                    fallback={tier.description}
                    as="span"
                  />
                </p>

                <ul className="space-y-2 flex-1">
                  {tier.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-[#f2ede2]/70"
                    >
                      <EditableIcon
                        cmsKey={`upgrade_${tier.id}_checkmark_style`}
                        icon={Check}
                        defaultColor={colors.accent}
                        shapeSwappable
                        size={14}
                        className="w-3.5 h-3.5 mt-0.5 shrink-0"
                      />
                      <EditableText
                        cmsKey={`upgrade_${tier.id}_feature_${i}`}
                        fallback={feature}
                        as="span"
                      />
                    </li>
                  ))}
                </ul>

                {isUpgrade && (
                  <button
                    type="button"
                    onClick={() => navigate(`/payment?tier=${tier.id}`)}
                    className="w-full flex items-center justify-center gap-2 text-[#0f0c08] font-heading text-sm font-semibold py-3 rounded-full hover:opacity-90 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`,
                      boxShadow: `0 0 20px rgba(${colors.accentRgb}, 0.2)`,
                    }}
                  >
                    <EditableText cmsKey="upgrade_cta_prefix" as="span" />{" "}
                    {tier.name}
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
                    <Shield className="w-4 h-4" />{" "}
                    <EditableText cmsKey="upgrade_active_badge" as="span" />
                  </div>
                )}

                <div className="border-t border-gold-border/30 pt-3 space-y-2">
                  <h4
                    className="font-heading text-[11.5px] sm:text-[10px] tracking-widest uppercase"
                    style={{ color: `rgba(${colors.accentRgb}, 0.6)` }}
                  >
                    <EditableText
                      cmsKey="upgrade_chapters_included_label"
                      as="span"
                    />
                  </h4>
                  <ul className="space-y-1.5">
                    {chapters.map(ch => {
                      const included = canAccessChapter(
                        tier.id,
                        ch.chapterNumber,
                      );

                      return (
                        <li
                          key={ch.id}
                          className={`flex items-center gap-2 text-xs ${
                            included ? "text-[#f2ede2]/80" : "text-[#f2ede2]/35"
                          }`}
                        >
                          {included ? (
                            <EditableIcon
                              cmsKey={`upgrade_${tier.id}_checkmark_style`}
                              icon={Check}
                              defaultColor={colors.accent}
                              shapeSwappable
                              size={14}
                              className="w-3.5 h-3.5 shrink-0 check-glow"
                            />
                          ) : (
                            <Lock className="w-3 h-3 text-[#f2ede2]/30 shrink-0" />
                          )}
                          <span>
                            Ch. {ch.chapterNumber}: {ch.title}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </EditableBox>
          );
        })}
      </div>

      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 text-center">
        <p className="text-sm text-[#f2ede2]/80 leading-relaxed">
          <EditableText cmsKey="upgrade_notice_text" as="span" />
        </p>
      </div>

      <div className="text-center text-xs text-[#f2ede2]/75 py-4">
        <EditableText cmsKey="upgrade_footer_text" as="span" />
      </div>
    </div>
  );
}
