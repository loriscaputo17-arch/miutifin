"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  MapPin,
  Tags,
  Users,
  Database,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const mainItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/places", label: "Places", icon: MapPin },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/users", label: "Users", icon: Users },
];

const ingestionItems = [
  { href: "/admin/ingestions/dice", label: "Dice" },
  { href: "/admin/ingestions/xceed", label: "Xceed" },
  { href: "/admin/ingestions/eventbrite", label: "Eventbrite" },
  { href: "/admin/ingestions/partiful", label: "Partiful" },
  { href: "/admin/ingestions/resident-advisor", label: "Resident Advisor" },
];

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  const isIngestionsActive = pathname.startsWith("/admin/ingestions");
  const [ingestionsOpen, setIngestionsOpen] = useState(isIngestionsActive);

  return (
    <>
      {/* OVERLAY (mobile) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-screen w-64",
          "bg-[#0b0b0b] border-r border-white/5",
          "p-6 flex flex-col",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-500">
              Admin
            </span>
            <h1 className="text-lg font-semibold">Miutifin</h1>
          </div>

          <button
            onClick={onClose}
            className="md:hidden text-white/40 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-1 text-sm">
          {/* MAIN LINKS */}
          {mainItems.map(item => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r-full" />
                )}

                <Icon className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* INGESTIONS DROPDOWN */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIngestionsOpen(v => !v)}
              className={clsx(
                "w-full group relative flex items-center justify-between px-3 py-2.5 rounded-lg transition",
                isIngestionsActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {isIngestionsActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r-full" />
              )}

              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 opacity-80" />
                <span>Ingestions</span>
              </div>

              <ChevronDown
                className={clsx(
                  "w-4 h-4 transition-transform",
                  ingestionsOpen && "rotate-180"
                )}
              />
            </button>

            {/* SUB ITEMS */}
            {ingestionsOpen && (
              <div className="mt-1 ml-8 space-y-1">
                {ingestionItems.map(sub => {
                  const active = pathname === sub.href;

                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onClose}
                      className={clsx(
                        "block px-3 py-2 rounded-md text-xs transition",
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* FOOTER */}
        <div className="pt-4 border-t border-white/5 text-xs text-white/40">
          <p>
            Environment:{" "}
            <span className="text-white/70">Development</span>
          </p>
          <p className="mt-1">
            Role: <span className="text-white/70">Admin</span>
          </p>
        </div>
      </aside>
    </>
  );
}
