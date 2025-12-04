import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-red-400 text-transparent bg-clip-text drop-shadow">
          Campus Task Manager
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Stay organized. Track assignments. Prioritize intelligently.  
          Get reminders before deadlines. Your academic life—simplified.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium text-sm shadow-lg hover:bg-purple-700 transition"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 rounded-xl border border-purple-400 text-purple-300 font-medium text-sm hover:bg-purple-400/10 transition"
          >
            Create Account
          </Link>
        </div>

        {/* Footer line */}
        <p className="text-xs text-slate-500 mt-10">
          A productivity tool designed for students. 
        </p>

      </div>
    </div>
  );
}