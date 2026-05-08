import { useQuery, useMutation } from "convex/react";
import { Send, CheckCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { api } from "../../convex/_generated/api";

export default function MessagesPage() {
  const profile = useQuery(api.profile.getMyProfile);
  const messages = useQuery(api.messages.getMyMessages);
  const sendMessage = useMutation(api.messages.sendMessage);
  const markAllRead = useMutation(api.messages.markAllRead);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markAllRead();
  }, [messages, markAllRead]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ content: text.trim() });
    setText("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-6 animate-fade-in">
      <div className="mb-4">
        <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">Messages</h1>
        <p className="text-xs text-[#e8e6e1]/60 mt-1">
          Secure communication with Legacy Architect RVA
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 pb-4"
      >
        {messages?.length === 0 && (
          <div className="flex items-center justify-center h-full text-[#e8e6e1]/60 text-sm">
            No messages yet. Send a message to get started.
          </div>
        )}
        {messages?.map((msg) => {
          const isMe = msg.fromUserId === profile?.userId;
          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-xl px-4 py-2.5 ${
                  isMe
                    ? "bg-[#d9cca0] text-[#0a0a0a]"
                    : "bg-[#1a1a1a] text-[#e8e6e1]"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-[10px] ${
                    isMe ? "text-[#0a0a0a]/50" : "text-[#e8e6e1]/50"
                  }`}
                >
                  <span>
                    {new Date(msg.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                  {isMe && msg.isRead && (
                    <CheckCheck className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-[rgba(217,204,160,0.08)]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-[#111111] border border-[rgba(217,204,160,0.1)] rounded-xl px-4 py-3 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/60 focus:outline-none focus:border-[#d9cca0]/30"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim()}
          className="btn-gold w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
