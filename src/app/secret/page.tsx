"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

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
    <main className="relative min-h-screen bg-black overflow-hidden px-6 flex flex-col">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08] bg-[url('/noise.png')]" />
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-red-600/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.95))]" />
      </div>

      {/* LOGO */}
      <div className="relative z-10 pt-8 flex justify-center">
        <img
          src="/logo_small_trasparent.png"
          alt="Miutifin"
          className="h-10 opacity-80 select-none"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <section className="max-w-xl w-full text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Private access
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
            This page wasn’t meant to be found.
          </h1>

          <p className="mt-4 text-white/60 leading-relaxed">
            Miutifin is a private layer of the city.  
            Access is intentional. Visibility is limited.
          </p>

          <div className="mt-12 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-8">
            {!done ? (
              <div className="space-y-4">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-xl bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 placeholder-white/30 focus:outline-none focus:border-red-500/60"
                />

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-xl bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 placeholder-white/30 focus:outline-none focus:border-red-500/60"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-xl bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 placeholder-white/30 focus:outline-none focus:border-red-500/60"
                />

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-2 rounded-xl bg-red-600 py-3 text-sm font-medium hover:bg-red-500 transition disabled:opacity-50"
                >
                  {loading ? "Requesting access…" : "Request access"}
                </button>

                <p className="text-xs text-white/40 pt-2">
                  Requests are reviewed manually.  
                  No spam. No public launch.
                </p>
              </div>
            ) : (
              <div className="py-10 space-y-4 animate-fadeIn">
                <p className="text-lg font-medium">
                  Request received
                </p>
                <p className="text-white/60 text-sm">
                  If access is granted, you’ll be contacted.
                </p>
                <p className="text-xs text-white/40">
                  Some doors open quietly.
                </p>
              </div>
            )}
          </div>
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
