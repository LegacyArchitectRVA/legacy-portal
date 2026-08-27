import {
  RiLoader4Line as CircleNotch,
  RiTimeLine as Clock,
} from "@remixicon/react";
import {
  ArrowRight,
  Lock,
} from "reicon-react";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { ChapterIcon } from "../components/ChapterIcons";
import { EditableText } from "../components/EditableText";
import { FullPageLoader } from "../components/FullPageLoader";
import { LucideIcon } from "../components/LucideIcon";
import {
  shouldShowVaultEntrance,
  VaultEntrance,
} from "../components/VaultEntrance";
import { chapters } from "../data/chapters";
import { canAccessChapter, getTierByName } from "../data/tiers";

const tierColors: Record<string, { accent: string; label: string }> = {
  personal: { accent: "#c3cad1", label: "Personal" },
  business: { accent: "#e8c869", label: "Business" },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [schedulerLoaded, setSchedulerLoaded] = useState(false);
  const [showVault, setShowVault] = useState(() => shouldShowVaultEntrance());
  useEffect(() => {
    const timer = setTimeout(() => setSchedulerLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);
  const onBehalfOf = searchParams.get("for") as Id<"users"> | null;
  const isAdmin = useQuery(api.admin.isAdmin);
  const editingClient = useQuery(
    api.crm.getClientDetail,
    onBehalfOf && isAdmin ? { clientUserId: onBehalfOf } : "skip",
  );
  const editingClientProgress = useQuery(
    api.crm.getClientProgressSummary,
    onBehalfOf && isAdmin ? { clientUserId: onBehalfOf } : "skip",
  );
  const myProfile = useQuery(api.profile.getMyProfile);
  const myProgress = useQuery(api.sections.getProgress);

  const profile =
    onBehalfOf && editingClient
      ? {
          name: editingClient.name,
          tier: editingClient.tier,
          isActivated: true,
        }
      : myProfile;
  const progress =
    onBehalfOf && editingClientProgress
      ? Object.fromEntries(
          editingClientProgress.map(p => [
            p.chapterId,
            { rows: 0, fields: p.rowsAndFieldsCompleted },
          ]),
        )
      : myProgress;

  const tier = profile?.tier || "personal";
  const tierInfo = getTierByName(tier);
  // Agreement gate removed — portal is usable immediately after signup.

  const deliveryStatus =
    profile && "deliveryStatus" in profile ? profile.deliveryStatus : undefined;
  const deliveryDate =
    profile && "deliveryDate" in profile ? profile.deliveryDate : undefined;

  const getPurgeCountdown = () => {
    if (deliveryStatus !== "delivered" || !deliveryDate) return null;
    const deliveredAt = new Date(deliveryDate).getTime();
    const purgeAt = deliveredAt + 72 * 60 * 60 * 1000;
    const now = Date.now();
    const remaining = purgeAt - now;
    if (remaining <= 0) return "Purge complete";
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m remaining`;
  };
  const purgeCountdown = getPurgeCountdown();

  const nextTier = tier === "personal" ? getTierByName("business") : null;

  const chapterProgress = chapters.map(ch => {
    const fieldCount = ch.subSections.reduce(
      (s, sec) =>
        s + (sec.tableColumns?.length || 0) + (sec.fields?.length || 0),
      0,
    );
    const chProgress = progress?.[ch.id];
    const completed = chProgress
      ? (chProgress.rows || 0) + (chProgress.fields || 0)
      : 0;
    const pct = fieldCount > 0 ? Math.round((completed / fieldCount) * 100) : 0;
    return { ...ch, fieldCount, completed, pct };
  });

  if (myProfile === undefined || isAdmin === undefined) {
    return <FullPageLoader />;
  }

  return (
    <>
      {showVault && <VaultEntrance onComplete={() => setShowVault(false)} />}
      <div className="max-w-5xl mx-auto space-y-6">
        {onBehalfOf && editingClient && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-xs text-amber-300">
              Editing {editingClient.name || editingClient.email}'s Life Manual
              on their behalf.
            </p>
            <button
              onClick={() => navigate(`/admin/client/${onBehalfOf}`)}
              className="text-xs text-amber-200 hover:text-amber-100 underline shrink-0"
            >
              Done
            </button>
          </div>
        )}
        <div>
          <h1 className="text-xl md:text-3xl font-bold tracking-tight font-heading">
            <EditableText cmsKey="dashboard_welcome" as="span" />
            {profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground mt-1">
            <EditableText cmsKey="dashboard_description" as="span" />
          </p>
        </div>

        {isAdmin && !onBehalfOf ? (
          <div className="relative z-10 flex items-center gap-4 rounded-lg border border-[#e8c869]/20 bg-gradient-to-r from-[#e8c869]/[0.06] to-transparent p-3 md:p-4">
            <div className="w-14 h-14 rounded-lg bg-[#e8c869]/[0.08] border border-[#e8c869]/25 flex items-center justify-center shrink-0">
              <LucideIcon
                name="KeyRound"
                size={28}
                className="text-[#e8c869]"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-[#e8c869] font-heading">
                Administrator · Full Access
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                All 7 chapters unlocked, no tier restrictions
              </p>
            </div>
          </div>
        ) : (
          tierInfo && (
            <div className="relative z-10 flex items-center gap-4 rounded-lg border border-[#e8c869]/20 bg-gradient-to-r from-[#e8c869]/[0.06] to-transparent p-3 md:p-4">
              <div
                className="w-14 h-14 rounded-lg border flex items-center justify-center shrink-0 font-heading text-lg"
                style={{
                  color: tierColors[tier]?.accent || tierColors.personal.accent,
                  borderColor: `${tierColors[tier]?.accent || tierColors.personal.accent}40`,
                  backgroundColor: `${tierColors[tier]?.accent || tierColors.personal.accent}14`,
                }}
              >
                {tierInfo.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[#e8c869] font-heading">
                  {tierInfo.name} Edition
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tierInfo.chaptersUnlocked.length} of 7 chapters unlocked
                  {nextTier && (
                    <span>
                      {" · "}
                      <Link
                        to="/upgrade"
                        className="text-[#e8c869] hover:underline"
                      >
                        Upgrade to {nextTier.name}
                      </Link>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )
        )}

        {deliveryStatus === "delivered" && (
          <div className="relative z-10 rounded-lg border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.06] to-transparent p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="size-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-sm text-amber-400 font-heading">
                  Life Manual Delivered
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Your manual has been delivered. Per the zero-knowledge
                  protocol, all portal data will be automatically purged.
                </p>
                {purgeCountdown && (
                  <p className="text-sm font-heading text-amber-400 mt-2 tracking-wider">
                    ⏱ {purgeCountdown}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex items-center gap-3 rounded-lg border border-gold-border bg-black/50 p-3 md:p-4">
          <div className="size-10 rounded-lg bg-gold-dark/10 border border-gold-border flex items-center justify-center shrink-0">
            <LucideIcon
              name="ShieldCheck"
              size={20}
              className="text-gold-primary"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-gold-primary font-heading">
              Zero-Knowledge Standard
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              All data is purged 72 hours after your Life Manual is delivered.
              No passwords, recovery codes, or sensitive credentials are ever
              stored.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-lg text-[#f2ede2]">Progress</h2>
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {chapterProgress.map(ch => {
              const accessible =
                isAdmin || canAccessChapter(tier, ch.chapterNumber);
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() =>
                    accessible &&
                    navigate(
                      `/chapter/${ch.id}${onBehalfOf ? `?for=${onBehalfOf}` : ""}`,
                    )
                  }
                  className={`group flex flex-col items-center gap-2 rounded-lg p-2 md:p-3 transition-all duration-300 ${
                    accessible
                      ? "hover:bg-white/[0.02] cursor-pointer"
                      : "opacity-30 cursor-not-allowed"
                  }`}
                  disabled={!accessible}
                  title={`Ch. ${ch.chapterNumber}: ${ch.shortTitle}: ${ch.pct}%`}
                >
                  <div
                    className="relative w-8 md:w-10 h-24 md:h-32 rounded-md border overflow-hidden"
                    style={{
                      borderColor: accessible
                        ? `${ch.color}40`
                        : `${ch.color}20`,
                      background: "rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out rounded-b-sm"
                      style={{
                        height: `${ch.pct}%`,
                        background: `linear-gradient(to top, ${ch.color}, ${ch.color}88)`,
                        boxShadow:
                          ch.pct > 0
                            ? `0 0 8px ${ch.color}50, 0 -2px 12px ${ch.color}30, inset 0 0 10px ${ch.color}20`
                            : "none",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-[9px] md:text-[10px] font-heading font-bold drop-shadow-lg"
                        style={{ color: ch.pct > 40 ? "#000" : "#f2ede2" }}
                      >
                        {ch.pct}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="size-2 md:size-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: accessible ? ch.color : `${ch.color}40`,
                      boxShadow: accessible ? `0 0 6px ${ch.color}60` : "none",
                    }}
                  />
                  <span className="text-[9px] md:text-[10px] text-muted-foreground font-heading text-center leading-tight whitespace-nowrap">
                    Ch. {ch.chapterNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading text-lg text-[#f2ede2]">
            Schedule a Meeting
          </h2>
          <div
            className="rounded-lg border border-gold-border overflow-hidden relative"
            style={{ minHeight: 500 }}
          >
            {!schedulerLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black">
                <CircleNotch className="w-6 h-6 animate-spin text-gold-primary" />
                <p className="text-xs text-[#f2ede2]/60">Loading scheduler…</p>
              </div>
            )}
            <iframe
              src="https://cal.com/legacyarchitectrva/discovery-call?embed=true&theme=dark"
              width="100%"
              height="500"
              frameBorder="0"
              title="Schedule a meeting with Legacy Architect RVA"
              className="bg-black"
              style={{ minHeight: 500 }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-lg text-[#f2ede2]">Chapters</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {chapterProgress.map(ch => {
              const accessible =
                isAdmin || canAccessChapter(tier, ch.chapterNumber);

              if (!accessible) {
                const requiredTier = getTierByName(ch.tier);
                return (
                  <div
                    key={ch.id}
                    className="rounded-lg border border-gold-border/20 bg-black/40 p-4 opacity-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <ChapterIcon
                          chapterId={ch.id}
                          color={`${ch.color}80`}
                          size={18}
                        />
                        <div>
                          <span
                            className="text-sm font-heading"
                            style={{ fontWeight: 600 }}
                          >
                            Ch. {ch.chapterNumber} · {ch.shortTitle}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Requires {requiredTier?.name || ch.tier} Edition
                          </p>
                        </div>
                      </div>
                      <Lock className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={ch.id}
                  className="group rounded-lg border border-gold-border bg-[#0f0c08] hover:border-[#e8c869]/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(232, 200, 105,0.04)] overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ChapterIcon
                          chapterId={ch.id}
                          color={ch.color}
                          size={20}
                          className="animate-pulse-slow"
                          style={{
                            filter: `drop-shadow(0 0 5px ${ch.color}90)`,
                          }}
                        />
                        <div>
                          <p
                            className="text-sm font-heading"
                            style={{ fontWeight: 600 }}
                          >
                            Ch. {ch.chapterNumber} ·{" "}
                            <EditableText
                              cmsKey={`chapter_${ch.id}_shorttitle`}
                              fallback={ch.shortTitle}
                              as="span"
                            />
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ch.completed}/{ch.fieldCount} fields
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gold-gradient font-heading">
                        {ch.pct}%
                      </span>
                    </div>

                    <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.max(ch.pct, 2)}%`,
                          background: `linear-gradient(90deg, ${ch.color}88, ${ch.color})`,
                          boxShadow: `0 0 8px ${ch.color}60, 0 0 16px ${ch.color}30`,
                        }}
                      />
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      <EditableText
                        cmsKey={`chapter_${ch.id}_chapterdesc`}
                        fallback={ch.description}
                        as="span"
                      />
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/chapter/${ch.id}${onBehalfOf ? `?for=${onBehalfOf}` : ""}`,
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-[#e8c869]/15 hover:bg-[#e8c869]/5 hover:border-[#e8c869]/25 text-[#f2ede2]/80 hover:text-[#f2ede2] transition-all duration-300 text-[11px] font-heading tracking-[1px] uppercase group/btn"
                    >
                      <span>
                        {ch.completed > 0 ? "Continue" : "Get Started"}
                      </span>
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
