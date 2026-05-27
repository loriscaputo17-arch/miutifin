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
  .pg-row{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:14px 18px;display:grid;grid-template-columns:64px 1fr auto auto;gap:16px;align-items:center;text-decoration:none;color:inherit;transition:all .15s}
  .pg-row:hover{border-color:#dc2626;transform:translateY(-1px)}
  .pg-row.past{opacity:.55}
  .pg-thumb{width:64px;height:64px;border-radius:10px;background:#e8dfd1;object-fit:cover}
  .pg-info{min-width:0}
  .pg-title{font-size:15px;font-weight:600;color:#1a1815;letter-spacing:-0.2px;margin-bottom:4px}
  .pg-meta{font-size:11px;color:rgba(26,24,21,0.55);display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  .pg-meta strong{color:rgba(26,24,21,0.78);font-weight:500}
  .pg-date{font-family:Georgia,serif;font-style:italic;color:#1a1815;font-size:14px;letter-spacing:-0.3px;line-height:1;margin-bottom:2px}
  .pg-date-sub{font-size:10px;color:rgba(26,24,21,0.55);font-weight:600;letter-spacing:.1em;text-transform:uppercase}
  .pg-pill{background:rgba(220,38,38,0.10);color:#dc2626;padding:3px 9px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
  .pg-pill.past{background:rgba(26,24,21,0.08);color:rgba(26,24,21,0.55)}
  .pg-arrow{font-size:18px;color:rgba(26,24,21,0.32)}
  .pg-section-label{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-top:24px;margin-bottom:10px}
  .pg-empty{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .pg-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.55);font-style:italic;font-size:14px}
  @media(max-width:700px){.pg-row{grid-template-columns:64px 1fr auto}.pg-arrow{display:none}}
`;

interface EventRow {
  id: string;
  title: string;
  slug: string;
  city_id: string;
  city_name: string | null;
  category_id: string | null;
  category_name: string | null;
  venue_name: string | null;
  start_at: string | null;
  end_at: string | null;
  price_min: number | null;
  price_max: number | null;
  cover_image: string | null;
  popularity: number | null;
  created_at: string;
}

interface City { id: string; name: string; }

export default function EventsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [rows, setRows] = useState<EventRow[]>([]);
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
    const { data, error } = await sb.rpc("admin_list_events", {
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
    setRows((data ?? []) as EventRow[]);
  }, [sb, cityFilter, search]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const now = new Date();
  const upcoming = rows.filter((r) => !r.start_at || new Date(r.start_at) >= now);
  const past = rows.filter((r) => r.start_at && new Date(r.start_at) < now);

  return (
    <>
      <style>{STYLES}</style>
      <div className="pg">
        <div className="pg-top">
          <div>
            <div className="pg-eyebrow">Admin · Events</div>
            <h1 className="pg-h">
              The <span className="red">calendar.</span>
            </h1>
            <p className="pg-sub">{upcoming.length} upcoming · {past.length} past</p>
          </div>
          <Link href={`/${locale}/admin/events/new`} className="pg-new">
            + New event
          </Link>
        </div>

        <div className="pg-filters">
          <input
            type="text"
            placeholder="Search by title..."
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

        {loading ? (
          <div className="pg-loading">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="pg-empty">No events yet. Add the first one.</div>
        ) : (
          <>
            <div className="pg-section-label">Upcoming</div>
            <div className="pg-list">
              {upcoming.length === 0 ? (
                <div className="pg-empty">No upcoming events.</div>
              ) : (
                upcoming.map((e) => (
                  <EventRowCard key={e.id} event={e} locale={locale} isPast={false} />
                ))
              )}
            </div>

            {past.length > 0 && (
              <>
                <div className="pg-section-label" style={{ marginTop: 32 }}>Past</div>
                <div className="pg-list">
                  {past.map((e) => (
                    <EventRowCard key={e.id} event={e} locale={locale} isPast={true} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

function EventRowCard({
  event,
  locale,
  isPast,
}: {
  event: EventRow;
  locale: string;
  isPast: boolean;
}) {
  const start = event.start_at ? new Date(event.start_at) : null;
  const dateLabel = start
    ? start.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    : "—";
  const yearLabel = start ? start.toLocaleDateString("en-GB", { year: "numeric" }) : "";

  return (
    <Link
      href={`/${locale}/admin/events/${event.id}`}
      className={`pg-row ${isPast ? "past" : ""}`}
    >
      {event.cover_image ? (
        <img src={event.cover_image} alt="" className="pg-thumb" />
      ) : (
        <div className="pg-thumb" />
      )}
      <div className="pg-info">
        <div className="pg-title">{event.title}</div>
        <div className="pg-meta">
          {event.city_name && <strong>{event.city_name}</strong>}
          {event.venue_name && <span>· {event.venue_name}</span>}
          {event.category_name && <span>· {event.category_name}</span>}
          {isPast && <span className="pg-pill past">Past</span>}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="pg-date">{dateLabel}</div>
        <div className="pg-date-sub">{yearLabel}</div>
      </div>
      <div className="pg-arrow">→</div>
    </Link>
  );
}