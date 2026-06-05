import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import {
  ChevronUp,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  User,
  File,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { chapters } from "../data/chapters";
import { canAccessChapter } from "../data/tiers";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";

// Chapter dot colors matching the original portal
const chapterDotColors: Record<string, string> = {
  digital: "#3B82F6",    // blue
  emergency: "#F43F5E",  // rose
  financial: "#D4AF37",  // gold
  household: "#10B981",  // emerald
  vital: "#FFFFFF",      // white
  context: "#A855F7",    // purple
  business: "#94A3B8",   // silver
};

// Short names matching original sidebar
const chapterShortNames: Record<string, string> = {
  digital: "Digital Access",
  emergency: "Emergency",
  financial: "Financial",
  household: "Household",
  vital: "Vital Records",
  context: "Context",
  business: "Business",
};

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuthActions();
  const { isMobile, setOpenMobile } = useSidebar();
  const profile = useQuery(api.profile.getMyProfile);
  const isAdmin = useQuery(api.admin.isAdmin);
  const unreadCount = useQuery(api.messages.getUnreadCount);
  const tier = profile?.tier || "vault";

  const navTo = (path: string) => {
    navigate(path);
    if (isMobile) setOpenMobile(false);
  };

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
    <Sidebar>
      <SidebarHeader className="p-4">
        <button
          type="button"
          onClick={() => navTo("/dashboard")}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.png"
            alt="Legacy Architect RVA"
            className="w-14 h-14 rounded-lg object-contain flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-heading font-semibold text-gold-primary tracking-wide uppercase leading-tight">
              Legacy Architect RVA
            </span>
            <span className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
              Client Portal
            </span>
          </div>
        </button>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* OVERVIEW Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-heading text-[10px] tracking-widest text-gold-muted uppercase">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/dashboard"}
                  onClick={() => navTo("/dashboard")}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/profile"}
                  onClick={() => navTo("/profile")}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/messages"}
                  onClick={() => navTo("/messages")}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                  {unreadCount && unreadCount > 0 ? (
                    <span className="ml-auto bg-gold-bright text-[#0a0a0a] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  ) : null}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* LIFE MANUAL Section - with colored dots */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-heading text-[10px] tracking-widest text-gold-muted uppercase">
            Life Manual
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Introduction */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/introduction"}
                  onClick={() => navTo("/introduction")}
                >
                  <BookOpen className="w-4 h-4 text-gold-muted" />
                  <span className="text-xs">Introduction</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {chapters.map((ch) => {
                const accessible = canAccessChapter(tier, ch.chapterNumber);
                const isActive = location.pathname === `/chapter/${ch.id}` ||
                  location.pathname.startsWith(`/chapter/${ch.id}/`);
                const dotColor = chapterDotColors[ch.id] || "#94A3B8";
                const shortName = chapterShortNames[ch.id] || ch.shortTitle;
                return (
                  <SidebarMenuItem key={ch.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => accessible && navTo(`/chapter/${ch.id}`)}
                      className={!accessible ? "opacity-40 cursor-not-allowed" : ""}
                    >
                      {/* Colored dot */}
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: dotColor,
                          boxShadow: accessible
                            ? `0 0 6px ${dotColor}80, 0 0 10px ${dotColor}40`
                            : "none",
                        }}
                      />
                      <span className="text-xs">
                        Ch. {ch.chapterNumber} · {shortName}
                      </span>
                      {!accessible && (
                        <span className="ml-auto text-[9px] bg-gold-dark/20 text-gold-muted px-1.5 py-0.5 rounded-full">
                          {ch.tier}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Upgrade Plan link */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/upgrade"}
                  onClick={() => navTo("/upgrade")}
                  className="my-1"
                >
                  <TrendingUp className="w-4 h-4 text-gold-bright" />
                  <span className="text-xs font-heading tracking-wide">Upgrade Plan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-1" />

        {/* ADMIN Section */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="font-heading text-[10px] tracking-widest text-gold-muted uppercase">
              Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={location.pathname === "/admin"}
                    onClick={() => navTo("/admin")}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={location.pathname.startsWith("/generate")}
                    onClick={() => navTo("/generate")}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Generate Manual</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={location.pathname === "/convert"}
                    onClick={() => navTo("/convert")}
                  >
                    <File className="w-4 h-4" />
                    <span>Document Conversion</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-14">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gold-dark/20 text-gold-primary text-xs font-heading">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-xs font-medium truncate w-full">
                      {profile?.email || "Loading..."}
                    </span>
                    {profile?.tier && (
                      <span className="text-[10px] text-gold-muted capitalize">
                        {profile.tier} Edition
                      </span>
                    )}
                  </div>
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem onClick={() => navTo("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navTo("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
