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

export default function TasksPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>("MED");
  const [filter, setFilter] = useState<"ALL" | TaskPriority>("ALL");
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data.tasks ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const body: any = { title, priority };
    if (dueAt) body.dueAt = dueAt;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setTitle("");
      setDueAt("");
      setPriority("MED");
      await loadTasks();
    }
  }

  async function handleComplete(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "PATCH" });
    await loadTasks();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    await loadTasks();
  }

  function getEffectivePriority(task: Task): TaskPriority {
    if (task.dueAt && task.state !== "COMPLETED") {
      const due = new Date(task.dueAt);
      const now = new Date();
      const diffMs = due.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      if (diffHours <= 24) {
        return "HIGH";
      }
    }
    return task.priority;
  }

  function priorityBadgeClass(p: TaskPriority) {
    switch (p) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-200";
      case "MED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "LOW":
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "ALL") return true;
    const eff = getEffectivePriority(t);
    return eff === filter;
  });

  return (
    <div className="space-y-6">
      {/* Demo button for reminders */}
      <button
        onClick={async () => {
          const res = await fetch("/api/reminders/run", { method: "POST" });
          const data = await res.json();
          alert(`Processed ${data.sentCount} reminders.`);
        }}
        className="px-3 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 shadow-sm"
      >
        Run Reminders (Demo)
      </button>

      {/* Add task form */}
      <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-200 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Add a new task
        </h3>
        <form
          onSubmit={handleAddTask}
          className="flex flex-col md:flex-row gap-3 items-stretch md:items-end"
        >
          <div className="flex-1 space-y-1">
            <label className="text-xs text-slate-500">Task title</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/90"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CS exam review, project draft..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-500">Due date</label>
            <input
              type="datetime-local"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-500">Priority</label>
            <select
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="LOW">Low</option>
              <option value="MED">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="md:w-auto w-full rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-red-500 text-white text-xs font-semibold px-4 py-2 shadow-sm hover:opacity-90"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 text-xs">
        {["ALL", "HIGH", "MED", "LOW"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded-full border text-xs font-medium ${
              filter === f
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white/80 text-slate-600 border-slate-200 hover:bg-purple-50"
            }`}
          >
            {f === "ALL" ? "All" : `${f.charAt(0)}${f.slice(1).toLowerCase()} priority`}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="rounded-2xl bg-white/80 shadow-sm border border-slate-200 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-800">
            Upcoming tasks
          </h3>
          {loading && (
            <span className="text-xs text-slate-400">Loading...</span>
          )}
        </div>

        {filteredTasks.length === 0 && (
          <p className="text-xs text-slate-500">
            No tasks to show. Add a task above to get started.
          </p>
        )}

        <ul className="space-y-2">
          {filteredTasks.map((task) => {
            const effPriority = getEffectivePriority(task);
            const dueText = task.dueAt
              ? new Date(task.dueAt).toLocaleString()
              : "No due date";

            return (
              <li
                key={task.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">
                      {task.title}
                    </span>
                    <span
                      className={
                        "text-[10px] px-2 py-0.5 rounded-full border font-semibold " +
                        priorityBadgeClass(effPriority)
                      }
                    >
                      {effPriority}
                    </span>
                    {task.state === "COMPLETED" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {dueText}
                  </p>
                </div>

                <div className="flex gap-2 text-[11px]">
                  {task.state !== "COMPLETED" && (
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="px-2 py-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}