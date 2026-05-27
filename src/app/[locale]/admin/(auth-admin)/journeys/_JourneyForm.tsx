"use client";

import { useState, useEffect, useRef, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { uploadImage } from "../_lib/upload";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { StepCard, JourneyStep } from "./_StepCard";
import { StepPicker } from "./_StepPicker";

const STYLES = `
  .frm{padding:40px 32px 80px;max-width:1000px;margin:0 auto}
  .frm-top{margin-bottom:32px}
  .frm-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500;letter-spacing:-0.1px}
  .frm-back:hover{color:#dc2626}
  .frm-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .frm-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .frm-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .frm-h .red{color:#dc2626}
  .frm-body{display:flex;flex-direction:column;gap:24px;margin-top:32px}
  .frm-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:28px}
  .frm-section{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid rgba(26,24,21,0.05);display:flex;justify-content:space-between;align-items:center}
  .frm-section-meta{font-family:Georgia,serif;font-style:italic;font-size:14px;color:rgba(26,24,21,0.78);text-transform:none;letter-spacing:-0.2px}
  .frm-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:640px){.frm-grid{grid-template-columns:1fr}}
  .frm-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
  @media(max-width:640px){.frm-grid-3{grid-template-columns:1fr}}
  .frm-field{display:flex;flex-direction:column;gap:6px}
  .frm-field.full{grid-column:1 / -1}
  .frm-label{font-size:11px;font-weight:600;color:rgba(26,24,21,0.65);letter-spacing:-0.1px}
  .frm-label .req{color:#dc2626}
  .frm-input,.frm-textarea,.frm-select{padding:11px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:13px;background:#fafaf7;font-family:inherit;color:#1a1815;letter-spacing:-0.1px;transition:all .15s}
  .frm-input:focus,.frm-textarea:focus,.frm-select:focus{outline:none;border-color:#dc2626;background:#fff}
  .frm-textarea{resize:vertical;min-height:100px;font-family:inherit;line-height:1.5}
  .frm-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;margin-top:2px}
  .frm-cover-area{display:flex;gap:16px;align-items:flex-start}
  .frm-cover-preview{width:180px;height:140px;border-radius:14px;background:#e8dfd1;border:2px dashed rgba(26,24,21,0.15);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
  .frm-cover-preview img{width:100%;height:100%;object-fit:cover}
  .frm-cover-text{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic}
  .frm-cover-actions{display:flex;flex-direction:column;gap:8px;flex:1}
  .frm-file-btn{background:transparent;border:1px solid rgba(26,24,21,0.15);color:#1a1815;padding:10px 16px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:-0.1px;transition:all .15s}
  .frm-file-btn:hover{border-color:#dc2626;color:#dc2626}
  .frm-file-btn:disabled{opacity:.5;cursor:not-allowed}
  .frm-clear-btn{background:transparent;border:none;color:rgba(26,24,21,0.55);font-size:11px;cursor:pointer;text-align:left;padding:4px 0;font-family:inherit;text-decoration:underline}
  .frm-clear-btn:hover{color:#b8392f}
  .frm-tags{display:flex;flex-wrap:wrap;gap:6px;padding:6px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;background:#fafaf7;min-height:46px;align-items:center}
  .frm-tag{background:rgba(220,38,38,0.10);color:#dc2626;padding:5px 12px;border-radius:100px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:6px;letter-spacing:-0.1px}
  .frm-tag-remove{background:transparent;border:none;color:#dc2626;font-size:14px;cursor:pointer;padding:0;line-height:1}
  .frm-tag-input{border:none;background:transparent;font-size:13px;outline:none;flex:1;min-width:120px;font-family:inherit;padding:4px 8px;color:#1a1815}
  .steps-list{display:flex;flex-direction:column;gap:12px;margin-bottom:18px}
  .steps-empty{padding:40px 20px;text-align:center;color:rgba(26,24,21,0.42);font-style:italic;font-size:13px;background:#fafaf7;border-radius:14px;border:1px dashed rgba(26,24,21,0.15)}
  .frm-actions{display:flex;justify-content:space-between;align-items:center;margin-top:24px;flex-wrap:wrap;gap:12px}
  .frm-btn-primary{background:#dc2626;color:#fff;border:none;padding:14px 28px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .15s}
  .frm-btn-primary:hover:not(:disabled){background:#ef4444}
  .frm-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .frm-btn-delete{background:transparent;color:#b8392f;border:1px solid #b8392f;padding:10px 18px;border-radius:100px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
  .frm-btn-delete:hover{background:#b8392f;color:#fff}
  .frm-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100;animation:toast-in .3s ease}
  .frm-toast.err{background:#b8392f}
  @keyframes toast-in{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
  .calc-row{display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap}
  .calc-btn{background:transparent;border:1px solid rgba(26,24,21,0.15);padding:8px 14px;border-radius:100px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:-0.1px;color:#1a1815;transition:all .15s}
  .calc-btn:hover{border-color:#dc2626;color:#dc2626}
`;

interface City { id: string; name: string; }

interface JourneyFormProps {
  locale: string;
  initialId?: string;
}

export function JourneyForm({ locale, initialId }: JourneyFormProps) {
  const router = useRouter();
  const sb = createSupabaseBrowserClient();
  const isEdit = !!initialId;

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState({
    city_id: "",
    title: "",
    slug: "",
    headline: "",
    subtitle: "",
    description: "",
    cover_image: "",
    duration_min: "",
    distance_m: "",
    vibe_tags: [] as string[],
    author_kind: "curated",
    visibility: "public",
  });

  const [steps, setSteps] = useState<(JourneyStep & { _key: string })[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    sb.rpc("admin_list_cities").then(({ data }) => {
      setCities(((data ?? []) as City[]).map((c) => ({ id: c.id, name: c.name })));
    });
  }, []);

  useEffect(() => {
    if (!initialId) return;
    const loadJourney = async () => {
      const { data, error } = await sb.rpc("admin_get_journey", { p_id: initialId });
      setLoading(false);
      if (error || !(data as { ok?: boolean })?.ok) {
        showToast("Failed to load journey", true);
        return;
      }
      const j = (data as { journey: any }).journey;
      const sList = (data as { steps: any[] }).steps;

      setForm({
        city_id: j.city_id ?? "",
        title: j.title ?? "",
        slug: j.slug ?? "",
        headline: j.headline ?? "",
        subtitle: j.subtitle ?? "",
        description: j.description ?? "",
        cover_image: j.cover_image ?? "",
        duration_min: j.duration_min != null ? String(j.duration_min) : "",
        distance_m: j.distance_m != null ? String(j.distance_m) : "",
        vibe_tags: j.vibe_tags ?? [],
        author_kind: j.author_kind ?? "curated",
        visibility: j.visibility ?? "public",
      });

      setSteps(
        sList.map((s) => ({
          _key: `${s.entity_type}-${s.entity_id}-${s.step_order}`,
          entity_type: s.entity_type,
          entity_id: s.entity_id,
          entity_name: s.entity_name ?? "—",
          entity_cover: s.entity_cover ?? null,
          entity_address: s.entity_address ?? null,
          entity_lat: s.entity_lat,
          entity_lng: s.entity_lng,
          note: s.note ?? "",
          suggested_time: s.suggested_time ?? "",
          duration_min: s.duration_min != null ? String(s.duration_min) : "",
          next_transit_mode: s.next_transit_mode ?? "",
          next_duration_min: s.next_duration_min != null ? String(s.next_duration_min) : "",
          next_note: s.next_note ?? "",
        }))
      );
    };
    loadJourney();
  }, [initialId]);

  const onTitleChange = (title: string) => {
    setForm((f) => {
      const autoSlug = slugify(title);
      const shouldUpdate = !f.slug || f.slug === slugify(f.title);
      return { ...f, title, slug: shouldUpdate ? autoSlug : f.slug };
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { url, error } = await uploadImage(file, "journeys");
    setUploading(false);
    if (!url || error) {
      showToast(`Upload failed: ${error}`, true);
      return;
    }
    setForm((f) => ({ ...f, cover_image: url }));
    showToast("Image uploaded");
  };

  // Step management
  const addStep = (entity: { entity_type: "place" | "event"; entity_id: string; name: string; cover_image: string | null; address: string | null }) => {
    setSteps((prev) => [
      ...prev,
      {
        _key: `${entity.entity_type}-${entity.entity_id}-${Date.now()}`,
        entity_type: entity.entity_type,
        entity_id: entity.entity_id,
        entity_name: entity.name,
        entity_cover: entity.cover_image,
        entity_address: entity.address,
        note: "",
        suggested_time: "",
        duration_min: "60",
        next_transit_mode: "walk",
        next_duration_min: "10",
        next_note: "",
      },
    ]);
  };

  const updateStep = (idx: number, updates: Partial<JourneyStep>) => {
    setSteps((prev) => prev.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  };

  const removeStep = (idx: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== idx));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSteps((prev) => {
      const oldIndex = prev.findIndex((s) => s._key === active.id);
      const newIndex = prev.findIndex((s) => s._key === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // Calc durations totals from steps
  const computedDuration = useMemo(() => {
    let total = 0;
    steps.forEach((s, i) => {
      total += parseInt(s.duration_min) || 0;
      if (i < steps.length - 1) total += parseInt(s.next_duration_min) || 0;
    });
    return total;
  }, [steps]);

  // Calc distance (approx, straight-line haversine sum)
  const computedDistance = useMemo(() => {
    let total = 0;
    for (let i = 0; i < steps.length - 1; i++) {
      const a = steps[i];
      const b = steps[i + 1];
      if (a.entity_lat && a.entity_lng && b.entity_lat && b.entity_lng) {
        total += haversine(Number(a.entity_lat), Number(a.entity_lng), Number(b.entity_lat), Number(b.entity_lng));
      }
    }
    return Math.round(total);
  }, [steps]);

  // Tags input
  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (!t || form.vibe_tags.includes(t)) return;
    setForm((f) => ({ ...f, vibe_tags: [...f.vibe_tags, t] }));
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, vibe_tags: f.vibe_tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) return showToast("Title is required", true);
    if (!form.city_id) return showToast("City is required", true);
    if (!form.slug.trim()) return showToast("Slug is required", true);
    if (steps.length < 1) return showToast("Add at least 1 step", true);

    setSaving(true);

    const stepsPayload = steps.map((s) => ({
      entity_type: s.entity_type,
      entity_id: s.entity_id,
      note: s.note,
      suggested_time: s.suggested_time,
      duration_min: s.duration_min,
      next_transit_mode: s.next_transit_mode,
      next_duration_min: s.next_duration_min,
      next_note: s.next_note,
    }));

    const { data, error } = await sb.rpc("admin_upsert_journey", {
      p_id: initialId ?? null,
      p_city_id: form.city_id,
      p_title: form.title.trim(),
      p_slug: form.slug.trim(),
      p_headline: form.headline.trim() || null,
      p_subtitle: form.subtitle.trim() || null,
      p_description: form.description.trim() || null,
      p_cover_image: form.cover_image || null,
      p_duration_min: form.duration_min ? parseInt(form.duration_min) : null,
      p_distance_m: form.distance_m ? parseInt(form.distance_m) : null,
      p_vibe_tags: form.vibe_tags.length > 0 ? form.vibe_tags : null,
      p_author_kind: form.author_kind,
      p_visibility: form.visibility,
      p_steps: stepsPayload,
    });

    setSaving(false);

    if (error || !(data as { ok?: boolean })?.ok) {
      const msg = (data as { error?: string })?.error || error?.message || "unknown";
      showToast(`Save failed: ${msg}`, true);
      return;
    }

    showToast(isEdit ? "Journey updated" : "Journey created");
    setTimeout(() => router.push(`/${locale}/admin/journeys`), 800);
  };

  const handleDelete = async () => {
    if (!initialId) return;
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return;
    setSaving(true);
    const { data, error } = await sb.rpc("admin_delete_journey", { p_id: initialId });
    setSaving(false);
    if (error || !(data as { ok?: boolean })?.ok) {
      showToast("Delete failed", true);
      return;
    }
    showToast("Journey deleted");
    setTimeout(() => router.push(`/${locale}/admin/journeys`), 600);
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
          <a href={`/${locale}/admin/journeys`} className="frm-back">← Back to journeys</a>
          <div className="frm-eyebrow">{isEdit ? "Edit journey" : "New journey"}</div>
          <h1 className="frm-h">
            {isEdit ? form.title || "Journey" : <>A <span className="red">new route.</span></>}
          </h1>
        </div>

        <div className="frm-body">
          {/* COVER */}
          <div className="frm-card">
            <div className="frm-section"><span>Cover image</span></div>
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

          {/* BASICS */}
          <div className="frm-card">
            <div className="frm-section"><span>Basics</span></div>
            <div className="frm-grid">
              <div className="frm-field full">
                <label className="frm-label">Title <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="e.g. Slow Sunday in Brera"
                />
              </div>

              <div className="frm-field full">
                <label className="frm-label">Headline (editorial)</label>
                <input
                  className="frm-input"
                  value={form.headline}
                  onChange={(e) => setForm({ ...form, headline: e.target.value })}
                  placeholder="e.g. Where the light stays longest"
                  maxLength={120}
                />
                <div className="frm-hint">A magazine-style evocative line. {form.headline.length}/120</div>
              </div>

              <div className="frm-field full">
                <label className="frm-label">Subtitle</label>
                <input
                  className="frm-input"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="One more sensorial line"
                  maxLength={100}
                />
              </div>

              <div className="frm-field">
                <label className="frm-label">Slug <span className="req">*</span></label>
                <input
                  className="frm-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
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

              <div className="frm-field full">
                <label className="frm-label">Description</label>
                <textarea
                  className="frm-textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Editorial opening paragraph. 80-600 chars."
                  rows={5}
                />
                <div className="frm-hint">{form.description.length} / 600</div>
              </div>
            </div>
          </div>

          {/* VIBE TAGS */}
          <div className="frm-card">
            <div className="frm-section"><span>Vibe tags</span></div>
            <div className="frm-tags">
              {form.vibe_tags.map((tag) => (
                <span key={tag} className="frm-tag">
                  {tag}
                  <button type="button" className="frm-tag-remove" onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
              <input
                type="text"
                className="frm-tag-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag(tagInput);
                  } else if (e.key === "Backspace" && !tagInput && form.vibe_tags.length > 0) {
                    removeTag(form.vibe_tags[form.vibe_tags.length - 1]);
                  }
                }}
                placeholder={form.vibe_tags.length === 0 ? "Type a tag and press Enter..." : ""}
              />
            </div>
            <div className="frm-hint">2-6 lowercase tags. E.g. slow, cultural, brera, sunday, walkable</div>
          </div>

          {/* STEPS */}
          <div className="frm-card">
            <div className="frm-section">
              <span>The path · {steps.length} step{steps.length !== 1 ? "s" : ""}</span>
              {steps.length > 0 && (
                <span className="frm-section-meta">
                  ~{Math.round(computedDuration / 60)}h · {computedDistance < 1000 ? `${computedDistance}m` : `${(computedDistance / 1000).toFixed(1)}km`}
                </span>
              )}
            </div>

            {steps.length === 0 ? (
              <div className="steps-empty">No steps yet. Search and add the first place or event below.</div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={steps.map((s) => s._key)} strategy={verticalListSortingStrategy}>
                  <div className="steps-list">
                    {steps.map((s, i) => (
                      <StepCard
                        key={s._key}
                        id={s._key}
                        step={s}
                        index={i}
                        isLast={i === steps.length - 1}
                        onChange={(updates) => updateStep(i, updates)}
                        onRemove={() => removeStep(i)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            <StepPicker cityId={form.city_id} onPick={addStep} />
          </div>

          {/* META */}
          <div className="frm-card">
            <div className="frm-section"><span>Meta</span></div>
            <div className="frm-grid-3">
              <div className="frm-field">
                <label className="frm-label">Duration (min)</label>
                <input
                  className="frm-input"
                  value={form.duration_min}
                  onChange={(e) => setForm({ ...form, duration_min: e.target.value })}
                  type="number"
                  min="0"
                  placeholder="Computed below"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Distance (m)</label>
                <input
                  className="frm-input"
                  value={form.distance_m}
                  onChange={(e) => setForm({ ...form, distance_m: e.target.value })}
                  type="number"
                  min="0"
                  placeholder="Computed below"
                />
              </div>
              <div className="frm-field">
                <label className="frm-label">Author kind</label>
                <select
                  className="frm-select"
                  value={form.author_kind}
                  onChange={(e) => setForm({ ...form, author_kind: e.target.value })}
                >
                  <option value="curated">Curated by ESCO</option>
                  <option value="ai">AI composed</option>
                  <option value="member">By a member</option>
                </select>
              </div>
              <div className="frm-field">
                <label className="frm-label">Visibility</label>
                <select
                  className="frm-select"
                  value={form.visibility}
                  onChange={(e) => setForm({ ...form, visibility: e.target.value })}
                >
                  <option value="public">Public</option>
                  <option value="draft">Draft</option>
                </select>
                <div className="frm-hint">Draft = not in feed.</div>
              </div>
            </div>
            {steps.length > 0 && (
              <div className="calc-row">
                <button
                  type="button"
                  className="calc-btn"
                  onClick={() => setForm((f) => ({ ...f, duration_min: String(computedDuration) }))}
                >
                  Use computed: {computedDuration}m
                </button>
                <button
                  type="button"
                  className="calc-btn"
                  onClick={() => setForm((f) => ({ ...f, distance_m: String(computedDistance) }))}
                >
                  Use computed: {computedDistance}m
                </button>
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
            <button type="submit" className="frm-btn-primary" disabled={saving || uploading}>
              {saving ? "Saving..." : isEdit ? "Save changes" : "Create journey"}
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

// Haversine distance (meters)
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}