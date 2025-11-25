// src/app/dashboard/layout.tsx
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Bar */}
      <header className="w-full bg-white border-b shadow-sm flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-semibold text-purple-600">
          Campus Task Manager
        </h1>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-purple-600 text-lg">
            🔔
          </button>
          <span className="text-sm text-gray-700 hidden sm:inline">
            {user.email}
          </span>
          <form action="/api/logout" method="POST">
            <button
              className="px-3 py-1 rounded-full border border-purple-500 text-purple-600 text-xs font-medium hover:bg-purple-50"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - hidden on small screens */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r pt-6 px-4">
          <nav className="space-y-2 text-sm">
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              📋 Tasks
            </a>
            <a
              href="/dashboard/calendar"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              📅 Calendar
            </a>
            <a
              href="/dashboard/analytics"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              📊 Workload Analytics
            </a>
            <a
              href="/dashboard/reminders"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              🔔 Reminder Settings
            </a>
            <a
              href="/dashboard/priority"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              ⭐ Task Priority Settings
            </a>
          </nav>

          <div className="mt-auto mb-6 border-t pt-4 text-xs text-gray-500">
            Logged in as
            <div className="text-gray-700 font-medium break-all">
              {user.email}
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-6 max-w-5xl mx-auto">{children}</main>
      </div>
    </div>
  );
}