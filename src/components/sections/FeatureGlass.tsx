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
      title: "Custom Software & Product Development",
      desc: (
        <>
          We design and build{" "}
          <strong className="font-semibold text-white">
            custom software products
          </strong>{" "}
          from the ground up. From backend systems to full digital
          platforms, every solution is engineered specifically
          for the product, the market, and long-term scalability.
        </>
      ),
      icon: Cpu,
    },
    {
      title: "Web Platforms & Digital Ecosystems",
      desc: (
        <>
          We develop complex{" "}
          <strong className="font-semibold text-white">
            web platforms
          </strong>{" "}
          that manage users, data, content, and workflows.
          Clean architecture, secure infrastructure, and
          performance-focused user experiences are built in by design.
        </>
      ),
      icon: Boxes,
    },
    {
      title: "Mobile Applications (Native & Cross-Platform)",
      desc: (
        <>
          We build high-quality{" "}
          <em className="italic text-white">
            mobile applications
          </em>{" "}
          using native and cross-platform technologies.
          From MVPs to production-ready apps,
          we focus on stability, performance, and maintainability.
        </>
      ),
      icon: Sparkles,
    },
    {
      title: "Custom AI & LLM Systems",
      desc: (
        <>
          We design and implement{" "}
          <strong className="font-semibold text-white">
            AI and LLM-based solutions
          </strong>{" "}
          from scratch. Model selection, fine-tuning,
          orchestration, and integration are handled
          as part of a single, coherent system.
        </>
      ),
      icon: Brain,
    },
    {
      title: "Rapid Prototyping & MVP Development",
      desc: (
        <>
          We turn ideas into{" "}
          <em className="italic text-white">
            working products
          </em>{" "}
          quickly. Prototypes and MVPs are built to validate
          real assumptions, without compromising code quality
          or future scalability.
        </>
      ),
      icon: Wand2,
    },
    {
      title: "Workflow Automation & System Integration",
      desc: (
        <>
          We automate and connect existing tools, services,
          and processes into{" "}
          <strong className="font-semibold text-white">
            unified operational systems
          </strong>
          . Technology and automation are designed to reduce
          friction and support real business workflows.
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
              MIUTIFIN SERVICES
            </div>
          </div>

          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
            Technology built
            <span className="text-red-400 italic"> from scratch</span>.
          </h2>

          <p className="text-white/60 text-base sm:text-lg mt-6 leading-relaxed max-w-xl mx-auto">
            Miutifin is a technology production company.
            We design, develop, and deliver custom software,
            digital platforms, and AI-powered systems
            built to support real products and real businesses.
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
