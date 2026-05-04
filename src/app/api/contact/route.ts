import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, source } = await req.json();

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 150 || (subject && subject.length > 200) || message.length > 2000) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";
    const userAgent = req.headers.get("user-agent")?.slice(0, 300) || "";

    const { data, error } = await supabase
      .from("portfolio_messages")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim().slice(0, 200) || "",
        message: message.trim(),
        source: source === "chatbot_lead" ? "chatbot_lead" : "contact_form",
        ip_address: ip,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (error) {
      console.error("[contact] db error:", error);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (e: any) {
    console.error("[contact] error:", e);
    return NextResponse.json({ error: e.message || "Submission failed" }, { status: 500 });
  }
}
