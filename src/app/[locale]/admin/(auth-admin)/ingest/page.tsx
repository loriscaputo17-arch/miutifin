"use client";

import { useState, useEffect, FormEvent, ChangeEvent, DragEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import {
  enqueueText,
  enqueueUrl,
  uploadImageAndEnqueue,
  triggerWorker,
} from "@/lib/contentOs";

const STYLES = `
  .ing{padding:40px 32px 80px;max-width:880px;margin:0 auto}
  .ing-top{margin-bottom:32px}
  .ing-back{font-size:12px;color:rgba(26,24,21,0.55);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px;font-weight:500;letter-spacing:-0.1px}
  .ing-back:hover{color:#dc2626}
  .ing-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:12px}
  .ing-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .ing-h{font-family:Georgia,serif;font-style:italic;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#1a1815}
  .ing-h .red{color:#dc2626}
  .ing-sub{font-size:14px;color:rgba(26,24,21,0.55);margin-top:8px;font-style:italic;max-width:560px;line-height:1.55}
  .ing-tabs{display:flex;gap:8px;margin-top:32px;margin-bottom:20px;flex-wrap:wrap}
  .ing-tab{background:transparent;border:1px solid rgba(26,24,21,0.10);padding:11px 22px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;color:#1a1815;letter-spacing:-0.1px;transition:all .15s}
  .ing-tab:hover{border-color:#dc2626;color:#dc2626}
  .ing-tab.active{background:#dc2626;color:#fff;border-color:#dc2626}
  .ing-card{background:#fff;border:1px solid rgba(26,24,21,0.08);border-radius:18px;padding:28px}
  .ing-grid{display:grid;grid-template-columns:1fr;gap:20px}
  .ing-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  @media(max-width:640px){.ing-row{grid-template-columns:1fr}}
  .ing-field{display:flex;flex-direction:column;gap:6px}
  .ing-label{font-size:11px;font-weight:600;color:rgba(26,24,21,0.65);letter-spacing:-0.1px}
  .ing-label .req{color:#dc2626}
  .ing-input,.ing-select,.ing-textarea{padding:11px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:13px;background:#fafaf7;font-family:inherit;color:#1a1815;letter-spacing:-0.1px;transition:all .15s;width:100%}
  .ing-input:focus,.ing-select:focus,.ing-textarea:focus{outline:none;border-color:#dc2626;background:#fff}
  .ing-textarea{min-height:220px;resize:vertical;line-height:1.5;font-family:Menlo,Monaco,'Courier New',monospace}
  .ing-drop{display:block;border:2px dashed rgba(26,24,21,0.15);border-radius:14px;padding:48px 20px;text-align:center;cursor:pointer;transition:all .15s;background:#fafaf7}
  .ing-drop:hover,.ing-drop.over{border-color:#dc2626;background:rgba(220,38,38,0.03)}
  .ing-drop-icon{font-family:Georgia,serif;font-style:italic;font-size:36px;color:rgba(26,24,21,0.25);margin-bottom:8px}
  .ing-drop-text{font-size:14px;color:rgba(26,24,21,0.65);margin-bottom:4px}
  .ing-drop-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic}
  .ing-hint{font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;margin-top:2px;line-height:1.55}
  .ing-preview-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}
  .ing-preview-item{position:relative;background:#fafaf7;border:1px solid rgba(26,24,21,0.08);border-radius:10px;overflow:hidden;aspect-ratio:1}
  .ing-preview-item img{display:block;width:100%;height:100%;object-fit:cover}
  .ing-preview-remove{position:absolute;top:6px;right:6px;background:rgba(26,24,21,0.85);color:#fff;border:none;width:24px;height:24px;border-radius:50%;font-size:14px;cursor:pointer;line-height:1;font-family:inherit;display:flex;align-items:center;justify-content:center}
  .ing-preview-remove:hover{background:#b8392f}
  .ing-preview-add{display:flex;align-items:center;justify-content:center;background:#fafaf7;border:2px dashed rgba(26,24,21,0.15);border-radius:10px;aspect-ratio:1;cursor:pointer;color:rgba(26,24,21,0.42);font-family:Georgia,serif;font-style:italic;font-size:28px;transition:all .15s}
  .ing-preview-add:hover{border-color:#dc2626;color:#dc2626}
  .ing-count{font-size:11px;font-weight:600;color:#dc2626;letter-spacing:.05em;text-transform:uppercase;margin-top:8px}
  .ing-paste{margin-top:10px;font-size:11px;color:rgba(26,24,21,0.42);font-style:italic;display:flex;align-items:center;gap:6px}
  .ing-paste kbd{font-family:Menlo,monospace;font-style:normal;background:#fafaf7;border:1px solid rgba(26,24,21,0.12);border-bottom-width:2px;border-radius:5px;padding:1px 5px;font-size:10px;color:#1a1815}
  .ing-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:24px;flex-wrap:wrap}
  .ing-btn-primary{background:#dc2626;color:#fff;border:none;padding:14px 28px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:-0.2px;font-family:inherit;transition:all .15s}
  .ing-btn-primary:hover:not(:disabled){background:#ef4444}
  .ing-btn-primary:disabled{opacity:.5;cursor:not-allowed}
  .ing-progress{margin-top:24px;padding:16px 20px;background:rgba(220,38,38,0.04);border:1px solid rgba(220,38,38,0.15);border-radius:14px}
  .ing-progress-text{font-size:12px;color:#1a1815;font-weight:500;margin-bottom:8px;letter-spacing:-0.1px}
  .ing-progress-bar{height:6px;background:rgba(26,24,21,0.08);border-radius:100px;overflow:hidden}
  .ing-progress-fill{height:100%;background:#dc2626;border-radius:100px;transition:width .3s}
  .ing-success{margin-top:20px;padding:18px;background:rgba(92,138,71,0.08);border:1px solid rgba(92,138,71,0.25);border-radius:14px;font-size:13px;line-height:1.6;color:#3d5e2f}
  .ing-success h3{font-family:Georgia,serif;font-style:italic;font-size:18px;margin-bottom:6px;color:#1a1815}
  .ing-success a{color:#dc2626;font-weight:600;text-decoration:none}
  .ing-success a:hover{text-decoration:underline}
  .ing-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1815;color:#fff;padding:14px 24px;border-radius:100px;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:100;animation:toast-in .3s ease}
  .ing-toast.err{background:#b8392f}
  @keyframes toast-in{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
`;

interface City { id: string; name: string; slug: string; }
interface Cat { id: string; name: string; type: string; }
type Mode = "image" | "text" | "url";

const MAX_FILES = 30;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const RICORDA_CITTA = "esco.ingest.city";
const RICORDA_CAT = "esco.ingest.cat";

export default function IngestPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const sb = createSupabaseBrowserClient();

  const [mode, setMode] = useState<Mode>("image");
  const [cities, setCities] = useState<City[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [result, setResult] = useState<{ count: number; jobIds: string[] } | null>(null);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);

  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    (async () => {
      const [c, k] = await Promise.all([
        sb.from("cities").select("id, name, slug").eq("is_active", true).order("name"),
        sb.from("categories").select("id, name, type").order("type").order("name"),
      ]);
      if (c.data) {
        setCities(c.data as City[]);
        // se c'e' una sola citta' attiva, non ha senso farla scegliere
        const salvata = typeof window !== "undefined" ? localStorage.getItem(RICORDA_CITTA) : null;
        const valida = (c.data as City[]).find((x) => x.id === salvata);
        if (valida) setCityId(valida.id);
        else if ((c.data as City[]).length === 1) setCityId((c.data as City[])[0].id);
      }
      if (k.data) {
        setCats(k.data as Cat[]);
        const salvata = typeof window !== "undefined" ? localStorage.getItem(RICORDA_CAT) : null;
        if (salvata && (k.data as Cat[]).some((x) => x.id === salvata)) setCategoryId(salvata);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const addFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const valid: File[] = [];
    for (const f of arr) {
      if (!f.type.startsWith("image/")) {
        showToast(`${f.name}: solo immagini`, true);
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        showToast(`${f.name}: troppo grande (max 10 MB)`, true);
        continue;
      }
      valid.push(f);
    }
    setFiles((prev) => {
      // stesso nome e stessa dimensione = stesso file: caricarlo due volte
      // significa pagare due estrazioni e ritrovarsi due draft identici
      const chiave = (f: File) => `${f.name}|${f.size}`;
      const gia = new Set(prev.map(chiave));
      const nuovi = valid.filter((f) => !gia.has(chiave(f)));
      const scartati = valid.length - nuovi.length;
      if (scartati > 0) showToast(`${scartati} già in lista, saltat${scartati === 1 ? "o" : "i"}`);
      const next = [...prev, ...nuovi].slice(0, MAX_FILES);
      if (prev.length + nuovi.length > MAX_FILES) showToast(`Massimo ${MAX_FILES} file alla volta`, true);
      return next;
    });
  };

  // Incolla dagli appunti: screenshot di una storia Instagram -> Cmd+V.
  // È il gesto piu' frequente quando si raccolgono flyer.
  useEffect(() => {
    if (mode !== "image") return;
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const imgs: File[] = [];
      for (const it of Array.from(items)) {
        if (it.type.startsWith("image/")) {
          const f = it.getAsFile();
          if (f) {
            // gli screenshot arrivano tutti come "image.png": rinominali
            imgs.push(new File([f], `incollata-${Date.now()}-${imgs.length}.png`, { type: f.type }));
          }
        }
      }
      if (imgs.length) {
        e.preventDefault();
        addFiles(imgs);
        showToast(imgs.length === 1 ? "Immagine incollata" : `${imgs.length} immagini incollate`);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const scegliCitta = (id: string) => {
    setCityId(id);
    if (id) localStorage.setItem(RICORDA_CITTA, id);
  };
  const scegliCategoria = (id: string) => {
    setCategoryId(id);
    if (id) localStorage.setItem(RICORDA_CAT, id);
    else localStorage.removeItem(RICORDA_CAT);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cityId) return showToast("Seleziona una città", true);

    setSubmitting(true);
    setResult(null);

    try {
      const jobIds: string[] = [];

      if (mode === "image") {
        if (files.length === 0) {
          showToast("Carica almeno un'immagine", true);
          setSubmitting(false);
          return;
        }
        setProgress({ current: 0, total: files.length });
        for (let i = 0; i < files.length; i++) {
          try {
            const res = await uploadImageAndEnqueue(files[i], cityId);
            jobIds.push(res.job_id);
          } catch (err: any) {
            showToast(`${files[i].name}: ${err?.message || "errore"}`, true);
          }
          setProgress({ current: i + 1, total: files.length });
        }
      } else if (mode === "text") {
        if (text.trim().length < 20) {
          showToast("Scrivi almeno 20 caratteri", true);
          setSubmitting(false);
          return;
        }
        const res = await enqueueText(text.trim(), cityId);
        jobIds.push(res.job_id);
      } else {
        if (!/^https?:\/\//.test(url.trim())) {
          showToast("URL non valido (http o https)", true);
          setSubmitting(false);
          return;
        }
        const res = await enqueueUrl(url.trim(), cityId);
        jobIds.push(res.job_id);
      }

      if (jobIds.length > 0) {
        // La categoria si scrive su ingestion_sources.category_hint_id:
        // e' il campo che lo schema prevedeva gia' e che la RPC di claim
        // restituisce al worker. I job non hanno una categoria propria,
        // ce l'ha la sorgente da cui provengono.
        if (categoryId) {
          const { data: righe } = await sb
            .from("ingestion_jobs").select("source_id").in("id", jobIds);
          const sourceIds = Array.from(
            new Set((righe || []).map((r: any) => r.source_id).filter(Boolean)),
          );
          if (sourceIds.length) {
            const { error } = await sb
              .from("ingestion_sources")
              .update({ category_hint_id: categoryId })
              .in("id", sourceIds);
            if (error) showToast("Categoria non salvata", true);
          }
        }

        triggerWorker();
        if (jobIds.length > 5) {
          setTimeout(() => triggerWorker(), 6_000);
          setTimeout(() => triggerWorker(), 12_000);
          setTimeout(() => triggerWorker(), 18_000);
        }

        setResult({ count: jobIds.length, jobIds });
        showToast(jobIds.length === 1 ? "Aggiunto alla coda" : `${jobIds.length} aggiunti alla coda`);
        setText("");
        setUrl("");
        setFiles([]);
      }
    } catch (err: any) {
      showToast(err?.message || "Errore", true);
    } finally {
      setSubmitting(false);
      setProgress(null);
    }
  };

  const catsPlace = cats.filter((c) => c.type === "place");
  const catsEvent = cats.filter((c) => c.type === "event");

  return (
    <>
      <style>{STYLES}</style>
      <main className="ing">
        <div className="ing-top">
          <Link href={`/${locale}/admin/content-os`} className="ing-back">← Back to content-os</Link>
          <div className="ing-eyebrow">Content OS · Ingest</div>
          <h1 className="ing-h">
            Aggiungi <span className="red">qualcosa.</span>
          </h1>
          <p className="ing-sub">
            Carica flyer (anche tanti insieme), incolla un testo, o un link a un sito.
            Gemini ricostruisce. Il draft finisce in review — niente viene pubblicato senza il tuo via.
          </p>
        </div>

        <div className="ing-tabs">
          <button type="button" className={`ing-tab ${mode === "image" ? "active" : ""}`} onClick={() => setMode("image")}>
            Immagine
          </button>
          <button type="button" className={`ing-tab ${mode === "text" ? "active" : ""}`} onClick={() => setMode("text")}>
            Testo
          </button>
          <button type="button" className={`ing-tab ${mode === "url" ? "active" : ""}`} onClick={() => setMode("url")}>
            Link sito
          </button>
        </div>

        <form className="ing-card" onSubmit={handleSubmit}>
          <div className="ing-grid">
            <div className="ing-row">
              <div className="ing-field">
                <label className="ing-label">City <span className="req">*</span></label>
                <select className="ing-select" value={cityId} onChange={(e) => scegliCitta(e.target.value)} required>
                  <option value="">— Seleziona città —</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="ing-field">
                <label className="ing-label">Categoria</label>
                <select className="ing-select" value={categoryId} onChange={(e) => scegliCategoria(e.target.value)}>
                  <option value="">— la scelgo in review —</option>
                  {catsEvent.length > 0 && (
                    <optgroup label="Eventi">
                      {catsEvent.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </optgroup>
                  )}
                  {catsPlace.length > 0 && (
                    <optgroup label="Posti">
                      {catsPlace.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </optgroup>
                  )}
                </select>
              </div>
            </div>
            <div className="ing-hint">
              La città Gemini la usa come indizio. La categoria non può indovinarla
              (non conosce i tuoi id): se la scegli qui vale per tutti i file di questo
              caricamento e in review non la devi più toccare.
            </div>

            {mode === "image" && (
              <div className="ing-field">
                <label className="ing-label">
                  Flyer / immagini <span className="req">*</span>
                  {files.length > 0 && (
                    <span className="ing-count" style={{ marginLeft: 8 }}>
                      {files.length} / {MAX_FILES}
                    </span>
                  )}
                </label>

                {files.length === 0 ? (
                  <label
                    className={`ing-drop ${dragOver ? "over" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={onFileChange}
                      style={{ display: "none" }}
                    />
                    <div className="ing-drop-icon">+</div>
                    <div className="ing-drop-text">Trascina una o più immagini, o tocca per caricarle</div>
                    <div className="ing-drop-hint">jpg, png, webp · max 10 MB ciascuna · fino a {MAX_FILES} file</div>
                  </label>
                ) : (
                  <div className="ing-preview-grid">
                    {previews.map((u, i) => (
                      <div key={u} className="ing-preview-item">
                        <img src={u} alt={`preview ${i + 1}`} />
                        <button
                          type="button"
                          className="ing-preview-remove"
                          onClick={() => removeFile(i)}
                          aria-label="rimuovi"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {files.length < MAX_FILES && (
                      <label className="ing-preview-add">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={onFileChange}
                          style={{ display: "none" }}
                        />
                        +
                      </label>
                    )}
                  </div>
                )}

                <div className="ing-paste">
                  <kbd>⌘V</kbd> incolla direttamente uno screenshot — storie Instagram, locandine, foto di una vetrina
                </div>
              </div>
            )}

            {mode === "text" && (
              <div className="ing-field">
                <label className="ing-label">Testo libero <span className="req">*</span></label>
                <textarea
                  className="ing-textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`Incolla qualsiasi descrizione: comunicato stampa, line-up, scheda del locale, email del PR...

Esempio:
"Domenica 5 luglio al Parco La Spezia, dalle 14 alle 22, Sunday Remedy in the Park di Arca Milano con Channels of Love. In console Gigi Testa, Dirty Channels, Michele Minguzzi. Ingresso libero."`}
                />
                <div className="ing-hint">Più dettagli dai, migliore esce il draft. Almeno 20 caratteri.</div>
              </div>
            )}

            {mode === "url" && (
              <div className="ing-field">
                <label className="ing-label">URL sito <span className="req">*</span></label>
                <input
                  className="ing-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://nomelocale.com"
                />
                <div className="ing-hint">
                  Funziona meglio con pagine di locali, schede ristoranti, eventi. Per Instagram usa Immagine (screenshot del flyer).
                </div>
              </div>
            )}
          </div>

          <div className="ing-actions">
            <button type="submit" className="ing-btn-primary" disabled={submitting || !cityId}>
              {submitting
                ? progress
                  ? `Uploading ${progress.current}/${progress.total}...`
                  : "Invio..."
                : mode === "image" && files.length > 1
                ? `Invia ${files.length} in coda`
                : "Invia in coda"}
            </button>
          </div>

          {progress && (
            <div className="ing-progress">
              <div className="ing-progress-text">
                {progress.current === progress.total
                  ? "Tutti caricati, sto avviando il worker..."
                  : `Upload ${progress.current} di ${progress.total}`}
              </div>
              <div className="ing-progress-bar">
                <div
                  className="ing-progress-fill"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {result && (
            <div className="ing-success">
              <h3>{result.count === 1 ? "Aggiunto" : `${result.count} aggiunti`}</h3>
              <p>
                Il worker sta già processando.{" "}
                <Link href={`/${locale}/admin/drafts`}>Vai ai drafts</Link>{" "}
                — i risultati arrivano in tempo reale (5-30 secondi per il primo, poi a cascata).
              </p>
            </div>
          )}
        </form>
      </main>

      {toast && <div className={`ing-toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
    </>
  );
}