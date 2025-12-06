import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth";

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("ctm_token")?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

// Helper to grab the last segment as id
function getIdFromRequest(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  const last = segments[segments.length - 1];
  return last || null;
}

export async function PATCH(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = getIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ error: "Task id is required" }, { status: 400 });
  }

  const task = await prisma.task.update({
    where: { id },
    data: { state: "COMPLETED" },
  });

  return NextResponse.json({ task });
}

export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = getIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ error: "Task id is required" }, { status: 400 });
  }

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}