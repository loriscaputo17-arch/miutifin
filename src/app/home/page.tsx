"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/inside/Navbar";
import MapSection from "@/components/inside/MapSection";
import HorizontalSection from "@/components/inside/HorizontalSection";
import ColumnSection from "@/components/inside/ColumnSection";
import FilterBar from "@/components/inside/FilterBar";
import { fetchHome } from "@/lib/api";
import { Footer } from "@/components/layout/Footer";

/* --------------------------------------------------
   FILTER TYPES
-------------------------------------------------- */
type Filters = {
  time: "now" | "today" | "tonight" | "weekend";
  price: (1 | 2 | 3)[];
  types: ("event" | "place" | "activity" | "journey")[];
};

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* --------------------------------------------------
     FILTER STATE
  -------------------------------------------------- */
  const [filters, setFilters] = useState<Filters>({
    time: "weekend",
    price: [],
    types: ["event", "place", "activity", "journey"],
  });

  /* --------------------------------------------------
     LOAD DATA
  -------------------------------------------------- */
  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetchHome("milano");
      setData(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* --------------------------------------------------
     FRONTEND FILTERING (TEMP)
     👉 in futuro: spostare in fetchHome
  -------------------------------------------------- */
  const filteredSections = useMemo(() => {
    if (!data) return null;

    const applyFilters = (items?: any[]) => {
      if (!Array.isArray(items)) return [];

      return items.filter((item) => {
        /* TYPE */
        if (item.type && !filters.types.includes(item.type)) {
          return false;
        }

        /* PRICE */
        if (
          filters.price.length > 0 &&
          item.priceLevel !== null &&
          item.priceLevel !== undefined &&
          !filters.price.includes(item.priceLevel)
        ) {
          return false;
        }

        /* TIME */
        if (filters.time !== "now" && item.timeBucket) {
          if (filters.time !== item.timeBucket) {
            return false;
          }
        }

        return true;
      });
    };


    return {
      events: applyFilters(data.sections.events_near_you),
      bars: applyFilters(data.sections.bars),
      journeys: applyFilters(data.sections.night_journeys),
      markers: applyFilters(data.map.markers),
    };
  }, [data, filters]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          
          {/* Spinner */}
          <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />

          {/* Text */}
          <p className="text-white/60 text-sm tracking-wide">
            Loading experiences…
          </p>
        </div>
      </main>
    );
  }

  if (error || !filteredSections) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <p className="mb-4 text-lg">Qualcosa è andato storto 😕</p>
        <button
          onClick={loadData}
          className="px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition"
        >
          Riprova
        </button>
      </main>
    );
  }

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />

      <h1 className="pt-32 px-6 text-4xl font-semibold tracking-tight leading-[1.1]">
        Discover experiences made for <span className="text-white">you</span>.
      </h1>

      {/* MAP */}
      <MapSection markers={filteredSections.markers} />

      {/* FILTERS */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* SECTIONS */}
      <HorizontalSection
        title="Events Near You"
        items={filteredSections.events}
      />

      <HorizontalSection
        title="Bars & Locali"
        items={filteredSections.bars}
      />

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
