import {
  RiErrorWarningLine as AlertTriangle,
  RiCheckLine as Check,
  RiKeyLine as KeyRound,
  RiLoader4Line as Loader2,
  RiMailSendLine as MailSend,
  RiShieldCheckLine as ShieldCheck,
  RiLockUnlockLine as Unlock,
  RiTeamLine as Users,
  RiCloseLine as X,
} from "@remixicon/react";
import { useAction, useQuery } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { FullPageLoader } from "../components/FullPageLoader";

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
        text: err?.message || "Could not set a temporary password.",
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
        text: err?.message || "Could not send the reset email.",
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
        text: err?.message || "Could not unlock this account.",
        isError: true,
      });
    } finally {
      setBusyUserId(null);
      setBusyAction("");
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
            Everyone with portal access. Set a temporary password, send a reset
            email, or unlock an account.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="text-gold-primary hover:text-gold-bright text-sm"
        >
          Back to Admin Dashboard
        </button>
      </div>

      {users === undefined ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-gold-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {users.map(u => {
            const isBusy = busyUserId === u.userId;
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
