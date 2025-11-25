// src/app/dashboard/analytics/page.tsx
export default function AnalyticsPage() {
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-purple-700">
          Workload Analytics
        </h2>
        <p className="text-sm text-slate-600">
          This view will summarize how many tasks you have per day, priority
          distribution, and upcoming deadlines to help avoid overload.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white shadow p-4">
            <p className="text-xs text-slate-500">This week</p>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-xs text-slate-500 mt-1">
              total tasks scheduled (demo value)
            </p>
          </div>
          <div className="rounded-xl bg-white shadow p-4">
            <p className="text-xs text-slate-500">High priority</p>
            <p className="text-3xl font-bold text-red-500">4</p>
            <p className="text-xs text-slate-500 mt-1">
              tasks marked as HIGH (demo)
            </p>
          </div>
          <div className="rounded-xl bg-white shadow p-4">
            <p className="text-xs text-slate-500">Completion rate</p>
            <p className="text-3xl font-bold text-purple-600">68%</p>
            <p className="text-xs text-slate-500 mt-1">
              example metric for reporting
            </p>
          </div>
        </div>
      </div>
    );
  }