import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { toE164 } from "@/components/esco/phone2";

/* ============================================================
   POST /api/waitlist
   Unico punto da cui si scrive sulla waitlist.
   Il browser non ha piu' il permesso di fare insert: qui giriamo
   sul server, dove la service_role key e' al sicuro e dove i
   controlli non sono aggirabili aprendo i devtools.
   ============================================================ */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_PER_HOUR = 5;

/* Domini usa-e-getta piu' comuni. Non e' una lista esaustiva —
   e' il 90% del traffico spazzatura con un file da mantenere a mano. */
const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com",
  "temp-mail.org", "yopmail.com", "throwawaymail.com", "trashmail.com",
  "getnada.com", "sharklasers.com", "maildrop.cc", "dispostable.com",
  "fakeinbox.com", "mintemail.com", "moakt.com", "emailondeck.com",
  "spam4.me", "tmpmail.org", "mohmal.com", "inboxkitten.com",
]);

/* Gmail ignora i punti e tutto quello che segue il +.
   "u.ju.hix.u.l898@gmail.com" e "ujuhixul898@gmail.com" sono la
   stessa casella: senza questa normalizzazione un bot ti riempie
   la tabella con infiniti indirizzi "diversi". */
function canonicalEmail(raw: string): string {
  const email = raw.trim().toLowerCase();
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  if (domain === "gmail.com" || domain === "googlemail.com") {
    return `${local.split("+")[0].replace(/\./g, "")}@gmail.com`;
  }
  return `${local.split("+")[0]}@${domain}`;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* L'IP non viene salvato in chiaro: serve solo a contare i tentativi,
   e un hash basta a farlo senza tenersi un dato personale in piu'. */
function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "esco";
  return createHash("sha256").update(ip + salt).digest("hex").slice(0, 32);
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;                    // non configurato: si passa (utile in locale)
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function notify(contact: string, channel: string, source: string, total: number | null) {
  const url = process.env.WAITLIST_NOTIFY_WEBHOOK;
  if (!url) return;                            // spenta finche' non serve
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `Nuova iscrizione ESCO\n${contact} (${channel})\nfonte: ${source}${total !== null ? `\ntotale: ${total}` : ""}`,
      }),
    });
  } catch {
    /* una notifica persa non deve far fallire l'iscrizione */
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const mode = body.mode === "email" ? "email" : "phone";
  const value = typeof body.value === "string" ? body.value.trim() : "";
  const consent = body.consent === true;
  const locale = typeof body.locale === "string" ? body.locale.slice(0, 8) : null;
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : "unknown";
  const token = typeof body.token === "string" ? body.token : undefined;
  const trap = typeof body.trap === "string" ? body.trap : "";

  // honeypot: rispondiamo ok senza scrivere niente, cosi' il bot non capisce
  if (trap) return NextResponse.json({ ok: true });

  if (!consent) return NextResponse.json({ error: "consent" }, { status: 400 });

  const ip = clientIp(req);
  const ipHash = hashIp(ip);

  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json({ error: "robot" }, { status: 403 });
  }

  // validazione e normalizzazione
  let email: string | null = null;
  let emailCanonical: string | null = null;
  let phone: string | null = null;

  if (mode === "email") {
    if (!EMAIL_RE.test(value)) return NextResponse.json({ error: "invalid" }, { status: 400 });
    email = value.toLowerCase();
    emailCanonical = canonicalEmail(email);
    const domain = emailCanonical.split("@")[1];
    if (DISPOSABLE.has(domain)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  } else {
    phone = toE164(value);
    if (!phone) return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.error("waitlist: variabili Supabase mancanti");
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  // rate limit: cinque tentativi all'ora per IP
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await sb
    .from("signup_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gt("created_at", since);

  if ((count ?? 0) >= MAX_PER_HOUR) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  await sb.from("signup_attempts").insert({ ip_hash: ipHash, source });

  const { error } = await sb.from("waitlist").insert({
    email,
    email_canonical: emailCanonical,
    phone,
    source,
    locale,
    consent: true,
    consent_at: new Date().toISOString(),
    ip_hash: ipHash,
  });

  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "already" }, { status: 409 });
    console.error("waitlist insert", error);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  const { count: total } = await sb.from("waitlist").select("*", { count: "exact", head: true });
  await notify(phone ?? email ?? "—", mode, source, total ?? null);

  return NextResponse.json({ ok: true });
}