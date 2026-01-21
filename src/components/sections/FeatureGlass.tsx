"use client";

import {
  Sparkles,
  Brain,
  Boxes,
  Wand2,
  Workflow,
  Cpu,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function FeatureGlass() {
  const features = [
    {
      title: "Impossible Product Engineering",
      desc: (
        <>
          We build technologies others call{" "}
          <em className="italic text-white">unbuildable</em> — unconventional
          architectures and entirely new{" "}
          <strong className="font-semibold text-white">
            categories of digital systems
          </strong>
          .
        </>
      ),
      icon: Cpu,
    },
    {
      title: "Creative Systems Design",
      desc: (
        <>
          Engineering meets creativity to design systems that{" "}
          <strong className="font-semibold text-white">
            think, adapt, and evolve
          </strong>{" "}
          as living technological organisms.
        </>
      ),
      icon: Sparkles,
    },
    {
      title: "AI-Driven Concept Development",
      desc: (
        <>
          Early ideas become{" "}
          <em className="italic text-white">
            intelligent product blueprints
          </em>{" "}
          through intuition, AI reasoning, and deep technical exploration.
        </>
      ),
      icon: Brain,
    },
    {
      title: "Multi-Domain Integration",
      desc: (
        <>
          CRMs, documents, data streams, and workflows converge into{" "}
          <strong className="font-semibold text-white">
            one synchronized ecosystem
          </strong>{" "}
          with zero friction.
        </>
      ),
      icon: Boxes,
    },
    {
      title: "Rapid Experimental Prototyping",
      desc: (
        <>
          Concepts become real fast — prototypes, intelligent demos, and{" "}
          <em className="italic text-white">
            experimental systems
          </em>{" "}
          that accelerate real decisions.
        </>
      ),
      icon: Wand2,
    },
    {
      title: "Autonomous Workflow Orchestration",
      desc: (
        <>
          Orchestration engines that coordinate tasks, tools, and AI agents{" "}
          <strong className="font-semibold text-white">
            autonomously and precisely
          </strong>
          .
        </>
      ),
      icon: Workflow,
    },
  ];

  return (
    <section className="relative bg-black py-24 sm:py-28 md:py-40 overflow-hidden px-4">
      {/* RED GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute left-1/2 top-24
            -translate-x-1/2
            w-[420px] h-[420px]
            md:w-[700px] md:h-[700px]
            bg-red-500/20 blur-[160px]
          "
        />
      </div>

      <Container className="relative z-10 px-6 sm:px-8">
        {/* HEADER */}
        <div className="text-center mb-20 md:mb-24 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-red-400 text-sm tracking-[0.35em] font-mono">
              <span className="block w-2 h-2 rounded-full bg-red-500" />
              MIUTIFIN SYSTEMS
            </div>
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
            Technology shaped by{" "}
            <span className="text-red-400 italic">creation</span>.
          </h2>

          <p className="text-white/60 text-base sm:text-lg mt-6 leading-relaxed max-w-xl mx-auto">
            Our services are not processes — they are{" "}
            <strong className="text-white font-medium">
              creative engines
            </strong>{" "}
            designed to transform impossible ideas into{" "}
            <em className="italic text-white">living systems</em>.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-8 sm:gap-10 md:gap-14
          "
        >
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className={`
                  group relative
                  p-7 sm:p-8
                  rounded-3xl
                  bg-white/[0.06] backdrop-blur-xl
                  border border-white/10
                  shadow-[0_0_40px_-10px_rgba(255,0,0,0.25)]
                  transition-all duration-500
                  hover:-translate-y-2 hover:bg-white/[0.1]
                  md:${i % 3 === 1 ? "translate-y-6" : ""}
                `}
              >
                {/* ICON */}
                <div
                  className="
                    mb-6 inline-flex items-center justify-center
                    w-12 h-12 rounded-xl
                    bg-red-500/10 text-red-400
                    group-hover:scale-110 transition-transform
                  "
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-3">
                  {f.title}
                </h3>

                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {f.desc}
                </p>

                <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-red-500 to-transparent" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
