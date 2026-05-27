"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const STYLES = `
  .sb{
    width:240px;
    min-height:100vh;
    background:#1a1815;
    padding:32px 20px;
    display:flex;
    flex-direction:column;
    gap:8px;
    position:fixed;
    top:0;left:0;bottom:0;
    overflow-y:auto;
  }
  .sb-brand{
    font-family:Georgia,serif;
    font-style:italic;
    font-size:28px;
    color:#f5f0e8;
    letter-spacing:-1px;
    margin-bottom:6px;
    line-height:1;
  }
  .sb-brand .red{color:#dc2626}
  .sb-tag{
    font-size:10px;
    font-weight:700;
    letter-spacing:.2em;
    text-transform:uppercase;
    color:rgba(245,240,232,0.42);
    margin-bottom:32px;
  }
  .sb-section{
    font-size:9px;
    font-weight:700;
    letter-spacing:.2em;
    text-transform:uppercase;
    color:rgba(245,240,232,0.32);
    padding:18px 12px 8px;
  }
  .sb-link{
    display:flex;
    align-items:center;
    gap:10px;
    padding:10px 12px;
    border-radius:10px;
    font-size:13px;
    font-weight:500;
    color:rgba(245,240,232,0.65);
    text-decoration:none;
    letter-spacing:-0.2px;
    transition:all .15s;
  }
  .sb-link:hover{
    background:rgba(245,240,232,0.06);
    color:#f5f0e8;
  }
  .sb-link.active{
    background:#dc2626;
    color:#fff;
  }
  .sb-link.active:hover{
    background:#ef4444;
  }
  .sb-link-dot{
    width:6px;height:6px;border-radius:50%;
    background:rgba(245,240,232,0.32);
  }
  .sb-link.active .sb-link-dot{background:#fff}
  .sb-bottom{margin-top:auto;padding-top:20px;border-top:1px solid rgba(245,240,232,0.08)}
  .sb-out{
    background:transparent;
    border:1px solid rgba(245,240,232,0.15);
    color:rgba(245,240,232,0.55);
    padding:10px 14px;
    border-radius:100px;
    font-size:11px;
    font-weight:600;
    cursor:pointer;
    width:100%;
    font-family:inherit;
    letter-spacing:-0.2px;
    transition:all .15s;
  }
  .sb-out:hover{
    border-color:#dc2626;
    color:#dc2626;
  }
  .sb-spacer{height:240px;flex-shrink:0}
  @media(max-width:900px){
    .sb{
      position:relative;
      width:100%;
      min-height:auto;
      flex-direction:row;
      flex-wrap:wrap;
      padding:16px;
      gap:6px;
    }
    .sb-brand{font-size:20px;margin:0;width:100%;margin-bottom:8px}
    .sb-tag{display:none}
    .sb-section{display:none}
    .sb-link{padding:8px 14px;font-size:12px}
    .sb-bottom{margin:0;padding:0;border:none;width:auto}
    .sb-spacer{display:none}
    .sb-out{padding:8px 14px;font-size:10px}
  }
`;

interface NavItem {
  label: string;
  href: string;
  section?: "main" | "content";
}

const NAV: NavItem[] = [
  { label: "Waitlist", href: "/admin", section: "main" },
  { label: "Cities", href: "/admin/cities", section: "content" },
  { label: "Places", href: "/admin/places", section: "content" },
  { label: "Events", href: "/admin/events", section: "content" },
  { label: "Journeys", href: "/admin/journeys", section: "content" },
];

export function AdminSidebar({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname() || "";

  const isActive = (href: string) => {
    // href è tipo "/admin" o "/admin/places"
    // pathname è tipo "/en/admin" o "/en/admin/places"
    const full = `/${locale}${href}`;
    if (href === "/admin") return pathname === full;
    return pathname.startsWith(full);
  };

  const signOut = async () => {
    const sb = createSupabaseBrowserClient();
    await sb.auth.signOut();
    router.replace(`/${locale}/admin/login`);
  };

  const mainItems = NAV.filter((n) => n.section === "main");
  const contentItems = NAV.filter((n) => n.section === "content");

  return (
    <>
      <style>{STYLES}</style>
      <aside className="sb">
        <div className="sb-brand">
          esco<span className="red">.</span>
        </div>
        <div className="sb-tag">Admin</div>

        {mainItems.map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className={`sb-link ${isActive(item.href) ? "active" : ""}`}
          >
            <span className="sb-link-dot" />
            {item.label}
          </Link>
        ))}

        <div className="sb-section">Content</div>

        {contentItems.map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className={`sb-link ${isActive(item.href) ? "active" : ""}`}
          >
            <span className="sb-link-dot" />
            {item.label}
          </Link>
        ))}

        <div className="sb-spacer" />

        <div className="sb-bottom">
          <button onClick={signOut} className="sb-out">
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}