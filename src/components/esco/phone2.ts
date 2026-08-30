/* ============================================================
   Normalizzazione telefono in E.164.
   "340 123 4567", "+39 340 123 4567" e "0039 3401234567"
   devono finire nel database come un solo contatto: +393401234567.
   Senza questo ti ritrovi la stessa persona tre volte.
   ============================================================ */

export function toE164(raw: string, defaultCc = "39"): string | null {
  let v = raw.trim().replace(/[^\d+]/g, "");
  if (!v) return null;

  // 00 39 ... -> +39 ...
  if (v.startsWith("00")) v = "+" + v.slice(2);

  if (!v.startsWith("+")) {
    let digits = v.replace(/\D/g, "");
    if (digits.startsWith(defaultCc) && digits.length >= String(defaultCc).length + 9) {
      // ha gia' il prefisso internazionale ma senza il +
      v = "+" + digits;
    } else {
      // Numero nazionale. Attenzione: quasi ovunque lo zero interurbano si
      // toglie, ma in Italia i fissi lo mantengono (+39 02 ...). Toglierlo
      // qui significherebbe salvare numeri inesistenti.
      if (defaultCc !== "39") digits = digits.replace(/^0+/, "");
      v = "+" + defaultCc + digits;
    }
  } else {
    v = "+" + v.slice(1).replace(/\D/g, "");
  }

  return /^\+[1-9]\d{7,14}$/.test(v) ? v : null;
}