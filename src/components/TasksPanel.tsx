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

export function TasksPanel({ initialSearch }: { initialSearch: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDueAt, setNewDueAt] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("MED");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // search text coming from sidebar (?search=...) – lowercase for comparison
  const [search] = useState(initialSearch.toLowerCase());

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data.tasks ?? []);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const visibleTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search)
  );

  const activeTasks = visibleTasks.filter(
    (t) => t.state !== "COMPLETED"
  );
  const completedTasks = visibleTasks.filter(
    (t) => t.state === "COMPLETED"
  );

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          dueAt: newDueAt || null,
          priority: newPriority,
        }),
      });
      setNewTitle("");
      setNewDueAt("");
      setNewPriority("MED");
      await loadTasks();
    } finally {
      setCreating(false);
    }
  }

  async function handleComplete(id: string) {
    setLoadingId(id);
    try {
      await fetch(`/api/tasks/${id}`, { method: "PATCH" });
      await loadTasks();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: string) {
    setLoadingId(id);
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      await loadTasks();
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Task card */}
      <div className="rounded-2xl bg-white/95 shadow-sm border border-slate-200 p-4 space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Create a new task
        </h2>
        <form className="space-y-3" onSubmit={handleCreate}>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-[11px] text-slate-500 mb-1">
                Due date & time
              </label>
              <input
                type="datetime-local"
                value={newDueAt}
                onChange={(e) => setNewDueAt(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-xs bg-white/90 text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
              />
            </div>

            <div className="min-w-[120px]">
              <label className="block text-[11px] text-slate-500 mb-1">
                Priority
              </label>
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as TaskPriority)
                }
                className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-xs bg-white/90 text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
              >
                <option value="HIGH">High</option>
                <option value="MED">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="mt-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-red-500 text-white text-xs font-semibold px-4 py-2 shadow-md hover:opacity-90 disabled:opacity-60"
          >
            {creating ? "Creating..." : "Add task"}
          </button>
        </form>
      </div>

      {/* Active Tasks */}
      <div className="rounded-2xl bg-white/95 shadow-sm border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Active tasks
          </h2>
          {search && (
            <p className="text-[11px] text-slate-500">
              Filtered by: <span className="font-medium">{search}</span>
            </p>
          )}
        </div>

        {activeTasks.length === 0 ? (
          <p className="text-xs text-slate-500">
            No active tasks. Create a task above to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {activeTasks.map((task) => {
              const isLoading = loadingId === task.id;
              const due = task.dueAt
                ? new Date(task.dueAt).toLocaleString()
                : "No due date";
              const priorityLabel =
                task.priority === "HIGH"
                  ? "High"
                  : task.priority === "LOW"
                  ? "Low"
                  : "Medium";
              const priorityColor =
                task.priority === "HIGH"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "LOW"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700";

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-slate-800">
                      {task.title}
                    </p>
                    <p className="text-slate-500">Due: {due}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] ${priorityColor}`}
                    >
                      {priorityLabel} priority
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button
                      onClick={() => handleComplete(task.id)}
                      disabled={isLoading}
                      className="text-[11px] px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-60"
                    >
                      {isLoading ? "Loading..." : "Complete"}
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      disabled={isLoading}
                      className="text-[11px] px-2 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-60"
                    >
                      {isLoading ? "Loading..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="rounded-2xl bg-white/95 shadow-sm border border-slate-200 p-4 space-y-2">
         <h2 className="text-sm font-semibold text-slate-800">
            Completed
         </h2>
         <div className="space-y-1.5">
            {completedTasks.map((task) => (
             <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                <div className="flex flex-col">
                    <span className="line-through">{task.title}</span>
                    {task.dueAt && (
                    <span className="text-[10px]">
                        Due {new Date(task.dueAt).toLocaleDateString()}
                    </span>
                    )}
                </div>
                <button
                    onClick={() => handleDelete(task.id)}
                    disabled={loadingId === task.id}
                    className="text-[11px] px-2 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-60">
                    {loadingId === task.id ? "Deleting..." : "Delete"}
                </button>
             </div>
            ))}
         </div>
        </div>
      )}
    </div>
  );
}