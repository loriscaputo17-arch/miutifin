"use client";

import { useEffect, useState } from "react";

type Submission = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  source: string;
  source_url?: string;
  confidence: number;
  status: string;
};

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-white/40">Loading submissions…</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Submissions</h1>

      <div className="space-y-4">
        {items.map(s => (
          <div
            key={s.id}
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
            {s.image && (
              <img
                src={s.image}
                alt={s.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}

            {/* CONTENT */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white font-medium leading-tight">
                    {s.title}
                  </p>

                  {s.description && (
                    <p className="text-white/50 text-sm mt-1 line-clamp-2">
                      {s.description}
                    </p>
                  )}
                </div>

              </div>

              {/* META */}
              <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
                <span>{s.source}</span>

                {s.source_url && (
                  <a
                    href={s.source_url}
                    target="_blank"
                    className="underline hover:text-white"
                  >
                    open source
                  </a>
                )}

                <span className="uppercase">{s.status}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => promote(s.id, "event")}
                className="
                  bg-white text-black
                  px-4 py-1.5
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
                  px-4 py-1.5
                  rounded-md
                  text-sm
                  hover:bg-white/20
                "
              >
                → Place
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
