"use client";

import { useEffect, useState } from "react";

type TaskPriority = "LOW" | "MED" | "HIGH";
type TaskState = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";

interface Task {
  id: string;
  title: string;
  dueAt: string | null;
  priority: TaskPriority;
  state: TaskState;
}

function getMonthMatrix(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay(); // 0 = Sun

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

// Build a local YYYY-MM-DD key (no UTC shift)
function localDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentMonth] = useState(new Date());

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks ?? []);
    })();
  }, []);

  const tasksByDate = new Map<string, Task[]>();
  for (const t of tasks) {
    if (!t.dueAt) continue;
    const d = new Date(t.dueAt);
    const key = localDateKey(d);
    if (!tasksByDate.has(key)) tasksByDate.set(key, []);
    tasksByDate.get(key)!.push(t);
  }

  const weeks = getMonthMatrix(currentMonth);
  const monthLabel = currentMonth.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Monthly Calendar
      </h2>
      <p className="text-sm text-slate-600">
        See all tasks with due dates mapped onto a monthly view.
      </p>

      <div className="rounded-2xl bg-white/90 shadow-sm border border-slate-200 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-slate-800 text-sm">
            {monthLabel}
          </span>
          <div className="text-[11px] text-slate-500">
            Tasks are shown on their due dates (local time).
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs text-center mb-2 text-slate-500">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs">
          {weeks.flat().map((day, idx) => {
            if (!day) {
              return (
                <div
                  key={idx}
                  className="h-20 rounded-xl bg-slate-50 border border-slate-100"
                />
              );
            }

            const key = localDateKey(day);
            const dayTasks = tasksByDate.get(key) ?? [];

            return (
              <div
                key={key}
                className="h-20 rounded-xl border border-slate-100 bg-slate-50/80 p-2 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-slate-700">
                    {day.getDate()}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {dayTasks.length}
                    </span>
                  )}
                </div>
                <div className="space-y-0.5 mt-1 overflow-hidden">
                  {dayTasks.slice(0, 2).map((t) => (
                    <div
                      key={t.id}
                      className="text-[10px] truncate rounded bg-purple-50 text-purple-700 px-1 py-0.5"
                    >
                      {t.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-[10px] text-slate-400">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}