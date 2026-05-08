import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import FloatingChatButton from "./FloatingChatButton";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gold-dark/20 bg-black/95 backdrop-blur px-4 md:hidden">
          <SidebarTrigger className="text-gold-primary" />
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Legacy Architect RVA"
              className="w-7 h-7 rounded object-contain"
            />
            <span className="text-sm font-heading font-semibold text-gold-primary tracking-wide uppercase">
              Legacy Architect RVA
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
        <FloatingChatButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
