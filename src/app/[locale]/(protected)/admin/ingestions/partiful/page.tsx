"use client";

import { useState } from "react";

type IngestResult = {
  source: string;
  city: string;
  url: string;
  inserted: number;
  skipped: number;
  errors: number;
};

export default function AdminIngestionsPage() {
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ingestions/partiful`,
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
        const text = await res.text();
        throw new Error(text || "Ingest failed");
      }

      const ingestResult = await res.json();
      setResult(ingestResult);

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
        <h1 className="text-2xl font-semibold">Ingestions</h1>
        <p className="text-white/40 text-sm mt-1">
          Import a single event from Partiful
        </p>
      </div>

      {/* FORM */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-6 space-y-4 max-w-xl">

        {/* SOURCE */}
        <div className="space-y-1">
          <label className="text-xs text-white/40">Source</label>
          <input
            disabled
            value="PARTIFUL"
            className="input opacity-60"
          />
        </div>

        {/* CITY */}
        <div className="space-y-1">
          <label className="text-xs text-white/40">City slug</label>
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            className="input"
            placeholder="milano"
          />
        </div>

        {/* URL */}
        <div className="space-y-1">
          <label className="text-xs text-white/40">Partiful event URL</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="input"
            placeholder="https://partiful.com/e/XXXXXXXX"
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
        <div className="space-y-4">

          <div className="grid grid-cols-3 gap-4 max-w-xl">
            <Stat label="Inserted" value={result.inserted} />
            <Stat label="Skipped" value={result.skipped} />
            <Stat label="Errors" value={result.errors} />
          </div>

          <div className="bg-[#0c0c0c] border border-white/5 rounded-lg p-4 max-w-xl">
            <p className="text-xs text-white/40 mb-1">Event URL</p>
            <p className="text-sm break-all">{result.url}</p>
          </div>
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
