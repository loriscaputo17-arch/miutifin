"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">

      {/* SIDEBAR */}
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      {/* CONTENT */}
      <div className="flex-1 md:ml-64">

        {/* MOBILE HEADER */}
        <header className="md:hidden flex fixed w-full items-center gap-3 px-4 h-14 border-b border-white/5 bg-[#050505]">
          <button
            onClick={() => setOpen(true)}
            className="text-white text-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20px" height="20px" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
          </button>

          <span style={{fontSize: '20px', fontWeight: '600'}}>Miutifin Admin</span>
        </header>

        <main className="p-4 md:p-8 md: md:mt-0 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
