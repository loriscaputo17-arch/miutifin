"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/inside/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

type User = {
  email: string;
};

export default function AccountPage() {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { email: data.user.email! } : null);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white p-10">
        Loading account…
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <p className="mb-4 text-lg">You are not logged in</p>
        <Link
          href="/auth/login"
          className="px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition"
        >
          Login
        </Link>
      </main>
    );
  }

  const initial = user.email[0].toUpperCase();

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 px-6">
        <div className="mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* AVATAR */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-white/30 to-white/5 flex items-center justify-center text-3xl text-white font-medium">
              {initial}
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h1 className="text-2xl text-white">
                Welcome back
              </h1>
              <p className="text-white/50 text-sm mt-1">
                {user.email}
              </p>
            </div>

            {/* ACTION */}
            <button
              onClick={logout}
              className="px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mt-16 px-6">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ActionCard
            title="Saved"
            description="Events and places you saved"
            href="/favourites"
          />
          <ActionCard
            title="My Journeys"
            description="Journeys you created or followed"
            href="/journeys"
          />
          <ActionCard
            title="Settings"
            description="Preferences and privacy"
            href="/settings"
          />
        </div>
      </section>

      {/* ACTIVITY */}
      <section className="mt-24 px-6">
        <div className="mx-auto">
          <h2 className="text-xl text-white mb-6">
            Your activity
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white/50 text-sm">
            No recent activity yet.
          </div>
        </div>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

/* COMPONENT */
function ActionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        block
        bg-white/5 hover:bg-white/10
        border border-white/10
        rounded-2xl
        p-6
        transition
      "
    >
      <h3 className="text-white text-lg mb-2">
        {title}
      </h3>
      <p className="text-white/50 text-sm">
        {description}
      </p>
    </Link>
  );
}
