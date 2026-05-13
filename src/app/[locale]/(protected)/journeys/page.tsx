"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/inside/Navbar";
import HorizontalSection from "@/components/inside/HorizontalSection";
import CardItem from "@/components/inside/CardItem";
import { Footer } from "@/components/layout/Footer";
import { fetchPlans } from "@/lib/api";

/* TYPES */
type PlanItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isOpen?: boolean;
  type: "journey";
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

export default function PlansPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false);

  const [featured, setFeatured] = useState<PlanItem[]>([]);
  const [plans, setPlans] = useState<PlanItem[]>([]);

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

      const res = await fetchPlans({
        city: "milano",
        query: debouncedQuery,
        filter,
      });

      setFeatured(res.featured);
      setPlans(res.items);
    } catch {
      setError(true);
    } finally {
      setInitialLoading(false);
      setSearching(false);
    }
  };

  /* INITIAL LOAD + FILTER */
  useEffect(() => {
    loadData("initial");
  }, [filter]);

  /* SEARCH */
  useEffect(() => {
    if (!initialLoading) {
      loadData("search");
    }
  }, [debouncedQuery]);

  /* STATES */
  if (initialLoading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white p-10">
        Loading journeys...
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

      {/* HEADER */}
      <section className="pt-32 px-6">
        <div className="max-w-8xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl text-white">
              Journeys
            </h1>
            <p className="text-white/50 text-sm">
              Curated journeys for your night out
            </p>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search plans, vibes, occasions..."
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
                { key: "tonight", label: "Tonight" },
                { key: "weekend", label: "Weekend" },
                { key: "romantic", label: "Romantic" },
                { key: "friends", label: "Friends" },
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
        <HorizontalSection
          title="Editor's picks"
          items={featured}
        />
      )}

      {/* GRID */}
      <section className="mt-20 px-6">
        <div className="max-w-8xl mx-auto">
          {searching && (
            <p className="text-white/40 text-sm mb-4">
              Searching…
            </p>
          )}

          <div
            className="
              grid gap-6
              grid-cols-1 sm:grid-cols-2
              lg:grid-cols-3 xl:grid-cols-4
            "
          >
            {plans.map((plan) => (
              <Link key={plan.id} href={`/journey/${plan.id}`}>
                <CardItem
                  title={plan.title}
                  category={plan.category}
                  imageUrl={plan.imageUrl}
                  isOpen={plan.isOpen}
                />
              </Link>
            ))}
          </div>

          {plans.length === 0 && (
            <p className="text-white/50 mt-10">
              No journeys found.
            </p>
          )}
        </div>
      </section>

      {/* BROWSE BY */}
      <section className="mt-24 px-6">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-xl text-white mb-6">
            Browse by mood
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {["Date night", "Friends", "Party", "Chill", "Food lovers"].map(
              (mood) => (
                <button
                  key={mood}
                  onClick={() =>
                    setFilter(mood.toLowerCase().replace(" ", "_"))
                  }
                  className="
                    shrink-0 px-6 py-4 rounded-2xl
                    bg-white/10 hover:bg-white/20
                    text-white transition
                  "
                >
                  {mood}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
