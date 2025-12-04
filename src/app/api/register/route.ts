import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 🔁 CHANGED: Read form data instead of JSON
    const form = await req.formData();
    const name = form.get("name") as string | null;
    const email = form.get("email") as string | null;
    const password = form.get("password") as string | null;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name || undefined,
        email,
        passwordHash,
      },
    });

    const token = createAuthToken({ userId: user.id, email: user.email });

    // 🎯 CHANGED: redirect to dashboard instead of returning JSON
    const res = NextResponse.redirect(new URL("/dashboard", req.url));

    // Set the auth cookie like before
    res.cookies.set("ctm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("REGISTER_ERROR", err);
    return NextResponse.json(
      { error: "Server error during registration" },
      { status: 500 }
    );
  }
}