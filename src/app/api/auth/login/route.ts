import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "kanhaiya";
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

    if (!ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { error: "Admin not configured. Set ADMIN_PASSWORD_HASH env var." },
        { status: 500 }
      );
    }

    if (username.toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, ADMIN_PASSWORD_HASH);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createSessionToken(ADMIN_USERNAME);
    await setSessionCookie(token);

    return NextResponse.json({ success: true, username: ADMIN_USERNAME });
  } catch (e: any) {
    console.error("[admin login] error:", e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
