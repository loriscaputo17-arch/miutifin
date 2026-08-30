/* Struttura condivisa dai documenti legali. */

export type Block =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { table: { head: [string, string]; rows: [string, string][] } }
  | { note: string };

export type Section = { id: string; title: string; blocks: Block[] };

export type LegalDoc = {
  eyebrow: string;
  title: string;
  updated: string;
  version: string;
  scope: string;
  updatedLabel: string;
  versionLabel: string;
  scopeLabel: string;
  tocLabel: string;
  back: string;
  langNote: string;
  sections: Section[];
};

export const LEGAL_EMAIL = "miutifin.ask@gmail.com";