// src/app/dashboard/priority/page.tsx
export default function PrioritySettingsPage() {
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-purple-700">
          Task Priority Settings
        </h2>
        <p className="text-sm text-slate-600">
          The system currently supports three priority levels: LOW, MED, and HIGH.
          Future work will allow customizing rules, like automatically flagging
          tasks due in the next 24 hours as HIGH.
        </p>
  
        <div className="mt-4 rounded-xl bg-white shadow p-4 space-y-2 text-sm">
          <p className="font-medium text-slate-700">Current priorities</p>
          <ul className="list-disc list-inside text-slate-600">
            <li>LOW – background or flexible tasks.</li>
            <li>MED – default priority for most items.</li>
            <li>HIGH – critical tasks that need immediate attention.</li>
          </ul>
        </div>
      </div>
    );
  }