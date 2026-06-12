"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,sans-serif;background:#f5f0e8;color:#1a1815;-webkit-font-smoothing:antialiased}
  .bi{padding:40px 32px 80px;max-width:1100px;margin:0 auto}
  .bi-top{margin-bottom:32px}
  .bi-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500}
  .bi-back:hover{color:#dc2626}
  .bi-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .bi-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .bi-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .bi-h .red{color:#dc2626}
  .bi-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic;max-width:600px;line-height:1.6}
  .bi-body{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px}
  @media(max-width:1024px){.bi-body{grid-template-columns:1fr}}
  .bi-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:24px}
  .bi-section{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.55);margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid rgba(26,24,21,0.05)}
  .bi-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
  .bi-label{font-size:11px;font-weight:600;color:rgba(26,24,21,0.65);letter-spacing:-0.1px}
  .bi-label .req{color:#dc2626}
  .bi-select,.bi-input{padding:11px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:13px;background:#fafaf7;font-family:inherit;color:#1a1815;outline:none;transition:all .15s}
  .bi-select:focus,.bi-input:focus{border-color:#dc2626;background:#fff}
  .bi-textarea{padding:12px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:12px;background:#fafaf7;font-family:Menlo,Monaco,'Courier New',monospace;color:#1a1815;outline:none;transition:all .15s;min-height:380px;resize:vertical;line-height:1.5}
  .bi-textarea:focus{border-color:#dc2626;background:#fff}
  .bi-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;margin-top:2px}
  .bi-actions{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
  .bi-btn-primary{background:#dc2626;color:#fff;border:none;padding:13px 24px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .15s}
  .bi-btn-primary:hover:not(:disabled){background:#ef4444}
  .bi-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .bi-btn-secondary{background:transparent;color:#1a1815;border:1px solid rgba(26,24,21,0.15);padding:13px 22px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .15s}
  .bi-btn-secondary:hover:not(:disabled){border-color:#1a1815}
  .bi-btn-secondary:disabled{opacity:.5;cursor:not-allowed}
  .bi-result{margin-top:24px;padding:18px;border-radius:14px;border:1px solid;font-size:13px;line-height:1.6}
  .bi-result.ok{background:rgba(92,138,71,0.08);border-color:rgba(92,138,71,0.25);color:#3d5e2f}
  .bi-result.warn{background:rgba(220,38,38,0.06);border-color:rgba(220,38,38,0.20);color:#b8392f}
  .bi-result h3{font-family:Georgia,serif;font-style:italic;font-size:18px;margin-bottom:8px}
  .bi-result-stats{display:flex;gap:24px;margin:12px 0;font-weight:500}
  .bi-result-stats span strong{font-family:Georgia,serif;font-style:italic;font-size:22px;display:block}
  .bi-result-errors{margin-top:14px;background:#fff;border-radius:8px;padding:12px;max-height:240px;overflow:auto}
  .bi-result-errors-row{font-family:Menlo,Monaco,monospace;font-size:11px;color:rgba(26,24,21,0.7);padding:6px 0;border-bottom:1px solid rgba(26,24,21,0.05)}
  .bi-result-errors-row:last-child{border-bottom:none}
  .bi-prompt-box{background:#fafaf7;border:1px solid rgba(26,24,21,0.08);border-radius:12px;padding:16px;font-family:Menlo,Monaco,monospace;font-size:11px;color:rgba(26,24,21,0.7);line-height:1.55;max-height:380px;overflow:auto;white-space:pre-wrap}
  .bi-copy{font-size:11px;font-weight:600;color:#dc2626;cursor:pointer;background:none;border:none;font-family:inherit;padding:0;margin-top:10px}
  .bi-copy:hover{text-decoration:underline}
  .bi-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100}
  .bi-toast.err{background:#b8392f}
`;

interface City {
  id: string;
  name: string;
  slug: string;
}

interface Place {
  id: string;
  name: string;
}

interface ImportResult {
  ok: boolean;
  created: number;
  skipped: number;
  errors: Array<{ index: number; slug?: string; error: string }>;
  created_ids: string[];
}

const SAMPLE_JSON = `[
  {
    "title": "DJ Set Marco Carola",
    "slug": "marco-carola-hi-2026-07-22",
    "description": "Una notte di techno con Marco Carola. Set di 4 ore al main floor.",
    "venue_name": "Hï Ibiza",
    "start_at": "2026-07-22 23:00:00+02",
    "end_at": "2026-07-23 06:00:00+02",
    "price_min": 60,
    "price_max": 120,
    "popularity": 85,
    "ticket_url": "https://hiibiza.com/event/marco-carola"
  },
  {
    "title": "Black Coffee All Night",
    "slug": "black-coffee-hi-2026-08-05",
    "description": "Black Coffee con set extended, dalle 23 alle 6. Sound deep house tribale.",
    "venue_name": "Hï Ibiza",
    "start_at": "2026-08-05 23:00:00+02",
    "end_at": "2026-08-06 06:00:00+02",
    "price_min": 70,
    "price_max": 130,
    "popularity": 88,
    "ticket_url": "https://hiibiza.com/event/black-coffee"
  }
]`;

const CHATGPT_PROMPT = `Sei un assistente di data-extraction per ESCO, una city-companion editoriale. Dato un input (line-up di un club, locandina, lista artisti, URL del calendario di un locale), genera un array JSON di eventi pronto per il bulk import.

OUTPUT: solo JSON array, niente markdown, niente spiegazioni.

CAMPI per ogni event:
- title (text, obbligatorio): nome evento concise. NO all-caps. Es. "DJ Set Marco Carola"
- slug (text, obbligatorio): lowercase, hyphenated, include la data. Es. "marco-carola-hi-2026-07-22"
- description (text, 80-200 parole): voce editoriale ESCO (Cereal/Monocle style). Sensoriale, asciutto, con almeno 1 tip pratico ("arriva alle 23 prima del cambio set"). NO "iconico", "esperienza unica", "imperdibile".
- venue_name (text, obbligatorio): "Hï Ibiza", "Bar Basso", ecc.
- start_at (timestamp ISO con timezone): es. "2026-07-22 23:00:00+02" (Italia/Spagna estate +02, inverno +01)
- end_at (timestamp ISO o null): per club, dalle 23 alle 6 successive. Per concerti, ~2-3 ore dopo.
- price_min (numero): 0 per free, intero in euro
- price_max (numero o null): null se prezzo unico
- popularity (0-100): DJ famoso mondiale 85-95, locale 50-70, niche 30-50
- ticket_url (URL o null): link biglietti
- website_url (URL o null)
- booking_email (email o null)

RULES:
1. Output ONLY JSON array. No \`\`\`json fence.
2. Apostrofi nelle descrizioni: escapali con \\' (es. "L\\'estate")
3. Se l'input ha 30 eventi, output deve avere 30 oggetti.
4. Date sempre ISO 8601 con timezone.
5. Niente "city_id", "place_id", "category_id" → li inietta il sistema dopo.

Pronto. Mandami il line-up.`;

export default function BulkImportEventsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [cities, setCities] = useState<City[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [cityId, setCityId] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  // Carica città
  useEffect(() => {
    (async () => {
      const { data } = await sb
        .from("cities")
        .select("id, name, slug")
        .eq("is_active", true)
        .order("name");
      if (data) setCities(data);
    })();
  }, []);

  // Carica places quando cambia città
  useEffect(() => {
    if (!cityId) {
      setPlaces([]);
      setPlaceId("");
      return;
    }
    (async () => {
      const { data } = await sb
        .from("places")
        .select("id, name")
        .eq("city_id", cityId)
        .order("name");
      if (data) setPlaces(data);
    })();
  }, [cityId]);

  const handleValidate = () => {
    if (!jsonInput.trim()) return showToast("JSON vuoto", true);
    try {
      const parsed = JSON.parse(sanitizeChatGptJson(jsonInput));
      if (!Array.isArray(parsed)) {
        showToast("Il JSON deve essere un array di eventi", true);
        return;
      }
      showToast(`✓ JSON valido (${parsed.length} eventi pronti)`);
    } catch (err: any) {
      showToast(`JSON non valido: ${err.message}`, true);
    }
  };

    // Pulisce markdown links e altri artifact di ChatGPT che rompono il JSON
function sanitizeChatGptJson(raw: string): string {
  let cleaned = raw.trim();

  // 1. Rimuove ```json ... ``` se presenti
  cleaned = cleaned.replace(/^```(?:json)?\s*/gm, "").replace(/```\s*$/gm, "");

  // 2. Sostituisce %22 (encoded quote) con virgolette vere
  cleaned = cleaned.replace(/%22/g, '"');
  cleaned = cleaned.replace(/%2C/g, ',');
  cleaned = cleaned.replace(/%3A/g, ':');

  // 3. Pattern aggressivo: rimuove TUTTI i markdown link wrappers [...](...)  
  // Estrae solo il primo URL dentro [ ] o tra ( ) e scarta il resto
  // Esempio: "field":"[url1","other":"x","field2](url2)":null
  // → spezziamo il pattern in modo iterativo
  
  // Step 3a: trova "...":"[URL"... e tronca al primo URL valido
  // Pattern: cattura "field":"[<URL>" e sostituisce con "field":"<URL>"
  cleaned = cleaned.replace(
    /"([a-z_]+)":\s*"\[(https?:\/\/[^"\s,\]]+)/g,
    '"$1":"$2"'
  );

  // Step 3b: rimuove residui ](...) dopo un campo "field]":null
  // Esempio: "booking_email](https://...)":null → "booking_email":null
  cleaned = cleaned.replace(
    /"([a-z_]+)\]\([^)]*\)":/g,
    '"$1":'
  );

  // Step 3c: rimuove qualsiasi pattern residuo ](url) ancora presente
  cleaned = cleaned.replace(/\]\([^)]*\)/g, '');

  // Step 3d: rimuove parentesi quadre orfane prima di "https://"
  cleaned = cleaned.replace(/"\[(https?:\/\/[^"]+)"/g, '"$1"');

  // 4. Pulizia finale: doppie virgole, doppi punti, spazi sbagliati
  cleaned = cleaned.replace(/,\s*,/g, ',');
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1'); // virgola prima di } o ]

  return cleaned;
}

  const handleImport = async (e: FormEvent) => {
    e.preventDefault();
    if (!cityId) return showToast("Seleziona una città", true);
    if (!jsonInput.trim()) return showToast("Incolla del JSON prima", true);

    let parsedEvents: any[];
    try {
        const sanitized = sanitizeChatGptJson(jsonInput);
        parsedEvents = JSON.parse(sanitized);
      if (!Array.isArray(parsedEvents)) throw new Error("non è un array");
    } catch (err: any) {
      return showToast(`JSON non valido: ${err.message}`, true);
    }

    // Inietta city_id e place_id (se selezionato)
    const enriched = parsedEvents.map((ev) => ({
      ...ev,
      city_id: cityId,
      place_id: placeId || ev.place_id || null,
    }));

    setLoading(true);
    setResult(null);

    const { data, error } = await sb.rpc("admin_bulk_import_events", {
      p_events: enriched,
    });

    setLoading(false);

    if (error) {
      showToast(`Errore: ${error.message}`, true);
      return;
    }

    const res = data as ImportResult;
    setResult(res);
    showToast(`✓ Creati ${res.created} eventi, ${res.skipped} skipped`);

    // Pulisci textarea se tutto OK e niente skip
    if (res.created > 0 && res.skipped === 0) {
      setJsonInput("");
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(CHATGPT_PROMPT);
    showToast("Prompt copiato");
  };

  const copyExample = () => {
    navigator.clipboard.writeText(SAMPLE_JSON);
    showToast("Esempio JSON copiato");
  };

  return (
    <>
      <style>{STYLES}</style>
      <main className="bi">
        <div className="bi-top">
          <Link href={`/${locale}/admin/events`} className="bi-back">← Back to events</Link>
          <div className="bi-eyebrow">Events · Bulk import</div>
          <h1 className="bi-h">
            Carica <span className="red">in batch.</span>
          </h1>
          <p className="bi-sub">
            Incolla un array JSON di eventi (anche 50 alla volta). 
            Seleziona la città e opzionalmente il place a cui collegarli. 
            ESCO valida tutto, mostra gli errori, importa quelli validi.
          </p>
        </div>

        <form onSubmit={handleImport} className="bi-body">
          {/* Colonna SX: form */}
          <div>
            <div className="bi-card">
              <div className="bi-section">Setup</div>

              <div className="bi-field">
                <label className="bi-label">City <span className="req">*</span></label>
                <select
                  className="bi-select"
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  required
                >
                  <option value="">— Seleziona città —</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="bi-hint">Tutti gli event nel JSON verranno assegnati a questa città.</div>
              </div>

              <div className="bi-field">
                <label className="bi-label">Linked place (optional)</label>
                <select
                  className="bi-select"
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  disabled={!cityId}
                >
                  <option value="">— Nessun place collegato —</option>
                  {places.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <div className="bi-hint">
                  Se selezionato, tutti gli event verranno collegati a questo place 
                  (apparirà in "Upcoming here" sulla pagina del place).
                </div>
              </div>
            </div>

            <div className="bi-card" style={{ marginTop: 16 }}>
              <div className="bi-section">JSON input</div>
              <textarea
                className="bi-textarea"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={SAMPLE_JSON}
              />

              <div className="bi-actions">
                <button type="button" className="bi-btn-secondary" onClick={handleValidate} disabled={loading}>
                  Validate
                </button>
                <button type="submit" className="bi-btn-primary" disabled={loading || !cityId}>
                  {loading ? "Importing..." : "Import all"}
                </button>
              </div>
            </div>

            {/* Risultato import */}
            {result && (
              <div className={`bi-result ${result.errors.length === 0 ? "ok" : "warn"}`}>
                <h3>
                  {result.errors.length === 0 ? "Import completato" : "Import parziale"}
                </h3>
                <div className="bi-result-stats">
                  <span><strong>{result.created}</strong>created</span>
                  <span><strong>{result.skipped}</strong>skipped</span>
                </div>
                {result.errors.length > 0 && (
                  <div className="bi-result-errors">
                    {result.errors.map((err, i) => (
                      <div key={i} className="bi-result-errors-row">
                        #{err.index} {err.slug ? `(${err.slug})` : ""} → {err.error}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Colonna DX: prompt ChatGPT */}
          <div>
            <div className="bi-card">
              <div className="bi-section">ChatGPT prompt</div>
              <p style={{ fontSize: 12, color: "rgba(26,24,21,0.65)", marginBottom: 12, lineHeight: 1.6 }}>
                Copia il prompt sotto, incollalo in <strong>GPT-4o</strong>, poi mandagli il line-up del club. 
                ChatGPT ti restituisce JSON pronto da incollare qui a sinistra.
              </p>
              <div className="bi-prompt-box">{CHATGPT_PROMPT}</div>
              <button type="button" className="bi-copy" onClick={copyPrompt}>
                Copy prompt →
              </button>
            </div>

            <div className="bi-card" style={{ marginTop: 16 }}>
              <div className="bi-section">JSON example</div>
              <p style={{ fontSize: 12, color: "rgba(26,24,21,0.65)", marginBottom: 12, lineHeight: 1.6 }}>
                Formato esatto dei singoli event. <code>city_id</code> e <code>place_id</code> sono iniettati 
                automaticamente dai campi sopra.
              </p>
              <div className="bi-prompt-box">{SAMPLE_JSON}</div>
              <button type="button" className="bi-copy" onClick={copyExample}>
                Copy example →
              </button>
            </div>
          </div>
        </form>

        {toast && <div className={`bi-toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
      </main>
    </>
  );
}