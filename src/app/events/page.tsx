"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/inside/Navbar";
import HorizontalSection from "@/components/inside/HorizontalSection";
import CardItem from "@/components/inside/CardItem";
import { Footer } from "@/components/layout/Footer";
import { fetchEvents } from "@/lib/api";

/* TYPES */
type EventItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isOpen?: boolean;
  type: "event";
};

/* DEBOUNCE HOOK */
function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function EventsPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false);

  const [featured, setFeatured] = useState<EventItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  /* FETCH */
  const loadData = async (mode: "initial" | "search" = "search") => {
    try {
      if (mode === "initial") {
        setInitialLoading(true);
      } else {
        setSearching(true);
      }

      const res = await fetchEvents({
        city: "milano",
        query: debouncedQuery,
        filter,
      });

      setFeatured(res.featured);
      setEvents(res.items);
    } catch {
      setError(true);
    } finally {
      setInitialLoading(false);
      setSearching(false);
    }
  };

  /* INITIAL LOAD + FILTER CHANGE */
  useEffect(() => {
    loadData("initial");
  }, [filter]);

  /* SEARCH (DEBOUNCED) */
  useEffect(() => {
    if (!initialLoading) {
      loadData("search");
    }
  }, [debouncedQuery]);

  /* STATES */
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

      {/* PAGE HEADER */}
      <section className="pt-32 px-6">
        <div className="max-w-8xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl text-white">Events</h1>
            <p className="text-white/50 text-sm">
              Discover what’s happening around you
            </p>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, artists, venues..."
              className="
                flex-1 bg-white/10 text-white
                px-4 py-3 rounded-xl
                outline-none
                placeholder:text-white/40
              "
            />

            <div className="flex gap-2 flex-wrap">
              {[
                { key: null, label: "All" },
                { key: "today", label: "Today" },
                { key: "weekend", label: "Weekend" },
                { key: "free", label: "Free" },
              ].map((f) => (
                <button
                  key={String(f.key)}
                  onClick={() => setFilter(f.key)}
                  className={`
                    px-4 py-3 rounded-xl text-sm transition
                    ${
                      filter === f.key
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <HorizontalSection title="Trending events" items={featured} />
      )}

      {/* GRID */}
      <section className="mt-20 px-6">
        <div className="max-w-8xl mx-auto">
          {searching && (
            <p className="text-white/40 text-sm mb-4">Searching…</p>
          )}

          <div
            className="
              grid gap-6
              grid-cols-1 sm:grid-cols-2
              lg:grid-cols-3 xl:grid-cols-4
            "
          >
            {events.map((event) => (
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
            <p className="text-white/50 mt-10">
              No events found.
            </p>
          )}
        </div>
      </section>

      {/* BROWSE BY */}
      <section className="mt-24 px-6">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-xl text-white mb-6">
            Browse by category
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {["Music", "Nightlife", "Art", "Tech", "Food"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat.toLowerCase())}
                className="
                  shrink-0 px-6 py-4 rounded-2xl
                  bg-white/10 hover:bg-white/20
                  text-white transition
                "
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
