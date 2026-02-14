"use client";

import { useState } from "react";

type Props = {
  event: any;
  onClose: () => void;
  onSaved: (event: any) => void;
};

function isoToLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}

export default function EventEditModal({ event, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: event.title ?? "",
    slug: event.slug ?? "",
    description: event.description ?? "",

    start_at: isoToLocalInput(event.start_at),
    end_at: isoToLocalInput(event.end_at),

    price_min: event.price_min ?? "",
    price_max: event.price_max ?? "",

    venue_name: event.venue_name ?? "",
    lat: event.lat ?? "",
    lng: event.lng ?? "",

    cover_image: event.cover_image ?? "",
    source_url: event.source_url ?? "",

    popularity: event.popularity ?? 0,
    visibility: event.visibility ?? "public",
  });

  const [saving, setSaving] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);

    const payload: any = {
      title: form.title,
      slug: form.slug || null,
      description: form.description,
      visibility: form.visibility,

      venue_name: form.venue_name || null,
      cover_image: form.cover_image || null,
      source_url: form.source_url || null,

      price_min: form.price_min !== "" ? Number(form.price_min) : null,
      price_max: form.price_max !== "" ? Number(form.price_max) : null,

      lat: form.lat !== "" ? Number(form.lat) : null,
      lng: form.lng !== "" ? Number(form.lng) : null,

      popularity: Number(form.popularity) || 0,
    };

    payload.start_at = form.start_at || null;
    payload.end_at = form.end_at || null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/events/${event.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const updated = await res.json();
    setSaving(false);
    onSaved(updated);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="admin-card w-full max-w-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6">Edit event</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* TITLE */}
          <div className="md:col-span-2">
            <label className="admin-label">Title</label>
            <input
              value={form.title}
              onChange={e => update("title", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* SLUG */}
          <div className="md:col-span-2">
            <label className="admin-label">Slug</label>
            <input
              value={form.slug}
              onChange={e => update("slug", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="admin-label">Description</label>
            <textarea
              value={form.description}
              onChange={e => update("description", e.target.value)}
              className="admin-input min-h-[120px]"
            />
          </div>

          {/* START */}
          <div>
            <label className="admin-label">Start date</label>
            <input
              type="datetime-local"
              value={form.start_at}
              onChange={e => update("start_at", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* END */}
          <div>
            <label className="admin-label">End date</label>
            <input
              type="datetime-local"
              value={form.end_at}
              onChange={e => update("end_at", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* VENUE */}
          <div className="md:col-span-2">
            <label className="admin-label">Venue name</label>
            <input
              value={form.venue_name}
              onChange={e => update("venue_name", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* LAT */}
          <div>
            <label className="admin-label">Latitude</label>
            <input
              type="number"
              step="0.000001"
              value={form.lat}
              onChange={e => update("lat", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* LNG */}
          <div>
            <label className="admin-label">Longitude</label>
            <input
              type="number"
              step="0.000001"
              value={form.lng}
              onChange={e => update("lng", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* PRICE MIN */}
          <div>
            <label className="admin-label">Price min (€)</label>
            <input
              type="number"
              step="0.01"
              value={form.price_min}
              onChange={e => update("price_min", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* PRICE MAX */}
          <div>
            <label className="admin-label">Price max (€)</label>
            <input
              type="number"
              step="0.01"
              value={form.price_max}
              onChange={e => update("price_max", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* COVER IMAGE */}
          <div className="md:col-span-2">
            <label className="admin-label">Cover image URL</label>
            <input
              value={form.cover_image}
              onChange={e => update("cover_image", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* SOURCE URL */}
          <div className="md:col-span-2">
            <label className="admin-label">Source URL</label>
            <input
              value={form.source_url}
              onChange={e => update("source_url", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* POPULARITY */}
          <div>
            <label className="admin-label">Popularity</label>
            <input
              type="number"
              value={form.popularity}
              onChange={e => update("popularity", e.target.value)}
              className="admin-input"
            />
          </div>

          {/* VISIBILITY */}
          <div>
            <label className="admin-label">Visibility</label>
            <select
              value={form.visibility}
              onChange={e => update("visibility", e.target.value)}
              className="admin-input"
            >
              <option value="public">Public</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="admin-button-secondary">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="admin-button-primary"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
