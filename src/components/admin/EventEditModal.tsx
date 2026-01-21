"use client";

import { useState } from "react";

type Props = {
  event: any;
  onClose: () => void;
  onSaved: (event: any) => void;
};

export default function EventEditModal({ event, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description ?? "");
  const [startAt, setStartAt] = useState(event.start_at);
  const [visibility, setVisibility] = useState(event.visibility ?? "public");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/events/${event.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          start_at: startAt,
          visibility,
        }),
      }
    );

    const updated = await res.json();
    setSaving(false);
    onSaved(updated);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#0c0c0c] rounded-2xl w-full max-w-xl p-6 border border-white/5">
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>

        <div className="space-y-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-black/40 rounded-lg px-4 py-2 text-white outline-none"
            placeholder="Title"
          />

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full bg-black/40 rounded-lg px-4 py-2 text-white outline-none"
            rows={4}
            placeholder="Description"
          />

          <input
            type="datetime-local"
            value={startAt?.slice(0, 16)}
            onChange={e => setStartAt(e.target.value)}
            className="w-full bg-black/40 rounded-lg px-4 py-2 text-white outline-none"
          />

          <select
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
            className="w-full bg-black/40 rounded-lg px-4 py-2 text-white outline-none"
          >
            <option value="public">Public</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
