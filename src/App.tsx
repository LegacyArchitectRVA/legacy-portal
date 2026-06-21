import { Navigate, Route, Routes } from "react-router-dom";
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
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import UpgradePage from "./pages/UpgradePage";
import PaymentPage from "./pages/PaymentPage";
import AdminPage from "./pages/AdminPage";
import AdminVisualEditorPage from "./pages/AdminVisualEditorPage";
import HubSpotSettingsPage from "./pages/HubSpotSettingsPage";
import GeneratePage from "./pages/GeneratePage";
import IntroductionPage from "./pages/IntroductionPage";
import ManualViewPage from "./pages/ManualViewPage";
import DocumentConversionPage from "./pages/DocumentConversionPage";
import LegalPage from "./pages/LegalPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import { MobileMenuPage } from "./components/MobileMenuPage";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <Toaster />
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
              <Route path="/admin/client/:clientUserId" element={<ClientDetailPage />} />
              <Route path="/admin/visual-editor" element={<AdminVisualEditorPage />} />
              <Route path="/admin/hubspot" element={<HubSpotSettingsPage />} />
              <Route path="/generate" element={<GeneratePage />} />
              <Route path="/manual/:clientUserId" element={<ManualViewPage />} />
              <Route path="/convert" element={<DocumentConversionPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
