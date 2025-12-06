"use client";

export default function CanvasIntegrationPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Canvas Integration (Future Work)
      </h2>
      <p className="text-sm text-slate-600">
        This page sketches how Campus Task Manager would connect to Canvas to
        automatically import assignments, quizzes, and exams into your task
        and calendar views.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white/90 border border-slate-200 p-4 text-xs text-slate-700 space-y-2">
          <p className="font-semibold text-slate-800">
            Planned capabilities
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              Securely connect to a student&apos;s Canvas account using an API
              token provided by the university.
            </li>
            <li>
              Import upcoming assignments, quizzes, exams, and discussion posts
              as tasks with correct due dates.
            </li>
            <li>
              Map imported items directly onto the monthly calendar and into the
              analytics view.
            </li>
            <li>
              Let the student decide which imported items should become
              high/medium/low priority tasks.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-950/80 border border-purple-400/40 p-4 text-xs text-slate-100 space-y-2">
          <p className="font-semibold text-purple-200">
            How it fits into the current system
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              Imported Canvas items would be saved in the same <b>Task</b> table
              used by manually created tasks.
            </li>
            <li>
              The existing reminder logic (1-day-before email reminders) would
              automatically apply to imported items with due dates.
            </li>
            <li>
              The analytics heatmap would show Canvas workload intensity by day
              and time, helping students avoid overload.
            </li>
            <li>
              Reliability concerns include API failures, stale data, and auth
              token expiration, which can be mitigated with retries and
              clear error messages.
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white/90 border border-slate-200 p-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-800 mb-1">
          Current prototype status
        </p>
        <p>
          The present project focuses on a dependable core: tasks, calendar,
          reminders, and analytics. Canvas integration is documented as planned
          future work to reduce manual data entry and improve consistency
          between learning platforms and the student&apos;s personal planner.
        </p>
      </div>
    </div>
  );
}