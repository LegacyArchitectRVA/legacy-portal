import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RiLoader4Line } from "@remixicon/react";
import { AppLayout } from "./components/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ChapterPage from "./pages/ChapterPage";
import IntroductionPage from "./pages/IntroductionPage";
import { MobileMenuPage } from "./components/MobileMenuPage";
import { ScrollToTop } from "./components/ScrollToTop";

// Less-frequently-visited or heavier pages are code-split so the core
// client flow (landing, login, dashboard, chapters) doesn't pay for their
// weight on first load. GeneratePage and DocumentConversionPage in
// particular carry a large amount of inline document-generation logic.
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const UpgradePage = lazy(() => import("./pages/UpgradePage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const UserAccessPage = lazy(() => import("./pages/UserAccessPage"));
const ClientDetailPage = lazy(() => import("./pages/ClientDetailPage"));
const ProspectsPage = lazy(() => import("./pages/ProspectsPage"));
const AdminVisualEditorPage = lazy(() => import("./pages/AdminVisualEditorPage"));
const HubSpotSettingsPage = lazy(() => import("./pages/HubSpotSettingsPage"));
const GeneratePage = lazy(() => import("./pages/GeneratePage"));
const ManualViewPage = lazy(() => import("./pages/ManualViewPage"));
const DocumentConversionPage = lazy(() => import("./pages/DocumentConversionPage"));
const BlueprintListPage = lazy(() => import("./pages/BlueprintListPage"));
const BlueprintSessionPage = lazy(() => import("./pages/BlueprintSessionPage"));
const ManualImportPage = lazy(() => import("./pages/ManualImportPage"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <RiLoader4Line className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <Toaster />
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* Protected app routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/menu" element={<MobileMenuPage />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/introduction" element={<IntroductionPage />} />
                <Route path="/chapter/:chapterId" element={<ChapterPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/upgrade" element={<UpgradePage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/users" element={<UserAccessPage />} />
                <Route path="/admin/client/:clientUserId" element={<ClientDetailPage />} />
                <Route path="/admin/prospects" element={<ProspectsPage />} />
                <Route path="/admin/blueprint" element={<BlueprintListPage />} />
                <Route path="/admin/blueprint/:sessionId" element={<BlueprintSessionPage />} />
                <Route path="/admin/import" element={<ManualImportPage />} />
                <Route path="/admin/visual-editor" element={<AdminVisualEditorPage />} />
                <Route path="/admin/hubspot" element={<HubSpotSettingsPage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/manual/:clientUserId" element={<ManualViewPage />} />
                <Route path="/convert" element={<DocumentConversionPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
