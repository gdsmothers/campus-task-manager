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

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: user.userId,
      status: "PENDING",
    },
    include: { task: true },
    orderBy: { remindAt: "asc" },
  });

  return NextResponse.json({ reminders });
}