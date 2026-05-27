"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { uploadImage } from "../_lib/upload";

const STYLES = `
  .frm{padding:40px 32px 80px;max-width:880px;margin:0 auto}
  .frm-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px}
  .frm-back{
    font-size:12px;color:rgba(26,24,21,0.55);
    text-decoration:none;display:inline-flex;align-items:center;gap:6px;
    margin-bottom:16px;font-weight:500;letter-spacing:-0.1px;
  }
  .frm-back:hover{color:#dc2626}
  .frm-eyebrow{
    display:inline-flex;align-items:center;gap:10px;
    font-size:11px;font-weight:700;letter-spacing:.2em;
    text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px;
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
  .frm-label{
    font-size:11px;font-weight:600;color:rgba(26,24,21,0.65);
    letter-spacing:-0.1px;
  }
  .frm-label .req{color:#dc2626}
  .frm-input,.frm-textarea,.frm-select{
    padding:11px 14px;border:1px solid rgba(26,24,21,0.10);
    border-radius:10px;font-size:13px;background:#fafaf7;
    font-family:inherit;color:#1a1815;letter-spacing:-0.1px;
    transition:all .15s;
  }
  .frm-input:focus,.frm-textarea:focus,.frm-select:focus{
    outline:none;border-color:#dc2626;background:#fff;
  }
  .frm-textarea{resize:vertical;min-height:100px;font-family:inherit;line-height:1.5}
  .frm-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;margin-top:2px}

  .frm-cover-area{display:flex;gap:16px;align-items:flex-start}
  .frm-cover-preview{
    width:160px;height:160px;border-radius:14px;background:#e8dfd1;
    border:2px dashed rgba(26,24,21,0.15);
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;flex-shrink:0;
  }
  .frm-cover-preview img{width:100%;height:100%;object-fit:cover}
  .frm-cover-text{
    font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;
  }
  .frm-cover-actions{display:flex;flex-direction:column;gap:8px;flex:1}
  .frm-file-btn{
    background:transparent;border:1px solid rgba(26,24,21,0.15);
    color:#1a1815;padding:10px 16px;border-radius:100px;
    font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;
    letter-spacing:-0.1px;transition:all .15s;
  }
  .frm-file-btn:hover{border-color:#dc2626;color:#dc2626}
  .frm-file-btn:disabled{opacity:.5;cursor:not-allowed}
  .frm-clear-btn{
    background:transparent;border:none;color:rgba(26,24,21,0.55);
    font-size:11px;cursor:pointer;text-align:left;padding:4px 0;
    font-family:inherit;text-decoration:underline;
  }
  .frm-clear-btn:hover{color:#b8392f}

  .frm-actions{
    display:flex;justify-content:space-between;align-items:center;
    margin-top:24px;flex-wrap:wrap;gap:12px;
  }
  .frm-btn-primary{
    background:#dc2626;color:#fff;border:none;
    padding:14px 28px;border-radius:100px;
    font-size:13px;font-weight:600;cursor:pointer;
    letter-spacing:-0.2px;font-family:inherit;transition:all .15s;
  }
  .frm-btn-primary:hover:not(:disabled){background:#ef4444}
  .frm-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .frm-btn-delete{
    background:transparent;color:#b8392f;border:1px solid #b8392f;
    padding:10px 18px;border-radius:100px;
    font-size:12px;font-weight:500;cursor:pointer;
    font-family:inherit;transition:all .15s;
  }
  .frm-btn-delete:hover{background:#b8392f;color:#fff}

  .frm-toast{
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;
    font-size:13px;font-weight:500;
    box-shadow:0 8px 32px rgba(0,0,0,0.2);
    z-index:100;animation:toast-in .3s ease;
  }
  .frm-toast.err{background:#b8392f}
  @keyframes toast-in{
    from{opacity:0;transform:translate(-50%,20px)}
    to{opacity:1;transform:translate(-50%,0)}
  }
`;

interface City { id: string; name: string; }
interface Category { id: string; name: string; }

interface PlaceFormProps {
  locale: string;
  initialId?: string; // se presente → edit mode
}

export function PlaceForm({ locale, initialId }: PlaceFormProps) {
  const router = useRouter();
  const sb = createSupabaseBrowserClient();
  const isEdit = !!initialId;

  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    city_id: "",
    category_id: "",
    name: "",
    slug: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
    price_level: "",
    cover_image: "",
    popularity: "0",
    website_url: "",
    phone: "",
    instagram_handle: "",
    whatsapp_number: "",
    booking_url: "",
    booking_email: "",
  });

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  // Load cities + categories
  useEffect(() => {
    const loadOpts = async () => {
      const [cs, cats] = await Promise.all([
        sb.rpc("admin_list_cities"),
        sb.from("categories").select("id, name").order("name"),
      ]);
      setCities(((cs.data ?? []) as City[]).map((c) => ({ id: c.id, name: c.name })));
      setCategories((cats.data ?? []) as Category[]);
    };
    loadOpts();
  }, []);

  // Load existing place (edit mode)
  useEffect(() => {
    if (!initialId) return;
    const loadPlace = async () => {
      const { data, error } = await sb.rpc("admin_get_place", { p_id: initialId });
      setLoading(false);
      if (error || !(data as { ok?: boolean })?.ok) {
        showToast("Failed to load place", true);
        return;
      }
      const place = (data as { place: any }).place;
      setForm({
        city_id: place.city_id ?? "",
        category_id: place.category_id ?? "",
        name: place.name ?? "",
        slug: place.slug ?? "",
        description: place.description ?? "",
        address: place.address ?? "",
        lat: place.lat != null ? String(place.lat) : "",
        lng: place.lng != null ? String(place.lng) : "",
        price_level: place.price_level != null ? String(place.price_level) : "",
        cover_image: place.cover_image ?? "",
        popularity: place.popularity != null ? String(place.popularity) : "0",
        website_url: place.website_url ?? "",
        phone: place.phone ?? "",
        instagram_handle: place.instagram_handle ?? "",
        whatsapp_number: place.whatsapp_number ?? "",
        booking_url: place.booking_url ?? "",
        booking_email: place.booking_email ?? "",
      });
    };
    loadPlace();
  }, [initialId]);

  // Auto-slug from name
  const onNameChange = (name: string) => {
    setForm((f) => {
      const autoSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80);
      // Update slug only if it was empty or matches previous auto-slug
      const shouldUpdateSlug = !f.slug || f.slug === slugify(f.name);
      return { ...f, name, slug: shouldUpdateSlug ? autoSlug : f.slug };
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { url, error } = await uploadImage(file, "places");
    setUploading(false);
    if (!url || error) {
      showToast(`Upload failed: ${error}`, true);
      return;
    }
    setForm((f) => ({ ...f, cover_image: url }));
    showToast("Image uploaded");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) return showToast("Name is required", true);
    if (!form.city_id) return showToast("City is required", true);
    if (!form.slug.trim()) return showToast("Slug is required", true);

    setSaving(true);

    const { data, error } = await sb.rpc("admin_upsert_place", {
      p_id: initialId ?? null,
      p_city_id: form.city_id,
      p_category_id: form.category_id || null,
      p_name: form.name.trim(),
      p_slug: form.slug.trim(),
      p_description: form.description.trim() || null,
      p_address: form.address.trim() || null,
      p_lat: form.lat ? parseFloat(form.lat) : null,
      p_lng: form.lng ? parseFloat(form.lng) : null,
      p_price_level: form.price_level ? parseInt(form.price_level) : null,
      p_cover_image: form.cover_image || null,
      p_popularity: parseInt(form.popularity) || 0,
      p_website_url: form.website_url.trim() || null,
      p_phone: form.phone.trim() || null,
      p_instagram_handle: form.instagram_handle.trim().replace(/^@/, "") || null,
      p_whatsapp_number: form.whatsapp_number.trim() || null,
      p_booking_url: form.booking_url.trim() || null,
      p_booking_email: form.booking_email.trim() || null,
    });

    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      const msg = (data as { error?: string })?.error || error?.message || "unknown";
      showToast(`Save failed: ${msg}`, true);
      return;
    }

    showToast(isEdit ? "Place updated" : "Place created");
    setTimeout(() => router.push(`/${locale}/admin/places`), 800);
  };

  const handleDelete = async () => {
    if (!initialId) return;
    if (!confirm(`Delete "${form.name}"? This cannot be undone.`)) return;

    setSaving(true);
    const { data, error } = await sb.rpc("admin_delete_place", { p_id: initialId });
    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      showToast("Delete failed", true);
      return;
    }
    showToast("Place deleted");
    setTimeout(() => router.push(`/${locale}/admin/places`), 600);
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
          <div>
            <a href={`/${locale}/admin/places`} className="frm-back">← Back to places</a>
            <div className="frm-eyebrow">{isEdit ? "Edit place" : "New place"}</div>
            <h1 className="frm-h">
              {isEdit ? form.name || "Place" : <>A <span className="red">new pin.</span></>}
            </h1>
          </div>
        </div>

        <div className="frm-body">
          {/* COVER */}
          <div className="frm-card">
            <div className="frm-section">Cover image</div>
            <div className="frm-cover-area">
              <div className="frm-cover-preview">
                {form.cover_image ? (
                  <img src={form.cover_image} alt="" />
                ) : (
                  <div className="frm-cover-text">No image</div>
                )}
              </div>
              <div className="frm-cover-actions">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="frm-file-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : form.cover_image ? "Replace image" : "Upload image"}
                </button>
                {form.cover_image && (
                  <button
                    type="button"
                    className="frm-clear-btn"
                    onClick={() => setForm((f) => ({ ...f, cover_image: "" }))}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="frm-card">
            <div className="frm-section">Basics</div>
            <div className="frm-grid">
              <div className="frm-field full">
                <label className="frm-label">Name <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="e.g. Bar Basso"
                />
              </div>

              <div className="frm-field">
                <label className="frm-label">Slug <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="bar-basso"
                />
                <div className="frm-hint">URL-friendly, lowercase, no spaces.</div>
              </div>

              <div className="frm-field">
                <label className="frm-label">City <span className="req">*</span></label>
                <select
                  className="frm-select"
                  value={form.city_id}
                  onChange={(e) => setForm({ ...form, city_id: e.target.value })}
                >
                  <option value="">Select a city...</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="frm-field">
                <label className="frm-label">Category</label>
                <select
                  className="frm-select"
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="frm-field">
                <label className="frm-label">Price level</label>
                <select
                  className="frm-select"
                  value={form.price_level}
                  onChange={(e) => setForm({ ...form, price_level: e.target.value })}
                >
                  <option value="">Not specified</option>
                  <option value="1">€</option>
                  <option value="2">€€</option>
                  <option value="3">€€€</option>
                  <option value="4">€€€€</option>
                </select>
              </div>

              <div className="frm-field full">
                <label className="frm-label">Description</label>
                <textarea
                  className="frm-textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Editorial description. Short, sensorial. Stay below 400 chars."
                  rows={5}
                />
                <div className="frm-hint">{form.description.length} / 600</div>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="frm-card">
            <div className="frm-section">Location</div>
            <div className="frm-grid-3">
              <div className="frm-field" style={{ gridColumn: "1 / -1" }}>
                <label className="frm-label">Address</label>
                <input
                  className="frm-input"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Via..., Milano"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Latitude</label>
                <input
                  className="frm-input"
                  value={form.lat}
                  onChange={(e) => setForm({ ...form, lat: e.target.value })}
                  placeholder="45.4642"
                  type="number"
                  step="any"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Longitude</label>
                <input
                  className="frm-input"
                  value={form.lng}
                  onChange={(e) => setForm({ ...form, lng: e.target.value })}
                  placeholder="9.1900"
                  type="number"
                  step="any"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Popularity</label>
                <input
                  className="frm-input"
                  value={form.popularity}
                  onChange={(e) => setForm({ ...form, popularity: e.target.value })}
                  type="number"
                  min="0"
                  max="100"
                />
                <div className="frm-hint">0-100, for ranking</div>
              </div>
            </div>
            <div className="frm-hint" style={{ marginTop: 12 }}>
              Tip: get coordinates from Google Maps (right-click → "What's here?") or
              <a href="https://www.latlong.net/" target="_blank" style={{ color: "#dc2626", marginLeft: 4 }}>latlong.net</a>
            </div>
          </div>

          <div className="frm-card">
            <div className="frm-section">Contact & booking</div>
            <div className="frm-grid">
              <div className="frm-field">
                <label className="frm-label">Website</label>
                <input className="frm-input" type="url"
                  value={form.website_url}
                  onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  placeholder="https://..." />
              </div>
              <div className="frm-field">
                <label className="frm-label">Phone</label>
                <input className="frm-input" type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+39 02 ..." />
              </div>
              <div className="frm-field">
                <label className="frm-label">Instagram handle</label>
                <input className="frm-input"
                  value={form.instagram_handle}
                  onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
                  placeholder="barbasso_milano" />
                <div className="frm-hint">Without @ or URL. Just the username.</div>
              </div>
              <div className="frm-field">
                <label className="frm-label">WhatsApp number</label>
                <input className="frm-input" type="tel"
                  value={form.whatsapp_number}
                  onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
                  placeholder="+39..." />
                <div className="frm-hint">Format: +39xxxxxxxxxx</div>
              </div>
              <div className="frm-field full">
                <label className="frm-label">Booking URL</label>
                <input className="frm-input" type="url"
                  value={form.booking_url}
                  onChange={(e) => setForm({ ...form, booking_url: e.target.value })}
                  placeholder="https://thefork.it/... or restaurant own URL" />
              </div>
              <div className="frm-field full">
                <label className="frm-label">Booking email</label>
                <input className="frm-input" type="email"
                  value={form.booking_email}
                  onChange={(e) => setForm({ ...form, booking_email: e.target.value })}
                  placeholder="prenotazioni@..." />
                <div className="frm-hint">Fallback if no booking URL exists.</div>
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
            <button type="submit" className="frm-btn-primary" disabled={saving || uploading}>
              {saving ? "Saving..." : isEdit ? "Save changes" : "Create place"}
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