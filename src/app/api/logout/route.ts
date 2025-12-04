import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Clear the auth cookie
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.set("ctm_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return res;
}