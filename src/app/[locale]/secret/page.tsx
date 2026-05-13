"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

export default function SecretPage() {
  const supabase = createSupabaseBrowserClient();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.from("waitlist").insert({
      full_name: fullName,
      phone,
      email,
      source: "secret",
    });

    if (error) {
      setError("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setDone(true);
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden px-6 flex flex-col text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]" />

        {/* soft glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-red-600/20 blur-[200px]"
        />

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.97))]" />
      </div>

      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-8 flex justify-center"
      >
        <img
          src="/logo_small_trasparent.png"
          alt="Miutifin"
          className="h-10 opacity-80 select-none"
        />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <section className="max-w-xl w-full text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.55em] text-white/40"
          >
            Private access
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-4xl md:text-5xl font-semibold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
          >
            This page wasn’t meant to be found.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-4 text-white/60 leading-relaxed"
          >
            Miutifin is a private layer of the city.
            <br />
            Access is intentional. Visibility is limited.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(239,68,68,0.10)]"
          >
            {!done ? (
              <div className="space-y-4">
                <Input
                  value={fullName}
                  onChange={setFullName}
                  placeholder="Full name"
                />

                <Input
                  value={phone}
                  onChange={setPhone}
                  placeholder="Phone number"
                />

                <Input
                  value={email}
                  onChange={setEmail}
                  placeholder="Email address"
                />

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative w-full mt-2 rounded-xl bg-red-600 py-3 text-sm font-medium transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_36px_rgba(239,68,68,0.55)] active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                >
                  <span className="relative z-10">
                    {loading ? "Requesting access…" : "Request access"}
                  </span>

                  {/* subtle shimmer */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[shimmer_1.8s_linear_infinite]" />
                  </span>
                </button>

                <p className="text-xs text-white/40 pt-2">
                  Requests are reviewed manually.
                  <br />
                  No spam. No public launch.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 space-y-4"
              >
                <p className="text-lg font-medium">
                  Request received
                </p>
                <p className="text-white/60 text-sm">
                  If access is granted, you’ll be contacted.
                </p>
                <p className="text-xs text-white/40">
                  Some doors open quietly.
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>
      </div>

      {/* COPYRIGHT */}
      <div className="relative z-10 pb-6 text-center">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Miutifin. All rights reserved.
        </p>
      </div>
    </main>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 placeholder-white/30 outline-none transition-all focus:border-red-500/60 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.28)]"
    />
  );
}
