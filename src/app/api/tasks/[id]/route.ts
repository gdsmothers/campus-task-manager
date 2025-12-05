// src/app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("ctm_token")?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const task = await prisma.task.update({
    where: { id },
    data: { state: "COMPLETED" },
  });

  return NextResponse.json({ task });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}