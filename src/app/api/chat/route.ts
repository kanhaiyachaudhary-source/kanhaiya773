import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { chatCompletion, KANHAIYA_SYSTEM_PROMPT, ChatMessage } from "@/lib/hf";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { message, history, session_id } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message too long (max 1000 chars)" }, { status: 400 });
    }

    // Build conversation: system prompt + recent history + new message
    const messages: ChatMessage[] = [
      { role: "system", content: KANHAIYA_SYSTEM_PROMPT },
    ];

    // Include last 6 messages of history for context
    const recentHistory = (history || []).slice(-6);
    for (const m of recentHistory) {
      if (m.role === "user" || m.role === "assistant") {
        messages.push({ role: m.role, content: String(m.content).slice(0, 800) });
      }
    }

    messages.push({ role: "user", content: message });

    const reply = await chatCompletion(messages, {
      temperature: 0.6,
      max_tokens: 500,
    });

    // Log conversation (best effort, non-blocking — fire-and-forget)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";
    try {
      await supabase.from("portfolio_chats").insert({
        session_id: session_id || "anonymous",
        user_message: message,
        bot_reply: reply,
        ip_address: ip,
      });
    } catch {
      // silent fail — analytics shouldn't block UX
    }

    return NextResponse.json({ reply });
  } catch (e: any) {
    console.error("[chat] error:", e);
    return NextResponse.json(
      { error: e.message || "Chat failed. Please try again." },
      { status: 500 }
    );
  }
}
