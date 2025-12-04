import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 🔁 CHANGED: read form data instead of JSON
    const form = await req.formData();
    const email = form.get("email") as string | null;
    const password = form.get("password") as string | null;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = createAuthToken({ userId: user.id, email: user.email });

    // 🎯 CHANGED: redirect to dashboard instead of returning JSON
    const res = NextResponse.redirect(new URL("/dashboard", req.url));

    res.cookies.set("ctm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("LOGIN_ERROR", err);
    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 }
    );
  }
}