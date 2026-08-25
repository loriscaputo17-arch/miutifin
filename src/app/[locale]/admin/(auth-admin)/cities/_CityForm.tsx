"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .frm{padding:40px 32px 80px;max-width:880px;margin:0 auto}
  .frm-top{margin-bottom:32px}
  .frm-back{
    font-size:12px;color:rgba(26,24,21,0.55);
    text-decoration:none;display:inline-flex;align-items:center;gap:6px;
    margin-bottom:16px;font-weight:500;letter-spacing:-0.1px;
  }
  .frm-back:hover{color:#dc2626}
  .frm-eyebrow{
    display:inline-flex;align-items:center;gap:10px;
    font-size:11px;font-weight:700;letter-spacing:.2em;
    text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:0;
    margin-left: 1rem;
  }
  .frm-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .frm-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .frm-h .red{color:#dc2626}
  .frm-body{display:flex;flex-direction:column;gap:24px;margin-top:32px}
  .frm-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:28px}
  .frm-section{
    font-size:10px;font-weight:700;letter-spacing:.2em;
    text-transform:uppercase;color:rgba(26,24,21,0.55);
    margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid rgba(26,24,21,0.05);
  }
  .frm-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:640px){.frm-grid{grid-template-columns:1fr}}
  .frm-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
  @media(max-width:640px){.frm-grid-3{grid-template-columns:1fr}}
  .frm-field{display:flex;flex-direction:column;gap:6px}
  .frm-field.full{grid-column:1 / -1}
  .frm-label{font-size:11px;font-weight:600;color:rgba(26,24,21,0.65);letter-spacing:-0.1px}
  .frm-label .req{color:#dc2626}
  .frm-input,.frm-select{
    padding:11px 14px;border:1px solid rgba(26,24,21,0.10);
    border-radius:10px;font-size:13px;background:#fafaf7;
    font-family:inherit;color:#1a1815;letter-spacing:-0.1px;transition:all .15s;
  }
  .frm-input:focus,.frm-select:focus{outline:none;border-color:#dc2626;background:#fff}
  .frm-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;margin-top:2px}
  .frm-toggle-row{
    display:flex;align-items:center;gap:12px;padding:14px 0;
  }
  .frm-toggle{
    position:relative;width:44px;height:24px;border-radius:100px;
    background:rgba(26,24,21,0.15);cursor:pointer;transition:all .2s;
    border:none;padding:0;
  }
  .frm-toggle.on{background:#dc2626}
  .frm-toggle::after{
    content:'';position:absolute;top:2px;left:2px;
    width:20px;height:20px;border-radius:50%;background:#fff;
    transition:all .2s;
  }
  .frm-toggle.on::after{left:22px}
  .frm-toggle-label{font-size:13px;color:#1a1815;font-weight:500}
  .frm-toggle-hint{font-size:11px;color:rgba(26,24,21,0.55);font-style:italic;margin-top:4px}
  .frm-actions{
    display:flex;justify-content:space-between;align-items:center;
    margin-top:24px;flex-wrap:wrap;gap:12px;
  }
  .frm-btn-primary{
    background:#dc2626;color:#fff;border:none;padding:14px 28px;
    border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;
    letter-spacing:-0.2px;font-family:inherit;transition:all .15s;
  }
  .frm-btn-primary:hover:not(:disabled){background:#ef4444}
  .frm-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .frm-btn-delete{
    background:transparent;color:#b8392f;border:1px solid #b8392f;
    padding:10px 18px;border-radius:100px;font-size:12px;font-weight:500;
    cursor:pointer;font-family:inherit;transition:all .15s;
  }
  .frm-btn-delete:hover{background:#b8392f;color:#fff}
  .frm-toast{
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;
    font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);
    z-index:100;animation:toast-in .3s ease;
  }
  .frm-toast.err{background:#b8392f}
  @keyframes toast-in{
    from{opacity:0;transform:translate(-50%,20px)}
    to{opacity:1;transform:translate(-50%,0)}
  }
`;

interface CityFormProps {
  locale: string;
  initialId?: string;
}

export function CityForm({ locale, initialId }: CityFormProps) {
  const router = useRouter();
  const sb = createSupabaseBrowserClient();
  const isEdit = !!initialId;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    country: "",
    timezone: "",
    center_lat: "",
    center_lng: "",
    default_zoom: "12",
    is_active: false,
    coming_soon_order: "",
  });

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!initialId) return;
    const loadCity = async () => {
      const { data, error } = await sb.rpc("admin_get_city", { p_id: initialId });
      setLoading(false);
      if (error || !(data as { ok?: boolean })?.ok) {
        showToast("Failed to load city", true);
        return;
      }
      const city = (data as { city: any }).city;
      setForm({
        name: city.name ?? "",
        slug: city.slug ?? "",
        country: city.country ?? "",
        timezone: city.timezone ?? "",
        center_lat: city.center_lat != null ? String(city.center_lat) : "",
        center_lng: city.center_lng != null ? String(city.center_lng) : "",
        default_zoom: city.default_zoom != null ? String(city.default_zoom) : "12",
        is_active: city.is_active ?? false,
        coming_soon_order: city.coming_soon_order != null ? String(city.coming_soon_order) : "",
      });
    };
    loadCity();
  }, [initialId]);

  const onNameChange = (name: string) => {
    setForm((f) => {
      const autoSlug = slugify(name);
      const shouldUpdateSlug = !f.slug || f.slug === slugify(f.name);
      return { ...f, name, slug: shouldUpdateSlug ? autoSlug : f.slug };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return showToast("Name is required", true);
    if (!form.slug.trim()) return showToast("Slug is required", true);
    if (!form.country.trim()) return showToast("Country is required", true);
    if (!form.timezone.trim()) return showToast("Timezone is required", true);
    if (!form.center_lat || !form.center_lng) return showToast("Center coordinates are required", true);

    setSaving(true);

    const { data, error } = await sb.rpc("admin_upsert_city", {
      p_id: initialId ?? null,
      p_name: form.name.trim(),
      p_slug: form.slug.trim(),
      p_country: form.country.trim(),
      p_timezone: form.timezone.trim(),
      p_center_lat: parseFloat(form.center_lat),
      p_center_lng: parseFloat(form.center_lng),
      p_default_zoom: parseFloat(form.default_zoom) || 12,
      p_is_active: form.is_active,
      p_coming_soon_order: form.coming_soon_order ? parseInt(form.coming_soon_order) : null,
    });

    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      const msg = (data as { error?: string })?.error || error?.message || "unknown";
      showToast(`Save failed: ${msg}`, true);
      return;
    }

    showToast(isEdit ? "City updated" : "City created");
    setTimeout(() => router.push(`/${locale}/admin/cities`), 800);
  };

  const handleDelete = async () => {
    if (!initialId) return;
    if (!confirm(`Delete "${form.name}"? This cannot be undone.`)) return;

    setSaving(true);
    const { data, error } = await sb.rpc("admin_delete_city", { p_id: initialId });
    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      const errCode = (data as { error?: string })?.error;
      if (errCode === "has_content") {
        const d = data as { places?: number; events?: number; journeys?: number };
        showToast(`Cannot delete: ${d.places} places, ${d.events} events, ${d.journeys} journeys exist`, true);
      } else {
        showToast("Delete failed", true);
      }
      return;
    }
    showToast("City deleted");
    setTimeout(() => router.push(`/${locale}/admin/cities`), 600);
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
          <a href={`/${locale}/admin/cities`} className="frm-back">← Back to cities</a>
          <div className="frm-eyebrow">{isEdit ? "Edit city" : "New city"}</div>
          <h1 className="frm-h">
            {isEdit ? form.name || "City" : <>A <span className="red">new place.</span></>}
          </h1>
        </div>

        <div className="frm-body">
          {/* BASICS */}
          <div className="frm-card">
            <div className="frm-section">Basics</div>
            <div className="frm-grid">
              <div className="frm-field full">
                <label className="frm-label">Name <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="e.g. Milano"
                />
              </div>

              <div className="frm-field">
                <label className="frm-label">Slug <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="milano"
                />
                <div className="frm-hint">URL-friendly, lowercase.</div>
              </div>

              <div className="frm-field">
                <label className="frm-label">Country <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="Italy"
                />
              </div>

              <div className="frm-field">
                <label className="frm-label">Timezone <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.timezone}
                  onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  placeholder="Europe/Rome"
                />
                <div className="frm-hint">IANA format. E.g. Europe/Rome, Europe/Athens.</div>
              </div>
            </div>
          </div>

          {/* MAP CENTER */}
          <div className="frm-card">
            <div className="frm-section">Map</div>
            <div className="frm-grid-3">
              <div className="frm-field">
                <label className="frm-label">Center latitude <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.center_lat}
                  onChange={(e) => setForm({ ...form, center_lat: e.target.value })}
                  placeholder="45.4642"
                  type="number"
                  step="any"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Center longitude <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.center_lng}
                  onChange={(e) => setForm({ ...form, center_lng: e.target.value })}
                  placeholder="9.1900"
                  type="number"
                  step="any"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Default zoom</label>
                <input
                  className="frm-input"
                  value={form.default_zoom}
                  onChange={(e) => setForm({ ...form, default_zoom: e.target.value })}
                  placeholder="12"
                  type="number"
                  step="0.5"
                  min="1"
                  max="20"
                />
                <div className="frm-hint">10-14 typical for cities.</div>
              </div>
            </div>
            <div className="frm-hint" style={{ marginTop: 12 }}>
              Coordinates of city center. Used by the Explore map to position the camera.
            </div>
          </div>

          {/* STATUS */}
          <div className="frm-card">
            <div className="frm-section">Status</div>

            <div className="frm-toggle-row">
              <button
                type="button"
                className={`frm-toggle ${form.is_active ? "on" : ""}`}
                onClick={() => setForm({ ...form, is_active: !form.is_active })}
              />
              <div>
                <div className="frm-toggle-label">
                  {form.is_active ? "Live now" : "Coming soon"}
                </div>
                <div className="frm-toggle-hint">
                  {form.is_active
                    ? "City appears in the active list. Users can select it."
                    : "City shown as 'coming soon'. Not selectable yet."}
                </div>
              </div>
            </div>

            {!form.is_active && (
              <div className="frm-field" style={{ marginTop: 16 }}>
                <label className="frm-label">Coming soon order</label>
                <input
                  className="frm-input"
                  value={form.coming_soon_order}
                  onChange={(e) => setForm({ ...form, coming_soon_order: e.target.value })}
                  placeholder="1"
                  type="number"
                  min="0"
                  style={{ maxWidth: 200 }}
                />
                <div className="frm-hint">
                  Lower numbers appear first in the "coming soon" list. Leave empty for alphabetical.
                </div>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="frm-actions">
            {isEdit ? (
              <button type="button" className="frm-btn-delete" onClick={handleDelete} disabled={saving}>
                Delete
              </button>
            ) : <div />}
            <button type="submit" className="frm-btn-primary" disabled={saving}>
              {saving ? "Saving..." : isEdit ? "Save changes" : "Create city"}
            </button>
          </div>
        </div>
      </form>

      {toast && <div className={`frm-toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
    </>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}