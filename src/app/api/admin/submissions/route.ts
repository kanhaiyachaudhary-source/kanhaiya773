import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAdminSession } from "@/lib/auth";

// GET — list all messages + chat sessions
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [msgRes, chatRes] = await Promise.all([
    supabase
      .from("portfolio_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("portfolio_chats")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  return NextResponse.json({
    messages: msgRes.data || [],
    chats: chatRes.data || [],
  });
}

// PATCH — mark as read/unread
export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, is_read } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await supabase
    .from("portfolio_messages")
    .update({ is_read: !!is_read })
    .eq("id", id);

  return NextResponse.json({ success: true });
}

// DELETE — delete message
export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await supabase.from("portfolio_messages").delete().eq("id", id);
  return NextResponse.json({ success: true });
}
