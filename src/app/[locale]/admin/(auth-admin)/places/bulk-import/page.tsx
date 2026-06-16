"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
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
  .bi-textarea{width: 100%;padding:12px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:12px;background:#fafaf7;font-family:Menlo,Monaco,'Courier New',monospace;color:#1a1815;outline:none;transition:all .15s;min-height:380px;resize:vertical;line-height:1.5}
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
  .bi-cat-table{margin-top:12px;font-size:11px;font-family:Menlo,monospace;color:rgba(26,24,21,0.65)}
  .bi-cat-table div{padding:3px 0;border-bottom:1px solid rgba(26,24,21,0.04)}
  .bi-cat-table strong{color:#1a1815;display:inline-block;min-width:100px}
`;

interface City {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
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
    "name": "Al Baretto al Baglioni",
    "slug": "al-baretto-al-baglioni-milano",
    "description": "Pranzo classico in Quadrilatero, atmosfera anni '70 mai uscita di moda. Crowd di avvocati, editori e signore di Brera. Chiedi il tavolo dietro vicino alla finestra: la vista è migliore e il rumore minore.",
    "address": "Via Senato 7, Milano",
    "lat": 45.4708,
    "lng": 9.2003,
    "price_level": 4,
    "popularity": 78,
    "website_url": "https://baglionihotels.com/baretto",
    "phone": "+390277076611",
    "instagram_handle": "albarettomilano"
  },
  {
    "name": "Pavé",
    "slug": "pave-milano",
    "description": "Croissant ai pistacchi di Bronte, caffè che vale la fila. Vai prima delle 10 o dopo le 11: in mezzo è un campo di battaglia di milanesi creativi che lavorano da remoto.",
    "address": "Via Felice Casati 27, Milano",
    "lat": 45.4810,
    "lng": 9.2050,
    "price_level": 2,
    "popularity": 82,
    "instagram_handle": "pavemilano"
  }
]`;

const CHATGPT_PROMPT = `Sei un assistente di data-extraction per ESCO, una city-companion editoriale. Dato un input (lista di ristoranti, bar, locali, attività), genera un array JSON di places pronto per il bulk import.

OUTPUT: solo JSON array, niente markdown, niente spiegazioni.

CAMPI per ogni place:
- name (text, obbligatorio): nome del locale, no all-caps. Es. "Al Baretto al Baglioni"
- slug (text, obbligatorio): lowercase, hyphenated, include la città. Es. "al-baretto-milano"
- description (text, 60-150 parole): voce editoriale ESCO (Cereal/Monocle style). Sensoriale, asciutto, con almeno 1 tip pratico ("chiedi il tavolo dietro", "arriva prima delle 19"). NO "iconico", "esperienza unica", "imperdibile", "must-try".
- address (text): indirizzo pieno con città
- lat, lng (numeri): coordinate approssimate
- price_level (1-4): 1 = economico, 2 = medio, 3 = medio-alto, 4 = alto
- popularity (0-100): famoso internazionale 85-95, conosciuto locale 60-80, nicchia 40-60
- website_url (URL o null)
- phone (testo o null, formato +39...)
- instagram_handle (testo senza @, o null)
- booking_url (URL o null)
- booking_email (email o null)

RULES:
1. Output ONLY JSON array. No markdown fence.
2. URL sempre come plain string "https://..." MAI come markdown link [text](url).
3. Niente "city_id" o "category_id" → li inietta il sistema dopo (selezioni nel form).
4. Se non sai un campo, mettilo null (senza virgolette).

Pronto. Mandami la lista.`;

// Pulisce markdown links e altri artifact di ChatGPT che rompono il JSON
function sanitizeChatGptJson(raw: string): string {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/gm, "").replace(/```\s*$/gm, "");
  cleaned = cleaned.replace(/%22/g, '"').replace(/%2C/g, ',').replace(/%3A/g, ':');
  cleaned = cleaned.replace(/"([a-z_]+)":\s*"\[(https?:\/\/[^"\s,\]]+)/g, '"$1":"$2"');
  cleaned = cleaned.replace(/"([a-z_]+)\]\([^)]*\)":/g, '"$1":');
  cleaned = cleaned.replace(/\]\([^)]*\)/g, '');
  cleaned = cleaned.replace(/"\[(https?:\/\/[^"]+)"/g, '"$1"');
  cleaned = cleaned.replace(/,\s*,/g, ',');
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
  return cleaned;
}

export default function BulkImportPlacesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cityId, setCityId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
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

  // Carica categorie (type = 'place')
  useEffect(() => {
    (async () => {
      const { data } = await sb
        .from("categories")
        .select("id, name, slug")
        .eq("type", "place")
        .order("name");
      if (data) setCategories(data);
    })();
  }, []);

  const handleValidate = () => {
    if (!jsonInput.trim()) return showToast("JSON vuoto", true);
    try {
      const parsed = JSON.parse(sanitizeChatGptJson(jsonInput));
      if (!Array.isArray(parsed)) {
        showToast("Il JSON deve essere un array di places", true);
        return;
      }
      showToast(`✓ JSON valido (${parsed.length} places pronti)`);
    } catch (err: any) {
      showToast(`JSON non valido: ${err.message}`, true);
    }
  };

  const handleImport = async (e: FormEvent) => {
    e.preventDefault();
    if (!cityId) return showToast("Seleziona una città", true);
    if (!categoryId) return showToast("Seleziona una categoria", true);
    if (!jsonInput.trim()) return showToast("Incolla del JSON prima", true);

    let parsedPlaces: any[];
    try {
      const sanitized = sanitizeChatGptJson(jsonInput);
      parsedPlaces = JSON.parse(sanitized);
      if (!Array.isArray(parsedPlaces)) throw new Error("non è un array");
    } catch (err: any) {
      return showToast(`JSON non valido: ${err.message}`, true);
    }

    // Inietta city_id e category_id
    const enriched = parsedPlaces.map((p) => ({
      ...p,
      city_id: cityId,
      category_id: categoryId,
    }));

    setLoading(true);
    setResult(null);

    const { data, error } = await sb.rpc("admin_bulk_import_places", {
      p_places: enriched,
    });

    setLoading(false);

    if (error) {
      showToast(`Errore: ${error.message}`, true);
      return;
    }

    const res = data as ImportResult;
    setResult(res);
    showToast(`✓ Creati ${res.created} places, ${res.skipped} skipped`);

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
          <Link href={`/${locale}/admin/places`} className="bi-back">← Back to places</Link>
          <div className="bi-eyebrow">Places · Bulk import</div>
          <h1 className="bi-h">
            Carica luoghi <span className="red">in batch.</span>
          </h1>
          <p className="bi-sub">
            Incolla un array JSON di places (anche 50 alla volta). 
            Seleziona la città e la categoria a cui assegnarli. 
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
                <div className="bi-hint">Tutti i places nel JSON verranno assegnati a questa città.</div>
              </div>

              <div className="bi-field">
                <label className="bi-label">Category <span className="req">*</span></label>
                <select
                  className="bi-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">— Seleziona categoria —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="bi-hint">
                  Tutti i places nel JSON verranno assegnati a questa categoria. 
                  Per importi misti (es. ristoranti + bar), fai 2 import separati.
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
                <button type="submit" className="bi-btn-primary" disabled={loading || !cityId || !categoryId}>
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
                Copia il prompt sotto, incollalo in <strong>GPT-4o</strong>, poi mandagli la lista di posti. 
                Per evitare errori JSON, considera di farti generare il JSON direttamente da Claude.
              </p>
              <div className="bi-prompt-box">{CHATGPT_PROMPT}</div>
              <button type="button" className="bi-copy" onClick={copyPrompt}>
                Copy prompt →
              </button>
            </div>

            <div className="bi-card" style={{ marginTop: 16 }}>
              <div className="bi-section">JSON example</div>
              <p style={{ fontSize: 12, color: "rgba(26,24,21,0.65)", marginBottom: 12, lineHeight: 1.6 }}>
                Formato esatto dei singoli place. <code>city_id</code> e <code>category_id</code> sono iniettati 
                automaticamente dai campi sopra.
              </p>
              <div className="bi-prompt-box">{SAMPLE_JSON}</div>
              <button type="button" className="bi-copy" onClick={copyExample}>
                Copy example →
              </button>
            </div>

            <div className="bi-card" style={{ marginTop: 16 }}>
              <div className="bi-section">Categories reference</div>
              <p style={{ fontSize: 12, color: "rgba(26,24,21,0.65)", marginBottom: 12, lineHeight: 1.6 }}>
                Le categorie disponibili per i places. Seleziona quella giusta nel form sopra prima di importare.
              </p>
              <div className="bi-cat-table">
                {categories.map((c) => (
                  <div key={c.id}>
                    <strong>{c.name}</strong> · {c.slug}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        {toast && <div className={`bi-toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
      </main>
    </>
  );
}