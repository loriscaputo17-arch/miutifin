"use client";

import Image from "next/image";
import { Container } from "../ui/Container";
import { H1, Subheadline, BodyMuted } from "../ui/Typography";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/bg2.jpg"
          alt="Miutifin gateway hero"
          fill
          priority
          className="object-cover"
        />

        {/* Gradients / fog overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* spazio per la navbar (che è assoluta) */}
        <div className="h-16 md:h-20" />

        <div className="flex flex-1 flex-col justify-end pb-10">
          <Container>
            {/* blocco testo principale in basso a sinistra */}
            <div className="max-w-4xl">
              <H1 className="text-3xl md:text-4xl lg:text-5xl">
                Step through. Work smarter.
              </H1>
              <Subheadline className="mt-2 text-lg md:text-2xl lg:text-3xl text-white/75">
                Cross the threshold into AI-driven efficiency with{" "}
                <span className="text-white">Miutifin</span>.
              </Subheadline>
            </div>

            {/* linea divisoria + testi piccoli */}
            <div className="mt-10 border-t border-white/15 pt-6 md:mt-12 md:pt-8">
              <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                {/* micro copy a sinistra */}
                <div>
                  <BodyMuted>
                    A system that learns, adapts, and accelerates your
                    operations. Miutifin turns every signal into an actionable
                    step toward your next result.
                  </BodyMuted>
                </div>

                {/* descrizione più lunga a destra */}
                <div>
                  <BodyMuted>
                    Step into the future of automation. Our AI-driven platform
                    analyzes workflows, financial streams, and team activity to
                    recommend what to do next&nbsp;— instantly.
                  </BodyMuted>
                  <BodyMuted className="mt-3">
                    Not just insights, but orchestration: Miutifin anticipates
                    bottlenecks, prioritizes tasks, and aligns your tools,
                    teams, and data with precision.
                  </BodyMuted>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
