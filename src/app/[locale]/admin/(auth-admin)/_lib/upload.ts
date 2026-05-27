import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

/**
 * Upload di un file image al bucket "media".
 * Path: media/<folder>/<timestamp>-<sanitized-name>
 * Return: public URL del file.
 */
export async function uploadImage(
  file: File,
  folder: "places" | "events" | "journeys"
): Promise<{ url: string | null; error?: string }> {
  if (!file) return { url: null, error: "no_file" };

  // Validazione client-side
  if (file.size > 10 * 1024 * 1024) {
    return { url: null, error: "File too large (max 10MB)" };
  }
  if (!file.type.startsWith("image/")) {
    return { url: null, error: "File must be an image" };
  }

  const sb = createSupabaseBrowserClient();

  // Nome file safe: timestamp + slugified original name
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "-")
    .replace(/-+/g, "-")
    .replace(/\.[^.]+$/, "");

  const path = `${folder}/${Date.now()}-${safeName}.${ext}`;

  const { error } = await sb.storage
    .from("media")
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    console.error("UPLOAD ERROR:", error);
    return { url: null, error: error.message };
  }

  const { data } = sb.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}

/**
 * Cancella un file dal bucket "media".
 * Estrae il path dalla URL pubblica.
 */
export async function deleteImage(url: string): Promise<boolean> {
  if (!url) return false;
  const sb = createSupabaseBrowserClient();

  // public URL: https://<project>.supabase.co/storage/v1/object/public/media/<path>
  const match = url.match(/\/media\/(.+)$/);
  if (!match) return false;

  const path = match[1];
  const { error } = await sb.storage.from("media").remove([path]);
  return !error;
}