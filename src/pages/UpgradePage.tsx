import { useQuery } from "convex/react";
import { RiArrowRightLine as ArrowRight, RiCheckLine as Check, RiLockLine as Lock, RiShieldLine as Shield, RiLoader4Line as CircleNotch } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { chapters } from "../data/chapters";
import { canAccessChapter, tiers } from "../data/tiers";
import { EditableText } from "../components/EditableText";
import { EditableIcon } from "../components/EditableIcon";
import { EditableBox } from "../components/EditableBox";
import { useEditMode } from "../contexts/EditModeContext";

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
    accent: "#d6a84f",
    accentRgb: "214, 168, 79",
    label: "Gold",
    border: "border-[#d6a84f]/40",
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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <CircleNotch className="w-6 h-6 text-gold-muted animate-spin" />
      </div>
    );
  }

  const currentTier = normalizeTier(profile?.tier ?? undefined);
  const currentRank = tierRank[currentTier];
  const isLegacy = currentTier === "legacy";

  const visibleTiers = isLegacy
    ? tiers.filter((tier) => tier.id === "legacy")
    : tiers.filter((tier) => tierRank[tier.id] >= currentRank);

  if (isAdmin && !isEditingInVisualEditor) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-xl border border-gold-border bg-[#0a0a0a] p-6 text-center space-y-2">
          <Shield className="w-8 h-8 text-gold-primary mx-auto" />
          <h1 className="font-heading text-xl text-gold-gradient">Administrator · Full Access</h1>
          <p className="text-sm text-[#e8e6e1]/75">
            Admin accounts bypass tier restrictions everywhere. There's nothing to upgrade.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-gold-gradient">
          <EditableText cmsKey="upgrade_title" as="span" />
        </h1>
        <p className="text-[#e8e6e1]/80 mt-2 leading-relaxed max-w-2xl">
          Portal upgrades begin with The Vault and move upward. Lower editions are
          not offered once a higher edition is active.
        </p>
      </div>

      {isLegacy && (
        <div className="rounded-xl border border-[#d6a84f]/35 bg-[#0a0a0a] p-5 shadow-[0_0_35px_rgba(214,168,79,0.10)]">
          <p className="font-heading text-[#d6a84f] text-lg">
            Current Edition: The Legacy
          </p>
          <p className="text-sm text-[#e8e6e1]/65 mt-2 leading-relaxed">
            You are already on the highest Life Manual edition. No Vault or
            Archive upgrade options are available for this account.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {visibleTiers.map((tier) => {
          const isCurrent = tier.id === currentTier;
          const isUpgrade = tierRank[tier.id] > currentRank;
          const tierImage = tierImages[tier.id];
          const colors = tierColors[tier.id];

          return (
            <EditableBox
              key={tier.id}
              cmsKey={`upgrade_${tier.id}_card_style`}
              className={`bg-[#0a0a0a] rounded-xl border p-5 relative overflow-hidden transition-all duration-300 flex flex-col min-h-full ${
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
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(217,204,160,0.04),_transparent_60%)]" />

              <div className="relative flex flex-col flex-1 space-y-4">
                <div className="flex justify-center min-h-[120px] items-center py-2">
                  <img
                    src={tierImage}
                    alt={tier.name}
                    className="h-28 w-auto object-contain drop-shadow-lg"
                  />
                </div>

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
                      <EditableText cmsKey="upgrade_current_badge" as="span" />
                    </span>
                  </div>
                )}

                <div className="text-center min-h-[90px] flex flex-col justify-start">
                  <h3
                    className="font-heading text-2xl text-[#e8e6e1] leading-tight"
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

                <p className="text-xs text-[#e8e6e1]/80 leading-relaxed text-center min-h-[52px]">
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
                      className="flex items-start gap-2 text-xs text-[#e8e6e1]/70"
                    >
                      <EditableIcon
                        cmsKey={`upgrade_${tier.id}_checkmark_color`}
                        icon={Check}
                        defaultColor={colors.accent}
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
                    className="w-full flex items-center justify-center gap-2 text-[#0a0a0a] font-heading text-sm font-semibold py-3 rounded-full hover:opacity-90 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`,
                      boxShadow: `0 0 20px rgba(${colors.accentRgb}, 0.2)`,
                    }}
                  >
                    <EditableText cmsKey="upgrade_cta_prefix" as="span" /> {tier.name}
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
                    <Shield className="w-4 h-4" /> <EditableText cmsKey="upgrade_active_badge" as="span" />
                  </div>
                )}

                <div className="border-t border-gold-border/30 pt-3 space-y-2">
                  <h4
                    className="font-heading text-[10px] tracking-widest uppercase"
                    style={{ color: `rgba(${colors.accentRgb}, 0.6)` }}
                  >
                    <EditableText cmsKey="upgrade_chapters_included_label" as="span" />
                  </h4>
                  <ul className="space-y-1.5">
                    {chapters.map((ch) => {
                      const included = canAccessChapter(
                        tier.id,
                        ch.chapterNumber,
                      );

                      return (
                        <li
                          key={ch.id}
                          className={`flex items-center gap-2 text-xs ${
                            included ? "text-[#e8e6e1]/80" : "text-[#e8e6e1]/35"
                          }`}
                        >
                          {included ? (
                            <EditableIcon
                              cmsKey={`upgrade_${tier.id}_checkmark_color`}
                              icon={Check}
                              defaultColor={colors.accent}
                              size={14}
                              className="w-3.5 h-3.5 shrink-0 check-glow"
                            />
                          ) : (
                            <Lock className="w-3 h-3 text-[#e8e6e1]/30 shrink-0" />
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

      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 text-center">
        <p className="text-sm text-[#e8e6e1]/80 leading-relaxed">
          <EditableText cmsKey="upgrade_notice_text" as="span" />
        </p>
      </div>

      <div className="text-center text-xs text-[#e8e6e1]/75 py-4">
        <EditableText cmsKey="upgrade_footer_text" as="span" />
      </div>
    </div>
  );
}
