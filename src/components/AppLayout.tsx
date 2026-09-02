import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "reicon-react";
import { AppSidebar } from "./AppSidebar";
import FloatingChatButton from "./FloatingChatButton";
import { LegalDocsBar } from "./LegalDocsBar";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export function AppLayout() {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gold-dark/20 bg-black px-4 lg:hidden">
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="text-gold-primary p-1 -ml-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src="/logo.png"
              alt="Legacy Architect RVA"
              width={44}
              height={44}
              className="w-11 h-11 rounded object-contain"
            />
            <span className="text-sm font-heading font-semibold text-gold-primary tracking-wide uppercase truncate">
              Legacy Architect RVA
            </span>
          </div>
          <ThemeToggleButton />
        </header>
        <LegalDocsBar />
        <main className="flex-1 p-4 pb-24 md:p-6 md:pb-24 lg:p-8 lg:pb-24">
          <Outlet />
        </main>
        <FloatingChatButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
