// src/app/api/reminders/run/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth";

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("ctm_token")?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

// For now: manual "run reminders" endpoint you can call from browser or Postman.
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: user.userId,
      status: "PENDING",
      remindAt: { lte: now },
    },
    include: { task: true },
  });

  // Simulate sending
  console.log("Sending reminders for user:", user.email);
  for (const r of reminders) {
    console.log(
      `Reminder: Task "${r.task.title}" due at ${r.task.dueAt}, reminder scheduled at ${r.remindAt}`
    );
  }

  await prisma.reminder.updateMany({
    where: { id: { in: reminders.map((r) => r.id) } },
    data: { status: "SENT", sentAt: now },
  });

  return NextResponse.json({
    sentCount: reminders.length,
    message: "Reminders processed (logged to server console).",
  });
}