import { NextResponse } from "next/server";

const BACKEND_URL = process.env.ESCO_BACKEND_URL || "https://esco-backend.onrender.com";
const SECRET = process.env.INGESTION_WORKER_SECRET || "";

/**
 * Fire-and-forget trigger for the ingestion worker.
 *
 * Called by the CMS after enqueueing one or more jobs to skip the
 * up-to-60s cron delay. Authentication: relies on the worker secret
 * being server-side only — there's no risk of triggering unwanted
 * processing because the worker just drains the existing queue.
 *
 * If the backend is cold or slow, we still return 200 to keep the UI
 * snappy. The cron will catch up regardless.
 */
export async function POST() {
  if (!SECRET) {
    return NextResponse.json(
      { error: "worker secret not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${BACKEND_URL}/worker/process-next`, {
      method: "POST",
      headers: {
        "X-Worker-Secret": SECRET,
        "Content-Type": "application/json",
      },
      body: "{}",
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { triggered: false, status: res.status },
        { status: 200 },
      );
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ triggered: true, ...data });
  } catch (err: any) {
    return NextResponse.json(
      { triggered: false, error: err?.message || "trigger failed" },
      { status: 200 },
    );
  }
}