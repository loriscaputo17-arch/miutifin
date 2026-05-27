import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { AdminSidebar } from "./_components/AdminSidebar";

export const metadata = {
  title: "Admin · ESCO",
  robots: { index: false, follow: false },
};

const WRAPPER_STYLES = `
  .adm-shell{
    display:flex;
    min-height:100vh;
    background:#f5f0e8;
  }
  .adm-main{
    flex:1;
    margin-left:240px;
    min-height:100vh;
  }
  @media(max-width:900px){
    .adm-shell{flex-direction:column}
    .adm-main{margin-left:0}
  }
`;

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) redirect(`/${locale}/admin/login?error=forbidden`);

  return (
    <>
      <style>{WRAPPER_STYLES}</style>
      <div className="adm-shell">
        <AdminSidebar locale={locale} />
        <main className="adm-main">
          {children}
        </main>
      </div>
    </>
  );
}