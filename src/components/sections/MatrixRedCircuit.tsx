"use client";

import { Container } from "@/components/ui/Container";

export function FeatureMatrix() {
  const features = [
    {
      title: "The Right Systems Engine",
      desc: "We architect technology that feels unreal until it exists. Miutifin transforms abstract, unbuildable visions into functioning intelligence at scale.",
    },
    {
      title: "Autonomous Creative Intelligence",
      desc: "A system that thinks alongside you — expanding ideas, redesigning processes, and generating solutions beyond human imagination.",
    },
    {
      title: "Total Signal Convergence",
      desc: "Every interaction becomes a signal. Every signal becomes intelligence. Miutifin synchronizes your entire ecosystem into one evolving mind.",
    },
  ];

  return (
    <section className="relative bg-black py-24 md:py-40 overflow-hidden px-4">
      {/* MATRIX CIRCUIT LINES */}
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none">

        {/* Vertical lines */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-red-500/10"
            style={{
              left: `${(i + 1) * 7}%`,
            }}
          />
        ))}

        {/* Flow pulses */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-red-500/40 blur-[2px] animate-[pulseFlow_4s_linear_infinite]"
            style={{
              left: `${(i + 1) * 14}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        {/* Keyframes */}
        <style>{`
          @keyframes pulseFlow {
            0% { transform: translateY(-40vh); opacity: 0; }
            40% { opacity: 0.9; }
            100% { transform: translateY(60vh); opacity: 0; }
          }
        `}</style>
      </div>

      <Container className="relative z-10 px-6 md:px-0">

        {/* HEADER */}
        <div className="max-w-3xl mb-16 md:mb-20 text-center mx-auto">
          <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight">
            The <span className="text-red-400">Miutifin Circuit</span>
            <br className="hidden sm:block" />
            powering your operations.
          </h2>

          <p className="text-white/60 mt-4 sm:mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Miutifin designs systems that do not exist yet.  
            An architectural engine capable of translating impossible ideas into real, scalable, intelligent structures.
          </p>
        </div>

        {/* FEATURES */}
        <div className="flex flex-col gap-16 md:gap-24">
          {features.map((f, i) => {
            const isRight = i % 2 !== 0;

            return (
              <div
                key={i}
                className={`
                  relative 
                  max-w-xl md:max-w-3xl 
                  mx-auto 
                  ${isRight ? "text-right md:ml-auto" : "text-left md:mr-auto"}
                `}
              >
                {/* GLOW DOT */}
                <div
                  className={`
                    absolute top-1/2 -translate-y-1/2
                    h-3 w-3 sm:h-4 sm:w-4 
                    rounded-full bg-red-500/80 blur-[3px]
                    hidden md:block
                    ${isRight ? "-right-8" : "-left-8"}
                  `}
                />

                {/* TEXT */}
                <h3
                  className="
                    text-white 
                    text-2xl sm:text-3xl md:text-4xl 
                    font-semibold 
                    mb-3 sm:mb-4
                  "
                >
                  {f.title}
                </h3>

                <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                  {f.desc}
                </p>

                {/* Decorative line */}
                <div
                  className={`
                    mt-5 sm:mt-6 
                    h-[2px] w-20 sm:w-32 
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
