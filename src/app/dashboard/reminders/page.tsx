"use client";

import { useEffect, useState } from "react";

type NotifStatus = "PENDING" | "SENT" | "FAILED";

interface Reminder {
  id: string;
  remindAt: string;
  status: NotifStatus;
  channel: "EMAIL";
  task: {
    title: string;
    dueAt: string | null;
  };
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/reminders");
      const data = await res.json();
      setReminders(data.reminders ?? []);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Reminder Settings
      </h2>
      <p className="text-sm text-slate-600">
        Reminders are automatically created{" "}
        <strong>1 day before</strong> any task with a due date. Currently,
        reminders use the <strong>Email</strong> channel and are processed by a
        background job (simulated in this prototype).
      </p>

      <div className="rounded-2xl bg-white/90 shadow-sm border border-slate-200 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">
          Upcoming reminders
        </h3>
        {reminders.length === 0 ? (
          <p className="text-xs text-slate-500">
            No upcoming reminders yet. Add tasks with due dates to see them
            here.
          </p>
        ) : (
          <div className="space-y-2 text-xs">
            {reminders.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-slate-700">
                    {r.task.title}
                  </p>
                  <p className="text-slate-500">
                    Due:{" "}
                    {r.task.dueAt
                      ? new Date(r.task.dueAt).toLocaleString()
                      : "No due date"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">
                    Reminds: {new Date(r.remindAt).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-purple-600">
                    Channel: {r.channel}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Status: {r.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-[11px] text-slate-500">
        Future versions could allow customizing reminder lead time (for example
        3 days or 1 week before) and additional channels (mobile push, SMS). In
        this project, we focus on a dependable 1-day-before email reminder
        strategy to reduce missed deadlines.
      </p>
    </div>
  );
}