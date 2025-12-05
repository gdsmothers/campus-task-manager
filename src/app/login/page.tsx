"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError((data as any).error || "Login failed");
      } else {
        // Cookie is set by the API route; we just navigate to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("LOGIN_FETCH_ERROR", err);
      setError("Network error during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/95 shadow-2xl border border-purple-200/70 p-6 space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back 👋
          </h1>
          <p className="text-xs text-slate-500">
            Log in to access your Campus Task Manager dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-600"
            >
              School email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-xs font-medium text-slate-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-red-500 text-white text-sm font-semibold px-4 py-2.5 shadow-md hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}