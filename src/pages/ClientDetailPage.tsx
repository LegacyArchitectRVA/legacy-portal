import {
  RiCheckboxCircleLine as CheckCircle2,
  RiExternalLinkLine as ExternalLink,
  RiLoader4Line as Loader2,
  RiMailLine as Mail,
  RiChat3Line as MessageSquare,
  RiAttachment2 as Paperclip,
  RiScalesLine as Scale,
  RiSendPlaneLine as Send,
  RiDeleteBinLine as Trash2,
} from "@remixicon/react";
import { useAction, useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Phone,
  User,
  CloseCircle as XCircle,
} from "reicon-react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { getErrorMessage } from "../lib/utils";

const CAL_LINK = "https://cal.com/legacyarchitectrva/discovery-call";

export default function ClientDetailPage() {
  const { clientUserId } = useParams<{ clientUserId: string }>();
  const navigate = useNavigate();
  const id = clientUserId as Id<"users">;

  const detail = useQuery(api.crm.getClientDetail, { clientUserId: id });
  const progress = useQuery(api.crm.getClientProgressSummary, {
    clientUserId: id,
  });
  const notes = useQuery(api.crm.getClientNotes, { clientUserId: id });
  const addNote = useMutation(api.crm.addClientNote);
  const deleteNote = useMutation(api.crm.deleteClientNote);
  const sendMessage = useMutation(api.messages.sendMessage);
  const markReviewComplete = useMutation(api.admin.markReviewComplete);
  const generateAttachmentUploadUrl = useMutation(
    api.hubspot.generateNoteAttachmentUploadUrl,
  );
  const addNoteToHubSpot = useAction(api.hubspot.addNoteToHubSpot);

  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [markingReview, setMarkingReview] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [hsNoteText, setHsNoteText] = useState("");
  const [hsFile, setHsFile] = useState<File | null>(null);
  const [hsSending, setHsSending] = useState(false);
  const [hsMessage, setHsMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const hsFileRef = useRef<HTMLInputElement>(null);

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
        <p className="text-sm text-[#f2ede2]/75">Client not found.</p>
        <button
          onClick={() => navigate("/admin")}
          className="text-gold-primary text-sm mt-2"
        >
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

  const handleAddHubSpotNote = async () => {
    if (!hsNoteText.trim() && !hsFile) return;
    setHsSending(true);
    setHsMessage(null);
    try {
      let attachmentStorageId: Id<"_storage"> | undefined;
      if (hsFile) {
        const uploadUrl = await generateAttachmentUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": hsFile.type || "application/octet-stream",
          },
          body: hsFile,
        });
        if (!result.ok)
          throw new Error("File upload failed before it reached HubSpot.");
        const { storageId } = await result.json();
        attachmentStorageId = storageId;
      }
      const res = await addNoteToHubSpot({
        clientUserId: id,
        note: hsNoteText.trim(),
        attachmentStorageId,
        attachmentName: hsFile?.name,
      });
      setHsMessage({ text: res.message, isError: false });
      setHsNoteText("");
      setHsFile(null);
      if (hsFileRef.current) hsFileRef.current.value = "";
    } catch (err: any) {
      setHsMessage({
        text: getErrorMessage(err, "Couldn't reach HubSpot."),
        isError: true,
      });
    } finally {
      setHsSending(false);
      setTimeout(() => setHsMessage(null), 6000);
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
        className="flex items-center gap-2 text-sm text-[#f2ede2]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </button>

      {/* Header */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 flex items-center gap-4">
        {detail.profilePicUrl ? (
          <img
            src={detail.profilePicUrl}
            alt=""
            className="w-14 h-14 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
            <span className="text-gold-primary font-heading text-lg">
              {initials}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-xl text-[#f2ede2] break-words leading-tight">
            {detail.name || "Unnamed Client"}
          </h1>
          <p className="text-xs text-[#f2ede2]/75 break-all">{detail.email}</p>
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
              <span className="text-[10px] text-[#f2ede2]/75">
                Registered, not yet a client
              </span>
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
              onClick={() => navigate(`/dashboard?for=${id}`)}
              className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> Edit Life Manual
            </button>
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
      {actionMessage && (
        <p className="text-xs text-emerald-400">{actionMessage}</p>
      )}

      {/* Contact Info */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
          <User className="w-4 h-4" /> Contact Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-[#f2ede2]/85">
            <Mail className="w-3.5 h-3.5 text-gold-muted shrink-0" />
            <span className="break-all">{detail.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[#f2ede2]/85">
            <Phone className="w-3.5 h-3.5 text-gold-muted shrink-0" />
            <span>{detail.phone || "Not on file"}</span>
          </div>
        </div>
      </div>

      {/* Life Manual Progress */}
      {detail.isClient && (
        <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <FileText className="w-4 h-4" /> Life Manual Progress
          </h2>
          {progress === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
          ) : (
            <div className="space-y-2">
              {progress.map(p => (
                <div key={p.chapterId} className="text-xs">
                  <span className="text-[#f2ede2]/85">
                    Ch. {p.chapterNumber} · {p.title}
                  </span>
                  <span className="text-[#f2ede2]/60 block">
                    {p.sectionsStarted}/{p.totalSections} sections started
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Annual Review */}
      {detail.isClient &&
        detail.deliveryStatus === "delivered" &&
        detail.reviewDueDate && (
          <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
            <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Annual Review
            </h2>
            <p className="text-xs text-[#f2ede2]/80">
              {detail.lastReviewedAt ? "Last reviewed" : "Delivered"}{" "}
              {new Date(
                detail.lastReviewedAt || detail.deliveryTimestamp || 0,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              . Next review due{" "}
              {new Date(detail.reviewDueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              . Reminder emails go out automatically starting 30 days before
              this date.
            </p>
            <button
              onClick={async () => {
                setMarkingReview(true);
                try {
                  await markReviewComplete({ clientUserId: id });
                } finally {
                  setMarkingReview(false);
                }
              }}
              disabled={markingReview}
              className="flex items-center gap-2 bg-black border border-gold-border/40 text-[#f2ede2] font-heading text-sm font-semibold px-4 py-2 rounded-lg hover:border-gold-primary/60 transition-colors disabled:opacity-50"
            >
              {markingReview ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Mark Review Complete
            </button>
          </div>
        )}

      {/* Legal Documents */}
      {detail.isClient && detail.legalDocuments.length > 0 && (
        <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-2">
          <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
            <Scale className="w-4 h-4" /> Legal Documents
          </h2>
          {detail.legalDocuments.map(d => (
            <div
              key={d.documentType}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-[#f2ede2]/85">{d.documentType}</span>
              <span
                className={d.inForce ? "text-emerald-400" : "text-[#f2ede2]/50"}
              >
                {d.inForce ? "In Force" : "Not in force"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary">Notes</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddNote()}
            placeholder="Add a note about this client..."
            className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/50 focus:outline-none"
          />
          <button
            onClick={handleAddNote}
            disabled={addingNote || !noteText.trim()}
            className="bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-3 rounded-lg disabled:opacity-40 transition-colors"
          >
            {addingNote ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="space-y-2">
          {notes === undefined ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold-muted" />
          ) : notes.length === 0 ? (
            <p className="text-xs text-[#f2ede2]/75">No notes yet.</p>
          ) : (
            notes.map(n => (
              <div
                key={n._id}
                className="bg-black/40 rounded-lg p-3 flex items-start justify-between gap-2"
              >
                <div>
                  <p className="text-sm text-[#f2ede2]/90">{n.content}</p>
                  <p className="text-[10px] text-[#f2ede2]/50 mt-1">
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
                  className="text-[#f2ede2]/40 hover:text-red-400 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* HubSpot Notes */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
        <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
          Add to HubSpot
        </h2>
        <p className="text-xs text-[#f2ede2]/60 -mt-1">
          Posts directly to this contact's Notes timeline in HubSpot, separate
          from the internal notes above.
        </p>
        <textarea
          value={hsNoteText}
          onChange={e => setHsNoteText(e.target.value)}
          placeholder="Write a note to log in HubSpot..."
          rows={3}
          className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/50 focus:outline-none resize-none"
        />
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={hsFileRef}
            type="file"
            className="hidden"
            onChange={e => setHsFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={() => hsFileRef.current?.click()}
            className="flex items-center gap-1.5 text-xs text-[#f2ede2]/75 hover:text-gold-primary border border-gold-border/30 px-3 py-2 rounded-lg transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5" />
            {hsFile ? hsFile.name : "Attach a file"}
          </button>
          {hsFile && (
            <button
              onClick={() => {
                setHsFile(null);
                if (hsFileRef.current) hsFileRef.current.value = "";
              }}
              className="text-xs text-[#f2ede2]/50 hover:text-red-400"
            >
              Remove
            </button>
          )}
          <button
            onClick={handleAddHubSpotNote}
            disabled={hsSending || (!hsNoteText.trim() && !hsFile)}
            className="ml-auto flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg disabled:opacity-40 transition-colors"
          >
            {hsSending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {hsSending ? "Sending..." : "Send to HubSpot"}
          </button>
        </div>
        {hsMessage && (
          <p
            className={`text-xs ${hsMessage.isError ? "text-red-400" : "text-emerald-400"}`}
          >
            {hsMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}
