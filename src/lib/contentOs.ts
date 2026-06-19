"use client";

import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const INGESTION_BUCKET = "ingestion-uploads";

export type SourceType = "image" | "text" | "url_website" | "url_other";
export type DraftKind = "place" | "event" | "journey_candidate";
export type DraftStatus =
  | "draft" | "review" | "approved" | "published" | "rejected" | "merged";
export type JobStatus =
  | "pending" | "processing" | "extracted" | "failed" | "duplicate";

export interface EnqueueResult {
  job_id: string;
  source_id: string;
  deduped: boolean;
}

export interface DraftRow {
  id: string;
  job_id: string | null;
  kind: DraftKind;
  status: DraftStatus;
  city_id: string | null;
  category_id: string | null;
  name: string | null;
  slug: string | null;
  lat: number | null;
  lng: number | null;
  payload: Record<string, any>;
  quality_score: number | null;
  ai_notes: string | null;
  duplicate_of_place_id: string | null;
  duplicate_of_event_id: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  published_place_id: string | null;
  published_event_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobRow {
  id: string;
  source_id: string;
  status: JobStatus;
  attempts: number;
  error: string | null;
  processor_version: string | null;
  cost_cents: number | null;
  created_at: string;
  finished_at: string | null;
  fetched_content: Record<string, any> | null;
}

/* ─────────────────────────────────────── enqueue */

export async function enqueueText(
  text: string,
  cityId: string,
  categoryHintId?: string,
): Promise<EnqueueResult> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb.rpc("ingestion_enqueue", {
    p_raw_input: text,
    p_source_type: "text",
    p_city_id: cityId,
    p_category_hint_id: categoryHintId ?? null,
    p_metadata: {},
  });
  if (error) throw error;
  return (data as EnqueueResult[])[0];
}

export async function enqueueUrl(
  url: string,
  cityId: string,
  categoryHintId?: string,
): Promise<EnqueueResult> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb.rpc("ingestion_enqueue", {
    p_raw_input: url,
    p_source_type: "url_website",
    p_city_id: cityId,
    p_category_hint_id: categoryHintId ?? null,
    p_metadata: {},
  });
  if (error) throw error;
  return (data as EnqueueResult[])[0];
}

export async function uploadImageAndEnqueue(
  file: File,
  cityId: string,
  categoryHintId?: string,
): Promise<EnqueueResult> {
  const sb = createSupabaseBrowserClient();
  const path = buildStoragePath(file.name);

  const { error: upErr } = await sb.storage
    .from(INGESTION_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
  if (upErr) throw upErr;

  const { data, error } = await sb.rpc("ingestion_enqueue", {
    p_raw_input: path,
    p_source_type: "image",
    p_city_id: cityId,
    p_category_hint_id: categoryHintId ?? null,
    p_metadata: { filename: file.name, size: file.size, mime: file.type },
  });
  if (error) throw error;
  return (data as EnqueueResult[])[0];
}

/* ─────────────────────────────────────── drafts */

export async function listDrafts(filters: {
  status?: DraftStatus;
  cityId?: string;
  kind?: DraftKind;
  limit?: number;
} = {}): Promise<DraftRow[]> {
  const sb = createSupabaseBrowserClient();
  let q = sb.from("content_drafts").select("*").order("created_at", { ascending: false });
  if (filters.status) q = q.eq("status", filters.status);
  if (filters.cityId) q = q.eq("city_id", filters.cityId);
  if (filters.kind) q = q.eq("kind", filters.kind);
  q = q.limit(filters.limit ?? 50);
  const { data, error } = await q;
  if (error) throw error;
  return (data as DraftRow[]) ?? [];
}

export async function getDraft(id: string): Promise<DraftRow> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb.from("content_drafts").select("*").eq("id", id).single();
  if (error) throw error;
  return data as DraftRow;
}

export async function updateDraftPayload(id: string, payload: Record<string, any>): Promise<void> {
  const sb = createSupabaseBrowserClient();
  const { error } = await sb.rpc("update_draft_payload", {
    p_draft_id: id,
    p_payload: payload,
  });
  if (error) throw error;
}

export async function publishDraft(id: string): Promise<any> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb.rpc("publish_draft", { p_draft_id: id });
  if (error) throw error;
  return data;
}

export async function rejectDraft(id: string, reason?: string): Promise<void> {
  const sb = createSupabaseBrowserClient();
  const { error } = await sb.rpc("reject_draft", {
    p_draft_id: id,
    p_reason: reason ?? null,
  });
  if (error) throw error;
}

/* ─────────────────────────────────────── jobs (debug) */

export async function listJobs(limit = 50): Promise<JobRow[]> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb.from("ingestion_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as JobRow[]) ?? [];
}

/* ─────────────────────────────────────── helpers */

function buildStoragePath(filename: string): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const uuid = crypto.randomUUID();
  const ext = (filename.match(/\.[^.]+$/)?.[0] ?? "").toLowerCase();
  return `${y}/${m}/${d}/${uuid}${ext}`;
}

/* ─────────────────────────────────────── worker trigger */

/**
 * Tell the backend worker to start processing right now instead of waiting
 * for the next cron tick. Fire-and-forget — failures are silent because
 * the cron will catch up anyway.
 */
export async function triggerWorker(): Promise<void> {
  try {
    await fetch("/api/trigger-worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // silent fail — pg_cron will pick up the job within 60s anyway
  }
}

/* ─────────────────────────────────────── places lookup */

export interface PlaceLite {
  id: string;
  name: string;
  slug: string;
}

/**
 * Lightweight list of places for a city, used by the draft review picker
 * to link events to existing venues.
 */
export async function listPlacesByCity(cityId: string): Promise<PlaceLite[]> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb
    .from("places")
    .select("id, name, slug")
    .eq("city_id", cityId)
    .order("name")
    .limit(500);
  if (error) throw error;
  return (data as PlaceLite[]) ?? [];
}