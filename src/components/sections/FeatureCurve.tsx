"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FeatureCurve() {
  const products = [
    {
      title: "Miutifin",
      desc: "A city-scale discovery and social concierge that learns what you like and suggests where to go, what to do, and who to meet — in real time.",
      tag: "01",
      image: "/images/miutifin.jpg",
      href: "/miutifin",
    },
    {
      title: "MONO",
      desc: "A community operating system for brands, events, and companies — members, drops, guest lists, and engagement managed from a single intelligent layer.",
      tag: "02",
      image: "/images/comm.jpg",
      href: "/mono",
    },
    {
      title: "Cleope",
      desc: "A creative engine for experiences. From concept to flow, Cleope helps design events that feel cinematic, on-brand, and impossible to forget.",
      tag: "03",
      image: "/system/cleopescreen.png",
      href: "/cleope",
    },
    {
      title: "Blink",
      desc: "A video-first dating app where matches happen through live calls, not endless swipes — built for real chemistry, not just profiles.",
      tag: "04",
      image: "/system/blinkscreen.png",
      href: "/blink",
    },
    {
      title: "Skema",
      desc: "A study companion for university: turn files, notes, or audio into structured diagrams and learning maps that make revision actually usable.",
      tag: "05",
      image: "/system/skemascreen.png",
      href: "/skema",
    },
  ];

  return (
    <section className="relative bg-black py-48 overflow-hidden px-4">
      {/* CURVED RED FLOW */}
      <svg
        className="absolute inset-x-0 top-24 opacity-40"
        height="600"
        width="100%"
        viewBox="0 0 1400 600"
      >
        <path
          d="M0,300 C300,100 600,500 900,300 C1100,150 1300,450 1400,250"
          stroke="rgba(255,60,60,0.5)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{ filter: "blur(12px)" }}
        />
      </svg>

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="max-w-3xl mb-32">
          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-[1.15]">
            Products that prove{" "}
            <span className="text-red-400">“impossible”</span> is just the
            starting point.
          </h2>
          <p className="text-white/60 text-lg mt-6 max-w-xl">
            Built for others, born from Miutifin’s way of thinking:
            creative technology, not just software.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="flex flex-col gap-40">
          {products.map((p, i) => {
            const reverse = i % 2 !== 0;

            return (
              <div
                key={p.title}
                className={`grid md:grid-cols-2 gap-16 items-center ${
                  reverse ? "md:text-right" : ""
                }`}
              >
                {/* IMAGE */}
                <div
                  className={`relative aspect-[4/3] w-full ${
                    reverse ? "md:order-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 rounded-3xl bg-red-500/10 blur-2xl" />
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="
                      object-cover rounded-3xl
                      border border-white/10
                      shadow-[0_0_60px_rgba(255,60,60,0.15)]
                    "
                  />
                </div>

                {/* TEXT */}
                <div className="max-w-xl">
                  <div
                    className={`
                      text-red-400/80 text-sm font-mono tracking-[0.3em] mb-3
                      ${reverse ? "ml-auto" : ""}
                    `}
                  >
                    {p.tag} • PRODUCT
                  </div>

                  <h3 className="text-white text-3xl md:text-4xl font-semibold mb-4">
                    {p.title}
                  </h3>

                  <p className="text-white/60 text-lg leading-relaxed">
                    {p.desc}
                  </p>

                  {/* CTA */}
                  <div
                    className={`
                      mt-8 flex gap-4 items-center
                      ${reverse ? "md:justify-end" : ""}
                    `}
                  >
                    <Link
                      href={p.href}
                      className="
                        px-6 py-3 rounded-full
                        bg-red-500 text-white font-medium
                        transition-all duration-300
                        hover:bg-red-600 hover:shadow-[0_0_30px_rgba(255,60,60,0.6)]
                      "
                    >
                      Visit
                    </Link>

                    <Link
                      href={p.href}
                      className="
                        px-6 py-3 rounded-full
                        border border-white/20 text-white/80
                        transition-all duration-300
                        hover:text-white hover:border-white/40
                      "
                    >
                      Discover more
                    </Link>
                  </div>

                  <div
                    className={`
                      mt-6 h-[2px] w-24 bg-gradient-to-r from-red-500 to-transparent
                      ${reverse ? "md:ml-auto md:rotate-180" : ""}
                    `}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
