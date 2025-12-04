"use client";

import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  dueAt: string | null;
  priority: "LOW" | "MED" | "HIGH";
  state: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks((data.tasks ?? []).filter((t: Task) => t.dueAt));
    })();
  }, []);

  // Group tasks by date string (YYYY-MM-DD)
  const groups: Record<string, Task[]> = {};
  for (const task of tasks) {
    if (!task.dueAt) continue;
    const d = new Date(task.dueAt);
    const key = d.toISOString().slice(0, 10);
    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
  }

  const sortedDates = Object.keys(groups).sort();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Calendar View
      </h2>
      <p className="text-sm text-slate-600">
        Tasks are grouped by their due date. This gives a calendar-style
        overview of your upcoming workload. Future work could render this as a
        full grid month view.
      </p>

      {sortedDates.length === 0 && (
        <p className="text-sm text-slate-500">
          No tasks with due dates yet. Add tasks with deadlines from the main
          dashboard to see them here.
        </p>
      )}

      <div className="space-y-3">
        {sortedDates.map((dateKey) => {
          const date = new Date(dateKey);
          const label = date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={dateKey}
              className="rounded-2xl bg-white/80 border border-slate-200 shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-800">
                  {label}
                </span>
                <span className="text-xs text-slate-500">
                  {groups[dateKey].length} task
                  {groups[dateKey].length !== 1 ? "s" : ""}
                </span>
              </div>
              <ul className="space-y-1">
                {groups[dateKey].map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center text-sm rounded-xl bg-slate-50 border border-slate-100 px-3 py-2"
                  >
                    <span className="text-slate-800">{task.title}</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(task.dueAt!).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      • {task.priority}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}