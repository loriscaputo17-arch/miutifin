"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,sans-serif;background:#f5f0e8;color:#1a1815;-webkit-font-smoothing:antialiased}
  .adm{min-height:100vh;padding:32px 24px 80px;background:#f5f0e8;margin:0 auto;max-width:1200px}
  .adm-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px}
  .adm-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .adm-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .adm-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .adm-h .red{color:#dc2626}
  .adm-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic}
  .adm-actions-top{display:flex;gap:10px;align-items:center}
  .adm-new{background:#dc2626;color:#fff;border:none;padding:12px 22px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:-0.2px;font-family:inherit;transition:all .15s;display:inline-block}
  .adm-new:hover{background:#ef4444}
  .adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:32px}
  @media(max-width:780px){.adm-stats{grid-template-columns:repeat(2,1fr)}}
  .adm-stat{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:20px}
  .adm-stat-l{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:8px}
  .adm-stat-v{font-family:Georgia,serif;font-style:italic;font-size:40px;line-height:1;letter-spacing:-1px;color:#1a1815}
  .adm-stat.red .adm-stat-v{color:#dc2626}
  .adm-tabs{display:flex;gap:4px;margin-bottom:20px;background:rgba(26,24,21,0.05);padding:4px;border-radius:100px;width:fit-content}
  .adm-tab{background:transparent;border:none;padding:8px 18px;font-size:12px;font-weight:600;color:rgba(26,24,21,0.55);cursor:pointer;border-radius:100px;font-family:inherit;letter-spacing:-0.2px;transition:all .2s}
  .adm-tab.active{background:#1a1815;color:#fff}
  .adm-list{display:flex;flex-direction:column;gap:8px}
  .adm-row{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:14px;padding:14px 18px;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;transition:all .15s}
  .adm-row:hover{border-color:#dc2626;transform:translateY(-1px)}
  @media(max-width:600px){.adm-row{grid-template-columns:1fr}}
  .adm-row-link{display:block;text-decoration:none;color:inherit;min-width:0;flex:1}
  .adm-row-email{font-size:15px;font-weight:600;color:#1a1815;letter-spacing:-0.2px;margin-bottom:2px;word-break:break-all}
  .adm-row-meta{font-size:12px;color:rgba(26,24,21,0.55);display:flex;gap:12px;flex-wrap:wrap;margin-top:6px}
  .adm-row-meta strong{color:rgba(26,24,21,0.78);font-weight:500}
  .adm-row-actions{display:flex;gap:8px;flex-wrap:wrap}
  .adm-btn-approve{background:#dc2626;color:#fff;border:none;padding:10px 18px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .2s}
  .adm-btn-approve:hover:not(:disabled){background:#ef4444}
  .adm-btn-approve:disabled{opacity:.5;cursor:not-allowed}
  .adm-btn-reject{background:transparent;color:rgba(26,24,21,0.55);border:1px solid rgba(26,24,21,0.10);padding:10px 16px;border-radius:100px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .2s}
  .adm-btn-reject:hover:not(:disabled){border-color:#b8392f;color:#b8392f}
  .adm-badge{display:inline-block;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:100px}
  .adm-badge.approved{background:rgba(92,138,71,0.12);color:#5c8a47}
  .adm-badge.rejected{background:rgba(184,57,47,0.12);color:#b8392f}
  .adm-badge.pending{background:rgba(220,38,38,0.10);color:#dc2626}
  .adm-empty{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:14px}
  .adm-loading{padding:60px 20px;text-align:center;color:rgba(26,24,21,0.55);font-style:italic;font-size:14px}
  .adm-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100;animation:toast-in .3s ease}
  .adm-toast.err{background:#b8392f}
  @keyframes toast-in{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
`;

interface Row {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  created_at: string;
  approved_at: string | null;
}

interface Stats {
  pending: number;
  approved: number;
  rejected: number;
  this_week: number;
  total: number;
}

export default function AdminDashboard() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [stats, setStats] = useState<Stats | null>(null);
  const [tab, setTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);

  const sb = createSupabaseBrowserClient();

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  const loadStats = useCallback(async () => {
    const { data, error } = await sb.rpc("admin_stats");
    if (!error && data) setStats(data as Stats);
  }, [sb]);

  const loadRows = useCallback(async () => {
    setLoading(true);
    const statusFilter = tab === "all" ? null : tab;
    const { data, error } = await sb.rpc("admin_list_waitlist", {
      p_status: statusFilter,
      p_limit: 200,
      p_offset: 0,
    });
    setLoading(false);
    if (error) {
      showToast("Failed to load list", true);
      return;
    }
    setRows((data as Row[]) ?? []);
  }, [sb, tab]);

  useEffect(() => {
    loadStats();
    loadRows();
  }, [tab, loadStats, loadRows]);

  const approve = async (e: React.MouseEvent, row: Row) => {
    e.preventDefault();
    e.stopPropagation();
    setActing(row.id);

    const { data, error } = await sb.rpc("admin_approve_waitlist", {
      p_waitlist_id: row.id,
    });

    if (error || !(data as { ok?: boolean })?.ok) {
      setActing(null);
      const errMsg = (data as { error?: string })?.error || error?.message || "unknown";
      showToast(`Failed: ${errMsg}`, true);
      return;
    }

    try {
      const { data: { session } } = await sb.auth.getSession();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-approval-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ email: row.email, name: row.full_name }),
        }
      );
      if (!res.ok) {
        showToast(`Approved but email failed`, true);
      } else {
        showToast(`Approved & emailed ${row.email}`);
      }
    } catch (err) {
      console.error(err);
      showToast(`Approved but email error`, true);
    }

    setActing(null);
    loadStats();
    loadRows();
  };

  const reject = async (e: React.MouseEvent, row: Row) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Reject ${row.email}? They will not be able to sign in.`)) return;
    setActing(row.id);
    const { data, error } = await sb.rpc("admin_reject_waitlist", {
      p_waitlist_id: row.id,
    });
    setActing(null);
    if (error || !(data as { ok?: boolean })?.ok) {
      showToast("Failed to reject", true);
      return;
    }
    showToast(`Rejected ${row.email}`);
    loadStats();
    loadRows();
  };

  return (
    <>
      <style>{STYLES}</style>
      <main className="adm">
        <div className="adm-top">
          <div>
            <div className="adm-eyebrow">Admin · Waitlist</div>
            <h1 className="adm-h">
              The <span className="red">list.</span>
            </h1>
            <p className="adm-sub">Review applications. Approve to grant access.</p>
          </div>
          <div className="adm-actions-top">
            <Link href={`/${locale}/admin/waitlist/new`} className="adm-new">
              + Add person
            </Link>
          </div>
        </div>

        {stats && (
          <div className="adm-stats">
            <div className="adm-stat red">
              <div className="adm-stat-l">Pending</div>
              <div className="adm-stat-v">{stats.pending}</div>
            </div>
            <div className="adm-stat">
              <div className="adm-stat-l">Approved</div>
              <div className="adm-stat-v">{stats.approved}</div>
            </div>
            <div className="adm-stat">
              <div className="adm-stat-l">This week</div>
              <div className="adm-stat-v">{stats.this_week}</div>
            </div>
            <div className="adm-stat">
              <div className="adm-stat-l">Total</div>
              <div className="adm-stat-v">{stats.total}</div>
            </div>
          </div>
        )}

        <div className="adm-tabs">
          {(["pending", "approved", "rejected", "all"] as const).map((t) => (
            <button
              key={t}
              className={`adm-tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="adm-list">
          {loading ? (
            <div className="adm-loading">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="adm-empty">No entries.</div>
          ) : (
            rows.map((row) => (
              <div key={row.id} className="adm-row">
                <Link
                  href={`/${locale}/admin/waitlist/${row.id}`}
                  className="adm-row-link"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span className="adm-row-email">{row.email}</span>
                    <span className={`adm-badge ${row.status}`}>{row.status}</span>
                  </div>
                  <div className="adm-row-meta">
                    {row.full_name && <span><strong>{row.full_name}</strong></span>}
                    {row.phone && <span>{row.phone}</span>}
                    {row.source && <span>via {row.source}</span>}
                    <span>{new Date(row.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}</span>
                  </div>
                </Link>
                {row.status === "pending" && (
                  <div className="adm-row-actions">
                    <button
                      className="adm-btn-reject"
                      onClick={(e) => reject(e, row)}
                      disabled={acting === row.id}
                    >
                      Reject
                    </button>
                    <button
                      className="adm-btn-approve"
                      onClick={(e) => approve(e, row)}
                      disabled={acting === row.id}
                    >
                      {acting === row.id ? "..." : "Approve →"}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {toast && (
          <div className={`adm-toast ${toast.err ? "err" : ""}`}>
            {toast.msg}
          </div>
        )}
      </main>
    </>
  );
}