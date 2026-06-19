"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { listDrafts, type DraftRow, type DraftStatus, type DraftKind } from "@/lib/contentOs";

const STYLES = `
  .pg{padding:40px 32px 80px;max-width:1100px;margin:0 auto; background: #f9f8f6; min-height: 100vh}
  .pg-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:16px}
  .pg-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500}
  .pg-back:hover{color:#dc2626}
  .pg-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .pg-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .pg-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .pg-h .red{color:#dc2626}
  .pg-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic}
  .pg-new{background:#dc2626;color:#fff;border:none;padding:12px 22px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:-0.2px;font-family:inherit;transition:all .15s;display:inline-block}
  .pg-new:hover{background:#ef4444}
  .pg-filters{display:flex;gap:8px;margin:24px 0;flex-wrap:wrap}
  .pg-filter{background:transparent;border:1px solid rgba(26,24,21,0.10);padding:8px 16px;border-radius:100px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;color:#1a1815;letter-spacing:.05em;text-transform:uppercase;transition:all .15s}
  .pg-filter:hover{border-color:#dc2626;color:#dc2626}
  .pg-filter.active{background:#dc2626;color:#fff;border-color:#dc2626}
  .pg-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
  .draft-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:18px;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:8px;transition:all .15s;position:relative}
  .draft-card:hover{border-color:#dc2626;transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,0,0,0.05)}
  .draft-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
  .draft-kind{font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(26,24,21,0.55);padding:3px 8px;border:1px solid rgba(26,24,21,0.10);border-radius:100px}
  .draft-kind.event{color:#dc2626;border-color:rgba(220,38,38,0.30)}
  .draft-quality{font-size:11px;color:rgba(26,24,21,0.55);font-family:Menlo,monospace}
  .draft-quality strong{color:#1a1815;font-family:Georgia,serif;font-style:italic;font-size:15px;font-weight:normal}
  .draft-name{font-size:18px;font-weight:600;color:#1a1815;letter-spacing:-0.3px;line-height:1.2;margin-top:4px}
  .draft-meta{font-size:11px;color:rgba(26,24,21,0.55);display:flex;gap:10px;flex-wrap:wrap;margin-top:auto;padding-top:8px;border-top:1px solid rgba(26,24,21,0.05)}
  .draft-dup{font-size:10px;color:#b8392f;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
  .draft-notes{font-size:11px;color:rgba(26,24,21,0.55);font-style:italic;line-height:1.45;border-top:1px dashed rgba(26,24,21,0.08);padding-top:8px}
  .draft-empty{padding:80px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px;grid-column:1/-1}
  .pg-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .pg-pulse{display:inline-block;width:8px;height:8px;border-radius:50%;background:#5c8a47;margin-right:8px;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
`;

const STATUSES: DraftStatus[] = ["review", "draft", "approved", "published", "rejected", "merged"];
const KINDS: DraftKind[] = ["place", "event", "journey_candidate"];

export default function DraftsListPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [statusFilter, setStatusFilter] = useState<DraftStatus>("review");
  const [kindFilter, setKindFilter] = useState<DraftKind | "all">("all");
  const [drafts, setDrafts] = useState<DraftRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const rows = await listDrafts({
        status: statusFilter,
        kind: kindFilter === "all" ? undefined : kindFilter,
        limit: 100,
      });
      setDrafts(rows);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, kindFilter]);

  useEffect(() => { load(); }, [load]);

  // Realtime: refresh when any draft changes
  useEffect(() => {
    const channel = sb
      .channel("content_drafts_live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "content_drafts" },
        () => load(),
      )
      .subscribe();
    return () => { sb.removeChannel(channel); };
  }, [load, sb]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="pg">
        <Link href={`/${locale}/admin`} className="pg-back">← Back to admin</Link>

        <div className="pg-top">
          <div>
            <div className="pg-eyebrow">Content OS · Drafts</div>
            <h1 className="pg-h">
              In <span className="red">review.</span>
            </h1>
            <p className="pg-sub">
              <span className="pg-pulse" />
              {drafts.length} {statusFilter} · updates live
            </p>
          </div>
          <Link href={`/${locale}/admin/ingest`} className="pg-new">
            + Ingest
          </Link>
        </div>

        <div className="pg-filters">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`pg-filter ${statusFilter === s ? "active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="pg-filters" style={{ marginTop: -8 }}>
          <button
            type="button"
            className={`pg-filter ${kindFilter === "all" ? "active" : ""}`}
            onClick={() => setKindFilter("all")}
          >
            All
          </button>
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className={`pg-filter ${kindFilter === k ? "active" : ""}`}
              onClick={() => setKindFilter(k)}
            >
              {k.replace("_", " ")}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="pg-loading">Loading drafts...</div>
        ) : (
          <div className="pg-list">
            {drafts.length === 0 ? (
              <div className="draft-empty">Nessun draft in {statusFilter}.</div>
            ) : (
              drafts.map((d) => (
                <Link key={d.id} href={`/${locale}/admin/drafts/${d.id}`} className="draft-card">
                  <div className="draft-card-top">
                    <span className={`draft-kind ${d.kind}`}>{d.kind.replace("_", " ")}</span>
                    {d.quality_score !== null && (
                      <div className="draft-quality">
                        <strong>{Number(d.quality_score).toFixed(2)}</strong> q
                      </div>
                    )}
                  </div>
                  <div className="draft-name">{d.name || "(senza nome)"}</div>
                  {(d.duplicate_of_place_id || d.duplicate_of_event_id) && (
                    <div className="draft-dup">⚠ Possibile duplicato</div>
                  )}
                  {d.ai_notes && <div className="draft-notes">{d.ai_notes}</div>}
                  <div className="draft-meta">
                    <span>{new Date(d.created_at).toLocaleString("it-IT")}</span>
                    {d.slug && <span style={{ fontFamily: "Menlo,monospace" }}>{d.slug}</span>}
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}