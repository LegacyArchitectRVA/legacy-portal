import { RiChat3Line as MessageSquare } from "@remixicon/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FloatingChatButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on messages page itself
  if (location.pathname === "/messages") return null;

  return (
    <button
      type="button"
      onClick={() => navigate("/messages")}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold-bright to-gold-dark text-[#0f0c08] shadow-[0_0_20px_rgba(232, 200, 105,0.25)] hover:shadow-[0_0_30px_rgba(232, 200, 105,0.4)] transition-all duration-300 flex items-center justify-center"
      title="Messages"
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
}
