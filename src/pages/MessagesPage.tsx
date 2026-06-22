import { useQuery, useMutation } from "convex/react";
import { RiSendPlaneLine as Send, RiCheckDoubleLine as CheckCheck, RiDeleteBinLine as Trash2, RiArrowLeftLine as ArrowLeft, RiChat3Line as MessageSquare, RiAddLine as Plus, RiCloseLine as X } from "@remixicon/react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

function formatTime(ts: number) {
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function MessageBubble({
  msg,
  isMe,
  onDelete,
}: {
  msg: { _id: string; content: string; createdAt: number; isRead: boolean };
  isMe: boolean;
  onDelete: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
      <div className="flex items-end gap-1.5 max-w-[85%]">
        {isMe && (
          <button
            onClick={() => setConfirmDelete(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#e8e6e1]/50 hover:text-red-400 mb-1 shrink-0"
            title="Remove message"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
        <div
          className={`rounded-xl px-4 py-2.5 ${
            isMe ? "bg-[#d9cca0] text-[#0a0a0a]" : "bg-[#1a1a1a] text-[#e8e6e1]"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
          <div
            className={`flex items-center gap-1 mt-1 text-[10px] ${
              isMe ? "text-[#0a0a0a]/70" : "text-[#e8e6e1]/85"
            }`}
          >
            <span>{formatTime(msg.createdAt)}</span>
            {isMe && msg.isRead && <CheckCheck className="w-3 h-3" />}
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 animate-modal-backdrop" onClick={() => setConfirmDelete(false)}>
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-xl p-5 max-w-sm space-y-3 animate-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-[#e8e6e1]">Remove this message? This can't be undone.</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-[#e8e6e1]/75 px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(msg._id);
                  setConfirmDelete(false);
                }}
                className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Thread({
  messages,
  myUserId,
  onSend,
  onDelete,
}: {
  messages: any[];
  myUserId: string | undefined;
  onSend: (text: string) => void;
  onDelete: (id: string) => void;
}) {
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 pr-2 pb-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-[#e8e6e1]/80 text-sm">
            No messages yet. Send a message to get started.
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            isMe={msg.fromUserId === myUserId}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-[rgba(217,204,160,0.08)]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-[#111111] border border-[rgba(217,204,160,0.1)] rounded-xl px-4 py-3 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/80 focus:outline-none focus:border-[#d9cca0]/30"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim()}
          className="btn-gold w-10 h-10 flex items-center justify-center disabled:opacity-30 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

export default function MessagesPage() {
  const profile = useQuery(api.profile.getMyProfile);
  const sendMessage = useMutation(api.messages.sendMessage);
  const deleteMessage = useMutation(api.messages.deleteMessage);
  const markAllRead = useMutation(api.messages.markAllRead);
  const markThreadRead = useMutation(api.messages.markThreadRead);

  const isAdmin = profile?.isAdmin;
  const [searchParams] = useSearchParams();
  const deepLinkClientId = searchParams.get("with");
  const [selectedClient, setSelectedClient] = useState<string | null>(deepLinkClientId);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const conversations = useQuery(api.messages.getConversations, isAdmin ? {} : "skip");
  const messageableUsers = useQuery(api.messages.listMessageableUsers, isAdmin ? {} : "skip");
  const adminThread = useQuery(
    api.messages.getThreadWithClient,
    isAdmin && selectedClient ? { clientUserId: selectedClient as Id<"users"> } : "skip"
  );
  const clientMessages = useQuery(api.messages.getMyMessages, !isAdmin ? {} : "skip");

  useEffect(() => {
    if (!isAdmin) markAllRead();
  }, [isAdmin, clientMessages, markAllRead]);

  useEffect(() => {
    if (isAdmin && selectedClient) {
      markThreadRead({ clientUserId: selectedClient as Id<"users"> });
    }
  }, [isAdmin, selectedClient, adminThread, markThreadRead]);

  const handleDelete = (messageId: string) => {
    deleteMessage({ messageId: messageId as Id<"messages"> });
  };

  // --- Admin: conversation list ---
  if (isAdmin && !selectedClient) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">Messages</h1>
            <p className="text-xs text-[#e8e6e1]/80 mt-1">Conversations with your clients</p>
          </div>
          <button
            onClick={() => setShowNewMessage(true)}
            className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-2 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            New
          </button>
        </div>

        {conversations === undefined ? (
          <p className="text-sm text-[#e8e6e1]/75">Loading...</p>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-[#e8e6e1]/75">
            <MessageSquare className="w-8 h-8 opacity-40" />
            <p className="text-sm">No conversations yet.</p>
            <button
              onClick={() => setShowNewMessage(true)}
              className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Start a Conversation
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((c) => (
              <button
                key={c.clientUserId}
                onClick={() => setSelectedClient(c.clientUserId)}
                className="w-full flex items-center gap-3 bg-[#0a0a0a] border border-gold-border rounded-xl p-4 text-left hover:border-gold-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
                  <span className="text-gold-primary text-sm font-heading">
                    {(c.name || c.email).slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-[#e8e6e1] font-medium truncate">
                      {c.name || c.email}
                    </p>
                    <span className="text-[10px] text-[#e8e6e1]/75 shrink-0">
                      {formatRelative(c.lastAt)}
                    </span>
                  </div>
                  <p className="text-xs text-[#e8e6e1]/75 truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="shrink-0 bg-gold-primary text-[#0a0a0a] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {showNewMessage && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 animate-modal-backdrop"
            onClick={() => setShowNewMessage(false)}
          >
            <div
              className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[70vh] flex flex-col animate-modal-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gold-border/20">
                <h2 className="font-heading text-sm text-gold-primary">New Message</h2>
                <button onClick={() => setShowNewMessage(false)} className="text-[#e8e6e1]/75">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                {messageableUsers === undefined ? (
                  <p className="text-sm text-[#e8e6e1]/75 p-4">Loading...</p>
                ) : messageableUsers.length === 0 ? (
                  <p className="text-sm text-[#e8e6e1]/75 p-4">No clients to message yet.</p>
                ) : (
                  messageableUsers.map((u) => (
                    <button
                      key={u.userId}
                      onClick={() => {
                        setSelectedClient(u.userId);
                        setShowNewMessage(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-gold-border/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold-dark/20 flex items-center justify-center shrink-0">
                        <span className="text-gold-primary text-xs font-heading">
                          {(u.name || u.email).slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-[#e8e6e1] truncate">{u.name || u.email}</p>
                        {u.name && <p className="text-xs text-[#e8e6e1]/75 truncate">{u.email}</p>}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Admin: open thread with a specific client ---
  if (isAdmin && selectedClient) {
    const clientInfo =
      conversations?.find((c) => c.clientUserId === selectedClient) ||
      messageableUsers?.find((u) => u.userId === selectedClient);
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-6 animate-fade-in">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setSelectedClient(null)}
            className="text-[#e8e6e1]/75 hover:text-gold-primary transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="font-heading text-lg font-bold text-[#e8e6e1] truncate">
              {clientInfo?.name || clientInfo?.email || "Conversation"}
            </h1>
            <p className="text-xs text-[#e8e6e1]/80 truncate">{clientInfo?.email}</p>
          </div>
        </div>
        <Thread
          messages={adminThread || []}
          myUserId={profile?.userId}
          onSend={(text) => sendMessage({ content: text, toUserId: selectedClient as Id<"users"> })}
          onDelete={handleDelete}
        />
      </div>
    );
  }

  // --- Client: single thread with Legacy Architect RVA ---
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-6 animate-fade-in">
      <div className="mb-4">
        <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">Messages</h1>
        <p className="text-xs text-[#e8e6e1]/80 mt-1">
          Secure communication with Legacy Architect RVA
        </p>
      </div>
      <Thread
        messages={clientMessages || []}
        myUserId={profile?.userId}
        onSend={(text) => sendMessage({ content: text })}
        onDelete={handleDelete}
      />
    </div>
  );
}
