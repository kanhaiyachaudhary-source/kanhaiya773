"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus({ type: "ok", msg: "✅ Message sent! Kanhaiya will reply within 24-48 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (e: any) {
      setStatus({ type: "err", msg: e.message || "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <h3>Send me a message</h3>
      <p className="subtitle">I'll get back to you within 24-48 hours.</p>

      <div className="form-row">
        <div className="form-field">
          <label>Your Name *</label>
          <input
            className="form-input"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            minLength={2}
            maxLength={100}
            placeholder="John Doe"
          />
        </div>
        <div className="form-field">
          <label>Your Email *</label>
          <input
            className="form-input"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            maxLength={150}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="form-field" style={{ marginBottom: 12 }}>
        <label>Subject</label>
        <input
          className="form-input"
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          maxLength={200}
          placeholder="Job opportunity / Collaboration / Question"
        />
      </div>

      <div className="form-field">
        <label>Message *</label>
        <textarea
          className="form-textarea"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          minLength={10}
          maxLength={2000}
          placeholder="Hi Kanhaiya, I'd like to connect about…"
          rows={5}
        />
      </div>

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message →"}
      </button>

      {status && <div className={`form-status ${status.type}`}>{status.msg}</div>}
    </form>
  );
}
