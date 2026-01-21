"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/inside/Navbar";
import CardItem from "@/components/inside/CardItem";
import { Footer } from "@/components/layout/Footer";
import { fetchSearch } from "@/lib/api";

/* TYPES */
type SearchItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  type: "event" | "place" | "plan";
};

/* DEBOUNCE */
function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const [results, setResults] = useState<SearchItem[]>([]);
  const [searching, setSearching] = useState(false);

  /* SEARCH */
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const search = async () => {
      setSearching(true);
      try {
        const res = await fetchSearch({
          city: "milano",
          query: debouncedQuery,
        });
        setResults(res.items);
      } finally {
        setSearching(false);
      }
    };

    search();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />

      {/* SEARCH HERO */}
      <section className="pt-32 px-6">
        <div className="mx-auto">
          <div className="relative">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, places, plans..."
              className="
                w-full
                bg-white/10 text-white
                px-6 py-5 rounded-2xl
                text-lg
                outline-none
                placeholder:text-white/40
              "
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40">
              ⌘K
            </span>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mt-16 px-6">
        <div className="max-w-8xl mx-auto">
          {searching && (
            <p className="text-white/40 text-sm mb-6">
              Searching…
            </p>
          )}

          {!searching && results.length === 0 && query && (
            <p className="text-white/50 text-sm">
              No results found.
            </p>
          )}

          <div
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {results.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={`/${item.type}/${item.id}`}
              >
                <CardItem
                  title={item.title}
                  category={`${item.category} · ${item.type}`}
                  imageUrl={item.imageUrl}
                />
              </Link>
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
