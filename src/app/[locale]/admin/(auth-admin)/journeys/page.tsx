"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .pg{padding:40px 32px 80px;max-width:1200px;margin:0 auto}
  .pg-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px}
  .pg-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .pg-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .pg-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .pg-h .red{color:#dc2626}
  .pg-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic}
  .pg-new{background:#dc2626;color:#fff;border:none;padding:12px 22px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:-0.2px;font-family:inherit;transition:all .15s;display:inline-block}
  .pg-new:hover{background:#ef4444}
  .pg-filters{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
  .pg-search{flex:1;min-width:240px;padding:11px 16px;border:1px solid rgba(26,24,21,0.10);border-radius:100px;font-size:13px;background:#fff;font-family:inherit;letter-spacing:-0.2px;color:#1a1815}
  .pg-search:focus{outline:none;border-color:#dc2626}
  .pg-select{padding:11px 16px;border:1px solid rgba(26,24,21,0.10);border-radius:100px;font-size:13px;background:#fff;font-family:inherit;letter-spacing:-0.2px;color:#1a1815;cursor:pointer;min-width:160px}
  .pg-select:focus{outline:none;border-color:#dc2626}
  .pg-list{display:flex;flex-direction:column;gap:8px}
  .pg-row{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:14px 18px;display:grid;grid-template-columns:80px 1fr auto;gap:16px;align-items:center;text-decoration:none;color:inherit;transition:all .15s}
  .pg-row:hover{border-color:#dc2626;transform:translateY(-1px)}
  .pg-thumb{width:80px;height:60px;border-radius:10px;background:#e8dfd1;object-fit:cover}
  .pg-info{min-width:0}
  .pg-title{font-size:15px;font-weight:600;color:#1a1815;letter-spacing:-0.2px;margin-bottom:2px}
  .pg-headline{font-family:Georgia,serif;font-style:italic;font-size:14px;color:rgba(26,24,21,0.78);margin-bottom:6px;line-height:1.3}
  .pg-meta{font-size:11px;color:rgba(26,24,21,0.55);display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  .pg-meta strong{color:rgba(26,24,21,0.78);font-weight:500}
  .pg-pill{background:rgba(220,38,38,0.10);color:#dc2626;padding:3px 9px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
  .pg-pill.ai{background:rgba(92,138,71,0.12);color:#5c8a47}
  .pg-pill.member{background:rgba(26,24,21,0.08);color:rgba(26,24,21,0.78)}
  .pg-arrow{font-size:18px;color:rgba(26,24,21,0.32)}
  .pg-empty{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .pg-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.55);font-style:italic;font-size:14px}
`;

interface JourneyRow {
  id: string;
  title: string;
  slug: string;
  headline: string | null;
  city_id: string;
  city_name: string | null;
  author_kind: string;
  visibility: string;
  duration_min: number | null;
  distance_m: number | null;
  steps_count: number;
  cover_image: string | null;
  created_at: string;
}

interface City { id: string; name: string; }

export default function JourneysPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [rows, setRows] = useState<JourneyRow[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [cityFilter, setCityFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const sb = createSupabaseBrowserClient();

  useEffect(() => {
    sb.rpc("admin_list_cities").then(({ data }) => {
      setCities((data ?? []) as City[]);
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb.rpc("admin_list_journeys", {
      p_city_id: cityFilter || null,
      p_search: search || null,
      p_limit: 500,
      p_offset: 0,
    });
    setLoading(false);
    if (error) {
      console.error(error);
      return;
    }
    setRows((data ?? []) as JourneyRow[]);
  }, [sb, cityFilter, search]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="pg">
        <div className="pg-top">
          <div>
            <div className="pg-eyebrow">Admin · Journeys</div>
            <h1 className="pg-h">
              The <span className="red">routes.</span>
            </h1>
            <p className="pg-sub">{rows.length} journeys composed.</p>
          </div>
          <Link href={`/${locale}/admin/journeys/new`} className="pg-new">
            + New journey
          </Link>
        </div>

        <div className="pg-filters">
          <input
            type="text"
            placeholder="Search by title or headline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pg-search"
          />
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="pg-select"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="pg-list">
          {loading ? (
            <div className="pg-loading">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="pg-empty">No journeys yet. Compose the first one.</div>
          ) : (
            rows.map((j) => (
              <Link
                key={j.id}
                href={`/${locale}/admin/journeys/${j.id}`}
                className="pg-row"
              >
                {j.cover_image ? (
                  <img src={j.cover_image} alt="" className="pg-thumb" />
                ) : (
                  <div className="pg-thumb" />
                )}
                <div className="pg-info">
                  <div className="pg-title">{j.title}</div>
                  {j.headline && <div className="pg-headline">{j.headline}</div>}
                  <div className="pg-meta">
                    {j.city_name && <strong>{j.city_name}</strong>}
                    <span>{j.steps_count} steps</span>
                    {j.duration_min && <span>{Math.round(j.duration_min / 60)}h</span>}
                    <span className={`pg-pill ${j.author_kind}`}>{j.author_kind}</span>
                  </div>
                </div>
                <div className="pg-arrow">→</div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}