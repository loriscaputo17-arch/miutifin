"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export function FeatureShowcase() {
  const features = [
    {
      title: "Self-Calibrating Intelligence",
      desc: "An intelligence layer that continuously observes patterns, adapts its internal logic, and refines future decisions automatically. Every interaction becomes feedback. Every signal strengthens the system.",
    },
    {
      title: "Precision Orchestration",
      desc: "A deterministic orchestration engine coordinating tools, agents, and workflows with absolute precision. Complex operations execute seamlessly across multiple domains in real time.",
    },
    {
      title: "Unified Neural Layer",
      desc: "A single cognitive fabric connecting data, documents, processes, and decisions. No silos. No fragmentation. One evolving intelligence that understands the entire operational context.",
    },
  ];

  return (
    <section className="relative bg-black py-32 md:py-40 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('/grid.svg')] bg-[size:520px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/20 blur-[200px]" />

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <span className="text-red-400/80 tracking-[0.3em] uppercase text-xs">
            Core Capabilities
          </span>

          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mt-6">
            Built as a system.
            <br />
            Designed to <span className="text-red-400 italic">evolve</span>.
          </h2>

          <p className="text-white/60 text-lg mt-6 max-w-xl">
            Miutifin is not a collection of features.
            It is an intelligent foundation designed to adapt,
            orchestrate, and scale across complexity.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                p-8 md:p-10 rounded-3xl
                bg-black/45 backdrop-blur-xl
                border border-white/10
                shadow-[0_0_60px_-20px_rgba(255,0,0,0.35)]
              "
            >
              <h3 className="text-white text-2xl md:text-3xl font-semibold mb-4">
                {f.title}
              </h3>

              <p className="text-white/65 text-base md:text-lg leading-relaxed">
                {f.desc}
              </p>

              <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-red-500 to-transparent" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
