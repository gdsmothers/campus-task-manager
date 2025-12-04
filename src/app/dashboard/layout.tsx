import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
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
        <aside className="hidden md:flex flex-col w-64 bg-white/90 backdrop-blur-md border-r border-purple-200 pt-6 px-4 space-y-2">

          <nav className="space-y-2 text-sm font-medium">

            <a href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-purple-100 text-slate-700">
              📋 Tasks
            </a>

            <a href="/dashboard/calendar" className="block px-3 py-2 rounded-lg hover:bg-purple-100 text-slate-700">
              📅 Calendar
            </a>

            <a href="/dashboard/analytics" className="block px-3 py-2 rounded-lg hover:bg-purple-100 text-slate-700">
              📊 Analytics
            </a>

            <a href="/dashboard/reminders" className="block px-3 py-2 rounded-lg hover:bg-purple-100 text-slate-700">
              🔔 Reminder Settings
            </a>

            <a href="/dashboard/priority" className="block px-3 py-2 rounded-lg hover:bg-purple-100 text-slate-700">
              ⭐ Priority Settings
            </a>
          </nav>

          <div className="mt-auto mb-6 border-t border-purple-200 pt-4 text-xs text-slate-500">
            Logged in as
            <div className="font-semibold text-slate-800 break-all">
              {user.email}
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