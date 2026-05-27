"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .pg{padding:40px 32px 80px;max-width:1200px;margin:0 auto}
  .pg-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px}
  .pg-eyebrow{
    display:inline-flex;align-items:center;gap:10px;
    font-size:11px;font-weight:700;letter-spacing:.2em;
    text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px;
  }
  .pg-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .pg-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .pg-h .red{color:#dc2626}
  .pg-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic}
  .pg-new{
    background:#dc2626;color:#fff;border:none;padding:12px 22px;
    border-radius:100px;font-size:13px;font-weight:600;
    text-decoration:none;letter-spacing:-0.2px;font-family:inherit;
    transition:all .15s;display:inline-block;
  }
  .pg-new:hover{background:#ef4444}

  .pg-filters{
    display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;
  }
  .pg-search{
    flex:1;min-width:240px;
    padding:11px 16px;border:1px solid rgba(26,24,21,0.10);
    border-radius:100px;font-size:13px;background:#fff;
    font-family:inherit;letter-spacing:-0.2px;color:#1a1815;
  }
  .pg-search:focus{outline:none;border-color:#dc2626}
  .pg-select{
    padding:11px 16px;border:1px solid rgba(26,24,21,0.10);
    border-radius:100px;font-size:13px;background:#fff;
    font-family:inherit;letter-spacing:-0.2px;color:#1a1815;
    cursor:pointer;min-width:160px;
  }
  .pg-select:focus{outline:none;border-color:#dc2626}

  .pg-list{display:flex;flex-direction:column;gap:8px}
  .pg-row{
    background:#fff;border:1px solid rgba(26,24,21,0.08);
    border-radius:14px;padding:14px 18px;
    display:grid;grid-template-columns:64px 1fr auto;gap:16px;
    align-items:center;text-decoration:none;color:inherit;
    transition:all .15s;
  }
  .pg-row:hover{border-color:#dc2626;transform:translateY(-1px)}
  .pg-thumb{
    width:64px;height:64px;border-radius:10px;
    background:#e8dfd1;object-fit:cover;
  }
  .pg-info{min-width:0}
  .pg-name{
    font-size:15px;font-weight:600;color:#1a1815;
    letter-spacing:-0.2px;margin-bottom:4px;
  }
  .pg-meta{
    font-size:11px;color:rgba(26,24,21,0.55);
    display:flex;gap:10px;flex-wrap:wrap;align-items:center;
  }
  .pg-meta strong{color:rgba(26,24,21,0.78);font-weight:500}
  .pg-pill{
    background:rgba(220,38,38,0.10);color:#dc2626;
    padding:3px 9px;border-radius:100px;
    font-size:9px;font-weight:700;letter-spacing:.1em;
    text-transform:uppercase;
  }
  .pg-arrow{font-size:18px;color:rgba(26,24,21,0.32)}

  .pg-empty{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .pg-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.55);font-style:italic;font-size:14px}
`;

interface PlaceRow {
  id: string;
  name: string;
  slug: string;
  city_id: string;
  city_name: string | null;
  category_id: string | null;
  category_name: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  price_level: number | null;
  cover_image: string | null;
  popularity: number | null;
  created_at: string;
}

interface City { id: string; name: string; }

const PRICE_LABELS = ["", "€", "€€", "€€€", "€€€€"];

export default function PlacesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [rows, setRows] = useState<PlaceRow[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [cityFilter, setCityFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const sb = createSupabaseBrowserClient();

  // Carica città per filtro
  useEffect(() => {
    sb.rpc("admin_list_cities").then(({ data }) => {
      setCities((data ?? []) as City[]);
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb.rpc("admin_list_places", {
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
    setRows((data ?? []) as PlaceRow[]);
  }, [sb, cityFilter, search]);

  // Debounce search
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
            <div className="pg-eyebrow">Admin · Places</div>
            <h1 className="pg-h">
              The <span className="red">map.</span>
            </h1>
            <p className="pg-sub">{rows.length} places across the city.</p>
          </div>
          <Link href={`/${locale}/admin/places/new`} className="pg-new">
            + New place
          </Link>
        </div>

        <div className="pg-filters">
          <input
            type="text"
            placeholder="Search by name..."
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
            <div className="pg-empty">No places yet. Add the first one.</div>
          ) : (
            rows.map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/admin/places/${p.id}`}
                className="pg-row"
              >
                {p.cover_image ? (
                  <img src={p.cover_image} alt="" className="pg-thumb" />
                ) : (
                  <div className="pg-thumb" />
                )}
                <div className="pg-info">
                  <div className="pg-name">{p.name}</div>
                  <div className="pg-meta">
                    {p.city_name && <strong>{p.city_name}</strong>}
                    {p.category_name && <span>{p.category_name}</span>}
                    {p.address && <span>· {p.address}</span>}
                    {p.price_level && (
                      <span className="pg-pill">{PRICE_LABELS[p.price_level]}</span>
                    )}
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