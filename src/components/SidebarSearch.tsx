"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function SidebarSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = query.trim();
    if (!raw) return;

    const q = raw.toLowerCase();

    // Simple command-style routing
    if (q.includes("calendar")) {
      router.push("/dashboard/calendar");
      return;
    }

    if (q.includes("analytic") || q.includes("stats") || q.includes("heat")) {
      router.push("/dashboard/analytics");
      return;
    }

    if (q.includes("remind")) {
      router.push("/dashboard/reminders");
      return;
    }

    if (q.includes("task") || q.includes("home") || q.includes("dash")) {
      router.push("/dashboard");
      return;
    }

    // Fallback: task title filter on dashboard
    router.push(`/dashboard?search=${encodeURIComponent(raw)}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search (try 'calendar'...)"
        className="w-full rounded-2xl bg-white/15 text-[11px] px-3 py-2 placeholder:text-white/60 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-white/70"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}