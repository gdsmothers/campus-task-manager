import TasksPanel from "./tasks-panel";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Today’s Tasks
      </h2>
      <p className="text-sm text-slate-600 mb-2">
        View and manage your upcoming tasks and deadlines.
      </p>
      <TasksPanel />
    </div>
  );
}