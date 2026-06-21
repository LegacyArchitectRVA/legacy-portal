import { List as Menu } from "@phosphor-icons/react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import FloatingChatButton from "./FloatingChatButton";
import { LegalDocsBar } from "./LegalDocsBar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export function AppLayout() {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gold-dark/20 bg-black px-4 md:hidden">
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="text-gold-primary p-1 -ml-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Legacy Architect RVA"
              className="w-8 h-8 rounded object-contain"
            />
            <span className="text-sm font-heading font-semibold text-gold-primary tracking-wide uppercase">
              Legacy Architect RVA
            </span>
          </div>
        </header>
        <LegalDocsBar />
        <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-24">
          <Outlet />
        </main>
        <FloatingChatButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
