// Questo file è il layout root MINIMO richiesto da Next.js.
// Il vero layout (html, body, providers, metadata) è in app/[locale]/layout.tsx
// perché il tag <html lang="..."> deve essere localizzato.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}