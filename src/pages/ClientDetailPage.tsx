import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Scale,
  Send,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const CAL_LINK = "https://cal.com/legacyarchitectrva/60min";

export default function ClientDetailPage() {
  const { clientUserId } = useParams<{ clientUserId: string }>();
  const navigate = useNavigate();
  const id = clientUserId as Id<"users">;

  const detail = useQuery(api.crm.getClientDetail, { clientUserId: id });
  const progress = useQuery(api.crm.getClientProgressSummary, { clientUserId: id });
  const notes = useQuery(api.crm.getClientNotes, { clientUserId: id });
  const addNote = useMutation(api.crm.addClientNote);
  const deleteNote = useMutation(api.crm.deleteClientNote);
  const sendMessage = useMutation(api.messages.sendMessage);

  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  if (detail === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-gold-muted" />
      </div>
    );
  }

  if (detail === null) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-sm text-[#e8e6e1]/75">Client not found.</p>
        <button onClick={() => navigate("/admin")} className="text-gold-primary text-sm mt-2">
          Back to Admin
        </button>
      </div>
    );
  }

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setAddingNote(true);
    try {
      await addNote({ clientUserId: id, content: noteText.trim() });
      setNoteText("");
    } finally {
      setAddingNote(false);
    }
  };

  const handleRequestMeeting = async () => {
    await sendMessage({
      content: `Hi${detail.name ? ` ${detail.name.split(" ")[0]}` : ""}, I'd like to schedule a short call. Here's a link to book a time that works for you: ${CAL_LINK}`,
      toUserId: id,
    });
    setActionMessage("Meeting request sent via message.");
    setTimeout(() => setActionMessage(null), 4000);
  };

  const initials = (detail.name || detail.email).slice(0, 2).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-sm text-[#e8e6e1]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </button>

      {/* Header */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 flex items-center gap-4">
        {detail.profilePicUrl ? (
          <img src={detail.profilePicUrl} alt="" className="w-14 h-14 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
            <span className="text-gold-primary font-heading text-lg">{initials}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-xl text-[#e8e6e1] truncate">{detail.name || detail.email}</h1>
          <p className="text-xs text-[#e8e6e1]/75 truncate">{detail.email}</p>
          <div className="flex items-center gap-2 mt-1.5">
            {detail.isClient ? (
              <>
                <span className="text-[10px] bg-gold-dark/20 text-gold-primary px-2 py-0.5 rounded-full capitalize">
                  {detail.tier}
                </span>
                {detail.isActivated ? (
                  <span className="text-[10px] flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-[10px] flex items-center gap-1 text-amber-400">
                    <XCircle className="w-3 h-3" /> Pending
                  </span>
                )}
              </>
            ) : (
              <span className="text-[10px] text-[#e8e6e1]/75">Registered, not yet a client</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate(`/messages?with=${id}`)}
          className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Send Message
        </button>
        <button
          onClick={handleRequestMeeting}
          className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" /> Request Meeting
        </button>
        {detail.isClient && (
          <>
            <button
              onClick={() => navigate(`/manual/${id}`)}
              className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> View Manual
            </button>
          </>
        )}
        {detail.hubspotId ? (
          <a
            href={`https://app.hubspot.com/contacts/0/contact/${detail.hubspotId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View in HubSpot
          </a>
        ) : null}
      </div>
      {actionMessage && <p className="text-xs text-emerald-400">{actionMessage}</p>}

      {/* Contact Info */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
          <User className="w-4 h-4" /> Contact Info
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-[#e8e6e1]/85">
            <Mail className="w-3.5 h-3.5 text-gold-muted shrink-0" />
            <span className="truncate">{detail.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[#e8e6e1]/85">
            <Phone className="w-3.5 h-3.5 text-gold-muted shrink-0" />
            <span>{detail.phone || "Not on file"}</span>
          </div>
        </div>
      </div>

      {/* Life Manual Progress */}
      {detail.isClient && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-3">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <FileText className="w-4 h-4" /> Life Manual Progress
          </h2>
          {progress === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
          ) : (
            <div className="space-y-2">
              {progress.map((p) => (
                <div key={p.chapterId} className="flex items-center justify-between text-xs">
                  <span className="text-[#e8e6e1]/85">
                    Ch. {p.chapterNumber} · {p.title}
                  </span>
                  <span className="text-[#e8e6e1]/75">
                    {p.sectionsStarted}/{p.totalSections} sections started
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legal Documents */}
      {detail.isClient && detail.legalDocuments.length > 0 && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-2">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <Scale className="w-4 h-4" /> Legal Documents
          </h2>
          {detail.legalDocuments.map((d) => (
            <div key={d.documentType} className="flex items-center justify-between text-xs">
              <span className="text-[#e8e6e1]/85">{d.documentType}</span>
              <span className={d.inForce ? "text-emerald-400" : "text-[#e8e6e1]/50"}>
                {d.inForce ? "In Force" : "Not in force"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary">Notes</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
            placeholder="Add a note about this client..."
            className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
          />
          <button
            onClick={handleAddNote}
            disabled={addingNote || !noteText.trim()}
            className="bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-3 rounded-lg disabled:opacity-40 transition-colors"
          >
            {addingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="space-y-2">
          {notes === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
          ) : notes.length === 0 ? (
            <p className="text-xs text-[#e8e6e1]/75">No notes yet.</p>
          ) : (
            notes.map((n) => (
              <div key={n._id} className="bg-black/40 rounded-lg p-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-[#e8e6e1]/90">{n.content}</p>
                  <p className="text-[10px] text-[#e8e6e1]/50 mt-1">
                    {new Date(n.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => deleteNote({ noteId: n._id })}
                  className="text-[#e8e6e1]/40 hover:text-red-400 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
