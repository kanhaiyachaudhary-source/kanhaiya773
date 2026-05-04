"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioMessage } from "@/lib/supabase";

interface ChatLog {
  id: string;
  session_id: string;
  user_message: string;
  bot_reply: string;
  ip_address: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"messages" | "chats">("messages");
  const [messages, setMessages] = useState<PortfolioMessage[]>([]);
  const [chats, setChats] = useState<ChatLog[]>([]);
  const [selected, setSelected] = useState<PortfolioMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const me = await fetch("/api/auth/me").then((r) => r.json());
    if (!me.user) {
      router.push("/login");
      return;
    }
    await load();
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetch("/api/admin/submissions").then((r) => r.json());
      setMessages(data.messages || []);
      setChats(data.chats || []);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, is_read: boolean) => {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_read }),
    });
    setMessages(messages.map((m) => (m.id === id ? { ...m, is_read } : m)));
    if (selected?.id === id) setSelected({ ...selected, is_read });
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const filtered = messages.filter((m) =>
    filter === "all" ? true : filter === "unread" ? !m.is_read : m.is_read
  );

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const styles: Record<string, React.CSSProperties> = {
    container: { minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)" },
    nav: { padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-2)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 10 },
    main: { padding: "24px", maxWidth: 1400, margin: "0 auto" },
    statRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 },
    stat: { padding: 20, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12 },
    tabs: { display: "flex", gap: 4, marginBottom: 16, background: "var(--bg-2)", borderRadius: 10, padding: 4, width: "fit-content" },
    tabBtn: { padding: "8px 16px", borderRadius: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1, fontWeight: 700, cursor: "pointer", border: "none", background: "transparent", color: "var(--text-2)" },
    tabBtnActive: { background: "var(--accent)", color: "var(--bg)" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 16, alignItems: "start" },
    listCard: { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", maxHeight: "calc(100vh - 240px)", display: "flex", flexDirection: "column" },
    filterBar: { padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 6 },
    filterBtn: { padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1, borderRadius: 6, border: "1px solid var(--border)", background: "transparent", color: "var(--text-2)", cursor: "pointer" },
    filterActive: { background: "var(--accent)", color: "var(--bg)", borderColor: "var(--accent)" },
    listScroll: { overflowY: "auto", flex: 1 },
    msgItem: { padding: "14px 16px", borderBottom: "1px solid var(--border)", cursor: "pointer", transition: "background 0.2s" },
    detail: { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, minHeight: 400, position: "sticky", top: 80 },
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--bg)", fontWeight: 900, fontSize: 14,
          }}>🔒</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>Admin Dashboard</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>Portfolio Inbox</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={load} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, cursor: "pointer" }}>↻ Refresh</button>
          <a href="/" target="_blank" style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1 }}>↗ Site</a>
          <button onClick={logout} style={{ padding: "8px 14px", borderRadius: 8, background: "var(--accent-4)", color: "var(--bg)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, fontWeight: 700, cursor: "pointer" }}>Logout</button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.statRow}>
          <div style={styles.stat}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: "var(--text-2)", textTransform: "uppercase" }}>Total Messages</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{messages.length}</div>
          </div>
          <div style={styles.stat}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: "var(--text-2)", textTransform: "uppercase" }}>Unread</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4, color: unreadCount > 0 ? "var(--accent-2)" : "var(--text)" }}>{unreadCount}</div>
          </div>
          <div style={styles.stat}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: "var(--text-2)", textTransform: "uppercase" }}>Chat Conversations</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{new Set(chats.map((c) => c.session_id)).size}</div>
          </div>
          <div style={styles.stat}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: "var(--text-2)", textTransform: "uppercase" }}>Total Questions</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{chats.length}</div>
          </div>
        </div>

        <div style={styles.tabs}>
          <button
            onClick={() => setTab("messages")}
            style={{ ...styles.tabBtn, ...(tab === "messages" ? styles.tabBtnActive : {}) }}
          >
            📬 Messages ({messages.length})
          </button>
          <button
            onClick={() => setTab("chats")}
            style={{ ...styles.tabBtn, ...(tab === "chats" ? styles.tabBtnActive : {}) }}
          >
            💬 Chat Logs ({chats.length})
          </button>
        </div>

        {tab === "messages" && (
          <div style={styles.grid}>
            <div style={styles.listCard}>
              <div style={styles.filterBar}>
                {(["all", "unread", "read"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
              <div style={styles.listScroll}>
                {filtered.length === 0 ? (
                  <div style={{ padding: 32, textAlign: "center", color: "var(--text-2)", fontSize: 13 }}>
                    No messages
                  </div>
                ) : (
                  filtered.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelected(m);
                        if (!m.is_read) toggleRead(m.id, true);
                      }}
                      style={{
                        ...styles.msgItem,
                        background: selected?.id === m.id ? "var(--bg-2)" : "transparent",
                        borderLeft: m.is_read ? "3px solid transparent" : "3px solid var(--accent-2)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div style={{ fontWeight: m.is_read ? 500 : 700, color: "var(--text)", fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontSize: 10, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>{new Date(m.created_at).toLocaleDateString()}</div>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 4 }}>{m.email}</div>
                      <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 4, fontWeight: 500 }}>
                        {m.subject || "(No subject)"}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {m.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={styles.detail}>
              {selected ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{selected.name}</div>
                      <a href={`mailto:${selected.email}`} style={{ fontSize: 13, color: "var(--accent)", marginBottom: 4, display: "inline-block" }}>
                        ✉️ {selected.email}
                      </a>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => toggleRead(selected.id, !selected.is_read)}
                        style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1, cursor: "pointer" }}
                      >
                        {selected.is_read ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        onClick={() => deleteMsg(selected.id)}
                        style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid var(--accent-4)", background: "transparent", color: "var(--accent-4)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1, cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16, padding: "12px 16px", background: "var(--bg-2)", borderRadius: 8, fontSize: 12, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>
                    📅 {new Date(selected.created_at).toLocaleString()}<br/>
                    🌐 IP: {selected.ip_address || "unknown"}<br/>
                    📍 Source: {selected.source}
                  </div>

                  {selected.subject && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: "var(--text-2)", textTransform: "uppercase", marginBottom: 4 }}>Subject</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{selected.subject}</div>
                    </div>
                  )}

                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: "var(--text-2)", textTransform: "uppercase", marginBottom: 8 }}>Message</div>
                    <div style={{ padding: 16, background: "var(--bg-2)", borderRadius: 10, color: "var(--text)", lineHeight: 1.7, whiteSpace: "pre-wrap", fontSize: 14 }}>
                      {selected.message}
                    </div>
                  </div>

                  <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "Your message")}&body=Hi ${selected.name},%0D%0A%0D%0AThanks for reaching out!%0D%0A%0D%0A`}
                      style={{ padding: "10px 16px", borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "var(--bg)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, fontWeight: 700, textTransform: "uppercase" }}
                    >
                      Reply via Email →
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, color: "var(--text-2)", fontSize: 14, textAlign: "center" }}>
                  📬 Select a message to view details
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "chats" && (
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16 }}>
            <div style={{ marginBottom: 12, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", letterSpacing: 1 }}>
              Recent visitor questions (latest 200)
            </div>
            <div style={{ maxHeight: "calc(100vh - 320px)", overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {chats.length === 0 ? (
                <div style={{ padding: 32, textAlign: "center", color: "var(--text-2)" }}>No chats yet</div>
              ) : (
                chats.map((c) => (
                  <div key={c.id} style={{ padding: 14, background: "var(--bg-2)", borderRadius: 10, border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: 1 }}>
                      <span>Session: {c.session_id.slice(-8)}</span>
                      <span>{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>Q: </span>
                      <span style={{ fontSize: 13 }}>{c.user_message}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--accent-3)", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>A: </span>
                      <span style={{ fontSize: 13, color: "var(--text-2)" }}>{c.bot_reply?.slice(0, 200)}{c.bot_reply && c.bot_reply.length > 200 ? "..." : ""}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
