"use client";

import { useEffect, useState } from "react";
import EventEditModal from "@/components/admin/EventEditModal";
import VisibilityBadge from "@/components/admin/VisibilityBadge";

type EventItem = {
  id: string;
  title: string;
  cover_image?: string;
  start_at: string;
  category?: string;
  city?: string;
  visibility?: string;
  description?: string;
  price_min: string;
  price_max: string;
  venue_name: string;
};

export default function AdminEventsPage() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EventItem | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/events`)
      .then(r => r.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  function updateEvent(updated: EventItem) {
    setItems(prev =>
      prev.map(e => (e.id === updated.id ? updated : e))
    );
    setSelected(null);
  }

  if (loading) {
    return <p className="text-white/40">Loading events…</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
      </div>

      <div className="space-y-4">
        {items.map(e => (
          <div
  key={e.id}
  className="
    bg-[#0c0c0c]
    border border-white/5
    rounded-2xl
    p-4
    flex flex-col md:flex-row
    gap-4
  "
>
  {/* IMAGE */}
  {e.cover_image && (
    <img
      src={e.cover_image}
      alt={e.title}
      className="
        w-full md:w-32
        h-48 md:h-32
        rounded-xl
        object-cover
        flex-shrink-0
      "
    />
  )}

  {/* CONTENT */}
  <div className="flex-1 flex flex-col gap-2">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-white font-semibold leading-tight">
          {e.title}
        </h3>

        <p className="text-white/60 text-sm mt-1">
          {formatDate(e.start_at)}
        </p>
      </div>

      <VisibilityBadge value={e.visibility ?? "public"} />
    </div>

    {/* META */}
    <div className="flex flex-wrap gap-3 text-xs text-white/50 mt-1">
      {e.city && <span>📍 {e.city}</span>}
      {e.category && <span>🏷 {e.category}</span>}
      {e.price_min != null && (
        <span>
          €
          {e.price_min === e.price_max
            ? e.price_min
            : `${e.price_min}–${e.price_max}`}
        </span>
      )}
      {e.venue_name && <span>{e.venue_name}</span>}
    </div>
  </div>

  {/* ACTIONS */}
  <div className="flex md:flex-col gap-2">
    <button
      onClick={() => setSelected(e)}
      className="
        bg-white text-black
        px-4 py-2
        rounded-lg
        text-sm font-medium
        hover:bg-white/90
      "
    >
      Edit
    </button>

    <a
      href={`/event/${e.id}`}
      target="_blank"
      className="
        bg-white/10
        px-4 py-2
        rounded-lg
        text-sm
        text-center
        hover:bg-white/20
      "
    >
      Open
    </a>
  </div>
</div>

        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <EventEditModal
          event={selected}
          onClose={() => setSelected(null)}
          onSaved={updateEvent}
        />
      )}
    </>
  );
}

/* utils */

function formatDate(date: string) {
  return new Date(date).toLocaleString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
