"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import {
  listDrafts,
  publishDraft,
  rejectDraft,
  type DraftRow,
  type DraftStatus,
  type DraftKind,
} from "@/lib/contentOs";

const STYLES = `
  .pg{padding:40px 32px 140px;max-width:1100px;margin:0 auto}
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
  .pg-filters{display:flex;gap:8px;margin:24px 0;flex-wrap:wrap;align-items:center}
  .pg-filter{background:transparent;border:1px solid rgba(26,24,21,0.10);padding:8px 16px;border-radius:100px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;color:#1a1815;letter-spacing:.05em;text-transform:uppercase;transition:all .15s}
  .pg-filter:hover{border-color:#dc2626;color:#dc2626}
  .pg-filter.active{background:#dc2626;color:#fff;border-color:#dc2626}
  .pg-filter-spacer{flex:1}
  .pg-mode{background:transparent;border:1px solid rgba(26,24,21,0.20);padding:8px 16px;border-radius:100px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;color:#1a1815;letter-spacing:.05em;text-transform:uppercase;transition:all .15s}
  .pg-mode.on{background:#1a1815;color:#fff;border-color:#1a1815}
  .pg-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
  .draft-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:18px;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:8px;transition:all .15s;position:relative;cursor:pointer}
  .draft-card:hover{border-color:#dc2626;transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,0,0,0.05)}
  .draft-card.selected{border-color:#1a1815;background:#fafaf7}
  .draft-card.selected:hover{border-color:#1a1815;transform:none}
  .draft-checkbox{position:absolute;top:14px;right:14px;width:22px;height:22px;border:2px solid rgba(26,24,21,0.25);border-radius:6px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;transition:all .15s}
  .draft-card.selected .draft-checkbox{background:#1a1815;border-color:#1a1815}
  .draft-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;padding-right:32px}
  .draft-kind{font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(26,24,21,0.55);padding:3px 8px;border:1px solid rgba(26,24,21,0.10);border-radius:100px}
  .draft-kind.event{color:#dc2626;border-color:rgba(220,38,38,0.30)}
  .draft-quality{font-size:11px;color:rgba(26,24,21,0.55);font-family:Menlo,monospace}
  .draft-quality strong{color:#1a1815;font-family:Georgia,serif;font-style:italic;font-size:15px;font-weight:normal}
  .draft-quality.high strong{color:#3d5e2f}
  .draft-quality.low strong{color:#b8392f}
  .draft-name{font-size:18px;font-weight:600;color:#1a1815;letter-spacing:-0.3px;line-height:1.2;margin-top:4px}
  .draft-linked{font-size:10px;font-weight:600;color:#3d5e2f;text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
  .draft-meta{font-size:11px;color:rgba(26,24,21,0.55);display:flex;gap:10px;flex-wrap:wrap;margin-top:auto;padding-top:8px;border-top:1px solid rgba(26,24,21,0.05)}
  .draft-dup{font-size:10px;color:#b8392f;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
  .draft-notes{font-size:11px;color:rgba(26,24,21,0.55);font-style:italic;line-height:1.45;border-top:1px dashed rgba(26,24,21,0.08);padding-top:8px}
  .draft-empty{padding:80px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px;grid-column:1/-1}
  .pg-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .pg-pulse{display:inline-block;width:8px;height:8px;border-radius:50%;background:#5c8a47;margin-right:8px;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  .bulk-bar{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;border-radius:100px;padding:14px 22px;display:flex;align-items:center;gap:14px;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:80;flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 32px)}
  .bulk-bar-count{font-family:Georgia,serif;font-style:italic;font-size:22px;letter-spacing:-0.5px}
  .bulk-bar-count span{font-family:Inter,sans-serif;font-style:normal;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-left:6px}
  .bulk-bar-btn{background:rgba(255,255,255,0.10);color:#fff;border:none;padding:10px 18px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:-0.1px;transition:all .15s}
  .bulk-bar-btn:hover{background:rgba(255,255,255,0.20)}
  .bulk-bar-btn.primary{background:#dc2626}
  .bulk-bar-btn.primary:hover{background:#ef4444}
  .bulk-bar-btn.danger{color:#ff8e85}
  .bulk-bar-btn:disabled{opacity:.4;cursor:not-allowed}
  .pg-toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100;animation:toast-in .3s ease}
  .pg-toast.err{background:#b8392f}
  .pg-toast.ok{background:#3d5e2f}
  @keyframes toast-in{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
`;

const STATUSES: DraftStatus[] = ["review", "draft", "approved", "published", "rejected", "merged"];
const KINDS: DraftKind[] = ["place", "event", "journey_candidate"];
const AUTO_QUALITY_THRESHOLD = 0.75;

export default function DraftsListPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [statusFilter, setStatusFilter] = useState<DraftStatus>("review");
  const [kindFilter, setKindFilter] = useState<DraftKind | "all">("all");
  const [drafts, setDrafts] = useState<DraftRow[]>([]);
  const [loading, setLoading] = useState(true);

  // bulk selection
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState<{ action: "publish" | "reject"; current: number; total: number } | null>(null);
  const [toast, setToast] = useState<{ msg: string; kind?: "err" | "ok" } | null>(null);

  const showToast = (msg: string, kind?: "err" | "ok") => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3500);
  };

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

  // reset selection on filter change
  useEffect(() => { setSelectedIds(new Set()); }, [statusFilter, kindFilter]);

  const autoPublishableIds = useMemo(() => {
    return drafts
      .filter((d) =>
        d.status === "review" &&
        d.quality_score !== null &&
        Number(d.quality_score) >= AUTO_QUALITY_THRESHOLD &&
        !d.duplicate_of_place_id &&
        !d.duplicate_of_event_id,
      )
      .map((d) => d.id);
  }, [drafts]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllAutoPublishable = () => {
    setSelectedIds(new Set(autoPublishableIds));
    if (autoPublishableIds.length === 0) {
      showToast("Nessun draft con quality ≥ 0.75 senza duplicati", "err");
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  const runBulk = async (action: "publish" | "reject") => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    const confirmMsg = action === "publish"
      ? `Pubblicare ${ids.length} draft? Verranno tutti pushati in places/events.`
      : `Rifiutare ${ids.length} draft? Operazione non reversibile (singolarmente sì, in massa no).`;
    if (!confirm(confirmMsg)) return;

    setBulkBusy({ action, current: 0, total: ids.length });
    let ok = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < ids.length; i++) {
      try {
        if (action === "publish") {
          const result = await publishDraft(ids[i]);
          if ((result?.created ?? 0) > 0) {
            ok++;
          } else {
            failed++;
            const err = result?.errors?.[0]?.error || "skip";
            errors.push(`${ids[i].slice(0, 8)}: ${err}`);
          }
        } else {
          await rejectDraft(ids[i]);
          ok++;
        }
      } catch (e: any) {
        failed++;
        errors.push(`${ids[i].slice(0, 8)}: ${e?.message || "error"}`);
      }
      setBulkBusy({ action, current: i + 1, total: ids.length });
    }

    setBulkBusy(null);
    setSelectedIds(new Set());
    setSelectMode(false);
    load();

    if (failed === 0) {
      showToast(`${ok} ${action === "publish" ? "pubblicati" : "rifiutati"}`, "ok");
    } else {
      showToast(`${ok} ok, ${failed} falliti — vedi console`, "err");
      console.warn("bulk action errors:", errors);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="pg">
        <Link href={`/${locale}/admin/content-os`} className="pg-back">← Back to content-os</Link>

        <div className="pg-top">
          <div>
            <div className="pg-eyebrow">Content OS · Drafts</div>
            <h1 className="pg-h">
              In <span className="red">review.</span>
            </h1>
            <p className="pg-sub">
              <span className="pg-pulse" />
              {drafts.length} {statusFilter} · updates live
              {autoPublishableIds.length > 0 && statusFilter === "review" && (
                <> · <strong style={{ color: "#3d5e2f" }}>{autoPublishableIds.length} auto-publishable</strong></>
              )}
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
          <div className="pg-filter-spacer" />
          <button
            type="button"
            className={`pg-mode ${selectMode ? "on" : ""}`}
            onClick={() => { setSelectMode((v) => !v); setSelectedIds(new Set()); }}
          >
            {selectMode ? "Cancel select" : "Select mode"}
          </button>
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
              drafts.map((d) => {
                const selected = selectedIds.has(d.id);
                const q = d.quality_score !== null ? Number(d.quality_score) : null;
                const qClass = q !== null
                  ? q >= 0.75 ? "high" : q < 0.5 ? "low" : ""
                  : "";
                const hasLinkedPlace = !!(d.payload as any)?.place_id;
                const cardContent = (
                  <>
                    {selectMode && (
                      <div className="draft-checkbox">{selected ? "✓" : ""}</div>
                    )}
                    <div className="draft-card-top">
                      <span className={`draft-kind ${d.kind}`}>{d.kind.replace("_", " ")}</span>
                      {q !== null && (
                        <div className={`draft-quality ${qClass}`}>
                          <strong>{q.toFixed(2)}</strong> q
                        </div>
                      )}
                    </div>
                    <div className="draft-name">{d.name || "(senza nome)"}</div>
                    {hasLinkedPlace && d.kind === "event" && (
                      <div className="draft-linked">↳ Linked to a place</div>
                    )}
                    {(d.duplicate_of_place_id || d.duplicate_of_event_id) && (
                      <div className="draft-dup">⚠ Possibile duplicato</div>
                    )}
                    {d.ai_notes && <div className="draft-notes">{d.ai_notes}</div>}
                    <div className="draft-meta">
                      <span>{new Date(d.created_at).toLocaleString("it-IT")}</span>
                      {d.slug && <span style={{ fontFamily: "Menlo,monospace" }}>{d.slug}</span>}
                    </div>
                  </>
                );

                return selectMode ? (
                  <div
                    key={d.id}
                    className={`draft-card ${selected ? "selected" : ""}`}
                    onClick={() => toggleSelected(d.id)}
                  >
                    {cardContent}
                  </div>
                ) : (
                  <Link
                    key={d.id}
                    href={`/${locale}/admin/drafts/${d.id}`}
                    className="draft-card"
                  >
                    {cardContent}
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>

      {selectMode && selectedIds.size === 0 && autoPublishableIds.length > 0 && (
        <div className="bulk-bar">
          <span className="bulk-bar-count" style={{ fontSize: 13 }}>
            Seleziona drafts toccandoli, oppure
          </span>
          <button type="button" className="bulk-bar-btn primary" onClick={selectAllAutoPublishable}>
            Select {autoPublishableIds.length} auto-publishable
          </button>
        </div>
      )}

      {selectMode && selectedIds.size > 0 && (
        <div className="bulk-bar">
          <span className="bulk-bar-count">
            {selectedIds.size}<span>selected</span>
          </span>
          <button type="button" className="bulk-bar-btn" onClick={clearSelection} disabled={!!bulkBusy}>
            Clear
          </button>
          <button
            type="button"
            className="bulk-bar-btn danger"
            onClick={() => runBulk("reject")}
            disabled={!!bulkBusy}
          >
            {bulkBusy?.action === "reject" ? `Rejecting ${bulkBusy.current}/${bulkBusy.total}` : "Reject all"}
          </button>
          <button
            type="button"
            className="bulk-bar-btn primary"
            onClick={() => runBulk("publish")}
            disabled={!!bulkBusy}
          >
            {bulkBusy?.action === "publish" ? `Publishing ${bulkBusy.current}/${bulkBusy.total}` : "Publish all"}
          </button>
        </div>
      )}

      {toast && <div className={`pg-toast ${toast.kind || ""}`}>{toast.msg}</div>}
    </>
  );
}