import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarSearch } from "@/components/SidebarSearch";
import "@/app/globals.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">

      {/* TOP BAR */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-purple-200 flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text">
          Campus Task Manager
        </h1>

        <div className="flex items-center gap-4">

          <span className="text-xs text-slate-600 hidden sm:inline">
            {user.email}
          </span>

          <form action="/api/logout" method="POST">
            <button className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 shadow">
              Log out
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-1">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-[#235DFF] text-white pt-6 pb-4 px-4 rounded-r-3xl shadow-xl space-y-4">

        <div className="flex items-center gap-3 px-1">
          <div className="h-9 w-9 rounded-2xl bg-white/90 flex items-center justify-center text-[#235DFF] font-bold">
            CT
          </div>
          <div>
            <p className="text-sm font-semibold">Campus Task</p>
            <p className="text-[11px] text-white/70">Manager</p>
          </div>
        </div>

        {/* Search box */}
        <div className="mt-4">
          <div className="mt-4">
            <SidebarSearch />
          </div>
        </div>

        {/* Menu */}
        <div className="mt-2 space-y-1 text-[13px]">
          <p className="text-[10px] uppercase tracking-wide text-white/50 px-1">
            Menu
          </p>

          <a href="/dashboard" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/15">
            <span>Dashboard</span>
          </a>

          <a href="/dashboard/calendar" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/15">
            <span>Calendar</span>
          </a>
          
          <a href="/dashboard/analytics" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/15">
            <span>Workload Analytics</span>
          </a>
          
          <a href="/dashboard/reminders" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/15">
            <span>Reminder Settings</span>
          </a>

          <a href="/dashboard/priority" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/15">
            <span>Task Priority</span>
          </a>

          <a href="/dashboard/canvas" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/15">
            <span>Canvas Integration</span>
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User info */}
        <div className="flex items-center justify-between mt-3 bg-white/10 rounded-2xl px-3 py-2">
          <div>
            <p className="text-[11px] font-semibold line-clamp-1">
              {user.email}
            </p>
            <p className="text-[10px] text-white/70">Student</p>
          </div>
        </div>
      </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}