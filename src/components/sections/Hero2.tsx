"use client";

import Image from "next/image";
import { Container } from "../ui/Container";
import { H1, Subheadline, BodyMuted } from "../ui/Typography";
import Link from "next/link";

export function Hero2() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-4">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/bg2.jpg"
          alt="Miutifin hero background"
          fill
          priority
          className="object-cover opacity-80"
        />

        {/* DARK LAYERS */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

        {/* RED AMBIENT GLOW */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] bg-red-600/20 blur-[160px] rounded-full" />

        {/* SMALL RED GLOW */}
        <div className="absolute bottom-20 right-10 h-40 w-40 bg-red-500/25 blur-[80px] rounded-full" />

        {/* VIGNETTE */}
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT */}
      <Container className="relative z-10 pb-24 pt-32 md:pt-40 lg:pt-52">
        <div className="max-w-4xl">

          {/* RED ACCENT BAR */}
          <div className="h-[3px] w-16 bg-red-500/60 rounded-full mb-6" />

          {/* TITLE */}
          <H1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
            We Build What Others Call <span className="text-red-400">Impossible</span>.
          </H1>

          {/* SUBHEADLINE */}
          <Subheadline className="mt-4 text-md text-white/70 leading-relaxed">
            Born to a 14-year-old boy, grown against all odds.<br />
            Now we create technology that changes perspectives.
          </Subheadline>

          {/* CTA BUTTONS */}
          <div className="
            mt-8 
            flex 
            flex-row               /* <— per mobile: stessa linea */
            items-center 
            gap-4 
            flex-wrap              /* evita overflow su schermi molto piccoli */
            sm:flex-row            /* su desktop rimane già row */
          ">            
            {/* GET STARTED */}
            <Link
              href="/get-started"
              className="
                px-6 py-3 rounded-full
                bg-white hover:bg-red-600 hover:text-white
                text-black text-sm uppercase 
                transition-all
              "
            >
              Get Started
            </Link>

            {/* LOGIN */}
            <Link
              href="/login"
              className="
                px-6 py-3 rounded-full
                border border-white/20 hover:border-white/40
                text-white/80 hover:text-white 
                text-sm uppercase 
                bg-white/5 backdrop-blur-md transition
              "
            >
              Login
            </Link>

          </div>

          {/* RED UNDERLINE */}
          <div className="mt-8 h-[2px] w-24 bg-gradient-to-r from-red-500 to-transparent opacity-70" />
        </div>

        {/* LOWER TEXT BLOCK */}
        <div className="mt-12 md:mt-16 border-t border-white/10 pt-8 md:pt-10">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            
            {/* LEFT TEXT */}
            <BodyMuted className="text-white/70">
              Miutifin learns from every interaction — revealing bottlenecks, automating
              processes, and anticipating what your team needs next.
            </BodyMuted>

            {/* RIGHT TEXT */}
            <div className="space-y-3">
              <BodyMuted className="text-white/70">
                Miutifin is a technology production company.
                Not an agency, not a consultant, not a software house.
                We create what others think is impossible.
              </BodyMuted>
              <BodyMuted className="text-white/70">
                Efficiency isn’t just improved — it’s redefined.
              </BodyMuted>
            </div>

          </div>
        </div>

      </Container>

      {/* TOP GRADIENT FOR NAVBAR VISIBILITY */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
    </section>
  );
}
