import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] flex text-white">
      <AdminSidebar />

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
