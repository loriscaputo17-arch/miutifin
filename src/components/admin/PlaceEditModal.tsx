"use client";

import { useState } from "react";

type Props = {
  place: any;
  onClose: () => void;
  onSaved: (place: any) => void;
};

export default function PlaceEditModal({ place, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    name: place.name ?? "",
    description: place.description ?? "",
    address: place.address ?? "",
    lat: place.lat ?? "",
    lng: place.lng ?? "",
    price_level: place.priceLevel ?? "",
    cover_image: place.image ?? "",
  });

  const [saving, setSaving] = useState(false);

  function update(key: string, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);

    const payload = {
      name: form.name,
      description: form.description,
      address: form.address,
      lat: form.lat !== "" ? Number(form.lat) : null,
      lng: form.lng !== "" ? Number(form.lng) : null,
      price_level:
        form.price_level !== "" ? Number(form.price_level) : null,
      cover_image: form.cover_image || null,
      updated_at: new Date().toISOString(),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/places/${place.id}`,
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#0c0c0c] rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Edit place</h2>

        {/* IMAGE PREVIEW */}
        {form.cover_image && (
          <div className="mb-4">
            <img
              src={form.cover_image}
              alt="Cover preview"
              className="w-full h-48 object-cover rounded-lg border border-white/10"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" value={form.name} onChange={v => update("name", v)} />
          <Input label="Address" value={form.address} onChange={v => update("address", v)} />
          <Input label="Latitude" value={form.lat} onChange={v => update("lat", v)} />
          <Input label="Longitude" value={form.lng} onChange={v => update("lng", v)} />
          <Input
            label="Price level (1–4)"
            value={form.price_level}
            onChange={v => update("price_level", v)}
          />
          <Input
            label="Image URL"
            value={form.cover_image}
            onChange={v => update("cover_image", v)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4">
          <label className="text-xs text-white/40">Description</label>
          <textarea
            value={form.description}
            onChange={e => update("description", e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-md p-2 min-h-[120px]"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm text-white/60">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI helpers ---------------- */

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-white/40">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#111] border border-white/10 rounded-md p-2"
      />
    </div>
  );
}
