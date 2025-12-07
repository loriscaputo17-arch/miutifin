"use client";

import { Container } from "@/components/ui/Container";

export function FeatureGlass() {
  const features = [
    {
      title: "Impossible Product Engineering",
      desc: "We build technologies that others call unbuildable — unconventional architectures and entirely new categories of digital systems.",
    },
    {
      title: "Creative Systems Design",
      desc: "We merge engineering and creativity to design systems that think, adapt, and evolve as living technological organisms.",
    },
    {
      title: "AI-Driven Concept Development",
      desc: "We transform early ideas into intelligent product blueprints using intuition, AI reasoning, and deep technical exploration.",
    },
    {
      title: "Multi-Domain Integration",
      desc: "CRMs, documents, data streams, and workflows converge into one synchronized ecosystem with zero friction.",
    },
    {
      title: "Rapid Experimental Prototyping",
      desc: "We bring concepts to life fast — prototypes, intelligent demos, and experimental systems that accelerate real decisions.",
    },
    {
      title: "Autonomous Workflow Orchestration",
      desc: "We build orchestration engines that coordinate tasks, tools, and AI agents autonomously and precisely.",
    },
  ];

  return (
    <section className="relative bg-black py-24 sm:py-32 md:py-40 overflow-hidden px-4">

      {/* RED GLOW (responsive sizing) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="
          absolute left-1/2 top-20 sm:top-32 
          -translate-x-1/2 
          w-[350px] h-[350px] 
          sm:w-[500px] sm:h-[500px]
          md:w-[650px] md:h-[650px]
          bg-red-500/20 blur-[140px] sm:blur-[180px]
        " />
      </div>

      <Container className="relative z-10 px-6 sm:px-8">

        {/* ---------- HEADER ---------- */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24 max-w-2xl mx-auto">
          <h2 className="
            text-white 
            text-3xl sm:text-4xl md:text-6xl 
            font-semibold leading-tight
          ">
            Technology shaped by <span className="text-red-400">creation.</span>
          </h2>

          <p className="
            text-white/60 
            text-base sm:text-lg 
            mt-4 sm:mt-6 
            leading-relaxed max-w-xl mx-auto
          ">
            Our services are not processes — they are creative engines  
            designed to transform impossible ideas into living systems.
          </p>
        </div>

        {/* ---------- GRID RESPONSIVA ---------- */}
        <div className="
          grid 
          gap-10 sm:gap-12 md:gap-14 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3
        ">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                group relative p-6 sm:p-8 rounded-3xl 
                bg-white/[0.07] backdrop-blur-xl
                border border-white/10 
                shadow-[0_0_40px_-10px_rgba(255,0,0,0.25)]
                transition-all duration-500
                hover:-translate-y-2 hover:bg-white/[0.12]
              "
              style={{
                // Soft floating effect only on desktop  
                transform: `translateY(${i % 3 === 1 ? "30px" : "0"})`,
              }}
            >
              <h3 className="text-white text-xl sm:text-2xl md:text-2xl font-semibold mb-3">
                {f.title}
              </h3>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {f.desc}
              </p>

              <div className="mt-6 h-[2px] w-16 sm:w-20 bg-gradient-to-r from-red-500 to-transparent" />
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
