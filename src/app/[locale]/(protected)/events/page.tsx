"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/inside/Navbar";
import CardItem from "@/components/inside/CardItem";
import { Footer } from "@/components/layout/Footer";
import { fetchEvents, TimeFilter } from "@/lib/api";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
type EventItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isOpen?: boolean;
  type: "event";
  timeBucket?: "today" | "weekend";
  price?: number;
};

type CategoryFilter = string | null;

/* --------------------------------------------------
   CONSTANTS (TIPIZZATE)
-------------------------------------------------- */
const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
  { key: null, label: "All" },
  /*{ key: "today", label: "Today" },
  { key: "weekend", label: "Weekend" },
  { key: "free", label: "Free" },*/
];

const CATEGORIES = ["music", "nightlife", "art", "tech", "food"] as const;

/* --------------------------------------------------
   DEBOUNCE
-------------------------------------------------- */
function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/* --------------------------------------------------
   PAGE
-------------------------------------------------- */
export default function EventsPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [featured, setFeatured] = useState<EventItem[]>([]);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const [timeFilter, setTimeFilter] = useState<TimeFilter>(null);
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>(null);

  const loadData = async (mode: "initial" | "search") => {
  try {
    mode === "initial"
      ? setInitialLoading(true)
      : setSearching(true);

    const activeFilter =
      timeFilter ?? categoryFilter ?? null;

    const res = await fetchEvents({
      city: "milano",
      query: debouncedQuery,
      filter: activeFilter,
    });

    let filtered = res.items as EventItem[];

    if (timeFilter === "today") {
      filtered = filtered.filter(e => e.timeBucket === "today");
    }

    if (timeFilter === "weekend") {
      filtered = filtered.filter(e => e.timeBucket === "weekend");
    }

    if (timeFilter === "free") {
      filtered = filtered.filter(e => e.price === 0);
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        e => e.category.toLowerCase() === categoryFilter
      );
    }

    setEvents(filtered);
    setFeatured(res.featured);
  } catch {
    setError(true);
  } finally {
    setInitialLoading(false);
    setSearching(false);
  }
};


  /* --------------------------------------------------
     EFFECTS
  -------------------------------------------------- */
  useEffect(() => {
    loadData(query ? "search" : "initial");
  }, [debouncedQuery, timeFilter, categoryFilter]);


  /* --------------------------------------------------
     STATES
  -------------------------------------------------- */
  if (initialLoading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white p-10">
        Loading events…
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <p className="mb-4 text-lg">Qualcosa è andato storto 😕</p>
        <button
          onClick={() => loadData("initial")}
          className="px-6 py-3 rounded-lg bg-white text-black"
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

      {/* HEADER */}
      <section className="pt-32 px-6">
        <div className="max-w-8xl mx-auto space-y-6">
          <h1 className="text-3xl text-white">Events</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events..."
              className="flex-1 bg-white/10 px-4 py-3 rounded-xl text-white"
            />

            <div className="flex gap-2 flex-wrap">
              {TIME_FILTERS.map(f => (
                <button
                  key={String(f.key)}
                  onClick={() => setTimeFilter(f.key)}
                  className={`px-4 py-3 rounded-xl text-sm ${
                    timeFilter === f.key
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mt-20 px-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map(event => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <CardItem
                title={event.title}
                category={event.category}
                imageUrl={event.imageUrl}
                isOpen={event.isOpen}
              />
            </Link>
          ))}
        </div>

        {events.length === 0 && (
          <p className="text-white/50 mt-10 text-center">
            No events found.
          </p>
        )}
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
