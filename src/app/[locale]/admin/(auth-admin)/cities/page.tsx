"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .pg{padding:40px 32px 80px;max-width:1100px;margin:0 auto}
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

  .pg-list{display:flex;flex-direction:column;gap:8px}
  .pg-section-label{
    font-size:10px;font-weight:700;letter-spacing:.16em;
    text-transform:uppercase;color:rgba(26,24,21,0.55);
    margin-top:24px;margin-bottom:10px;
  }
  .city-row{
    background:#fff;border:1px solid rgba(26,24,21,0.08);
    border-radius:14px;padding:18px 22px;
    display:grid;grid-template-columns:1fr auto auto auto;gap:16px;
    align-items:center;
  }
  .city-info{min-width:0}
  .city-name{
    font-size:16px;font-weight:600;color:#1a1815;
    letter-spacing:-0.3px;margin-bottom:4px;
    text-decoration:none;
  }
  .city-name a{color:inherit;text-decoration:none}
  .city-name a:hover{color:#dc2626}
  .city-meta{
    font-size:11px;color:rgba(26,24,21,0.55);
    display:flex;gap:12px;flex-wrap:wrap;
  }
  .city-meta strong{color:rgba(26,24,21,0.78);font-weight:500}
  .city-counts{display:flex;gap:14px;font-size:11px;color:rgba(26,24,21,0.55)}
  .city-counts .num{
    font-family:Georgia,serif;font-style:italic;font-size:18px;
    color:#1a1815;line-height:1;
  }
  .city-counts .lab{
    font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  }
  .city-toggle{
    background:transparent;border:1px solid rgba(26,24,21,0.10);
    padding:8px 16px;border-radius:100px;
    font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;
    letter-spacing:.1em;text-transform:uppercase;transition:all .15s;
  }
  .city-toggle.active{background:#dc2626;color:#fff;border-color:#dc2626}
  .city-toggle:hover{border-color:#dc2626;color:#dc2626}
  .city-toggle.active:hover{background:#b8201f;color:#fff}
  .city-edit{
    font-size:11px;color:rgba(26,24,21,0.55);
    text-decoration:none;padding:8px 12px;border-radius:100px;
    border:1px solid rgba(26,24,21,0.10);
    font-weight:500;letter-spacing:-0.1px;transition:all .15s;
  }
  .city-edit:hover{border-color:#dc2626;color:#dc2626}
  .pg-toast{
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;
    font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);
    z-index:100;animation:toast-in .3s ease;
  }
  .pg-toast.err{background:#b8392f}
  @keyframes toast-in{
    from{opacity:0;transform:translate(-50%,20px)}
    to{opacity:1;transform:translate(-50%,0)}
  }
  .pg-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  @media(max-width:800px){
    .city-row{grid-template-columns:1fr;gap:12px}
  }
`;

interface City {
  id: string;
  name: string;
  slug: string;
  country: string;
  timezone: string;
  is_active: boolean;
  coming_soon_order: number | null;
  center_lat: number;
  center_lng: number;
  default_zoom: number;
  places_count: number;
  events_count: number;
  journeys_count: number;
}

export default function CitiesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const sb = createSupabaseBrowserClient();

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb.rpc("admin_list_cities");
    setLoading(false);
    if (error) {
      showToast("Failed to load cities", true);
      return;
    }
    setCities((data as City[]) ?? []);
  }, [sb]);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (city: City) => {
    setBusy(city.id);
    const { data, error } = await sb.rpc("admin_toggle_city_active", { p_id: city.id });
    setBusy(null);
    if (error || !(data as { ok?: boolean })?.ok) {
      showToast("Failed to update", true);
      return;
    }
    showToast(`${city.name} is now ${(data as { is_active?: boolean })?.is_active ? "live" : "coming soon"}`);
    load();
  };

  const active = cities.filter((c) => c.is_active);
  const coming = cities.filter((c) => !c.is_active);

  return (
    <>
      <style>{STYLES}</style>
      <div className="pg">
        <div className="pg-top">
          <div>
            <div className="pg-eyebrow">Admin · Cities</div>
            <h1 className="pg-h">
              The <span className="red">map.</span>
            </h1>
            <p className="pg-sub">{cities.length} cities · {active.length} live</p>
          </div>
          <Link href={`/${locale}/admin/cities/new`} className="pg-new">
            + New city
          </Link>
        </div>

        {loading ? (
          <div className="pg-loading">Loading...</div>
        ) : (
          <>
            <div className="pg-section-label">Live now</div>
            <div className="pg-list">
              {active.length === 0 ? (
                <div className="pg-loading">No active cities.</div>
              ) : (
                active.map((c) => (
                  <CityRow
                    key={c.id}
                    city={c}
                    locale={locale}
                    busy={busy === c.id}
                    onToggle={() => toggleActive(c)}
                  />
                ))
              )}
            </div>

            <div className="pg-section-label" style={{ marginTop: 32 }}>Coming soon</div>
            <div className="pg-list">
              {coming.map((c) => (
                <CityRow
                  key={c.id}
                  city={c}
                  locale={locale}
                  busy={busy === c.id}
                  onToggle={() => toggleActive(c)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {toast && <div className={`pg-toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
    </>
  );
}

function CityRow({
  city,
  locale,
  busy,
  onToggle,
}: {
  city: City;
  locale: string;
  busy: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="city-row">
      <div className="city-info">
        <div className="city-name">
          <Link href={`/${locale}/admin/cities/${city.id}`}>{city.name}</Link>
        </div>
        <div className="city-meta">
          <strong>{city.country}</strong>
          <span>{city.timezone}</span>
          <span>
            {Number(city.center_lat).toFixed(3)}, {Number(city.center_lng).toFixed(3)}
          </span>
        </div>
      </div>

      <div className="city-counts">
        <div>
          <div className="num">{city.places_count}</div>
          <div className="lab">Places</div>
        </div>
        <div>
          <div className="num">{city.events_count}</div>
          <div className="lab">Events</div>
        </div>
        <div>
          <div className="num">{city.journeys_count}</div>
          <div className="lab">Journeys</div>
        </div>
      </div>

      <Link href={`/${locale}/admin/cities/${city.id}`} className="city-edit">
        Edit
      </Link>

      <button
        onClick={onToggle}
        disabled={busy}
        className={`city-toggle ${city.is_active ? "active" : ""}`}
      >
        {busy ? "..." : city.is_active ? "Live" : "Activate"}
      </button>
    </div>
  );
}