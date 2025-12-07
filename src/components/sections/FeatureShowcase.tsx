"use client";

import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FeatureShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Soft parallax adjustments
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "140px"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.06, 0.14]);

  return (
    <section
      ref={ref}
      className="relative bg-black py-28 md:py-40 overflow-hidden select-none"
    >
      {/* ---------- BACKGROUND LAYERS ---------- */}
      <motion.div className="absolute inset-0" style={{ opacity: gridOpacity }}>
        {/* GRID */}
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:400px] md:bg-[size:550px]"
          style={{ y: parallaxY }}
        />

        {/* CORE GLOW */}
        <motion.div
          className="
            absolute left-1/2 top-1/2 
            h-[600px] w-[600px] md:h-[900px] md:w-[900px]
            -translate-x-1/2 -translate-y-1/2 
            bg-red-600/25 blur-[180px] md:blur-[220px] rounded-full
          "
          style={{ y: parallaxY }}
        />
      </motion.div>

      <Container className="relative z-10">

        {/* ---------- TITLE BLOCK ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20 md:mb-32 px-6"
        >
          <span className="text-red-400/80 tracking-[0.25em] uppercase text-xs mb-3">
            Miutifin Core System
          </span>

          <h2 className="
            text-white 
            text-4xl sm:text-5xl md:text-7xl 
            font-semibold leading-[1.15]
          ">
            Intelligence that <span className="text-red-400">evolves</span><br />
            with every decision.
          </h2>

          <div className="mt-6 md:mt-8 h-[3px] w-20 md:w-28 bg-red-500/60 rounded-full" />
        </motion.div>

        {/* ---------- FEATURES ---------- */}
        <div className="flex flex-col gap-24 md:gap-36 relative">
          {[
            {
              tag: "01",
              title: "Self-Calibrating Intelligence",
              desc: "A cognitive engine that improves itself continuously, shaping the next move from every observed pattern.",
            },
            {
              tag: "02",
              title: "Precision Orchestration",
              desc: "Layered operations executed instantly and flawlessly — like a cinematic automation engine.",
            },
            {
              tag: "03",
              title: "Unified Neural Layer",
              desc: "A single intelligence fabric that harmonizes tools, workflows, and decisions.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: i * 0.12,
              }}
              viewport={{ once: true, margin: "-80px" }}
              className={`
                flex flex-col md:flex-row items-start md:items-center 
                gap-10 md:gap-20 lg:gap-28 
                px-6 md:px-0
                ${i % 2 === 1 ? "md:flex-row-reverse" : ""}
              `}
            >
              {/* ---------- GHOST NUMBER (RESPONSIVE) ---------- */}
              <motion.div
                className="relative w-full md:w-auto"
                style={{
                  y: useTransform(scrollYProgress, [0, 1], [0, -120]),
                }}
              >
                <span
                  className="
                    absolute inset-0 flex items-center justify-center 
                    text-white/5 
                    text-[90px] sm:text-[140px] md:text-[200px] lg:text-[240px]
                    font-black
                    leading-none
                    blur-[3px]
                  "
                >
                  {item.tag}
                </span>
              </motion.div>

              {/* ---------- FEATURE CARD ---------- */}
              <div
                className="
                  relative z-10 w-full max-w-xl 
                  p-8 md:p-12 
                  rounded-3xl
                  bg-black/40 border border-white/10
                  backdrop-blur-xl 
                  shadow-[0_0_60px_-20px_rgba(255,0,0,0.35)]
                "
              >
                <h3 className="
                  text-white 
                  text-3xl sm:text-4xl md:text-5xl 
                  font-semibold mb-4 md:mb-6
                ">
                  {item.title}
                </h3>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  {item.desc}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-6 md:mt-8 h-[2px] bg-gradient-to-r from-red-500 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
