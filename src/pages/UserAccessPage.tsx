import {
  RiErrorWarningLine as AlertTriangle,
  RiDeleteBinLine as DeleteIcon,
  RiLoader4Line as Loader2,
  RiMailSendLine as MailSend,
  RiLockUnlockLine as Unlock,
  RiTeamLine as Users,
  RiCloseLine as X,
} from "@remixicon/react";
import { useAction, useQuery } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Key as KeyRound,
  Search,
  ShieldCheck,
  UserAdd as UserPlus,
} from "reicon-react";
import { api } from "../../convex/_generated/api";
import { FullPageLoader } from "../components/FullPageLoader";
import { getErrorMessage } from "../lib/utils";

const TIERS = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
] as const;

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function UserAccessPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const users = useQuery(
    api.userAdmin.listUsersWithAccess,
    isAdmin ? {} : "skip",
  );
  const setTemporaryPassword = useAction(api.userAdmin.setTemporaryPassword);
  const sendPasswordResetEmail = useAction(
    api.userAdmin.sendPasswordResetEmail,
  );
  const unlockAccount = useAction(api.userAdmin.unlockAccount);
  const createAccountAdmin = useAction(api.userAdmin.createAccountAdmin);
  const deleteAccountAdmin = useAction(api.userAdmin.deleteAccountAdmin);
  const searchHubSpotContacts = useAction(api.hubspot.searchHubSpotContacts);

  const [busyUserId, setBusyUserId] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<
    "" | "temp" | "reset" | "unlock"
  >("");
  const [tempPasswordResult, setTempPasswordResult] = useState<{
    userId: string;
    password: string;
  } | null>(null);
  const [resultMessage, setResultMessage] = useState<{
    userId: string;
    text: string;
    isError: boolean;
  } | null>(null);

  // --- Create Account modal state ---
  const [showCreate, setShowCreate] = useState(false);
  const [createMode, setCreateMode] = useState<"scratch" | "hubspot">(
    "scratch",
  );
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPhone, setCreatePhone] = useState("");
  const [createTier, setCreateTier] = useState<"" | "personal" | "business">(
    "",
  );
  const [createHubspotId, setCreateHubspotId] = useState<string | undefined>(
    undefined,
  );
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createResult, setCreateResult] = useState<{
    email: string;
    password: string;
    emailSent: boolean;
  } | null>(null);

  const [hubspotQuery, setHubspotQuery] = useState("");
  const [hubspotSearching, setHubspotSearching] = useState(false);
  const [hubspotError, setHubspotError] = useState("");
  const [hubspotResults, setHubspotResults] = useState<
    Array<{ id: string; email: string; name: string; phone: string }>
  >([]);

  // --- Delete Account state (inline per-row confirm) ---
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [justDeletedEmail, setJustDeletedEmail] = useState<string | null>(null);

  if (isAdmin === undefined) {
    return <FullPageLoader />;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Users className="w-10 h-10 text-gold-muted mb-4" />
        <p className="text-[#f2ede2]/75">Admin access required.</p>
      </div>
    );
  }

  const handleSetTemporaryPassword = async (userId: string) => {
    setBusyUserId(userId);
    setBusyAction("temp");
    setTempPasswordResult(null);
    setResultMessage(null);
    try {
      const { temporaryPassword } = await setTemporaryPassword({
        targetUserId: userId as any,
      });
      setTempPasswordResult({ userId, password: temporaryPassword });
    } catch (err: any) {
      setResultMessage({
        userId,
        text: getErrorMessage(err, "Could not set a temporary password."),
        isError: true,
      });
    } finally {
      setBusyUserId(null);
      setBusyAction("");
    }
  };

  const handleSendResetEmail = async (userId: string, email: string) => {
    if (!email) {
      setResultMessage({
        userId,
        text: "This user has no email on file.",
        isError: true,
      });
      return;
    }
    setBusyUserId(userId);
    setBusyAction("reset");
    setResultMessage(null);
    try {
      await sendPasswordResetEmail({ targetUserId: userId as any });
      setResultMessage({
        userId,
        text: `New password emailed to ${email}.`,
        isError: false,
      });
    } catch (err: any) {
      setResultMessage({
        userId,
        text: getErrorMessage(err, "Could not send the reset email."),
        isError: true,
      });
    } finally {
      setBusyUserId(null);
      setBusyAction("");
    }
  };

  const handleUnlock = async (userId: string) => {
    setBusyUserId(userId);
    setBusyAction("unlock");
    setResultMessage(null);
    try {
      const { reactivated } = await unlockAccount({
        targetUserId: userId as any,
      });
      setResultMessage({
        userId,
        text: reactivated
          ? "Account reactivated and all sessions cleared."
          : "Sessions cleared. (Account was already active.)",
        isError: false,
      });
    } catch (err: any) {
      setResultMessage({
        userId,
        text: getErrorMessage(err, "Could not unlock this account."),
        isError: true,
      });
    } finally {
      setBusyUserId(null);
      setBusyAction("");
    }
  };

  const resetCreateForm = () => {
    setCreateMode("scratch");
    setCreateName("");
    setCreateEmail("");
    setCreatePhone("");
    setCreateTier("");
    setCreateHubspotId(undefined);
    setCreateError("");
    setCreateResult(null);
    setHubspotQuery("");
    setHubspotResults([]);
    setHubspotError("");
  };

  const closeCreateModal = () => {
    setShowCreate(false);
    resetCreateForm();
  };

  const handleHubSpotSearch = async () => {
    if (!hubspotQuery.trim()) return;
    setHubspotSearching(true);
    setHubspotError("");
    try {
      const { results } = await searchHubSpotContacts({
        query: hubspotQuery.trim(),
      });
      setHubspotResults(results);
    } catch (err: any) {
      setHubspotError(getErrorMessage(err, "HubSpot search failed."));
      setHubspotResults([]);
    } finally {
      setHubspotSearching(false);
    }
  };

  const pickHubSpotContact = (contact: {
    id: string;
    email: string;
    name: string;
    phone: string;
  }) => {
    setCreateName(contact.name);
    setCreateEmail(contact.email);
    setCreatePhone(contact.phone ? formatPhoneNumber(contact.phone) : "");
    setCreateHubspotId(contact.id);
  };

  const handleCreateAccount = async () => {
    setCreateError("");
    if (!createName.trim() || !createEmail.trim()) {
      setCreateError("Name and email are both required.");
      return;
    }
    setCreating(true);
    try {
      const result = await createAccountAdmin({
        name: createName.trim(),
        email: createEmail.trim(),
        phone: createPhone.trim() || undefined,
        tier: createTier || undefined,
        hubspotId: createHubspotId,
      });
      setCreateResult({
        email: createEmail.trim(),
        password: result.temporaryPassword,
        emailSent: result.emailSent,
      });
    } catch (err: any) {
      setCreateError(getErrorMessage(err, "Could not create this account."));
    } finally {
      setCreating(false);
    }
  };

  const startDelete = (userId: string) => {
    setDeletingUserId(userId);
    setDeleteConfirmEmail("");
    setDeleteError("");
  };

  const cancelDelete = () => {
    setDeletingUserId(null);
    setDeleteConfirmEmail("");
    setDeleteError("");
  };

  const handleDeleteAccount = async (userId: string) => {
    setDeleteBusy(true);
    setDeleteError("");
    try {
      const { deletedEmail } = await deleteAccountAdmin({
        targetUserId: userId as any,
        confirmEmail: deleteConfirmEmail.trim(),
      });
      setJustDeletedEmail(deletedEmail);
      setDeletingUserId(null);
      setDeleteConfirmEmail("");
      setTimeout(() => setJustDeletedEmail(null), 4000);
    } catch (err: any) {
      setDeleteError(getErrorMessage(err, "Could not delete this account."));
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">
            User Access
          </h1>
          <p className="text-[#f2ede2]/75 mt-1">
            Everyone with portal access. Create an account, set a temporary
            password, send a reset email, unlock an account, or delete one.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCreate(true)}
            className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Create Account
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="text-gold-primary hover:text-gold-bright text-sm whitespace-nowrap"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>

      {justDeletedEmail && (
        <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-lg bg-emerald-950/30 text-emerald-300 border border-emerald-900/40">
          <Check className="w-4 h-4 shrink-0" />
          {justDeletedEmail} and all of their Life Manual data has been deleted.
        </div>
      )}

      {users === undefined ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-gold-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {users.map(u => {
            const isBusy = busyUserId === u.userId;
            const isDeleting = deletingUserId === u.userId;
            const deleteEmailMatches =
              !!u.email &&
              deleteConfirmEmail.trim().toLowerCase() ===
                u.email.trim().toLowerCase();
            return (
              <div
                key={u.userId}
                className="bg-[#0f0c08] rounded-xl border border-gold-border p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm text-[#f2ede2] font-medium truncate">
                        {u.name || "(no name)"}
                      </p>
                      {u.isAdmin && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold-primary bg-gold-dark/15 px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" /> Admin
                        </span>
                      )}
                      {u.hasClientRecord && (
                        <span className="text-[10px] uppercase tracking-wider text-[#f2ede2]/75 bg-white/5 px-2 py-0.5 rounded-full capitalize">
                          {u.tier} {u.isActivated ? "· Active" : "· Pending"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#f2ede2]/75 truncate">
                      {u.email || "(no email)"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleSetTemporaryPassword(u.userId)}
                      disabled={isBusy}
                      className="flex items-center gap-1.5 text-xs bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isBusy && busyAction === "temp" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <KeyRound className="w-3.5 h-3.5" />
                      )}
                      Set Temporary Password
                    </button>
                    <button
                      onClick={() => handleSendResetEmail(u.userId, u.email)}
                      disabled={isBusy}
                      className="flex items-center gap-1.5 text-xs border border-gold-border/40 text-[#f2ede2] hover:border-gold-primary/60 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isBusy && busyAction === "reset" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <MailSend className="w-3.5 h-3.5" />
                      )}
                      Send Reset Email
                    </button>
                    <button
                      onClick={() => handleUnlock(u.userId)}
                      disabled={isBusy}
                      className="flex items-center gap-1.5 text-xs border border-gold-border/40 text-[#f2ede2] hover:border-gold-primary/60 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isBusy && busyAction === "unlock" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5" />
                      )}
                      Unlock Account
                    </button>
                    {!u.isAdmin && (
                      <button
                        onClick={() => startDelete(u.userId)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 text-xs border border-red-900/50 text-red-300 hover:bg-red-950/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <DeleteIcon className="w-3.5 h-3.5" />
                        Delete Account
                      </button>
                    )}
                  </div>
                </div>

                {tempPasswordResult?.userId === u.userId && (
                  <div className="flex items-center justify-between gap-3 bg-gold-dark/10 border border-gold-border/40 rounded-lg px-3 py-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold-muted">
                        Temporary password (shown once)
                      </p>
                      <p className="text-sm text-[#f2ede2] font-mono tracking-wide">
                        {tempPasswordResult.password}
                      </p>
                    </div>
                    <button
                      onClick={() => setTempPasswordResult(null)}
                      className="text-[#f2ede2]/75 hover:text-[#f2ede2]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {resultMessage?.userId === u.userId && (
                  <div
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                      resultMessage.isError
                        ? "bg-red-950/40 text-red-300 border border-red-900/50"
                        : "bg-emerald-950/30 text-emerald-300 border border-emerald-900/40"
                    }`}
                  >
                    {resultMessage.isError ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {resultMessage.text}
                  </div>
                )}

                {isDeleting && (
                  <div className="space-y-2 bg-red-950/20 border border-red-900/40 rounded-lg p-3">
                    <p className="text-xs text-red-300">
                      This permanently deletes the login, the client record,
                      every chapter of the Life Manual, messages, notes, and the
                      profile picture / family crest. This can't be undone. Type{" "}
                      <span className="font-mono">{u.email}</span> to confirm.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="text"
                        value={deleteConfirmEmail}
                        onChange={e => setDeleteConfirmEmail(e.target.value)}
                        placeholder="Type the email exactly"
                        className="flex-1 min-w-[200px] bg-black border border-red-900/50 rounded-lg px-3 py-2 text-xs text-[#f2ede2] focus:outline-none focus:border-red-600/60"
                      />
                      <button
                        onClick={() => handleDeleteAccount(u.userId)}
                        disabled={!deleteEmailMatches || deleteBusy}
                        className="flex items-center gap-1.5 text-xs bg-red-900/60 text-red-100 hover:bg-red-800/70 px-3 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {deleteBusy ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <DeleteIcon className="w-3.5 h-3.5" />
                        )}
                        Permanently Delete
                      </button>
                      <button
                        onClick={cancelDelete}
                        disabled={deleteBusy}
                        className="text-xs text-[#f2ede2]/75 hover:text-[#f2ede2] px-2 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                    {deleteError && (
                      <p className="text-xs text-red-300">{deleteError}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Account modal */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center"
          onClick={closeCreateModal}
        >
          <div
            className="bg-[#0f0c08] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] flex flex-col animate-modal-sheet"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gold-border/20 shrink-0">
              <h2 className="font-heading text-sm text-gold-primary">
                Create Account
              </h2>
              <button
                onClick={closeCreateModal}
                className="text-[#f2ede2]/75 hover:text-[#f2ede2]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {createResult ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-emerald-300 bg-emerald-950/30 border border-emerald-900/40 rounded-lg px-3 py-2">
                    <Check className="w-4 h-4 shrink-0" />
                    Account created for {createResult.email}.
                    {createResult.emailSent
                      ? " Their temporary password was emailed to them."
                      : " The welcome email could not be sent — hand them the password below directly."}
                  </div>
                  <div className="bg-gold-dark/10 border border-gold-border/40 rounded-lg px-3 py-2">
                    <p className="text-[10px] uppercase tracking-widest text-gold-muted">
                      Temporary password (shown once)
                    </p>
                    <p className="text-sm text-[#f2ede2] font-mono tracking-wide">
                      {createResult.password}
                    </p>
                  </div>
                  <button
                    onClick={closeCreateModal}
                    className="btn-gold w-full px-4 py-2.5 text-sm"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex rounded-lg border border-gold-border/30 overflow-hidden text-xs">
                    <button
                      onClick={() => setCreateMode("scratch")}
                      className={`flex-1 py-2 transition-colors ${
                        createMode === "scratch"
                          ? "bg-gold-dark/25 text-gold-primary"
                          : "text-[#f2ede2]/75 hover:text-[#f2ede2]"
                      }`}
                    >
                      From Scratch
                    </button>
                    <button
                      onClick={() => setCreateMode("hubspot")}
                      className={`flex-1 py-2 transition-colors ${
                        createMode === "hubspot"
                          ? "bg-gold-dark/25 text-gold-primary"
                          : "text-[#f2ede2]/75 hover:text-[#f2ede2]"
                      }`}
                    >
                      Import from HubSpot
                    </button>
                  </div>

                  {createMode === "hubspot" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={hubspotQuery}
                          onChange={e => setHubspotQuery(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter") handleHubSpotSearch();
                          }}
                          placeholder="Search HubSpot by name or email"
                          className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-xs text-[#f2ede2] focus:outline-none focus:border-gold-primary/40"
                        />
                        <button
                          onClick={handleHubSpotSearch}
                          disabled={hubspotSearching || !hubspotQuery.trim()}
                          className="flex items-center gap-1.5 text-xs bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 shrink-0"
                        >
                          {hubspotSearching ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Search className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      {hubspotError && (
                        <p className="text-xs text-red-300">{hubspotError}</p>
                      )}
                      {hubspotResults.length > 0 && (
                        <div className="border border-gold-border/20 rounded-lg divide-y divide-gold-border/10 max-h-40 overflow-y-auto">
                          {hubspotResults.map(c => (
                            <button
                              key={c.id}
                              onClick={() => pickHubSpotContact(c)}
                              className={`w-full text-left px-3 py-2 hover:bg-gold-dark/10 transition-colors ${
                                createHubspotId === c.id
                                  ? "bg-gold-dark/15"
                                  : ""
                              }`}
                            >
                              <p className="text-xs text-[#f2ede2]">{c.name}</p>
                              <p className="text-[10px] text-[#f2ede2]/75">
                                {c.email || "no email"}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                      {createHubspotId && (
                        <p className="text-[10px] text-gold-primary">
                          Contact selected — details filled in below.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-[#f2ede2]/80 mb-1 font-heading uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={createName}
                        onChange={e => setCreateName(e.target.value)}
                        className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none focus:border-gold-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#f2ede2]/80 mb-1 font-heading uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={createEmail}
                        onChange={e => setCreateEmail(e.target.value)}
                        className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none focus:border-gold-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#f2ede2]/80 mb-1 font-heading uppercase tracking-wider">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        value={createPhone}
                        onChange={e =>
                          setCreatePhone(formatPhoneNumber(e.target.value))
                        }
                        placeholder="(555) 123-4567"
                        className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/35 focus:outline-none focus:border-gold-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#f2ede2]/80 mb-1 font-heading uppercase tracking-wider">
                        Make Client (optional)
                      </label>
                      <select
                        value={createTier}
                        onChange={e =>
                          setCreateTier(e.target.value as typeof createTier)
                        }
                        className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none focus:border-gold-primary/40 cursor-pointer"
                      >
                        <option value="">
                          Login only, no client record yet
                        </option>
                        {TIERS.map(t => (
                          <option key={t.value} value={t.value}>
                            {t.label} Edition
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {createError && (
                    <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                      {createError}
                    </p>
                  )}

                  <button
                    onClick={handleCreateAccount}
                    disabled={
                      creating || !createName.trim() || !createEmail.trim()
                    }
                    className="btn-gold w-full px-4 py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {creating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-[#f2ede2]/60 text-center">
                    A temporary password is generated and emailed to them
                    automatically.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
