import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import aiIcon from "../assets/start.png";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "assistant",
      text: "Hi! I’m your painting project assistant. Tell me a bit about your project and I’ll help you get started.",
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: trimmed,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInputValue("");

    window.setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          from: "assistant",
          text:
            "Thanks for sharing! For a detailed, free estimate, please use the form on this page or tap the “Request Free Estimate” button.",
        },
      ]);
    }, 700);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Expose simple global open/close so existing \"Talk to our AI\" UI can trigger this
    window.__openChatWidget = () => setIsOpen(true);
    window.__closeChatWidget = () => setIsOpen(false);

    return () => {
      if (window.__openChatWidget) {
        delete window.__openChatWidget;
      }
      if (window.__closeChatWidget) {
        delete window.__closeChatWidget;
      }
    };
  }, []);

  return (
    <>
      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[9999] w-[min(100vw-2rem,360px)] rounded-2xl border border-white/10 bg-[#020617]/95 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.75)] backdrop-blur-lg">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#02A11F]/10">
                <MessageCircle className="h-4 w-4 text-[#02A11F]" />
              </div>
              <div className="flex flex-col">
                <span className='text-xs font-semibold uppercase tracking-[0.16em] text-[#A1F88B] font-["Inter"]'>
                  AI assistant
                </span>
                <span className='text-[11px] text-white/80 font-["Inter"]'>
                  Ask about your painting project
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close AI chat"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div className="mt-3 max-h-[260px] space-y-2 overflow-y-auto pr-1">
            {messages.map((message) => {
              const isUser = message.from === "user";
              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed font-["Inter"] ${
                      isUser
                        ? "bg-[#02A11F] text-white rounded-br-sm"
                        : "bg-white/5 text-white/90 border border-white/10 rounded-bl-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer / input */}
          <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Tell me about your project…"
              className="h-9 flex-1 rounded-full border border-white/10 bg-[#020617] px-3 text-[11px] text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#02A11F]"
            />
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-1 rounded-full bg-[#02A11F] px-3 text-[11px] font-semibold text-white shadow-md cursor-pointer hover:bg-[#039A02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F]"
            >
              <span>Send</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

