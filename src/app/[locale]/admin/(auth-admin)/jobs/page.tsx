"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { listJobs, type JobRow, type JobStatus } from "@/lib/contentOs";

const STYLES = `
  .jb{padding:40px 32px 80px;max-width:1200px;margin:0 auto}
  .jb-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500}
  .jb-back:hover{color:#dc2626}
  .jb-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .jb-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .jb-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .jb-h .red{color:#dc2626}
  .jb-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic}
  .jb-filters{display:flex;gap:8px;margin:24px 0;flex-wrap:wrap}
  .jb-filter{background:transparent;border:1px solid rgba(26,24,21,0.10);padding:8px 16px;border-radius:100px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;color:#1a1815;letter-spacing:.05em;text-transform:uppercase;transition:all .15s}
  .jb-filter:hover{border-color:#dc2626;color:#dc2626}
  .jb-filter.active{background:#dc2626;color:#fff;border-color:#dc2626}
  .jb-table{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;overflow:hidden}
  .jb-row{display:grid;grid-template-columns:130px 100px 60px 1fr 180px 100px;gap:14px;padding:14px 18px;font-size:12px;align-items:center;border-bottom:1px solid rgba(26,24,21,0.05)}
  .jb-row.head{background:#fafaf7;font-weight:700;color:rgba(26,24,21,0.55);letter-spacing:.1em;text-transform:uppercase;font-size:10px}
  .jb-row:last-child{border-bottom:none}
  .jb-row:hover:not(.head){background:#fafaf7}
  .jb-status{display:inline-block;padding:3px 8px;border-radius:100px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;border:1px solid}
  .jb-status.pending{color:rgba(26,24,21,0.55);border-color:rgba(26,24,21,0.20)}
  .jb-status.processing{color:#dc2626;border-color:rgba(220,38,38,0.30)}
  .jb-status.extracted{color:#3d5e2f;border-color:rgba(92,138,71,0.30)}
  .jb-status.failed{color:#b8392f;border-color:#b8392f;background:rgba(184,57,47,0.06)}
  .jb-status.duplicate{color:#8a6f1a;border-color:rgba(138,111,26,0.30)}
  .jb-version{font-family:Menlo,monospace;font-size:10px;color:rgba(26,24,21,0.55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .jb-error{font-size:11px;color:#b8392f;font-family:Menlo,monospace;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .jb-time{font-size:11px;color:rgba(26,24,21,0.55)}
  .jb-link{color:#dc2626;font-weight:600;text-decoration:none;font-size:11px}
  .jb-link:hover{text-decoration:underline}
  .jb-attempts{font-family:Georgia,serif;font-style:italic;font-size:16px;color:#1a1815;text-align:center}
  .jb-empty{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .jb-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic}
  @media(max-width:980px){.jb-row{grid-template-columns:1fr;gap:6px}.jb-row.head{display:none}}
`;

const STATUSES: (JobStatus | "all")[] = ["all", "pending", "processing", "extracted", "failed", "duplicate"];

interface JobWithDraft extends JobRow {
  draft_id?: string | null;
}

export default function JobsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [filter, setFilter] = useState<JobStatus | "all">("all");
  const [jobs, setJobs] = useState<JobWithDraft[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const rows = await listJobs(100);
      // fetch matching draft_id in one query
      const ids = rows.map((r) => r.id);
      const { data: drafts } = await sb
        .from("content_drafts")
        .select("id, job_id")
        .in("job_id", ids);
      const byJob = new Map<string, string>();
      (drafts || []).forEach((d: any) => byJob.set(d.job_id, d.id));
      setJobs(rows.map((r) => ({ ...r, draft_id: byJob.get(r.id) || null })));
    } finally {
      setLoading(false);
    }
  }, [sb]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const ch = sb
      .channel("ingestion_jobs_live")
      .on("postgres_changes",
        { event: "*", schema: "public", table: "ingestion_jobs" },
        () => load(),
      )
      .subscribe();
    return () => { sb.removeChannel(ch); };
  }, [load, sb]);

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  return (
    <>
      <style>{STYLES}</style>
      <div className="jb">
        <Link href={`/${locale}/admin`} className="jb-back">← Back to admin</Link>
        <div className="jb-eyebrow">Content OS · Jobs</div>
        <h1 className="jb-h">
          Queue <span className="red">debug.</span>
        </h1>
        <p className="jb-sub">{jobs.length} job recenti · realtime</p>

        <div className="jb-filters">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`jb-filter ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s}{s !== "all" && ` (${jobs.filter((j) => j.status === s).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="jb-loading">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="jb-empty">Nessun job in stato "{filter}".</div>
        ) : (
          <div className="jb-table">
            <div className="jb-row head">
              <div>Status</div>
              <div>Created</div>
              <div>Attempts</div>
              <div>Error / Version</div>
              <div>Processor</div>
              <div>Draft</div>
            </div>
            {filtered.map((j) => (
              <div key={j.id} className="jb-row">
                <div>
                  <span className={`jb-status ${j.status}`}>{j.status}</span>
                </div>
                <div className="jb-time">
                  {new Date(j.created_at).toLocaleString("it-IT", {
                    month: "short", day: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </div>
                <div className="jb-attempts">{j.attempts}</div>
                <div>
                  {j.error ? (
                    <div className="jb-error" title={j.error}>{j.error}</div>
                  ) : (
                    <div className="jb-time">—</div>
                  )}
                </div>
                <div className="jb-version" title={j.processor_version || ""}>
                  {j.processor_version || "—"}
                </div>
                <div>
                  {j.draft_id ? (
                    <Link href={`/${locale}/admin/drafts/${j.draft_id}`} className="jb-link">
                      view →
                    </Link>
                  ) : (
                    <div className="jb-time">—</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}