"use client";

import { useEffect, useState } from "react";
import PlaceEditModal from "@/components/admin/PlaceEditModal";

type PlaceItem = {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  address?: string;
  lat?: number;
  lng?: number;
  priceLevel?: number;
  phone?: string;
  website?: string;
  instagram?: string;
  opening_hours?: any;
  category?: string;
};

export default function AdminPlacesPage() {
  const [items, setItems] = useState<PlaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PlaceItem | null>(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/places?city_slug=milano`
    )
      .then(r => r.json())
      .then(data => {
        setItems(data.places);
        setLoading(false);
      });
  }, []);

  function updatePlace(updated: PlaceItem) {
    setItems(prev =>
      prev.map(p => (p.id === updated.id ? updated : p))
    );
    setSelected(null);
  }

  if (loading) {
    return <p className="text-white/40">Loading places…</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Places</h1>

      <div className="space-y-4">
        {items.map(p => (
          <div
            key={p.id}
            className="bg-[#0c0c0c] border border-white/5 rounded-xl p-4 flex gap-4"
          >
            {/* IMAGE */}
            {p.image && (
              <img
                src={p.image}
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}

            {/* CONTENT */}
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              {p.address && (
                <p className="text-xs text-white/40 mt-1">
                  {p.address}
                </p>
              )}

              <div className="text-xs text-white/40 mt-2 flex gap-4">
                {p.category && <span>{p.category}</span>}
                {p.priceLevel && <span>€{p.priceLevel}</span>}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelected(p)}
                className="bg-white text-black px-4 py-1.5 rounded-md text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <PlaceEditModal
          place={selected}
          onClose={() => setSelected(null)}
          onSaved={updatePlace}
        />
      )}
    </>
  );
}
