// src/app/dashboard/layout.tsx
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import "@/app/globals.css"; // ensure Tailwind works

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <header className="w-full bg-white border-b shadow-sm flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-semibold text-purple-600">
          Campus Task Manager
        </h1>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-purple-600">
            🔔
          </button>
          <p className="text-sm text-gray-700">{user.email}</p>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r pt-6 px-4">
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              📅 Calendar
            </a>

            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              📊 Workload Analytics
            </a>

            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              🔔 Reminder Settings
            </a>

            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700"
            >
              ⭐ Task Priority Settings
            </a>
          </nav>

          <div className="mt-auto mb-6 border-t pt-4">
            <p className="text-sm font-medium text-gray-600">Logged in as:</p>
            <p className="text-sm text-gray-700">{user.email}</p>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}