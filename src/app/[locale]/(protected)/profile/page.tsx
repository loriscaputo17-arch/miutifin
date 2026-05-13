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
              rounded-xl
              p-4
              flex gap-4
              items-start
            "
          >
            {/* IMAGE */}
            {e.cover_image && (
              <img
                src={e.cover_image}
                alt={e.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}

            {/* CONTENT */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white font-medium leading-tight">
                    {e.title}
                  </p>

                  <p className="text-white/50 text-sm mt-1">
                    {formatDate(e.start_at)}
                  </p>
                </div>

                <VisibilityBadge value={e.visibility ?? "public"} />
              </div>

              <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
                {e.category && <span>{e.category}</span>}
                {e.city && <span>{e.city}</span>}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelected(e)}
                className="
                  bg-white text-black
                  px-4 py-1.5
                  rounded-md
                  text-sm
                  font-medium
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
                  px-4 py-1.5
                  rounded-md
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
