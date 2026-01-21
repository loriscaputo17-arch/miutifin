"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  const handleReset = async () => {
    setError(null);

    if (!passwordValid) {
      setError(
        "Password must be at least 8 characters, include a capital letter and a number."
      );
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError("Something went wrong. Try again.");
      return;
    }

    setDone(true);

    // opzionale: logout sicurezza
    await supabase.auth.signOut();

    setTimeout(() => {
      router.replace("/auth/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0c0c0c]/80 backdrop-blur-xl rounded-3xl px-8 py-10 text-center">

        {/* LOGO */}
        <img
          src="/logo_small_trasparent.png"
          className="h-12 mx-auto mb-6"
          alt="Miutifin"
        />

        {done ? (
          <>
            <h1 className="text-white text-2xl mb-2">
              Password updated ✅
            </h1>

            <p className="text-white/60 text-sm">
              Redirecting you to login…
            </p>
          </>
        ) : (
          <>
            <h1 className="text-white text-2xl mb-2">
              Set a new password
            </h1>

            <p className="text-white/50 text-sm mb-6">
              Choose a strong password to secure your account.
            </p>

            {error && (
              <p className="text-red-400 text-sm mb-4">
                {error}
              </p>
            )}

            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-lg bg-black/20 border border-white/10 text-white"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-3 mb-6 rounded-lg bg-black/20 border border-white/10 text-white"
            />

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-white text-black font-medium"
            >
              {loading ? "Updating…" : "Update password"}
            </button>

            <p className="text-white/40 text-xs mt-4">
              Minimum 8 characters, 1 uppercase letter and 1 number
            </p>
          </>
        )}
      </div>
    </div>
  );
}
