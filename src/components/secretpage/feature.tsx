"use client";

import Image from "next/image";

export function Features() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="#features">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-red-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-40">

        {/* INTRO */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            What is Miutifin
          </h2>
          <p className="mt-6 text-lg text-white/60 leading-relaxed">
            Miutifin is a curated layer on top of the city.  
            It brings together events, places and social experiences into a
            single, intentional space — designed for people who plan, explore
            and move with purpose.
          </p>
        </div>

        {/* FEATURE 1 */}
        <FeatureRow
          title="An aggregator of real experiences"
          description="Miutifin collects the most interesting events, venues and gathering places across the city — not everything, only what matters."
          points={[
            "Events, venues and social moments in one place",
            "No noise, no duplication",
            "Quality over quantity",
          ]}
          image="https://i.pinimg.com/1200x/f4/ec/f7/f4ecf7fc1329b8582abd7a927a996275.jpg"
        />

        {/* FEATURE 2 */}
        <FeatureRow
          reverse
          title="See who’s going, before you decide"
          description="Experiences are social by nature. Miutifin lets you understand who’s attending an event, helping you choose based on context, not hype."
          points={[
            "See attendance and social presence",
            "Decide with awareness",
            "Less randomness, more intention",
          ]}
          image="https://i.pinimg.com/1200x/e3/71/b2/e371b2e5b74bfc08ad0a6601cab1e5dd.jpg"
        />

        {/* FEATURE 3 */}
        <FeatureRow
          title="Your personal event timeline"
          description="Save, organize and calendarize what you’re going to do. Miutifin becomes your personal layer of plans on top of the city."
          points={[
            "Personal calendar",
            "Upcoming and past experiences",
            "Designed for real-world planning",
          ]}
          image="https://i.pinimg.com/1200x/3c/61/ea/3c61ea8d6de96c758faa99c44d1e81b3.jpg"
        />

        {/* FEATURE 4 */}
        <FeatureRow
          reverse
          title="Share where you’re going"
          description="Let others know where you’ll be — publicly or privately. Miutifin turns plans into soft signals, not noisy posts."
          points={[
            "Share selectively",
            "Coordinate naturally",
            "No performative social pressure",
          ]}
          image="https://i.pinimg.com/736x/43/0d/6a/430d6ab80f662e5783a8c1932e534ea6.jpg"
        />

        {/* FEATURE 5 */}
        <FeatureRow
          title="A living, virtual map of the city"
          description="Explore the city through a dynamic map that reflects what’s happening now — not just where things are."
          points={[
            "Map-based exploration",
            "Events and places in real time",
            "The city as an interface",
          ]}
          image="https://i.pinimg.com/736x/a9/90/70/a990707cd3716e253102d7e4571351fb.jpg"
        />

      </div>
    </section>
  );
}

/* ---------------- FEATURE ROW ---------------- */

function FeatureRow({
  title,
  description,
  points,
  image,
  reverse = false,
}: {
  title: string;
  description: string;
  points: string[];
  image: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid gap-16 items-center md:grid-cols-2 ${
        reverse ? "md:grid-flow-dense" : ""
      }`}
    >
      {/* IMAGE */}
      <div className={reverse ? "md:col-start-2" : ""}>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="max-w-xl">
        <h3 className="text-2xl md:text-3xl font-medium">
          {title}
        </h3>
        <p className="mt-4 text-white/60 leading-relaxed">
          {description}
        </p>

        <ul className="mt-6 space-y-3 text-sm text-white/70">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
