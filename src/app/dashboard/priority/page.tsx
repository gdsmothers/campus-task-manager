"use client";

export default function PriorityPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Task Priority Guide
      </h2>
      <p className="text-sm text-slate-600">
        Campus Task Manager supports three priority levels to help you focus
        on what matters most. In future versions, these priorities can also
        influence reminders and analytics.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4">
          <p className="text-xs font-semibold text-red-600 mb-1">
            HIGH PRIORITY
          </p>
          <p className="text-sm font-medium text-slate-800">
            Urgent & important
          </p>
          <ul className="mt-2 text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Major exams, project deadlines, scholarship apps</li>
            <li>Due within the next 48 hours</li>
            <li>Should always appear at the top of your task list</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-xs font-semibold text-amber-600 mb-1">
            MEDIUM PRIORITY
          </p>
          <p className="text-sm font-medium text-slate-800">
            Important, but not urgent
          </p>
          <ul className="mt-2 text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Weekly homework, reading, lab prep</li>
            <li>Due later this week</li>
            <li>Helps prevent last-minute cramming</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
          <p className="text-xs font-semibold text-emerald-600 mb-1">
            LOW PRIORITY
          </p>
          <p className="text-sm font-medium text-slate-800">
            Nice-to-have or flexible
          </p>
          <ul className="mt-2 text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Optional review, personal goals, long-term ideas</li>
            <li>No strict due date</li>
            <li>Still visible, but not distracting from urgent work</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white/90 border border-slate-200 p-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-800 mb-1">
          How priorities tie into the system
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            On the dashboard, tasks are visually tagged by priority to support
            quick triage.
          </li>
          <li>
            In the calendar and analytics views, priority can be used to
            highlight high-risk days where many high-priority items are due.
          </li>
          <li>
            Reminders can be extended in future work so that high-priority tasks
            trigger additional notifications.
          </li>
        </ul>
      </div>
    </div>
  );
}