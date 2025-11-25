// src/app/dashboard/reminders/page.tsx
export default function RemindersSettingsPage() {
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-purple-700">
          Reminder Settings
        </h2>
        <p className="text-sm text-slate-600">
          Configure when reminders are created relative to deadlines. Currently,
          the system automatically creates a reminder 1 day before any task with
          a due date. Future work includes email or SMS notification channels.
        </p>
  
        <div className="mt-4 rounded-xl bg-white shadow p-4 space-y-2 text-sm">
          <p className="font-medium text-slate-700">Current behavior</p>
          <ul className="list-disc list-inside text-slate-600">
            <li>
              When a task has a due date, a reminder is automatically scheduled
              1 day before.
            </li>
            <li>
              You can manually trigger reminder processing from the dashboard
              using the “Run Reminders (Demo)” button.
            </li>
          </ul>
        </div>
      </div>
    );
  }