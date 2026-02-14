"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/secretpage/Navbar";
import { HeroSection } from "@/components/secretpage/HeroSection";
import { HowItWorks } from "@/components/secretpage/howitworks";
import { Features } from "@/components/secretpage/feature";
import { InviteFriends } from "@/components/secretpage/invitefriends";
import { Footer } from "@/components/layout/Footer";
import { fetchLimitedExplore } from "@/lib/limitedExplore";
import { PopupItem } from "@/components/secretpage/PopupItem";

export default function MiutifinLanding() {
  const fullText = "Discover what’s happening. Not everything is public.";
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<"waitlist" | "search">("waitlist");
  const [selected, setSelected] = useState<any | null>(null);

  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    fetchLimitedExplore({ city_slug: "milano", type: "mixed" })
      .then(res => setFeatured(res.items))
      .catch(console.error);
  }, []);


  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleAccessClick = () => {
    setSelected(null);

    // aspetta la chiusura del modal prima di scrollare
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 150);
  };


  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">

      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* SECTION 2 — VERTICAL CARDS */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center font-bold">Featured discoveries</h2>
          <p className="mt-1 text-white/60 text-center">
            A selection of events and places. Some are visible. Others are not.
          </p>

          <div className="mt-10 flex gap-6 overflow-x-auto pb-4">
            {featured.map((item) => (
              <VerticalCard
                key={item.id}
                title={item.title}
                address={item.address || item.category}
                price={
                  item.type === "event"
                    ? item.priceLevel
                      ? "€".repeat(item.priceLevel)
                      : "Free"
                    : item.priceLevel
                      ? "€".repeat(item.priceLevel)
                      : "—"
                }
                imageUrl={item.imageUrl}
                onClick={() => setSelected(item)}
              />
            ))}

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <Features />

      {/* FEATURES */}
      <HowItWorks />

      {/* TIKTOKS */}
     <section className="px-6 pt-40 mb-40">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium">From the community</h2>
        <p className="mt-3 text-white/60 max-w-xl">
          Moments shared by people inside the platform.
        </p>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-4">
          {[
            "https://www.tiktok.com/embed/v2/7586724923838680350",
            "https://www.tiktok.com/embed/v2/7598232574988799254",
            "https://www.tiktok.com/embed/v2/7595596957075246338",
            "https://www.tiktok.com/embed/v2/7594780662415035670",
            "https://www.tiktok.com/embed/v2/7581086943799282955",
            "https://www.tiktok.com/embed/v2/7573301700157672706",
            "https://www.tiktok.com/embed/v2/7571563624154664214",
            "https://www.tiktok.com/embed/v2/7560669274029804822",
          ].map((src, i) => (
            <div
              key={i}
              className="aspect-[9/16] min-w-[300px] rounded-3xl overflow-hidden border border-white/10 bg-black"
            >
              <iframe
                src={src}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      <InviteFriends />

      <PopupItem
        selected={selected}
        onClose={handleAccessClick}
      />

      <Footer />
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function VerticalCard({
  title,
  address,
  price,
  imageUrl,
  onClick,
}: {
  title: string;
  address: string;
  price: string;
  imageUrl?: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative aspect-[9/16] min-w-[260px] rounded-3xl overflow-hidden cursor-pointer group"
    >
      {/* BG IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 "
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(to bottom, #111, #000)",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-6 left-6 right-6 space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="inline">
          <p className="text-sm text-white/60">{address}, &nbsp;</p>
          <p className="text-sm text-white/80">{price}</p>
        </div>

        <span className="inline-block mt-2 text-sm text-red-500">
          View details →
        </span>
      </div>
    </div>
  );
}
