"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  type: string;
  created_at: string;
};

export default function AdminCategoriesClient() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    type: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`)
      .then(r => r.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  function openCreate() {
    setForm({ name: "", slug: "", type: "" });
    setCreating(true);
    setEditing(null);
  }

  function openEdit(c: Category) {
    setForm({
      name: c.name,
      slug: c.slug,
      type: c.type,
    });
    setEditing(c);
    setCreating(false);
  }

  async function save() {
    const url = editing
      ? `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${editing.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`;

    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (editing) {
      setItems(prev => prev.map(i => (i.id === data.id ? data : i)));
    } else {
      setItems(prev => [data, ...prev]);
    }

    setEditing(null);
    setCreating(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this category?")) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${id}`,
      { method: "DELETE" }
    );

    setItems(prev => prev.filter(i => i.id !== id));
  }

  if (loading) {
    return <p className="text-white/40">Loading categories…</p>;
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <button
          onClick={openCreate}
          className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium"
        >
          + New category
        </button>
      </div>

      {/* FORM */}
      {(creating || editing) && (
        <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-4 mb-6 space-y-3">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="admin-input"
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            className="admin-input"
          />

          <input
            placeholder="Type (music, food, event…)"
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            className="admin-input"
          />

          <div className="flex gap-2">
            <button
              onClick={save}
              className="bg-white text-black px-4 py-1.5 rounded-md text-sm"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditing(null);
                setCreating(false);
              }}
              className="bg-white/10 px-4 py-1.5 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {items.map(c => (
          <div
            key={c.id}
            className="bg-[#0c0c0c] border border-white/5 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="flex-1">
              <p className="font-medium">{c.name}</p>
              <p className="text-white/40 text-sm">
                {c.slug} · {c.type}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(c)}
                className="bg-white text-black px-3 py-1.5 rounded-md text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => remove(c.id)}
                className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
