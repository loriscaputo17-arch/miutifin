"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/inside/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fetchSearch } from "@/lib/api";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
type EventSearchItem = {
  type: "event";
  id: string;
  title: string;
  date?: string;
  price?: number;
  venue?: string;
  venueAddress?: string;
  category?: string;
};

type PlaceSearchItem = {
  type: "place";
  id: string;
  name: string;
  address?: string;
  category?: string;
};

type SearchItem = EventSearchItem | PlaceSearchItem;

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
   HELPERS
-------------------------------------------------- */
function formatDate(date?: string) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/* --------------------------------------------------
   PAGE
-------------------------------------------------- */
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const [results, setResults] = useState<SearchItem[]>([]);
  const [searching, setSearching] = useState(false);

  /* SEARCH */
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const run = async () => {
      setSearching(true);
      try {
        const res = await fetchSearch({
          city: "milano",
          query: debouncedQuery,
        });
        setResults(res.items ?? []);
      } finally {
        setSearching(false);
      }
    };

    run();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* SEARCH INPUT */}
      <section className="pt-32 px-6">
        <div className="mx-auto">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, places..."
            className="
              w-full
              bg-white/10
              px-6 py-5
              rounded-2xl
              text-lg
              outline-none
              placeholder:text-white/40
            "
          />
        </div>
      </section>

      {/* RESULTS */}
      <section className="mt-14 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {searching && (
            <p className="text-white/40 text-sm">Searching…</p>
          )}

          {!searching && results.length === 0 && query && (
            <p className="text-white/50 text-sm">
              No results found.
            </p>
          )}

          {results.map((item) => {
            /* ---------------- EVENT ---------------- */
            if (item.type === "event") {
              return (
                <Link
                  key={`event-${item.id}`}
                  href={`/event/${item.id}`}
                  className="
                    block
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    px-5 py-4
                    hover:bg-white/10
                    transition
                  "
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-base font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-white/60 mt-1">
                        {item.venue}
                        {item.venueAddress && (
                          <> · {item.venueAddress}</>
                        )}
                      </p>

                      <p className="text-xs text-white/40 mt-2">
                        {formatDate(item.date)}
                        {item.price !== undefined && (
                          <> · €{item.price}</>
                        )}
                        {item.category && (
                          <> · {item.category}</>
                        )}
                      </p>
                    </div>

                    <span className="text-xs text-white/40">
                      Event
                    </span>
                  </div>
                </Link>
              );
            }

            /* ---------------- PLACE ---------------- */
            return (
              <Link
                key={`place-${item.id}`}
                href={`/place/${item.id}`}
                className="
                  block
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-5 py-4
                  hover:bg-white/10
                  transition
                "
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-base font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-white/60 mt-1">
                      {item.address}
                    </p>

                    {item.category && (
                      <p className="text-xs text-white/40 mt-2">
                        {item.category}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-white/40">
                    Place
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
