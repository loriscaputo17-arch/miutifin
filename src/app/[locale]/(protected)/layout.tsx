import { requireAuth } from "@/lib/requireAuth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth(); // 🔐 una volta sola

  return <>{children}</>;
}
