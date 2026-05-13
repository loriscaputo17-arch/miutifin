"use client";

import { useState } from "react";

type IngestResult = {
  source: string;
  city: string;
  found?: number;
  inserted: number;
  skipped: number;
  errors: number;
  events?: EventItem[];
};

type EventItem = {
  id: string;
  title: string;
  start_at?: string;
  venue_name?: string;
  image?: string;
};

export default function AdminIngestionsEventbritePage() {
  const [city, setCity] = useState("milano");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IngestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runIngest() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1️⃣ run eventbrite ingest
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ingestions/eventbrite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city_slug: city,
            url,
          }),
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Eventbrite ingest failed");
      }

      const ingestResult = await res.json();

      // 2️⃣ fetch last ingestion events
      const lastRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/ingestions/last`
      );

      const last = await lastRes.json();

      // 3️⃣ merge result + events
      setResult({
        ...ingestResult,
        events: last?.events ?? [],
      });

    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Eventbrite ingestion</h1>
        <p className="text-white/40 text-sm mt-1">
          Import a single event from Eventbrite
        </p>
      </div>

      {/* FORM */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-6 space-y-4 max-w-xl">
        <div className="space-y-1">
          <label className="text-xs text-white/40">Source</label>
          <select disabled className="input">
            <option>EVENTBRITE</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40">City slug</label>
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            className="input"
            placeholder="milano"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40">Eventbrite event URL</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="input"
            placeholder="https://www.eventbrite.it/e/..."
          />
        </div>

        <button
          onClick={runIngest}
          disabled={loading || !city || !url}
          className="btn"
        >
          {loading ? "Running ingest…" : "Run ingest"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}

      {/* RESULT */}
      {result && (
        <div className="space-y-6">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Inserted" value={result.inserted} />
            <Stat label="Skipped" value={result.skipped} />
            <Stat label="Errors" value={result.errors} />
          </div>

          {/* EVENTS */}
          {result.events && result.events.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-medium">
                Imported events
              </h2>

              {result.events.map(e => (
                <div
                  key={e.id}
                  className="bg-[#0c0c0c] border border-white/5 rounded-lg p-4 flex gap-4"
                >
                  {e.image && (
                    <img
                      src={e.image}
                      className="w-16 h-16 rounded-md object-cover"
                      alt=""
                    />
                  )}

                  <div className="flex-1">
                    <p className="font-medium">{e.title}</p>

                    <div className="text-xs text-white/40 mt-1 space-y-0.5">
                      {e.start_at && (
                        <p>
                          {new Date(e.start_at).toLocaleString("it-IT")}
                        </p>
                      )}
                      {e.venue_name && (
                        <p>{e.venue_name}</p>
                      )}
                    </div>
                  </div>

                  <a
                    href={`/event/${e.id}`}
                    target="_blank"
                    className="text-xs underline text-white/60 hover:text-white"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          background: #111;
          border: 1px solid #222;
          color: white;
        }
        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: white;
          color: black;
          font-weight: 600;
        }
        .btn:disabled {
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
}

/* ---------------- UI ---------------- */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-lg p-4">
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
