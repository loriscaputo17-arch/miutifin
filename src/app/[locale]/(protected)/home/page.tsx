"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/inside/Navbar";
import MapSection from "@/components/inside/MapSection";
import HorizontalSection from "@/components/inside/HorizontalSection";
import PlaceHorizontalSection from "@/components/inside/PlaceHorizontalSection";
import ColumnSection from "@/components/inside/ColumnSection";
import FilterBar from "@/components/inside/FilterBar";
import { fetchHome, fetchNeighborhood } from "@/lib/api";
import { Footer } from "@/components/layout/Footer";
import { useCity } from "@/context/CityContext";

/* --------------------------------------------------
   FILTER TYPES
-------------------------------------------------- */
type Filters = {
  time: "now" | "today" | "tonight" | "weekend";
  price: (1 | 2 | 3)[];
  types: ("event" | "place" | "activity" | "journey")[];
};

type HomeSections = {
  events_weekend_free: any[];
  events_weekend_paid: any[];
  events_upcoming: any[];
  restaurants: any[];
  bars: any[];
  places: any[];
  discover: any[];
  night_plans: any[];
};

type FilteredSections = HomeSections & {
  markers: any[];
};


export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [dataNeighborhood, setDataNeighborhood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { city } = useCity();

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
      const res = await fetchHome(city.toLowerCase());
      setData(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadNeighborhood = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetchNeighborhood(city.toLowerCase());
      setDataNeighborhood(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadNeighborhood();
  }, []);

  const filteredSections = useMemo<FilteredSections | null>(() => {
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
      events_weekend_free: applyFilters(data.sections.events_weekend_free),
      events_weekend_paid: applyFilters(data.sections.events_weekend_paid),
      events_upcoming: applyFilters(data.sections.events_upcoming),

      restaurants: applyFilters(data.sections.restaurants),
      bars: applyFilters(data.sections.bars),
      places: applyFilters(data.sections.places),

      discover: applyFilters(data.sections.discover),
      night_plans: applyFilters(data.sections.night_plans),

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

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />

      <h1 className="pt-32 px-6 text-4xl font-semibold tracking-tight leading-[1.1]">
        Discover experiences made for <span className="italic">you</span> in {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}.
      </h1>

      {/* MAP */}
      <MapSection citySlug={city.toLowerCase()} />

      <HorizontalSection
        title="Next events"
        items={filteredSections.events_weekend_free}
      />

      <PlaceHorizontalSection
        title="Restaurants"
        items={filteredSections.restaurants}
      />

      <HorizontalSection
        title="Weekend highlights"
        items={filteredSections.events_weekend_paid}
      />

      <PlaceHorizontalSection
        title="Bars"
        items={filteredSections.bars}
      />

      <HorizontalSection
        title="Upcoming events"
        items={filteredSections.events_upcoming}
      />

      <PlaceHorizontalSection
        title="Places & Clubs"
        items={filteredSections.places}
      />

      {dataNeighborhood?.[0]?.items?.length > 0 && (
        <PlaceHorizontalSection
          title={`Places in ${dataNeighborhood[0].title}`}
          items={dataNeighborhood[0].items}
        />
      )}

      {dataNeighborhood?.[1]?.items?.length > 0 && (
        <PlaceHorizontalSection
          title={`Places in ${dataNeighborhood[1].title}`}
          items={dataNeighborhood[1].items}
        />
      )}

      {dataNeighborhood?.[2]?.items?.length > 0 && (
        <PlaceHorizontalSection
          title={`Places in ${dataNeighborhood[2].title}`}
          items={dataNeighborhood[2].items}
        />
      )}

      {dataNeighborhood?.[3]?.items?.length > 0 && (
        <PlaceHorizontalSection
          title={`Places in ${dataNeighborhood[3].title}`}
          items={dataNeighborhood[3].items}
        />
      )}

      {dataNeighborhood?.[4]?.items?.length > 0 && (
        <PlaceHorizontalSection
          title={`Places in ${dataNeighborhood[4].title}`}
          items={dataNeighborhood[4].items}
        />
      )}

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
