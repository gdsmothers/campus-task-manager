import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth";

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("ctm_token")?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: user.userId },
    orderBy: { dueAt: "asc" },
  });

  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, dueAt, priority } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      userId: user.userId,
      priority: priority || "MED",
      dueAt: dueAt ? new Date(dueAt) : null,
    },
  });

  // Auto-create a reminder 1 day before any task with a due date
  if (task.dueAt) {
    const remindAt = new Date(task.dueAt);
    remindAt.setDate(remindAt.getDate() - 1);

    await prisma.reminder.create({
      data: {
        userId: user.userId,
        taskId: task.id,
        remindAt,
        channel: "EMAIL",
      },
    });
  }

  return NextResponse.json({ task }, { status: 201 });
}