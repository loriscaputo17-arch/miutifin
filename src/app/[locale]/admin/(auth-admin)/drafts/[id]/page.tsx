"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getDraft,
  updateDraftPayload,
  publishDraft,
  rejectDraft,
  type DraftRow,
} from "@/lib/contentOs";

const STYLES = `
  .rv{padding:40px 32px 80px;max-width:1200px;margin:0 auto}
  .rv-back{margin-right: 1rem;font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500}
  .rv-back:hover{color:#dc2626}
  .rv-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .rv-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .rv-h{font-family:Georgia,serif;font-style:italic;font-size:42px;line-height:1.05;letter-spacing:-1.4px;color:#1a1815;margin-bottom:6px}
  .rv-sub{font-size:13px;color:rgba(26,24,21,0.55);font-style:italic}
  .rv-body{display:grid;grid-template-columns:1fr 380px;gap:24px;margin-top:32px}
  @media(max-width:980px){.rv-body{grid-template-columns:1fr}}
  .rv-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:24px}
  .rv-section{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(26,24,21,0.05)}
  .rv-textarea{width:100%;padding:14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:12px;background:#fafaf7;font-family:Menlo,Monaco,'Courier New',monospace;color:#1a1815;outline:none;transition:all .15s;min-height:480px;resize:vertical;line-height:1.55}
  .rv-textarea:focus{border-color:#dc2626;background:#fff}
  .rv-actions{display:flex;justify-content:space-between;align-items:center;margin-top:18px;flex-wrap:wrap;gap:10px}
  .rv-actions-right{display:flex;gap:10px;flex-wrap:wrap}
  .rv-btn-primary{background:#dc2626;color:#fff;border:none;padding:13px 24px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .15s}
  .rv-btn-primary:hover:not(:disabled){background:#ef4444}
  .rv-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .rv-btn-secondary{background:transparent;color:#1a1815;border:1px solid rgba(26,24,21,0.15);padding:13px 22px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
  .rv-btn-secondary:hover{border-color:#1a1815}
  .rv-btn-reject{background:transparent;color:#b8392f;border:1px solid #b8392f;padding:13px 22px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
  .rv-btn-reject:hover{background:#b8392f;color:#fff}
  .rv-meta-row{display:flex;justify-content:space-between;padding:8px 0;font-size:12px;border-bottom:1px solid rgba(26,24,21,0.05)}
  .rv-meta-row:last-child{border-bottom:none}
  .rv-meta-key{color:rgba(26,24,21,0.55);font-weight:500}
  .rv-meta-val{color:#1a1815;font-family:Menlo,monospace;text-align:right;max-width:60%;word-break:break-all;font-size:11px}
  .rv-quality{font-family:Georgia,serif;font-style:italic;font-size:32px;color:#dc2626;line-height:1;margin:8px 0}
  .rv-notes{font-size:12px;font-style:italic;color:rgba(26,24,21,0.65);line-height:1.55;padding:14px;background:#fafaf7;border-radius:10px;border-left:3px solid #dc2626}
  .rv-cover{width:100%;border-radius:10px;background:#fafaf7;border:1px solid rgba(26,24,21,0.08);overflow:hidden;margin-bottom:14px}
  .rv-cover img{display:block;width:100%;height:auto}
  .rv-warn{background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.20);border-radius:10px;padding:14px;font-size:12px;color:#b8392f;line-height:1.5;margin-bottom:14px}
  .rv-warn strong{display:block;font-weight:600;margin-bottom:4px;text-transform:uppercase;letter-spacing:.1em;font-size:10px}
  .rv-status{display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;border:1px solid;margin-left:8px;vertical-align:middle}
  .rv-status.review{color:#dc2626;border-color:rgba(220,38,38,0.30)}
  .rv-status.published{color:#3d5e2f;border-color:rgba(92,138,71,0.30)}
  .rv-status.rejected{color:rgba(26,24,21,0.55);border-color:rgba(26,24,21,0.20)}
  .rv-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100;animation:toast-in .3s ease}
  .rv-toast.err{background:#b8392f}
  .rv-toast.ok{background:#3d5e2f}
  @keyframes toast-in{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
  .rv-loading{padding:80px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
`;

export default function DraftReviewPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";
  const id = params?.id as string;

  const [draft, setDraft] = useState<DraftRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [payloadText, setPayloadText] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind?: "err" | "ok" } | null>(null);

  const showToast = (msg: string, kind?: "err" | "ok") => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await getDraft(id);
      setDraft(d);
      setPayloadText(JSON.stringify(d.payload, null, 2));
      setDirty(false);
    } catch (err: any) {
      showToast(err?.message || "Failed to load", "err");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const onPayloadChange = (val: string) => {
    setPayloadText(val);
    setDirty(true);
  };

  const handleSave = async () => {
    if (!draft) return;
    let parsed: Record<string, any>;
    try {
      parsed = JSON.parse(payloadText);
    } catch (e: any) {
      showToast(`JSON non valido: ${e.message}`, "err");
      return;
    }
    setBusy(true);
    try {
      await updateDraftPayload(draft.id, parsed);
      showToast("Salvato", "ok");
      setDirty(false);
      load();
    } catch (err: any) {
      showToast(err?.message || "Save failed", "err");
    } finally {
      setBusy(false);
    }
  };

  const handlePublish = async () => {
    if (!draft) return;
    if (dirty) {
      if (!confirm("Hai modifiche non salvate. Pubblicare lo stesso?")) return;
    }
    setBusy(true);
    try {
      const result = await publishDraft(draft.id);
      const created = result?.created ?? 0;
      if (created > 0) {
        showToast(`Pubblicato come ${draft.kind}`, "ok");
        setTimeout(() => router.push(`/${locale}/admin/drafts`), 800);
      } else {
        const err = result?.errors?.[0]?.error || "publish skipped";
        showToast(`Publish: ${err}`, "err");
        load();
      }
    } catch (err: any) {
      showToast(err?.message || "Publish failed", "err");
    } finally {
      setBusy(false);
    }
  };

  const handleReject = async () => {
    if (!draft) return;
    const reason = prompt("Motivo del reject (opzionale)") ?? undefined;
    setBusy(true);
    try {
      await rejectDraft(draft.id, reason || undefined);
      showToast("Rifiutato", "ok");
      setTimeout(() => router.push(`/${locale}/admin/drafts`), 600);
    } catch (err: any) {
      showToast(err?.message || "Reject failed", "err");
    } finally {
      setBusy(false);
    }
  };

  if (loading || !draft) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="rv-loading">Loading draft...</div>
      </>
    );
  }

  const cover = (draft.payload as any)?.cover_image;
  const sourceUrl = (draft.payload as any)?.website_url || (draft.payload as any)?.source_url;

  return (
    <>
      <style>{STYLES}</style>
      <div className="rv">
        <Link href={`/${locale}/admin/drafts`} className="rv-back">← Back to drafts</Link>
        <div className="rv-eyebrow">{draft.kind} · review</div>
        <h1 className="rv-h">
          {draft.name || "(senza nome)"}
          <span className={`rv-status ${draft.status}`}>{draft.status}</span>
        </h1>
        <div className="rv-sub">
          Creato {new Date(draft.created_at).toLocaleString("it-IT")}
          {draft.slug && <> · <span style={{ fontFamily: "Menlo,monospace" }}>{draft.slug}</span></>}
        </div>

        <div className="rv-body">
          <div className="rv-card">
            <div className="rv-section">Payload (editabile)</div>
            <textarea
              className="rv-textarea"
              value={payloadText}
              onChange={(e) => onPayloadChange(e.target.value)}
              spellCheck={false}
            />
            <div className="rv-actions">
              <button
                type="button"
                className="rv-btn-reject"
                onClick={handleReject}
                disabled={busy || draft.status !== "review"}
              >
                Reject
              </button>
              <div className="rv-actions-right">
                <button
                  type="button"
                  className="rv-btn-secondary"
                  onClick={handleSave}
                  disabled={busy || !dirty}
                >
                  {busy ? "..." : "Save changes"}
                </button>
                <button
                  type="button"
                  className="rv-btn-primary"
                  onClick={handlePublish}
                  disabled={busy || draft.status !== "review"}
                >
                  {busy ? "..." : "Publish"}
                </button>
              </div>
            </div>
          </div>

          <div>
            {(draft.duplicate_of_place_id || draft.duplicate_of_event_id) && (
              <div className="rv-warn">
                <strong>Possibile duplicato</strong>
                Esiste già un {draft.kind} con stesso nome (o stesso titolo+orario) in questa città.
                Pubblicando crei un secondo record — valuta merge manuale.
              </div>
            )}

            {cover && (
              <div className="rv-cover">
                <img src={cover} alt="cover" />
              </div>
            )}

            <div className="rv-card">
              <div className="rv-section">Quality</div>
              <div className="rv-quality">
                {draft.quality_score !== null ? Number(draft.quality_score).toFixed(2) : "—"}
              </div>
              {draft.ai_notes && <div className="rv-notes">{draft.ai_notes}</div>}
            </div>

            <div className="rv-card" style={{ marginTop: 14 }}>
              <div className="rv-section">Source</div>
              <div className="rv-meta-row">
                <span className="rv-meta-key">Kind</span>
                <span className="rv-meta-val">{draft.kind}</span>
              </div>
              {draft.city_id && (
                <div className="rv-meta-row">
                  <span className="rv-meta-key">City</span>
                  <span className="rv-meta-val">{draft.city_id.slice(0, 8)}…</span>
                </div>
              )}
              {sourceUrl && (
                <div className="rv-meta-row">
                  <span className="rv-meta-key">Source URL</span>
                  <span className="rv-meta-val">
                    <a href={sourceUrl} target="_blank" rel="noreferrer" style={{ color: "#dc2626" }}>
                      open ↗
                    </a>
                  </span>
                </div>
              )}
              <div className="rv-meta-row">
                <span className="rv-meta-key">Job ID</span>
                <span className="rv-meta-val">{draft.job_id?.slice(0, 8) || "—"}…</span>
              </div>
              {draft.published_place_id && (
                <div className="rv-meta-row">
                  <span className="rv-meta-key">Published as</span>
                  <span className="rv-meta-val">place {draft.published_place_id.slice(0, 8)}…</span>
                </div>
              )}
              {draft.published_event_id && (
                <div className="rv-meta-row">
                  <span className="rv-meta-key">Published as</span>
                  <span className="rv-meta-val">event {draft.published_event_id.slice(0, 8)}…</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={`rv-toast ${toast.kind || ""}`}>{toast.msg}</div>}
    </>
  );
}