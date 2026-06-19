"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .dx{padding:40px 32px 80px;max-width:1100px;margin:0 auto}
  .dx-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500}
  .dx-back:hover{color:#dc2626}
  .dx-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .dx-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .dx-h{font-family:Georgia,serif;font-style:italic;font-size:56px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .dx-h .red{color:#dc2626}
  .dx-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic;max-width:520px;line-height:1.55}
  .dx-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:36px 0 24px}
  @media(max-width:720px){.dx-stats{grid-template-columns:1fr}}
  .dx-stat{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:22px}
  .dx-stat-num{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;color:#1a1815;letter-spacing:-1.5px}
  .dx-stat-num.red{color:#dc2626}
  .dx-stat-lab{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-top:6px}
  .dx-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:36px 0}
  @media(max-width:720px){.dx-actions{grid-template-columns:1fr}}
  .dx-action{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:28px;text-decoration:none;color:inherit;transition:all .15s;display:block}
  .dx-action:hover{border-color:#dc2626;transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,0,0,0.05)}
  .dx-action-title{font-family:Georgia,serif;font-style:italic;font-size:28px;line-height:1.05;letter-spacing:-0.8px;color:#1a1815;margin-bottom:8px}
  .dx-action-title .red{color:#dc2626}
  .dx-action-desc{font-size:13px;color:rgba(26,24,21,0.65);line-height:1.5}
  .dx-action-cta{margin-top:14px;font-size:11px;font-weight:600;color:#dc2626;letter-spacing:.05em;text-transform:uppercase}
  .dx-recent-h{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-bottom:14px}
  .dx-recent{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;overflow:hidden}
  .dx-recent-row{padding:14px 22px;border-bottom:1px solid rgba(26,24,21,0.05);display:flex;justify-content:space-between;align-items:center;gap:14px;font-size:13px;text-decoration:none;color:inherit}
  .dx-recent-row:last-child{border-bottom:none}
  .dx-recent-row:hover{background:#fafaf7}
  .dx-recent-name{font-weight:600;color:#1a1815;letter-spacing:-0.2px}
  .dx-recent-meta{font-size:11px;color:rgba(26,24,21,0.55);white-space:nowrap}
  .dx-recent-kind{font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(26,24,21,0.55);padding:3px 8px;border:1px solid rgba(26,24,21,0.10);border-radius:100px}
  .dx-recent-kind.event{color:#dc2626;border-color:rgba(220,38,38,0.30)}
  .dx-empty{padding:30px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:13px}
`;

interface Stats {
  inReview: number;
  failedLast7d: number;
  publishedLast7d: number;
  recentPublished: Array<{ id: string; kind: string; name: string; reviewed_at: string }>;
}

export default function ContentOSDashboard() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [stats, setStats] = useState<Stats>({
    inReview: 0,
    failedLast7d: 0,
    publishedLast7d: 0,
    recentPublished: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [{ count: inReview }, { count: failed }, { count: published }, { data: recent }] =
        await Promise.all([
          sb.from("content_drafts").select("*", { count: "exact", head: true }).eq("status", "review"),
          sb.from("ingestion_jobs").select("*", { count: "exact", head: true })
            .eq("status", "failed").gte("created_at", since),
          sb.from("content_drafts").select("*", { count: "exact", head: true })
            .eq("status", "published").gte("reviewed_at", since),
          sb.from("content_drafts").select("id, kind, name, reviewed_at")
            .eq("status", "published").order("reviewed_at", { ascending: false }).limit(5),
        ]);

      setStats({
        inReview: inReview ?? 0,
        failedLast7d: failed ?? 0,
        publishedLast7d: published ?? 0,
        recentPublished: (recent as any) ?? [],
      });
      setLoading(false);
    })();
  }, [sb]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="dx">
        <Link href={`/${locale}/admin`} className="dx-back">← Back to admin</Link>
        <div className="dx-eyebrow">Content OS</div>
        <h1 className="dx-h">Il <span className="red">cervello.</span></h1>
        <p className="dx-sub">
          Ingestion, review, publish. Tre stanze, una pipeline. Carichi roba a sinistra, esce contenuto pubblicato a destra.
        </p>

        <div className="dx-stats">
          <div className="dx-stat">
            <div className="dx-stat-num red">{loading ? "—" : stats.inReview}</div>
            <div className="dx-stat-lab">In review</div>
          </div>
          <div className="dx-stat">
            <div className="dx-stat-num">{loading ? "—" : stats.publishedLast7d}</div>
            <div className="dx-stat-lab">Published · 7 giorni</div>
          </div>
          <div className="dx-stat">
            <div className="dx-stat-num">{loading ? "—" : stats.failedLast7d}</div>
            <div className="dx-stat-lab">Failed jobs · 7 giorni</div>
          </div>
        </div>

        <div className="dx-actions">
          <Link href={`/${locale}/admin/ingest`} className="dx-action">
            <div className="dx-action-title">Ingest <span className="red">→</span></div>
            <div className="dx-action-desc">Carica flyer, testo o link. Gemini ricostruisce.</div>
            <div className="dx-action-cta">Add content</div>
          </Link>
          <Link href={`/${locale}/admin/drafts`} className="dx-action">
            <div className="dx-action-title">Drafts <span className="red">→</span></div>
            <div className="dx-action-desc">Review umano. Publish o reject ogni estrazione.</div>
            <div className="dx-action-cta">{stats.inReview} in attesa</div>
          </Link>
          <Link href={`/${locale}/admin/jobs`} className="dx-action">
            <div className="dx-action-title">Jobs <span className="red">→</span></div>
            <div className="dx-action-desc">Debug queue. Cosa è bloccato e perché.</div>
            <div className="dx-action-cta">Open queue</div>
          </Link>
        </div>

        <div className="dx-recent-h">Pubblicati di recente</div>
        {stats.recentPublished.length === 0 ? (
          <div className="dx-recent"><div className="dx-empty">Niente ancora.</div></div>
        ) : (
          <div className="dx-recent">
            {stats.recentPublished.map((d) => (
              <Link key={d.id} href={`/${locale}/admin/drafts/${d.id}`} className="dx-recent-row">
                <span className={`dx-recent-kind ${d.kind}`}>{d.kind.replace("_", " ")}</span>
                <span className="dx-recent-name" style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {d.name}
                </span>
                <span className="dx-recent-meta">
                  {new Date(d.reviewed_at).toLocaleString("it-IT", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}