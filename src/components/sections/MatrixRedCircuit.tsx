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
      title: "The Right Systems Engine",
      icon: Cpu,
      desc: (
        <>
          We architect technology that feels{" "}
          <em className="italic text-white">unreal</em> until it exists.
          Miutifin turns abstract,{" "}
          <strong className="font-semibold text-white">
            unbuildable visions
          </strong>{" "}
          into real systems by designing the underlying architecture,
          data models, and execution logic required to operate at scale.
          This means fewer compromises, cleaner foundations, and products
          that remain adaptable long after launch.
        </>
      ),
    },
    {
      title: "Autonomous Creative Intelligence",
      icon: BrainCircuit,
      desc: (
        <>
          A system that{" "}
          <strong className="font-semibold text-white">
            thinks alongside you
          </strong>
          , not after you. Miutifin continuously expands ideas,
          proposes alternatives, and redesigns workflows based on
          real usage, constraints, and objectives. Instead of static
          features, you get an intelligence layer that actively
          contributes to strategy, execution, and evolution.
        </>
      ),
    },
    {
      title: "Total Signal Convergence",
      icon: Network,
      desc: (
        <>
          Every interaction becomes a{" "}
          <em className="italic text-white">signal</em>.
          Every signal becomes{" "}
          <strong className="font-semibold text-white">
            usable intelligence
          </strong>
          . Miutifin connects data, documents, tools, and workflows
          into a single operational context, allowing decisions to be
          informed by the full picture rather than isolated inputs.
          The result is a system that understands how everything
          relates — and acts accordingly.
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
              MIUTIFIN CIRCUIT
            </div>
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
            The system beneath
            <br className="hidden sm:block" />
            <span className="text-red-400 italic">
              everything you build
            </span>
            .
          </h2>

          <p className="text-white/60 mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Miutifin designs systems that do not exist yet —
            an architectural engine built to translate{" "}
            <strong className="text-white font-medium">
              ambitious ideas
            </strong>{" "}
            into real, scalable, and operational technology without
            sacrificing flexibility or long-term vision.
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
