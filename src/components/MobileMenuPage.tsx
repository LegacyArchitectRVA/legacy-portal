import { useAuthActions } from "@convex-dev/auth/react";
import { ChapterIcon } from "./ChapterIcons";
import { useQuery } from "convex/react";
import { RiArrowRightSLine as ChevronRight, RiFileLine as File, RiLayoutGridLine as LayoutDashboard, RiLogoutBoxRLine as LogOut, RiChat3Line as MessageSquare, RiSettings3Line as Settings, RiShieldCheckLine as ShieldCheck, RiBookOpenLine as BookOpen, RiLineChartLine as TrendingUp, RiUserLine as User, RiTeamLine as Users, RiUserSettingsLine as UserCog, RiPaintBrushLine as PaintBrush, RiPlugLine as PlugsConnected, RiCloseLine as X } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { chapters } from "../data/chapters";
import { canAccessChapter } from "../data/tiers";
import { Avatar, AvatarFallback } from "./ui/avatar";

const chapterDotColors: Record<string, string> = {
  digital: "#3B82F6",
  emergency: "#F43F5E",
  financial: "#D4AF37",
  household: "#10B981",
  vitals: "#FFFFFF",
  context: "#A855F7",
  business: "#94A3B8",
};

const chapterShortNames: Record<string, string> = {
  digital: "Digital Life",
  emergency: "Emergency",
  financial: "Financial",
  household: "Household",
  vital: "Vital Records",
  context: "Legacy & Wishes",
  business: "Business",
};

function Row({
  icon,
  label,
  onClick,
  trailing,
  disabled,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  trailing?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-gold-dark/10 ${
        disabled ? "opacity-40" : "active:bg-gold-dark/10"
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1 text-sm text-[#e8e6e1]">{label}</span>
      {trailing}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-5 pb-2 font-heading text-[10px] tracking-widest text-gold-muted uppercase">
      {children}
    </div>
  );
}

export function MobileMenuPage() {
  const navigate = useNavigate();
  const { signOut } = useAuthActions();
  const profile = useQuery(api.profile.getMyProfile);
  const isAdmin = useQuery(api.admin.isAdmin);
  const unreadCount = useQuery(api.messages.getUnreadCount);
  const tier = profile?.tier || "vault";

  const go = (path: string) => navigate(path);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile?.email?.slice(0, 2).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 h-14 border-b border-gold-dark/20 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Legacy Architect RVA" className="w-8 h-8 rounded object-contain" />
          <span className="text-sm font-heading font-semibold text-gold-primary tracking-wide uppercase">
            Menu
          </span>
        </div>
        <button type="button" onClick={() => navigate(-1)} className="text-[#e8e6e1]/75 p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-visible">
        <SectionLabel>Overview</SectionLabel>
        <Row icon={<LayoutDashboard className="w-4 h-4 text-gold-muted" />} label="Dashboard" onClick={() => go("/dashboard")} />
        <Row icon={<User className="w-4 h-4 text-gold-muted" />} label="Profile" onClick={() => go("/profile")} />
        <Row
          icon={<MessageSquare className="w-4 h-4 text-gold-muted" />}
          label="Messages"
          onClick={() => go("/messages")}
          trailing={
            unreadCount && unreadCount > 0 ? (
              <span className="bg-gold-primary text-[#0a0a0a] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            ) : undefined
          }
        />

        <SectionLabel>Life Manual</SectionLabel>
        <Row icon={<BookOpen className="w-4 h-4 text-gold-muted" />} label="Introduction" onClick={() => go("/introduction")} />
        {chapters.map((ch) => {
          const accessible = isAdmin || canAccessChapter(tier, ch.chapterNumber);
          const dotColor = chapterDotColors[ch.id] || "#94A3B8";
          const shortName = chapterShortNames[ch.id] || ch.shortTitle;
          return (
            <Row
              key={ch.id}
              icon={<ChapterIcon chapterId={ch.id} color={accessible ? dotColor : `${dotColor}66`} size={16} />}
              label={`Ch. ${ch.chapterNumber} · ${shortName}`}
              disabled={!accessible}
              onClick={() => accessible && go(`/chapter/${ch.id}`)}
              trailing={
                !accessible ? (
                  <span className="text-[9px] bg-gold-dark/20 text-gold-muted px-1.5 py-0.5 rounded-full">
                    {ch.tier}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#e8e6e1]/40" />
                )
              }
            />
          );
        })}

        {!isAdmin && (
          <>
            <div className="px-4 pt-3">
              <div className="h-px bg-gold-dark/20" />
            </div>
            <Row
              icon={<TrendingUp className="w-4 h-4 text-gold-bright" />}
              label="Upgrade Plan"
              onClick={() => go("/upgrade")}
            />
          </>
        )}

        {isAdmin && (
          <>
            <SectionLabel>Admin</SectionLabel>
            <Row icon={<ShieldCheck className="w-4 h-4 text-gold-muted" />} label="Dashboard" onClick={() => go("/admin")} />
            <Row icon={<UserCog className="w-4 h-4 text-gold-muted" />} label="User Access" onClick={() => go("/admin/users")} />
            <Row icon={<Users className="w-4 h-4 text-gold-muted" />} label="Prospects" onClick={() => go("/admin/prospects")} />
            <Row icon={<TrendingUp className="w-4 h-4 text-gold-muted" />} label="Blueprint Sessions" onClick={() => go("/admin/blueprint")} />
            <Row icon={<BookOpen className="w-4 h-4 text-gold-muted" />} label="Generate Manual" onClick={() => go("/generate")} />
            <Row icon={<File className="w-4 h-4 text-gold-muted" />} label="Document Conversion" onClick={() => go("/convert")} />
            <Row icon={<PaintBrush className="w-4 h-4 text-gold-muted" />} label="Visual Editor" onClick={() => go("/admin/visual-editor")} />
            <Row icon={<PlugsConnected className="w-4 h-4 text-gold-muted" />} label="HubSpot Settings" onClick={() => go("/admin/hubspot")} />
          </>
        )}

        <SectionLabel>Account</SectionLabel>
        <Row
          icon={
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-gold-dark/20 text-gold-primary text-xs font-heading">
                {initials}
              </AvatarFallback>
            </Avatar>
          }
          label={
            <div className="flex flex-col">
              <span className="truncate">{profile?.email || "Loading..."}</span>
              {isAdmin ? (
                <span className="text-[10px] text-gold-bright">Administrator · Full Access</span>
              ) : profile?.tier ? (
                <span className="text-[10px] text-gold-muted capitalize">{profile.tier} Edition</span>
              ) : null}
            </div>
          }
        />
        <Row icon={<Settings className="w-4 h-4 text-gold-muted" />} label="Settings" onClick={() => go("/settings")} />
        <Row icon={<LogOut className="w-4 h-4 text-gold-muted" />} label="Sign Out" onClick={handleSignOut} />
      </div>
    </div>
  );
}
