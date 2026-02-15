"use client";

import {
  Cpu,
  BrainCircuit,
  Network,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function FeatureMatrix() {
  const features = [
    {
      title: "End-to-End Technology & Product Development",
      icon: Cpu,
      desc: (
        <>
          We design and build digital products{" "}
          <strong className="font-semibold text-white">
            from the ground up
          </strong>
          . From system architecture to production-ready software,
          we develop custom solutions written in native technologies,
          tailored to real business, product, and market needs.
          No templates. No shortcuts. Only systems engineered to last.
        </>
      ),
    },
    {
      title: "Custom AI & LLM-Based Solutions",
      icon: BrainCircuit,
      desc: (
        <>
          We design and develop{" "}
          <strong className="font-semibold text-white">
            custom AI systems
          </strong>{" "}
          and Large Language Model solutions from scratch.
          From model selection and fine-tuning to orchestration,
          reasoning pipelines, and real-world integration,
          we build AI as part of the product — not as an add-on.
        </>
      ),
    },
    {
      title: "Technology, Marketing & Growth Systems",
      icon: Network,
      desc: (
        <>
          We combine technology and marketing into{" "}
          <em className="italic text-white">
            unified digital ecosystems
          </em>
          . Platforms, data, automation, analytics, and growth tools
          are designed together, allowing products to scale,
          communicate, and evolve with a clear technical
          and strategic foundation.
        </>
      ),
    },
  ];

  return (
    <section className="relative bg-black py-28 md:py-40 overflow-hidden px-4">
      {/* MATRIX CIRCUIT LINES */}
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-red-500/10"
            style={{ left: `${(i + 1) * 7}%` }}
          />
        ))}

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-24 bg-red-500/40 blur-[2px]
              animate-[pulseFlow_4s_linear_infinite]"
            style={{
              left: `${(i + 1) * 14}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        <style>{`
          @keyframes pulseFlow {
            0% { transform: translateY(-40vh); opacity: 0; }
            40% { opacity: 0.9; }
            100% { transform: translateY(60vh); opacity: 0; }
          }
        `}</style>
      </div>

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-red-400 text-sm tracking-[0.35em] font-mono">
              <span className="block w-2 h-2 rounded-full bg-red-500" />
              MIUTIFIN SYSTEMS
            </div>
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
            We build technology
            <br className="hidden sm:block" />
            <span className="text-red-400 italic">
              from zero
            </span>
            .
          </h2>

          <p className="text-white/60 mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Miutifin is a technology production company.
            We design and develop custom software, digital products,
            and AI-powered systems from scratch — combining engineering,
            algorithms, and strategy into scalable, real-world solutions.
          </p>
        </div>

        {/* FEATURES */}
        <div className="flex flex-col gap-20 md:gap-28">
          {features.map((f, i) => {
            const isRight = i % 2 !== 0;
            const Icon = f.icon;

            return (
              <div
                key={i}
                className={`
                  relative max-w-2xl md:max-w-7xl
                  ${isRight ? "md:ml-auto text-right" : "md:mr-auto text-left"}
                `}
              >
                <div
                  className={`
                    absolute top-1/2 -translate-y-1/2
                    h-4 w-4 rounded-full
                    bg-red-500/80 blur-[4px]
                    hidden md:block
                    ${isRight ? "-right-10" : "-left-10"}
                  `}
                />

                <div
                  className={`
                    mb-4 inline-flex items-center justify-center
                    w-12 h-12 rounded-xl
                    bg-red-500/10 text-red-400
                    ${isRight ? "ml-auto" : ""}
                  `}
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                  {f.title}
                </h3>

                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
                  {f.desc}
                </p>

                <div
                  className={`
                    mt-6 h-[2px] w-24 sm:w-36
                    bg-gradient-to-r from-red-500 to-transparent
                    ${isRight ? "ml-auto rotate-180" : ""}
                  `}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
