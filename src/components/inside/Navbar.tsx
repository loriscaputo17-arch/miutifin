"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const CITIES = ["Milano", "Roma", "Torino", "Napoli", "Bologna", "Firenze"];

export default function Navbar() {
  const supabase = createSupabaseBrowserClient();

  const [user, setUser] = useState<any>(null);
  const [city, setCity] = useState("Milano");
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);

  /* USER */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  /* CITY */
  useEffect(() => {
    const saved = localStorage.getItem("city");
    if (saved) setCity(saved);
  }, []);

  const selectCity = (c: string) => {
    setCity(c);
    localStorage.setItem("city", c);
    setCityOpen(false);
  };

  /* CLICK OUTSIDE CITY */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
  <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6">
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        mx-auto max-w-8xl
        bg-[#0c0c0c]/70 backdrop-blur-xl
        border border-white/5
        rounded-2xl
        px-4 sm:px-6 py-3
        flex items-center justify-between
        relative z-50
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <img
            src="/logo_small_trasparent.png"
            className="h-8 w-8 object-contain"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 text-sm text-white/60">
          <Link href="/home" className="hover:text-white">Home</Link>
          <Link href="/events" className="hover:text-white">Events</Link>
          <Link href="/journeys" className="hover:text-white">Journeys</Link>
          <Link href="/search" className="hover:text-white">Explore</Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 relative">
        {/* 🔍 SEARCH (desktop) */}
        <Link
          href="/search"
          className="
            hidden md:flex items-center gap-2
            bg-white/10 hover:bg-white/20
            px-4 py-2 rounded-full
            text-white text-[12px]
            transition
          "
        >
          <div className="width-50 bg-trasparent flex items-center"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20px" height="20px" viewBox="0 0 640 640">
            <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
            </svg> &nbsp;
            Are you looking for your perfect experience?
          </div>
        </Link>

        {/* CITY */}
        <div ref={cityRef} className="relative">
          <button
            onClick={() => setCityOpen(!cityOpen)}
            className="
              bg-white/10 hover:bg-white/20
              px-3 py-2 rounded-full
              text-white text-[12px]
              flex items-center
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="white" viewBox="0 0 640 640"><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg> &nbsp; {city}
          </button>

          <AnimatePresence>
            {cityOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="
                  absolute right-0 top-11
                  w-44
                  bg-[#0c0c0c]/95 backdrop-blur-xl
                  border border-white/10
                  rounded-xl overflow-hidden
                  z-50
                "
              >
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => selectCity(c)}
                    className="
                      w-full text-left px-4 py-2
                      text-sm text-white/70
                      hover:bg-white/10 hover:text-white
                    "
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACCOUNT */}
        {user && (
          <Link
            href="/account"
            className="
              hidden sm:flex items-center gap-2
              bg-white/10 hover:bg-white/20
              px-3 py-2 rounded-full
            "
          >
            <div className=" flex items-center justify-center text-xs font-bold text-white">
              {user.email?.[0].toUpperCase()}
            </div>
            <span className="text-white text-[12px]">
              {user.email}
            </span>
          </Link>
        )}

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white text-xl px-2"
        >
          ☰
        </button>
      </div>
    </motion.nav>

    {/* OVERLAY MOBILE */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}
    </AnimatePresence>

    {/* MOBILE MENU */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="
            fixed top-24 left-4 right-4
            bg-[#0c0c0c]/90 backdrop-blur-xl
            border border-white/5
            rounded-2xl
            p-4
            z-50
            md:hidden
          "
        >
          {/* 🔍 SEARCH MOBILE */}
          <Link
            href="/search"
            onClick={() => setMenuOpen(false)}
            className="
              block mb-4 px-4 py-3 rounded-xl
              bg-white/10 text-white
            "
          >
            🔍 Search
          </Link>

          {["Home", "Events", "Explore", "Plans"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-white/70 hover:text-white"
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

}
