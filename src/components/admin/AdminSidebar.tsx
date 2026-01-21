import Link from "next/link";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/places", label: "Places" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0c0c0c] border-r border-white/5 p-6">
      <h1 className="text-xl font-semibold mb-10">Miutifin Admin</h1>

      <nav className="space-y-3 text-sm">
        {items.map(i => (
          <Link
            key={i.href}
            href={i.href}
            className="block px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
