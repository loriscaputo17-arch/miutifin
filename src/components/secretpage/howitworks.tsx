"use client";

import { Compass, Lock, Sparkles } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="relative py-20 px-6 overflow-hidden" id="#howitworks2">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.9))]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            How Miutifin works
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Miutifin is not an open platform.  
            It’s designed to surface the right experiences, at the right time,
            to the right people.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <FeatureItem
            icon={<Compass />}
            title="Curated discovery"
            description="Experiences are not ranked by popularity or ads. Each event, place or journey is selected based on relevance, quality and intent."
            points={[
              "No infinite scrolling",
              "No paid placement",
              "Human + algorithmic curation",
            ]}
          />

          <FeatureItem
            icon={<Lock />}
            title="Private access layers"
            description="Not everything is visible to everyone. Some experiences require context, timing or approval to be unlocked."
            points={[
              "Invite-only content",
              "Time-limited visibility",
              "Access based on profile & behavior",
            ]}
          />

          <FeatureItem
            icon={<Sparkles />}
            title="Context-aware experiences"
            description="What you see adapts dynamically. Location, time, intent and group size shape what becomes visible."
            points={[
              "City & moment aware",
              "Adaptive recommendations",
              "Designed for real-world plans",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURE ITEM ---------------- */

function FeatureItem({
  icon,
  title,
  description,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition border-white/20">
      {/* ICON */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/10 text-red-500 mb-6 scale-110 transition">
        {icon}
      </div>

      {/* CONTENT */}
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-3 text-white/60 text-sm leading-relaxed">
        {description}
      </p>

      {/* POINTS */}
      <ul className="mt-6 space-y-2 text-sm text-white/70">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {p}
          </li>
        ))}
      </ul>

      {/* HOVER GLOW */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_60%)]" />
      </div>
    </div>
  );
}
