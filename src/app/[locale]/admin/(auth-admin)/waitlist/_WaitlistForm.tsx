"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .frm{padding:40px 32px 80px;max-width:780px;margin:0 auto}
  .frm-top{margin-bottom:32px}
  .frm-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500;letter-spacing:-0.1px}
  .frm-back:hover{color:#dc2626}
  .frm-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .frm-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .frm-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .frm-h .red{color:#dc2626}
  .frm-body{display:flex;flex-direction:column;gap:24px;margin-top:32px}
  .frm-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:28px}
  .frm-section{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid rgba(26,24,21,0.05)}
  .frm-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:640px){.frm-grid{grid-template-columns:1fr}}
  .frm-field{display:flex;flex-direction:column;gap:6px}
  .frm-field.full{grid-column:1 / -1}
  .frm-label{font-size:11px;font-weight:600;color:rgba(26,24,21,0.65);letter-spacing:-0.1px}
  .frm-label .req{color:#dc2626}
  .frm-input,.frm-select{padding:11px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:13px;background:#fafaf7;font-family:inherit;color:#1a1815;letter-spacing:-0.1px;transition:all .15s}
  .frm-input:focus,.frm-select:focus{outline:none;border-color:#dc2626;background:#fff}
  .frm-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;margin-top:2px}
  .frm-meta{font-size:11px;color:rgba(26,24,21,0.55);font-style:italic;padding:14px;background:#fafaf7;border-radius:10px;margin-bottom:16px}
  .frm-actions{display:flex;justify-content:space-between;align-items:center;margin-top:24px;flex-wrap:wrap;gap:12px}
  .frm-btn-primary{background:#dc2626;color:#fff;border:none;padding:14px 28px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .15s}
  .frm-btn-primary:hover:not(:disabled){background:#ef4444}
  .frm-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .frm-btn-delete{background:transparent;color:#b8392f;border:1px solid #b8392f;padding:10px 18px;border-radius:100px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
  .frm-btn-delete:hover{background:#b8392f;color:#fff}
  .frm-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100;animation:toast-in .3s ease}
  .frm-toast.err{background:#b8392f}
  @keyframes toast-in{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
`;

interface WaitlistFormProps {
  locale: string;
  initialId?: string;
}

export function WaitlistForm({ locale, initialId }: WaitlistFormProps) {
  const router = useRouter();
  const sb = createSupabaseBrowserClient();
  const isEdit = !!initialId;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [approvedAt, setApprovedAt] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    full_name: "",
    phone: "",
    source: "",
    status: "pending",
  });

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!initialId) return;
    const loadEntry = async () => {
      const { data, error } = await sb.rpc("admin_get_waitlist_entry", { p_id: initialId });
      setLoading(false);
      if (error || !(data as { ok?: boolean })?.ok) {
        showToast("Failed to load entry", true);
        return;
      }
      const e = (data as { entry: any }).entry;
      setForm({
        email: e.email ?? "",
        full_name: e.full_name ?? "",
        phone: e.phone ?? "",
        source: e.source ?? "",
        status: e.status ?? "pending",
      });
      setCreatedAt(e.created_at);
      setApprovedAt(e.approved_at);
    };
    loadEntry();
  }, [initialId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.email.trim()) return showToast("Email is required", true);

    setSaving(true);

    const { data, error } = await sb.rpc("admin_upsert_waitlist_entry", {
      p_id: initialId ?? null,
      p_email: form.email.trim(),
      p_full_name: form.full_name.trim() || null,
      p_phone: form.phone.trim() || null,
      p_source: form.source.trim() || null,
      p_status: form.status,
    });

    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      const errCode = (data as { error?: string })?.error;
      const errMap: Record<string, string> = {
        email_required: "Email is required",
        invalid_email: "Invalid email format",
        email_exists: "This email is already in the waitlist",
        forbidden: "Not authorized",
        not_found: "Entry not found",
      };
      showToast(errMap[errCode || ""] || `Save failed: ${errCode || error?.message || "unknown"}`, true);
      return;
    }

    showToast(isEdit ? "Entry updated" : "Person added to waitlist");
    setTimeout(() => router.push(`/${locale}/admin`), 800);
  };

  const handleDelete = async () => {
    if (!initialId) return;
    if (!confirm(`Delete ${form.email}? This cannot be undone.`)) return;

    setSaving(true);
    const { data, error } = await sb.rpc("admin_delete_waitlist_entry", { p_id: initialId });
    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      showToast("Delete failed", true);
      return;
    }
    showToast("Entry deleted");
    setTimeout(() => router.push(`/${locale}/admin`), 600);
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center", fontStyle: "italic", color: "rgba(26,24,21,0.55)" }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <form className="frm" onSubmit={handleSubmit}>
        <div className="frm-top">
          <a href={`/${locale}/admin`} className="frm-back">← Back to waitlist</a>
          <div className="frm-eyebrow">{isEdit ? "Edit person" : "Add person"}</div>
          <h1 className="frm-h">
            {isEdit ? (form.full_name || form.email) : <>A <span className="red">new face.</span></>}
          </h1>
        </div>

        <div className="frm-body">
          {isEdit && createdAt && (
            <div className="frm-meta">
              Created {new Date(createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
              {approvedAt && ` · Approved ${new Date(approvedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`}
            </div>
          )}

          {/* CONTACT */}
          <div className="frm-card">
            <div className="frm-section">Contact</div>
            <div className="frm-grid">
              <div className="frm-field full">
                <label className="frm-label">Email <span className="req">*</span></label>
                <input
                  className="frm-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="hello@example.com"
                />
              </div>

              <div className="frm-field">
                <label className="frm-label">Full name</label>
                <input
                  className="frm-input"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  placeholder="Mario Rossi"
                />
              </div>

              <div className="frm-field">
                <label className="frm-label">Phone</label>
                <input
                  className="frm-input"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+39..."
                />
              </div>
            </div>
          </div>

          {/* META */}
          <div className="frm-card">
            <div className="frm-section">Origin</div>
            <div className="frm-grid">
              <div className="frm-field">
                <label className="frm-label">Source</label>
                <input
                  className="frm-input"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  placeholder="e.g. instagram, friend, website"
                />
                <div className="frm-hint">How did they find ESCO?</div>
              </div>

              <div className="frm-field">
                <label className="frm-label">Status</label>
                <select
                  className="frm-select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <div className="frm-hint">
                  {form.status === "approved" && "User can sign in. Note: this won't trigger the approval email."}
                  {form.status === "pending" && "Waiting for review."}
                  {form.status === "rejected" && "User cannot sign in."}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="frm-actions">
            {isEdit ? (
              <button type="button" className="frm-btn-delete" onClick={handleDelete} disabled={saving}>
                Delete
              </button>
            ) : <div />}
            <button type="submit" className="frm-btn-primary" disabled={saving}>
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add to waitlist"}
            </button>
          </div>
        </div>
      </form>

      {toast && <div className={`frm-toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
    </>
  );
}