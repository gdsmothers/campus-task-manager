import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

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
        name,
        email,
        passwordHash,
      },
    });

    const token = createAuthToken({ userId: user.id, email: user.email });

    const res = NextResponse.json({
      message: "Registered",
      user: { id: user.id, email: user.email },
    });

    // Set auth cookie
    res.cookies.set("ctm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
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