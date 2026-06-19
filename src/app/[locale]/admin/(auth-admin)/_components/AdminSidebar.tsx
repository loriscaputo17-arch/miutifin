"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  /* ---------- defaults: desktop layout ---------- */
  .sb{
    width:260px;
    min-height:100vh;
    background:#1a1815;
    padding:32px 16px 24px;
    display:flex;
    flex-direction:column;
    position:fixed;
    top:0;left:0;bottom:0;
    overflow-y:auto;
    font-family:Inter,system-ui,sans-serif;
    z-index:90;
  }
  .sb::-webkit-scrollbar{width:6px}
  .sb::-webkit-scrollbar-thumb{background:rgba(245,240,232,0.10);border-radius:100px}

  .sb-brand{
    font-family:Georgia,serif;
    font-style:italic;
    font-size:30px;
    color:#f5f0e8;
    letter-spacing:-1px;
    line-height:1;
    padding:0 8px;
  }
  .sb-brand .red{color:#dc2626}
  .sb-tag{
    font-size:9px;
    font-weight:700;
    letter-spacing:.28em;
    text-transform:uppercase;
    color:rgba(245,240,232,0.32);
    padding:6px 8px 24px;
  }

  .sb-section{
    font-size:9px;
    font-weight:700;
    letter-spacing:.24em;
    text-transform:uppercase;
    color:rgba(245,240,232,0.32);
    padding:20px 12px 8px;
    display:flex;
    align-items:center;
    gap:10px;
  }
  .sb-section::after{
    content:'';
    flex:1;
    height:1px;
    background:rgba(245,240,232,0.06);
  }

  .sb-link{
    display:flex;
    align-items:center;
    gap:12px;
    padding:9px 12px;
    border-radius:8px;
    font-size:13px;
    font-weight:500;
    color:rgba(245,240,232,0.55);
    text-decoration:none;
    letter-spacing:-0.2px;
    transition:all .15s;
    position:relative;
  }
  .sb-link:hover{
    background:rgba(245,240,232,0.04);
    color:rgba(245,240,232,0.85);
  }
  .sb-link:hover .sb-icon{opacity:0.85}
  .sb-link.active{
    background:rgba(220,38,38,0.10);
    color:#f5f0e8;
    font-weight:600;
  }
  .sb-link.active::before{
    content:'';
    position:absolute;
    left:-16px;
    top:50%;
    transform:translateY(-50%);
    width:3px;
    height:18px;
    background:#dc2626;
    border-radius:0 3px 3px 0;
  }
  .sb-link.active .sb-icon{opacity:1;color:#dc2626}

  .sb-icon{
    width:17px;
    height:17px;
    opacity:0.55;
    transition:all .15s;
    flex-shrink:0;
  }
  .sb-label{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

  .sb-badge{
    background:#dc2626;
    color:#fff;
    font-size:10px;
    font-weight:700;
    padding:2px 7px;
    border-radius:100px;
    min-width:18px;
    text-align:center;
    line-height:1.4;
    font-family:Inter,sans-serif;
  }

  .sb-spacer{flex:1;min-height:24px}

  .sb-user{
    border-top:1px solid rgba(245,240,232,0.08);
    padding-top:18px;
    margin-top:12px;
  }
  .sb-user-info{
    display:flex;
    align-items:center;
    gap:10px;
    padding:0 8px 12px;
  }
  .sb-user-avatar{
    width:32px;
    height:32px;
    border-radius:50%;
    background:rgba(220,38,38,0.20);
    color:#f5f0e8;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:Georgia,serif;
    font-style:italic;
    font-size:14px;
    flex-shrink:0;
  }
  .sb-user-meta{flex:1;min-width:0}
  .sb-user-name{
    font-size:12px;
    font-weight:600;
    color:#f5f0e8;
    letter-spacing:-0.2px;
    line-height:1.2;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .sb-user-role{
    font-size:10px;
    color:rgba(245,240,232,0.42);
    letter-spacing:.16em;
    text-transform:uppercase;
    font-weight:600;
    margin-top:2px;
  }
  .sb-out{
    background:transparent;
    border:1px solid rgba(245,240,232,0.15);
    color:rgba(245,240,232,0.65);
    padding:9px 14px;
    border-radius:100px;
    font-size:11px;
    font-weight:600;
    cursor:pointer;
    width:100%;
    font-family:inherit;
    letter-spacing:-0.1px;
    transition:all .15s;
  }
  .sb-out:hover{border-color:#dc2626;color:#dc2626}

  /* ---------- mobile-only: hidden on desktop ---------- */
  .sb-topbar,.sb-backdrop,.sb-close{display:none}

  /* ---------- mobile: drawer pattern ---------- */
  @media(max-width:900px){
    body.sb-locked{overflow:hidden}

    .sb{
      width:84vw;
      max-width:320px;
      padding:24px 16px 24px;
      transform:translateX(-100%);
      transition:transform .28s cubic-bezier(.4,0,.2,1);
      box-shadow:8px 0 40px rgba(0,0,0,0.35);
    }
    .sb.open{transform:translateX(0)}

    /* Top bar visible at the top of the viewport */
    .sb-topbar{
      display:flex;
      align-items:center;
      gap:14px;
      position:fixed;
      top:0;left:0;right:0;
      height:56px;
      padding:0 16px;
      background:#1a1815;
      z-index:80;
      border-bottom:1px solid rgba(245,240,232,0.05);
    }
    .sb-hamburger{
      background:transparent;
      border:none;
      color:#f5f0e8;
      cursor:pointer;
      padding:8px;
      margin:-8px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:8px;
    }
    .sb-hamburger:hover{background:rgba(245,240,232,0.06)}
    .sb-topbar-brand{
      font-family:Georgia,serif;
      font-style:italic;
      font-size:22px;
      color:#f5f0e8;
      letter-spacing:-0.5px;
      line-height:1;
    }
    .sb-topbar-brand .red{color:#dc2626}
    .sb-topbar-badge{
      margin-left:auto;
      background:#dc2626;
      color:#fff;
      font-size:11px;
      font-weight:700;
      padding:3px 10px;
      border-radius:100px;
      font-family:Inter,sans-serif;
    }

    /* Backdrop overlay */
    .sb-backdrop{
      display:block;
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.55);
      opacity:0;
      pointer-events:none;
      transition:opacity .28s ease;
      z-index:85;
    }
    .sb-backdrop.open{
      opacity:1;
      pointer-events:auto;
    }

    /* Close X inside drawer */
    .sb-close{
      display:flex;
      align-items:center;
      justify-content:center;
      position:absolute;
      top:18px;right:14px;
      width:32px;height:32px;
      background:transparent;
      border:none;
      color:rgba(245,240,232,0.65);
      cursor:pointer;
      border-radius:8px;
      font-size:0;
    }
    .sb-close:hover{
      background:rgba(245,240,232,0.06);
      color:#f5f0e8;
    }

    /* Hide desktop tag (we have the brand in the topbar) */
    .sb-tag{display:none}
    .sb-brand{padding-right:40px}

    /* Active marker compensation (no negative offset on mobile) */
    .sb-link.active::before{left:-16px;width:3px}
  }
`;

type IconName =
  | "inbox" | "layout" | "upload" | "list" | "terminal"
  | "globe" | "pin" | "calendar" | "route" | "archive";

const ICONS: Record<IconName, ReactNode> = {
  inbox: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>
    </svg>
  ),
  layout: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  upload: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  ),
  list: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
    </svg>
  ),
  terminal: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
    </svg>
  ),
  globe: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>
    </svg>
  ),
  pin: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  calendar: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  route: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>
    </svg>
  ),
  archive: (
    <svg className="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>
    </svg>
  ),
};

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  badge?: "drafts";
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Waitlist", href: "/admin", icon: "inbox" },
    ],
  },
  {
    label: "Content OS",
    items: [
      { label: "Dashboard", href: "/admin/content-os", icon: "layout" },
      { label: "Ingest", href: "/admin/ingest", icon: "upload" },
      { label: "Drafts", href: "/admin/drafts", icon: "list", badge: "drafts" },
      { label: "Jobs", href: "/admin/jobs", icon: "terminal" },
    ],
  },
  {
    label: "Library",
    items: [
      { label: "Cities", href: "/admin/cities", icon: "globe" },
      { label: "Places", href: "/admin/places", icon: "pin" },
      { label: "Events", href: "/admin/events", icon: "calendar" },
      { label: "Journeys", href: "/admin/journeys", icon: "route" },
    ],
  },
  {
    label: "Bulk import",
    items: [
      { label: "Places import", href: "/admin/places/bulk-import", icon: "archive" },
      { label: "Events import", href: "/admin/events/bulk-import", icon: "archive" },
    ],
  },
];

export function AdminSidebar({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname() || "";

  const [userEmail, setUserEmail] = useState<string>("");
  const [draftsCount, setDraftsCount] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // user + drafts realtime
  useEffect(() => {
    const sb = createSupabaseBrowserClient();

    (async () => {
      const { data } = await sb.auth.getUser();
      setUserEmail(data.user?.email ?? "");
    })();

    const loadCount = async () => {
      const { count } = await sb
        .from("content_drafts")
        .select("*", { count: "exact", head: true })
        .eq("status", "review");
      setDraftsCount(count ?? 0);
    };

    loadCount();

    const channel = sb
      .channel("sidebar_drafts_count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "content_drafts" },
        () => loadCount(),
      )
      .subscribe();

    return () => { sb.removeChannel(channel); };
  }, []);

  // close drawer on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // body scroll lock when drawer open (mobile only — class is gated by media query)
  useEffect(() => {
    if (isOpen) document.body.classList.add("sb-locked");
    else document.body.classList.remove("sb-locked");
    return () => { document.body.classList.remove("sb-locked"); };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === "/admin") return pathname === full;
    return pathname === full || pathname.startsWith(full + "/");
  };

  const signOut = async () => {
    const sb = createSupabaseBrowserClient();
    await sb.auth.signOut();
    router.replace(`/${locale}/admin/login`);
  };

  const renderBadge = (item: NavItem) => {
    if (item.badge !== "drafts") return null;
    if (draftsCount === null || draftsCount === 0) return null;
    return <span className="sb-badge">{draftsCount > 99 ? "99+" : draftsCount}</span>;
  };

  const userInitial = userEmail ? userEmail[0].toUpperCase() : "?";
  const userName = userEmail ? userEmail.split("@")[0] : "Admin";

  return (
    <>
      <style>{STYLES}</style>

      {/* Mobile top bar */}
      <header className="sb-topbar">
        <button
          type="button"
          className="sb-hamburger"
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="sb-topbar-brand">esco<span className="red">.</span></div>
        {draftsCount !== null && draftsCount > 0 && (
          <span className="sb-topbar-badge">{draftsCount > 99 ? "99+" : draftsCount} drafts</span>
        )}
      </header>

      {/* Mobile backdrop */}
      <div
        className={`sb-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar (drawer on mobile, fixed on desktop) */}
      <aside className={`sb ${isOpen ? "open" : ""}`}>
        <button
          type="button"
          className="sb-close"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18"/>
            <line x1="18" y1="6" x2="6" y2="18"/>
          </svg>
        </button>

        <div className="sb-brand">
          esco<span className="red">.</span>
        </div>
        <div className="sb-tag">Admin</div>

        {SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="sb-section">{section.label}</div>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`sb-link ${isActive(item.href) ? "active" : ""}`}
              >
                {ICONS[item.icon]}
                <span className="sb-label">{item.label}</span>
                {renderBadge(item)}
              </Link>
            ))}
          </div>
        ))}

        <div className="sb-spacer" />

        <div className="sb-user">
          <div className="sb-user-info">
            <div className="sb-user-avatar">{userInitial}</div>
            <div className="sb-user-meta">
              <div className="sb-user-name">{userName}</div>
              <div className="sb-user-role">Admin</div>
            </div>
          </div>
          <button onClick={signOut} className="sb-out">
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}