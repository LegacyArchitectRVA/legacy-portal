import { useQuery, useMutation } from "convex/react";
import { RiAddLine as Plus, RiArrowLeftLine as ArrowLeft, RiDraftLine as Draft, RiCheckboxCircleLine as Done, RiSendPlaneLine as Sent, RiDeleteBinLine as Trash2 } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const STATUS_BADGE: Record<string, { label: string; cls: string; Icon: any }> = {
  draft: { label: "Draft", cls: "text-[#e8e6e1]/70 bg-white/5", Icon: Draft },
  completed: { label: "Completed", cls: "text-emerald-300 bg-emerald-500/10", Icon: Done },
  delivered: { label: "Delivered", cls: "text-gold-primary bg-gold-dark/15", Icon: Sent },
};

export default function BlueprintListPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const sessions = useQuery(api.blueprint.listSessions, isAdmin ? {} : "skip");
  const createSession = useMutation(api.blueprint.createSession);
  const deleteSession = useMutation(api.blueprint.deleteSession);

  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (isAdmin === undefined) return null;
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }

  const handleCreate = async () => {
    if (!name.trim() || creating) return;
    setCreating(true);
    try {
      const id = await createSession({
        prospectName: name.trim(),
        prospectEmail: email.trim() || undefined,
      });
      navigate(`/admin/blueprint/${id}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin")} className="text-[#e8e6e1]/75 hover:text-gold-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">Blueprint Sessions</h1>
          <p className="text-xs text-[#e8e6e1]/75 mt-0.5">
            One sit-down. A Gap Map and a 72-hour plan. $249 credits toward any edition.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          New Session
        </button>
      </div>

      {sessions === undefined ? (
        <p className="text-sm text-[#e8e6e1]/75">Loading...</p>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-sm text-[#e8e6e1]/75">No sessions yet. Start one when the prospect sits down.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => {
            const badge = STATUS_BADGE[s.status] ?? STATUS_BADGE.draft;
            return (
              <div
                key={s._id}
                className="w-full bg-[#0a0a0a] border border-gold-border rounded-xl p-4 hover:border-gold-primary/40 transition-colors cursor-pointer group"
                onClick={() => navigate(`/admin/blueprint/${s._id}`)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-[#e8e6e1] font-medium truncate">{s.prospectName}</p>
                    <p className="text-xs text-[#e8e6e1]/75 mt-0.5">
                      {new Date(s.sessionDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {" · "}{s.assessedCount} assessed{" · "}
                      <span className={s.exposedCount > 0 ? "text-rose-400" : ""}>{s.exposedCount} exposed</span>
                      {" · "}{s.actionCount} plan steps
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`flex items-center gap-1 text-[10px] font-heading px-2 py-1 rounded-full ${badge.cls}`}>
                      <badge.Icon className="w-3 h-3" />
                      {badge.label}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirmDelete(s._id); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#e8e6e1]/50 hover:text-red-400"
                      title="Delete session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 animate-modal-backdrop" onClick={() => setShowNew(false)}>
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 space-y-4 animate-modal-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-sm text-gold-primary">New Blueprint Session</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading block mb-1">Prospect Name</label>
                <input
                  type="text" value={name} autoFocus
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="w-full bg-[#111111] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] focus:border-gold-primary/50 focus:outline-none"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading block mb-1">Email (optional)</label>
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="w-full bg-[#111111] border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] focus:border-gold-primary/50 focus:outline-none"
                  placeholder="their@email.com"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => setShowNew(false)} className="text-xs text-[#e8e6e1]/75 px-3 py-2">Cancel</button>
              <button
                onClick={handleCreate}
                disabled={!name.trim() || creating}
                className="btn-gold text-xs px-4 py-2 disabled:opacity-40"
              >
                {creating ? "Starting..." : "Start Session"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 animate-modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="bg-[#0a0a0a] border border-gold-border rounded-xl p-5 max-w-sm space-y-3 animate-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-[#e8e6e1]">Delete this session and its assessment? This can't be undone.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="text-xs text-[#e8e6e1]/75 px-3 py-1.5">Cancel</button>
              <button
                onClick={() => { deleteSession({ sessionId: confirmDelete as Id<"blueprintSessions"> }); setConfirmDelete(null); }}
                className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
