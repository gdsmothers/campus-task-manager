"use client";

import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  dueAt: string | null;
  priority: "LOW" | "MED" | "HIGH";
  state: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
}

export default function AnalyticsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks ?? []);
    })();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.state === "COMPLETED").length;
  const highPriority = tasks.filter((t) => t.priority === "HIGH").length;

  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 7);

  const upcomingWeek = tasks.filter((t) => {
    if (!t.dueAt) return false;
    const d = new Date(t.dueAt);
    return d >= now && d <= sevenDaysFromNow;
  }).length;

  const overdue = tasks.filter((t) => {
    if (!t.dueAt) return false;
    const d = new Date(t.dueAt);
    return d < now && t.state !== "COMPLETED";
  }).length;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Workload Analytics
      </h2>
      <p className="text-sm text-slate-600">
        These metrics are computed from your actual tasks and give insight into
        completion rate, high-priority load, and upcoming deadlines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total tasks</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{total}</p>
        </div>
        <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Completion rate</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {completionRate}%
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500">High priority tasks</p>
          <p className="text-3xl font-bold text-red-500 mt-1">
            {highPriority}
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Due in next 7 days</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">
            {upcomingWeek}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Future work: add charts and time-of-day heatmaps for when tasks are
        scheduled or completed, to further improve planning and avoid overload.
      </p>
    </div>
  );
}