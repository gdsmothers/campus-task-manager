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

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const BUCKETS = ["Morning", "Afternoon", "Evening"] as const;

export default function AnalyticsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks ?? []);
    })();
  }, []);

  // counts[dayOfWeek][bucketIndex]
  const counts: number[][] = Array.from({ length: 7 }, () =>
    Array(BUCKETS.length).fill(0)
  );

  for (const t of tasks) {
    if (!t.dueAt) continue;
    const d = new Date(t.dueAt);
    const dow = d.getDay();
    const hour = d.getHours();
    let bucketIndex = 0;
    if (hour >= 12 && hour < 18) bucketIndex = 1; // Afternoon
    else if (hour >= 18) bucketIndex = 2; // Evening
    counts[dow][bucketIndex]++;
  }

  const maxCount = counts.flat().reduce((m, v) => Math.max(m, v), 0) || 1;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Workload Analytics
      </h2>
      <p className="text-sm text-slate-600">
        Heatmap of how many tasks are due by day of week and time of day.
      </p>

      <div className="rounded-2xl bg-white/90 shadow-sm border border-slate-200 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-slate-500 p-2"></th>
                {BUCKETS.map((b) => (
                  <th key={b} className="text-center text-slate-500 p-2">
                    {b}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAY_LABELS.map((day, row) => (
                <tr key={day}>
                  <td className="text-slate-600 font-medium p-2">{day}</td>
                  {BUCKETS.map((_, col) => {
                    const value = counts[row][col];
                    const intensity = value / maxCount; // 0–1
                    const bgOpacity = 0.1 + intensity * 0.7;
                    return (
                      <td key={col} className="p-1">
                        <div
                          className="h-10 rounded-lg flex items-center justify-center text-[10px]"
                          style={{
                            backgroundColor: `rgba(129, 140, 248, ${bgOpacity})`,
                            color: intensity > 0.5 ? "white" : "#1f2933",
                          }}
                        >
                          {value > 0 ? value : ""}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Darker cells indicate more tasks due in that day/time block.
        </p>
      </div>
    </div>
  );
}