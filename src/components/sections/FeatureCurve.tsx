"use client";

import { Container } from "@/components/ui/Container";

export function FeatureCurve() {
  const products = [
    {
      title: "Miutifin",
      desc: "A city-scale discovery and social concierge that learns what you like and suggests where to go, what to do, and who to meet — in real time.",
      tag: "01",
    },
    {
      title: "COMM",
      desc: "A community operating system for brands, events, and companies — members, drops, guest lists, and engagement managed from a single intelligent layer.",
      tag: "02",
    },
    {
      title: "Cleope",
      desc: "A creative engine for experiences. From concept to flow, Cleope helps design events that feel cinematic, on-brand, and impossible to forget.",
      tag: "03",
    },
    {
      title: "Blink",
      desc: "A video-first dating app where matches happen through live calls, not endless swipes — built for real chemistry, not just profiles.",
      tag: "04",
    },
    {
      title: "Skema",
      desc: "A study companion for university: turn files, notes, or audio into structured diagrams and learning maps that make revision actually usable.",
      tag: "05",
    },
  ];

  return (
    <section className="relative bg-black py-48 overflow-hidden px-4">
      {/* CURVED RED FLOW */}
      <svg
        className="absolute inset-x-0 top-20 opacity-40"
        height="600"
        width="100%"
        viewBox="0 0 1400 600"
      >
        <path
          d="
            M0,300 
            C300,100 600,500 900,300 
            C1100,150 1300,450 1400,250
          "
          stroke="rgba(255,60,60,0.5)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "blur(12px)",
          }}
        />
      </svg>

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-24 text-left md:text-left">
          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-[1.15]">
            Products that prove{" "}
            <span className="text-red-400">“impossible”</span> is just
            the starting point.
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-xl">
            Built for others, born from Miutifin’s way of thinking:
            creative technology, not just software.
          </p>
        </div>

        {/* Product Items */}
        <div className="flex flex-col gap-24">
          {products.map((p, i) => (
            <div
              key={p.title}
              className={`
                max-w-2xl relative
                ${i % 2 === 0 ? "" : "ml-auto text-right"}
              `}
            >
              {/* Tag / number */}
              <div
                className={`
                  text-red-400/80 text-sm font-mono tracking-[0.3em] mb-3
                  ${i % 2 !== 0 ? "ml-auto" : ""}
                `}
              >
                {p.tag} • PRODUCT
              </div>

              <h3 className="text-white text-3xl md:text-4xl font-semibold mb-3">
                {p.title}
              </h3>

              <p className="text-white/60 text-lg leading-relaxed">
                {p.desc}
              </p>

              <div
                className={`
                  mt-6 h-[2px] w-24 bg-gradient-to-r from-red-500 to-transparent
                  ${i % 2 !== 0 ? "ml-auto rotate-180" : ""}
                `}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
