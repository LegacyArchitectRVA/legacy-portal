import { useAuthActions } from "@convex-dev/auth/react";
import { startRegistration, browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { useAction, useMutation, useQuery } from "convex/react";
import { RiErrorWarningLine as AlertTriangle, RiNotification3Line as Bell, RiCheckLine as Check, RiArrowRightSLine as ChevronRight, RiEyeLine as Eye, RiEyeOffLine as EyeOff, RiFingerprintLine as Fingerprint, RiFileTextLine as FileText, RiKeyLine as KeyRound, RiLoader4Line as Loader2, RiLogoutBoxRLine as LogOut, RiSmartphoneLine as MonitorSmartphone, RiShieldLine as Shield, RiShieldCheckLine as ShieldCheck, RiDeleteBinLine as Trash2, RiSunLine as Sun } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { Switch } from "../components/ui/switch";
import { EditableText } from "../components/EditableText";
import { useTheme } from "../contexts/ThemeContext";

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const profile = useQuery(api.profile.getMyProfile);
  const sessions = useQuery(api.security.getMySessions);
  const purgeAllData = useMutation(api.sections.purgeAllMyData);
  const updateNotificationPreference = useMutation(api.profile.updateNotificationPreference);
  const signOutOtherSessions = useAction(api.security.signOutOtherSessions);
  const { signIn } = useAuthActions();

  const [showPurge, setShowPurge] = useState(false);
  const [purging, setPurging] = useState(false);
  const [purgeResult, setPurgeResult] = useState<string | null>(null);

  const [notifSaving, setNotifSaving] = useState(false);
  const [signingOutOthers, setSigningOutOthers] = useState(false);
  const [signOutResult, setSignOutResult] = useState<string | null>(null);

  const [pwMode, setPwMode] = useState<"idle" | "code-sent">("idle");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwInfo, setPwInfo] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [passkeySupported, setPasskeySupported] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [passkeyError, setPasskeyError] = useState("");
  const [passkeySuccess, setPasskeySuccess] = useState("");
  const passkeys = useQuery(api.webauthn.listMyCredentials);
  const deletePasskey = useMutation(api.webauthn.deleteCredential);
  const getRegistrationOptions = useAction(api.webauthnNode.getRegistrationOptions);
  const verifyRegistration = useAction(api.webauthnNode.verifyRegistration);

  useEffect(() => {
    setPasskeySupported(browserSupportsWebAuthn());
  }, []);

  const handleAddPasskey = async () => {
    setPasskeyLoading(true);
    setPasskeyError("");
    setPasskeySuccess("");
    try {
      const { options, token } = await getRegistrationOptions({});
      const response = await startRegistration(options as any);
      await verifyRegistration({ token, response });
      setPasskeySuccess("Passkey added. You can now sign in with Face ID or your fingerprint.");
    } catch (err: any) {
      if (err?.name === "InvalidStateError") {
        setPasskeyError("This device already has a passkey for this account.");
      } else if (err?.name === "NotAllowedError") {
        setPasskeyError("Cancelled.");
      } else {
        setPasskeyError("Could not add a passkey. Try again.");
      }
    } finally {
      setPasskeyLoading(false);
    }
  };

  const handleDeletePasskey = async (id: string) => {
    try {
      await deletePasskey({ id: id as any });
    } catch {
      setPasskeyError("Could not remove that passkey.");
    }
  };

  const isTestAccount = profile?.email?.endsWith("@test.local");
  const otherSessionsCount = (sessions?.length || 0) - 1;

  const handleToggleNotifications = async (checked: boolean) => {
    setNotifSaving(true);
    try {
      await updateNotificationPreference({ emailNotifications: checked });
    } finally {
      setNotifSaving(false);
    }
  };

  const handleSignOutOthers = async () => {
    setSigningOutOthers(true);
    setSignOutResult(null);
    try {
      await signOutOtherSessions({});
      setSignOutResult("Signed out of all other devices.");
    } catch {
      setSignOutResult("Something went wrong. Try again.");
    } finally {
      setSigningOutOthers(false);
    }
  };

  const handleSendCode = async () => {
    if (!profile?.email) return;
    setPwLoading(true);
    setPwError("");
    setPwInfo("");
    try {
      await signIn("password", { email: profile.email, flow: "reset" });
      setPwInfo(`We sent a code to ${profile.email}.`);
      setPwMode("code-sent");
    } catch {
      setPwError("Could not send a code. Try again in a moment.");
    } finally {
      setPwLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.email) return;
    setPwLoading(true);
    setPwError("");
    try {
      await signIn("password", {
        email: profile.email,
        code,
        newPassword,
        flow: "reset-verification",
      });
      setPwInfo("Password updated.");
      setPwMode("idle");
      setCode("");
      setNewPassword("");
    } catch {
      setPwError("That code didn't work. Check it and try again.");
    } finally {
      setPwLoading(false);
    }
  };

  const handlePurge = async () => {
    setPurging(true);
    try {
      const result = await purgeAllData();
      setPurgeResult(`All data purged successfully. ${result.deleted} item(s) cleared.`);
      setTimeout(() => {
        setShowPurge(false);
        setPurgeResult(null);
      }, 3000);
    } catch {
      setPurgeResult("Error purging data. Please try again.");
    } finally {
      setPurging(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="font-heading text-3xl text-gold-gradient">
        <EditableText cmsKey="settings_title" as="span" />
      </h1>

      {/* Account Info */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary">Account</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-[#f2ede2]/75 uppercase tracking-widest">Name</p>
            <p className="text-sm text-[#f2ede2]">{profile?.name || "Not set"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-[#f2ede2]/75 uppercase tracking-widest">Email</p>
            <p className="text-sm text-[#f2ede2] break-all">{profile?.email || "Not set"}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#f2ede2]/75 uppercase tracking-widest">
              {profile?.isAdmin ? "Access" : "Tier"}
            </p>
            <p className="text-sm text-[#f2ede2] capitalize">
              {profile?.isAdmin ? "Administrator" : profile?.tier || "Vault"}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#f2ede2]/75 uppercase tracking-widest">Status</p>
            <p className="text-sm text-[#f2ede2]">{profile?.isActivated ? "Active" : "Pending"}</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-gold-primary" />
          <h2 className="font-heading text-sm text-gold-primary">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-sm text-[#f2ede2]">
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </p>
            <p className="text-xs text-[#f2ede2]/75 mt-0.5">
              {theme === "dark"
                ? "The classic gold-on-black look."
                : "Sand & Forest Green, a lighter alternative."}
            </p>
          </div>
          <Switch
            checked={theme === "light"}
            onCheckedChange={() => toggleTheme?.()}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gold-primary" />
          <h2 className="font-heading text-sm text-gold-primary">Notifications</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-sm text-[#f2ede2]">Email me about new messages</p>
            <p className="text-xs text-[#f2ede2]/75 mt-0.5">
              We'll only email you when you have an unread message in your portal.
            </p>
          </div>
          {profile === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
          ) : (
            <Switch
              checked={profile?.emailNotifications !== false}
              disabled={notifSaving}
              onCheckedChange={handleToggleNotifications}
            />
          )}
        </div>
      </div>

      {/* Security Center */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-primary" />
          <h2 className="font-heading text-sm text-gold-primary">Security Center</h2>
        </div>

        {/* Sessions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#f2ede2]">
            <MonitorSmartphone className="w-3.5 h-3.5 text-gold-muted" />
            Active Sessions
          </div>
          {sessions === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
          ) : (
            <>
              <p className="text-xs text-[#f2ede2]/75">
                Signed in on {sessions.length} device{sessions.length === 1 ? "" : "s"}.
              </p>
              <div className="space-y-1.5">
                {sessions.slice(0, 5).map((s) => (
                  <div
                    key={s._id}
                    className="flex items-center justify-between text-xs bg-black/40 rounded-lg px-3 py-2"
                  >
                    <span className="text-[#f2ede2]/85">
                      {s.isCurrent ? "This device" : "Another device"}
                    </span>
                    <span className="text-[#f2ede2]/75">{timeAgo(s.createdAt)}</span>
                  </div>
                ))}
              </div>
              {otherSessionsCount > 0 && (
                <button
                  onClick={handleSignOutOthers}
                  disabled={signingOutOthers}
                  className="flex items-center gap-2 text-xs bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 mt-2"
                >
                  {signingOutOthers ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <LogOut className="w-3.5 h-3.5" />
                  )}
                  Sign Out of Other Devices
                </button>
              )}
              {signOutResult && <p className="text-xs text-emerald-400">{signOutResult}</p>}
            </>
          )}
        </div>

        <div className="h-px bg-gold-border/15" />

        {/* Change Password */}
        {!isTestAccount && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#f2ede2]">
              <KeyRound className="w-3.5 h-3.5 text-gold-muted" />
              Password
            </div>
            {pwMode === "idle" ? (
              <>
                <p className="text-xs text-[#f2ede2]/75">
                  We'll send a one-time code to your email to confirm any change.
                </p>
                {pwInfo && <p className="text-xs text-emerald-400">{pwInfo}</p>}
                {pwError && (
                  <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{pwError}</p>
                )}
                <button
                  onClick={handleSendCode}
                  disabled={pwLoading}
                  className="flex items-center gap-2 text-xs bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {pwLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                  Change Password
                </button>
              </>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-3">
                {pwInfo && <p className="text-xs text-emerald-400">{pwInfo}</p>}
                <div>
                  <label className="block text-[10px] text-[#f2ede2]/75 uppercase tracking-widest mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-black border border-gold-border/40 rounded-lg px-3 py-2 text-sm text-[#f2ede2] tracking-widest focus:outline-none focus:border-gold-primary/50"
                    placeholder="6-digit code"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#f2ede2]/75 uppercase tracking-widest mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-black border border-gold-border/40 rounded-lg px-3 py-2 pr-9 text-sm text-[#f2ede2] focus:outline-none focus:border-gold-primary/50"
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#f2ede2]/75"
                    >
                      {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                {pwError && (
                  <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{pwError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={pwLoading}
                    className="flex items-center gap-2 text-xs bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    {pwLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPwMode("idle");
                      setPwError("");
                      setCode("");
                      setNewPassword("");
                    }}
                    className="text-xs text-[#f2ede2]/75 hover:text-[#f2ede2] px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="h-px bg-gold-border/15" />

        {/* Biometric login (passkeys) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#f2ede2]">
            <Fingerprint className="w-3.5 h-3.5 text-gold-muted" />
            Face ID / Fingerprint Sign-In
          </div>

          {!passkeySupported ? (
            <p className="text-xs text-[#f2ede2]/75">
              This device or browser doesn't support passkeys.
            </p>
          ) : (
            <>
              <p className="text-xs text-[#f2ede2]/75">
                Add a passkey to sign in with Face ID, fingerprint, or your device PIN,
                no email or password needed.
              </p>

              {passkeys === undefined ? (
                <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
              ) : passkeys.length > 0 ? (
                <div className="space-y-1.5">
                  {passkeys.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center justify-between text-xs bg-black/40 rounded-lg px-3 py-2"
                    >
                      <span className="text-[#f2ede2]/85">{p.name}</span>
                      <button
                        onClick={() => handleDeletePasskey(p._id)}
                        className="text-red-400/80 hover:text-red-400"
                        title="Remove this passkey"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              {passkeyError && (
                <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                  {passkeyError}
                </p>
              )}
              {passkeySuccess && <p className="text-xs text-emerald-400">{passkeySuccess}</p>}

              <button
                onClick={handleAddPasskey}
                disabled={passkeyLoading}
                className="flex items-center gap-2 text-xs bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {passkeyLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Fingerprint className="w-3.5 h-3.5" />
                )}
                Add a Passkey
              </button>
            </>
          )}
        </div>
      </div>

      {/* Legal */}
      <Link
        to="/legal"
        className="flex items-center justify-between bg-[#0f0c08] rounded-xl border border-gold-border p-5 hover:border-gold-primary/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gold-primary" />
          <span className="font-heading text-sm text-gold-primary">Privacy Policy & Terms of Service</span>
        </div>
        <ChevronRight className="w-4 h-4 text-[#f2ede2]/50" />
      </Link>

      {/* Zero-Knowledge Protocol */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-primary" />
          <h2 className="font-heading text-sm text-gold-primary">Zero-Knowledge Standard</h2>
        </div>
        <p className="text-xs text-[#f2ede2]/80 leading-relaxed">
          Legacy Architect RVA does not store or retain your credentials. All data is accessible
          only to you and can be purged at any time from this page.
        </p>
      </div>

      {/* Data Purge */}
      <div className="bg-[#0f0c08] rounded-xl border border-red-500/20 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h2 className="font-heading text-sm text-red-400">Danger Zone</h2>
        </div>
        <p className="text-xs text-[#f2ede2]/80 leading-relaxed">
          All data across all 7 chapters will be permanently deleted.
          This action cannot be undone.
        </p>

        {!showPurge ? (
          <button
            onClick={() => setShowPurge(true)}
            className="flex items-center gap-2 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Purge All Portal Data
          </button>
        ) : (
          <div className="space-y-3 bg-red-500/5 rounded-lg p-4 border border-red-500/20">
            <p className="text-sm text-red-400 font-medium">
              Are you sure? This will permanently delete all your Life Manual data.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePurge}
                disabled={purging}
                className="flex items-center gap-2 text-xs bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {purging ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                {purging ? "Purging..." : "Yes, Purge Everything"}
              </button>
              <button
                onClick={() => setShowPurge(false)}
                className="text-xs text-[#f2ede2]/80 hover:text-[#f2ede2]/80 px-4 py-2"
              >
                Cancel
              </button>
            </div>
            {purgeResult && (
              <p className="text-xs text-emerald-400">{purgeResult}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
