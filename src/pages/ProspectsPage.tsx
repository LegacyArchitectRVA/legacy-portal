import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  Plus,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const STATUSES = [
  { id: "new", label: "New", color: "text-sky-400" },
  { id: "contacted", label: "Contacted", color: "text-amber-400" },
  { id: "follow_up", label: "Follow Up", color: "text-purple-400" },
  { id: "converted", label: "Converted", color: "text-emerald-400" },
  { id: "inactive", label: "Inactive", color: "text-[#e8e6e1]/50" },
] as const;

function statusMeta(id: string) {
  return STATUSES.find((s) => s.id === id) || STATUSES[0];
}

export default function ProspectsPage() {
  const navigate = useNavigate();
  const prospects = useQuery(api.prospects.listProspects);
  const addProspect = useMutation(api.prospects.addProspect);
  const updateProspect = useMutation(api.prospects.updateProspect);
  const deleteProspect = useMutation(api.prospects.deleteProspect);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  const filtered = (prospects || []).filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );

  const handleAdd = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setAdding(true);
    setError("");
    try {
      await addProspect({
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        source: source.trim() || undefined,
      });
      setName("");
      setEmail("");
      setPhone("");
      setSource("");
      setShowAdd(false);
    } catch (err: any) {
      setError(err?.message || "Could not add prospect.");
    } finally {
      setAdding(false);
    }
  };

  const handleStatusChange = (prospectId: string, status: string) => {
    updateProspect({ prospectId: prospectId as Id<"prospects">, status: status as any });
  };

  const handleSaveNote = (prospectId: string) => {
    const notes = noteDrafts[prospectId];
    if (notes === undefined) return;
    updateProspect({ prospectId: prospectId as Id<"prospects">, notes });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-sm text-[#e8e6e1]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </button>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">Prospects</h1>
          <p className="text-[#e8e6e1]/75 mt-1 text-sm">Referral leads and contacts, before they're clients</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`text-[10px] px-3 py-1.5 rounded-full font-heading transition-colors ${
            statusFilter === "all" ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"
          }`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s.id}
            onClick={() => setStatusFilter(s.id)}
            className={`text-[10px] px-3 py-1.5 rounded-full font-heading transition-colors ${
              statusFilter === s.id ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {prospects === undefined ? (
        <Loader2 className="w-5 h-5 animate-spin text-gold-muted" />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-[#e8e6e1]/75">
          <User className="w-8 h-8 opacity-40" />
          <p className="text-sm">No prospects {statusFilter !== "all" ? `in "${statusMeta(statusFilter).label}"` : "yet"}.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => {
            const meta = statusMeta(p.status);
            const isOpen = expandedId === p._id;
            return (
              <div key={p._id} className="bg-[#0a0a0a] border border-gold-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedId(isOpen ? null : p._id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
                    <span className="text-gold-primary text-xs font-heading">
                      {p.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#e8e6e1] font-medium truncate">{p.name}</p>
                    <p className="text-xs text-[#e8e6e1]/75 truncate">
                      {p.source || p.email || p.phone || "No details yet"}
                    </p>
                  </div>
                  <span className={`text-[10px] font-heading shrink-0 ${meta.color}`}>{meta.label}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-gold-border/20 p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-[#e8e6e1]/85">
                        <Mail className="w-3.5 h-3.5 text-gold-muted shrink-0" />
                        {p.email || "No email"}
                      </div>
                      <div className="flex items-center gap-2 text-[#e8e6e1]/85">
                        <Phone className="w-3.5 h-3.5 text-gold-muted shrink-0" />
                        {p.phone || "No phone"}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1">
                        Status
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {STATUSES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => handleStatusChange(p._id, s.id)}
                            className={`text-[10px] px-2.5 py-1 rounded-full transition-colors ${
                              p.status === s.id
                                ? "bg-gold-dark/25 text-gold-primary"
                                : "bg-black/40 text-[#e8e6e1]/75 hover:text-[#e8e6e1]"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1">
                        Notes
                      </label>
                      <textarea
                        defaultValue={p.notes || ""}
                        onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [p._id]: e.target.value }))}
                        onBlur={() => handleSaveNote(p._id)}
                        placeholder="Conversation history, follow-up plans..."
                        className="w-full bg-black border border-gold-border/30 rounded-lg p-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none resize-y min-h-[70px]"
                      />
                    </div>

                    <button
                      onClick={() => deleteProspect({ prospectId: p._id })}
                      className="flex items-center gap-1.5 text-[10px] text-red-400/80 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70"
          onClick={() => setShowAdd(false)}
        >
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm text-gold-primary">Add Prospect</h2>
              <button onClick={() => setShowAdd(false)} className="text-[#e8e6e1]/75">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
            />
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Source (e.g. Referral - Zac, Nextdoor)"
              className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              onClick={handleAdd}
              disabled={adding}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-lg disabled:opacity-50"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Prospect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
