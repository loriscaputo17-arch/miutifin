"use client";

import { useEffect, useMemo, useState } from "react";

type Submission = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  source: string;
  source_url?: string;
  confidence: number;
  status: string;
  start_at?: string;
  price_min?: number;
  price_max?: number;
  venue_name?: string;
};

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [source, setSource] = useState("all");
  const [status, setStatus] = useState("all");

  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/submissions`)
      .then(r => r.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  async function promote(id: string, type: "event" | "place") {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/submissions/${id}/promote/${type}`,
      { method: "POST" }
    );
    setItems(prev => prev.filter(i => i.id !== id));
  }

const filtered = useMemo(() => {
  const q = query.toLowerCase();

  return items.filter(i => {
    // source
    if (source !== "all" && i.source !== source) return false;

    // status
    if (status !== "all" && i.status !== status) return false;

    // search (title OR venue)
    if (q) {
      const inTitle = i.title.toLowerCase().includes(q);
      const inVenue = i.venue_name?.toLowerCase().includes(q);
      if (!inTitle && !inVenue) return false;
    }

    // date from
    if (fromDate && i.start_at) {
      if (new Date(i.start_at) < new Date(fromDate)) return false;
    }

    // date to
    if (toDate && i.start_at) {
      const endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (new Date(i.start_at) > endOfDay) return false;
    }

    return true;
  });
}, [items, source, status, query, fromDate, toDate]);


  if (loading) {
    return <p className="text-white/40">Loading submissions…</p>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Submissions</h1>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center">

          {/* SEARCH */}
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search title or venue…"
            className="
              bg-black border border-white/10 rounded-md
              px-3 py-2 text-sm
              w-full md:w-64
              outline-none
              focus:border-white/30
            "
          />

          {/* SOURCE */}
          <select
            value={source}
            onChange={e => setSource(e.target.value)}
            className="bg-black border border-white/10 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All sources</option>
            <option value="dice">DICE</option>
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="bg-black border border-white/10 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All status</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>

          {/* DATE FROM */}
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            className="bg-black border border-white/10 rounded-md px-3 py-2 text-sm"
          />

          {/* DATE TO */}
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            className="bg-black border border-white/10 rounded-md px-3 py-2 text-sm"
          />
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map(s => {
          const date = s.start_at
            ? new Date(s.start_at).toLocaleDateString("it-IT", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : null;

          const price =
            s.price_min != null
              ? s.price_min === s.price_max
                ? `€${s.price_min}`
                : `€${s.price_min} – €${s.price_max}`
              : null;

          return (
            <div
              key={s.id}
              className="
                bg-[#0c0c0c]
                border border-white/5
                rounded-xl
                p-4
                flex flex-col md:flex-row
                gap-4
              "
            >
              {/* IMAGE */}
              {s.image && (
                <img
                  src={s.image}
                  alt={s.title}
                  className="
                    w-full h-40
                    md:w-32 md:h-32
                    rounded-lg
                    object-cover
                    flex-shrink-0
                  "
                />
              )}

              {/* CONTENT */}
              <div className="flex-1 space-y-2">
                <p className="text-white font-medium">{s.title}</p>

                <div className="text-sm text-white/60 space-y-1">
                  {date && <p>📅 {date}</p>}
                  {s.venue_name && <p>📍 {s.venue_name}</p>}
                  {price && <p>💶 {price}</p>}
                </div>

                {s.description && (
                  <p className="text-white/50 text-sm line-clamp-2">
                    {s.description}
                  </p>
                )}

                {/* META */}
                <div className="flex flex-wrap gap-3 text-xs text-white/40 mt-2">
                  <span>{s.source}</span>
                  <span className="uppercase">{s.status}</span>

                  {s.source_url && (
                    <a
                      href={s.source_url}
                      target="_blank"
                      className="underline hover:text-white"
                    >
                      open source
                    </a>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex md:flex-col gap-2 md:justify-center">
                <button
                  onClick={() => promote(s.id, "event")}
                  className="
                    bg-white text-black
                    px-4 py-2
                    rounded-md
                    text-sm
                    font-medium
                    hover:bg-white/90
                  "
                >
                  → Event
                </button>

                <button
                  onClick={() => promote(s.id, "place")}
                  className="
                    bg-white/10
                    px-4 py-2
                    rounded-md
                    text-sm
                    hover:bg-white/20
                  "
                >
                  → Place
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-white/40 text-sm">
            No submissions match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
