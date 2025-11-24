// src/app/dashboard/page.tsx
import TasksPanel from "./tasks-panel";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">
        Today’s Tasks
      </h2>

      <TasksPanel />
    </div>
  );
}