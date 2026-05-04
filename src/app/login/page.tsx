"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "var(--font-body)",
    }}>
      <form onSubmit={submit} style={{
        width: "100%",
        maxWidth: 400,
        padding: 32,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--bg)", fontSize: 24, fontWeight: 900,
            margin: "0 auto 12px",
          }}>🔒</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text)", marginBottom: 4 }}>Admin Login</h1>
          <p style={{ color: "var(--text-2)", fontSize: 13 }}>Kanhaiya&apos;s portfolio dashboard</p>
        </div>

        <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          style={{
            width: "100%", padding: "12px 14px", marginBottom: 12,
            background: "var(--bg-2)", border: "1px solid var(--border)",
            borderRadius: 10, color: "var(--text)", fontSize: 14, outline: "none",
          }}
        />

        <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%", padding: "12px 14px", marginBottom: 16,
            background: "var(--bg-2)", border: "1px solid var(--border)",
            borderRadius: 10, color: "var(--text)", fontSize: 14, outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", padding: 14,
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            color: "var(--bg)", borderRadius: 10,
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700,
            letterSpacing: 1.5, textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer", opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        {error && (
          <div style={{
            marginTop: 12, padding: "10px 14px",
            background: "rgba(255, 0, 0, 0.1)",
            border: "1px solid var(--accent-4)",
            borderRadius: 8, color: "var(--accent-4)", fontSize: 12,
          }}>{error}</div>
        )}

        <p style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
          Only Kanhaiya can access this area
        </p>
      </form>
    </div>
  );
}
