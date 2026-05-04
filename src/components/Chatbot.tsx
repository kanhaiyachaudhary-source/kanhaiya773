"use client";
import { useState, useRef, useEffect } from "react";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What does Kanhaiya do?",
  "Tell me about DocuMind",
  "How do I run SnipURL?",
  "What certifications does he have?",
  "When did he finish B.Tech?",
  "How can I contact him?",
];

// Simple markdown-ish rendering: **bold**, [text](url), and line breaks
function renderMessage(text: string): string {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Auto-link bare URLs
  html = html.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    if (url.includes("</a>")) return url;
    return `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
  });
  html = html.replace(/\n/g, "<br/>");
  return html;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Kanhaiya's AI assistant powered by a real LLM. Ask me anything about him — his projects, experience, education, certifications, or even how to clone and run his code locally!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let s = sessionStorage.getItem("kc_chat_session");
      if (!s) {
        s = "sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("kc_chat_session", s);
      }
      return s;
    }
    return "sess_default";
  });
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (q?: string) => {
    const message = (q ?? input).trim();
    if (!message || loading) return;

    const newHistory = [...messages, { role: "user" as const, content: message }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: messages, // send previous messages for context
          session_id: sessionId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat failed");

      setMessages([...newHistory, { role: "assistant", content: data.reply }]);
    } catch (e: any) {
      setMessages([
        ...newHistory,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble right now. The AI service may be cold-starting (first request takes 15-20s). Please try again in a moment, or contact Kanhaiya directly at kanhiyachaudhary772@gmail.com",
        },
      ]);
    } finally {
      setLoading(false);
      if (open) inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)} aria-label="Toggle chat">
        {open ? "×" : "💬"}
      </button>

      <div className={`chat-window ${open ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-avatar">KC</div>
          <div>
            <div className="chat-title">Ask about Kanhaiya</div>
            <div className="chat-status">AI Assistant · Powered by LLM</div>
          </div>
          <div className="chat-close" onClick={() => setOpen(false)}>×</div>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-msg ${m.role === "user" ? "user" : "bot"}`}
              dangerouslySetInnerHTML={{ __html: renderMessage(m.content) }}
            />
          ))}
          {loading && (
            <div className="chat-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        {messages.length <= 2 && !loading && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <div key={s} className="chat-chip" onClick={() => send(s)}>
                {s}
              </div>
            ))}
          </div>
        )}

        <div className="chat-input-wrap">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Ask anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            autoComplete="off"
          />
          <button
            className="chat-send"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            {loading ? "…" : "→"}
          </button>
        </div>
      </div>
    </>
  );
}
