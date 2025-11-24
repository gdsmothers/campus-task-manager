// src/lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export function createAuthToken(payload: { userId: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAuthToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch {
    return null;
  }
}

// NEXT.JS 14+ FIX: cookies() must be awaited
export async function getCurrentUser() {
  const cookieStore = await cookies(); // ← IMPORTANT CHANGE
  const token = cookieStore.get("ctm_token")?.value;

  if (!token) return null;

  return verifyAuthToken(token);
}