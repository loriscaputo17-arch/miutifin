"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "reset">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    const newErrors: any = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrors({ general: "Invalid email or password." });
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/home"), 800);
  };

  // ---------------- RESET PASSWORD ----------------
  const handleReset = async () => {
    if (!email.trim()) {
      setErrors({ email: "Email is required." });
      return;
    }

    setLoading(true);
    setErrors({});

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset-password`,
    });

    setLoading(false);

    if (error) {
      setErrors({ general: "Something went wrong. Try again." });
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-10">
      {/* BACK BUTTON */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-white/60 hover:text-white text-sm flex items-center gap-1"
      >
        <span className="text-lg">←</span> Back
      </Link>

      {/* PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-2xl
          bg-[#0c0c0c]/70
          backdrop-blur-xl
          border border-white/5
          rounded-3xl
          shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]
          px-8 sm:px-14 py-14
          text-center
        "
      >
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo_small_trasparent.png"
            className="h-12 w-12 opacity-95"
            alt="Miutifin"
          />
        </div>

        {/* DONE STATE */}
        {done ? (
          <div className="space-y-3 py-10">
            <h2 className="text-xl text-white/90">
              {mode === "login"
                ? "Welcome back"
                : "Check your email ✉️"}
            </h2>
            <p className="text-white/50 text-sm">
              {mode === "login"
                ? "Redirecting you inside Miutifin…"
                : "We sent you a link to reset your password."}
            </p>

            {mode === "reset" && (
              <button
                onClick={() => {
                  setMode("login");
                  setDone(false);
                }}
                className="text-white/60 text-sm underline mt-4"
              >
                Back to login
              </button>
            )}
          </div>
        ) : (
          <>
            {/* TITLE */}
            <h1 className="text-3xl font-semibold text-white mb-2">
              {mode === "login" ? "Welcome back!" : "Reset your password"}
            </h1>

            <p className="text-white/40 text-sm mb-10">
              {mode === "login" ? (
                <>
                  First time here?{" "}
                  <Link
                    href="/auth/register"
                    className="text-white hover:text-white/80"
                  >
                    Sign up for free
                  </Link>
                </>
              ) : (
                "Enter your email and we’ll send you a reset link."
              )}
            </p>

            {/* GENERAL ERROR */}
            {errors.general && (
              <p className="text-red-400 text-sm mb-4">
                {errors.general}
              </p>
            )}

            {/* EMAIL INPUT */}
            <div className="text-left mb-6 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-black/20 border border-white/10
                  text-white placeholder-white/30
                "
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD INPUT (solo login) */}
            {mode === "login" && (
              <div className="text-left mb-6 max-w-md mx-auto">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full px-4 py-3 rounded-lg
                    bg-black/20 border border-white/10
                    text-white placeholder-white/30
                  "
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            )}

            {/* ACTION BUTTON */}
            <button
              onClick={mode === "login" ? handleLogin : handleReset}
              disabled={loading}
              className="
                w-full max-w-md mx-auto py-3 rounded-lg
                bg-white text-black font-medium
                hover:bg-white/90 transition
              "
            >
              {loading
                ? "Please wait…"
                : mode === "login"
                ? "Sign in"
                : "Send reset link"}
            </button>

            {/* TOGGLE MODE */}
            <div className="mt-6">
              {mode === "login" ? (
                <button
                  onClick={() => setMode("reset")}
                  className="text-white/50 text-sm underline"
                >
                  Forgot password?
                </button>
              ) : (
                <button
                  onClick={() => setMode("login")}
                  className="text-white/50 text-sm underline"
                >
                  Back to login
                </button>
              )}
            </div>

            {/* TERMS */}
            <p className="text-white/30 text-xs mt-8 leading-relaxed max-w-md mx-auto">
              © {new Date().getFullYear()} Miutifin. All rights reserved.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
