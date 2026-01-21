"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/secretpage/Navbar";
import { HeroSection } from "@/components/secretpage/HeroSection";
import { HowItWorks } from "@/components/secretpage/howitworks";
import { Footer } from "@/components/layout/Footer";

export default function MiutifinLanding() {
  const fullText = "Discover what’s happening. Not everything is public.";
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<"waitlist" | "search">("waitlist");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">

      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* SECTION 2 — VERTICAL CARDS */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center font-bold">Featured discoveries</h2>
          <p className="mt-1 text-white/60 text-center">
            A selection of events and places. Some are visible. Others are not.
          </p>

          <div className="mt-10 flex gap-6 overflow-x-auto pb-4">
            <VerticalCard
              title="Secret rooftop party"
              address="Via Roma 21, Milan"
              price="€25"
            />
            <VerticalCard
              title="Hidden cocktail bar"
              address="Shoreditch, London"
              price="€18"
            />
            <VerticalCard
              title="Private live set"
              address="Berlin Mitte"
              price="Invite only"
            />
            <VerticalCard
              title="Secret rooftop party"
              address="Via Roma 21, Milan"
              price="€25"
            />
            <VerticalCard
              title="Hidden cocktail bar"
              address="Shoreditch, London"
              price="€18"
            />
            <VerticalCard
              title="Private live set"
              address="Berlin Mitte"
              price="Invite only"
            />
            <VerticalCard
              title="Secret rooftop party"
              address="Via Roma 21, Milan"
              price="€25"
            />
            <VerticalCard
              title="Hidden cocktail bar"
              address="Shoreditch, London"
              price="€18"
            />
            <VerticalCard
              title="Private live set"
              address="Berlin Mitte"
              price="Invite only"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <HowItWorks />

      {/* TIKTOKS */}
      <section className="px-6 pt-40 mb-40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-medium">From the community</h2>
          <p className="mt-3 text-white/60 max-w-xl">
            Moments shared by people inside the platform.
          </p>

          <div className="mt-10 flex gap-6 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[9/16] min-w-[240px] rounded-3xl bg-black border border-white/10 flex items-center justify-center text-white/40"
              >
                TikTok video
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function VerticalCard({
  title,
  address,
  price,
}: {
  title: string;
  address: string;
  price: string;
}) {
  return (
    <div className="relative aspect-[9/16] min-w-[260px] rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer transition">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-white/60">{address}</p>
        <p className="text-sm text-white/80">{price}</p>
        <a className="inline-block mt-2 text-sm text-red-500">
          View details →
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <h4 className="text-xl font-medium">{title}</h4>
      <p className="mt-3 text-white/60 text-sm">{text}</p>
    </div>
  );
}

function Input({ label }: { label: string }) {
  return (
    <div className="relative">
      <label className="block mb-1 text-xs uppercase tracking-widest text-white/40">
        {label}
      </label>
      <input
        className="w-full rounded-full bg-black/80 border border-white/10 px-5 py-3 text-sm focus:outline-none focus:border-red-500/60 transition"
      />
    </div>
  );
}

function Select({ label }: { label: string }) {
  return (
    <div className="relative">
      <label className="block mb-1 text-xs uppercase tracking-widest text-white/40">
        {label}
      </label>
      <div className="rounded-full bg-black/80 border border-white/10 px-5 py-3 text-sm text-white/50">
        —
      </div>
    </div>
  );
}

