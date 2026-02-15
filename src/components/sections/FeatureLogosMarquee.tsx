"use client";

import { Container } from "@/components/ui/Container";

export function FeatureLogosMarquee() {
  const companies = [
    "Adidas",
    "Beatclub",
    "Reply Totem",
    "Forbes Italia",
    "QuestIT",
    "Smart City Kids NYC",
    "Skratch Bastid",
    "Arya Hungry",
    "Blink",
    "Teleios",
    "Revue",
    "Skema",
    "Cleope",
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <Container>
        {/* LABEL */}
        <div className="mb-10 text-center">
          <span className="text-red-400/80 text-xs tracking-[0.35em] font-mono uppercase">
            COLLABORATED WITH
          </span>
        </div>
      </Container>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-24 px-10 whitespace-nowrap"
          style={{
            animation: "marquee 35s linear infinite",
            width: "max-content",
          }}
        >
          {[...companies, ...companies].map((name, i) => (
            <span
              key={i}
              className="
                text-white/60
                text-lg md:text-xl
                font-medium
                tracking-wide
                hover:text-white
                transition-colors
              "
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="mt-10 text-center space-y-1">
        <span className="block text-white/30 text-[9px] tracking-[0.35em] font-mono uppercase">
          Company names are trademarks of their respective owners.
        </span>
        <span className="block text-white/30 text-[9px] tracking-[0.35em] font-mono uppercase">
          Used for identification purposes only.
        </span>
      </div>

      {/* GRADIENT EDGES */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />

      {/* GLOBAL STYLE (NO JSX) */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
