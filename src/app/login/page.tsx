export default function LoginPage() {
  // keep your handlers / state as before

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl bg-white/90 shadow-xl border border-purple-200/60 p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome back
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to your Campus Task Manager account to view your dashboard.
        </p>

        {/* your actual <form> goes here, with email/password inputs */}
      </div>
    </div>
  );
}