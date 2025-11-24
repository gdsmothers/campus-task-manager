// src/app/dashboard/tasks-panel.tsx
"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  state: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
  dueAt: string | null;
  priority: "LOW" | "MED" | "HIGH";
};

export default function TasksPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    dueAt: "",
    priority: "MED",
  });

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load tasks");
      } else {
        setTasks(data.tasks || []);
      }
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to create task");
        return;
      }
      setForm({ title: "", dueAt: "", priority: "MED" });
      loadTasks();
    } catch {
      alert("Failed to create task");
    }
  }

  async function markComplete(id: string) {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: "COMPLETED" }),
      });
      loadTasks();
    } catch {
      alert("Failed to update task");
    }
  }

  async function deleteTask(id: string) {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      loadTasks();
    } catch {
      alert("Failed to delete task");
    }
  }

  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Add Task</h2>
        <form className="space-y-3" onSubmit={handleCreate}>
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Due date & time</label>
              <input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 text-sm"
                value={form.dueAt}
                onChange={(e) => setForm({ ...form, dueAt: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Priority</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as Task["priority"] })
                }
              >
                <option value="LOW">Low</option>
                <option value="MED">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Create Task
          </button>
        </form>
      </section>

      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Your Tasks</h2>

        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && tasks.length === 0 && !error && (
          <p className="text-sm text-slate-500">No tasks yet. Add one above.</p>
        )}

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border rounded px-3 py-2"
            >
              <div>
                <div className="font-medium">
                  {task.title}{" "}
                  {task.state === "COMPLETED" && (
                    <span className="text-xs text-green-600 ml-1">[Done]</span>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  Priority: {task.priority}
                  {task.dueAt && ` • Due: ${new Date(task.dueAt).toLocaleString()}`}
                </div>
              </div>
              <div className="flex gap-2">
                {task.state !== "COMPLETED" && (
                  <button
                    onClick={() => markComplete(task.id)}
                    className="text-xs px-2 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}