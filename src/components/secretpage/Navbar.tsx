"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll behavior
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 40) setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-colors duration-300
          ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}
        `}
      >
        <div className="md:max-w-7xl w-full mx-auto px-6 h-16 grid md:grid-cols-3 grid-cols-2 items-center">

          {/* LEFT – SOCIAL (DESKTOP ONLY) */}
          <div className="md:flex hidden items-center gap-5 mt-2">

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@loris_caputo" 
                target="_blank" 
                className="hover:opacity-80 transition"
              >
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M12.7 0h3.3c.1 1 .4 2 1 2.9.7 1 1.7 1.6 2.9 1.8v3.3c-1.3 0-2.6-.3-3.8-.9v7.9c0 2-1.6 3.7-3.7 3.7-2 0-3.7-1.6-3.7-3.7s1.6-3.7 3.7-3.7c.3 0 .7 0 1 .1V7.1c-.3 0-.7.1-1 .1-4.1 0-7.4 3.3-7.4 7.4s3.3 7.4 7.4 7.4 7.4-3.3 7.4-7.4V3.3c-1-.2-1.9-.7-2.7-1.4-.8-.8-1.3-1.7-1.5-2.7h-3.8V0z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/miutifinglobal" 
                target="_blank" 
                className="hover:opacity-80 transition"
              >
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm4.8-4.3a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/miutifin" 
                target="_blank" 
                className="hover:opacity-80 transition"
              >
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.5 8.4h3v12h-3v-12zM8.5 8.4h2.8v1.6h.04c.39-.74 1.36-1.52 2.81-1.52 3 0 3.55 1.98 3.55 4.56v7.36h-3v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.69-2.5 3.44v6.61h-3v-12z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/393478655415" 
                target="_blank" 
                className="hover:opacity-80 transition"
              >
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.47 1.33 4.98L2 22l5.22-1.37c1.45.79 3.06 1.21 4.82 1.21 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.12c-1.52 0-3-.41-4.3-1.18l-.31-.18-3.09.81.83-3.02-.2-.31A7.85 7.85 0 0 1 4.2 11.96a7.84 7.84 0 1 1 7.84 8.16zm4.21-5.83c-.23-.12-1.35-.67-1.56-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06a6.42 6.42 0 0 1-1.89-1.17 7.08 7.08 0 0 1-1.31-1.63c-.14-.23 0-.36.1-.48.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.39-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.21.23-.79.77-.79 1.88s.81 2.18.92 2.33c.12.15 1.6 2.44 3.88 3.42.54.23.97.37 1.3.47.55.17 1.05.15 1.44.09.44-.06 1.35-.55 1.54-1.07.19-.52.19-.96.14-1.07-.06-.11-.21-.17-.44-.29z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:miutifin.ask@google.com"
                className="hover:opacity-80 transition"
              >
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M12 13.5 1.5 6h21L12 13.5zm0 2.3L1.5 8.3V18c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2V8.3L12 15.8z"/>
                </svg>
              </a>

          </div>

          {/* CENTER – LOGO */}
          <div className="flex md:justify-center">
            <img
                src="/miutifinlogo.png"
                alt="Miutifin"
                className="md:w-[25%] w-[45%] select-none"
                />
          </div>

          {/* RIGHT */}
          <div className="flex justify-end items-center gap-3">
            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex gap-3">
              <a href="/auth/login" className="cursor-pointer px-4 py-2 rounded-full border border-white/20 text-sm hover:border-white/40 transition">
                Login
              </a>
              <a href="/secret" className="cursor-pointer px-4 py-2 rounded-full bg-red-600 text-sm font-medium hover:bg-red-700 transition">
                Request access
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              aria-label="Open menu"
            >
              <div className="space-y-1">
                <span className="block w-4 h-px bg-white" />
                <span className="block w-4 h-px bg-white" />
                <span className="block w-4 h-px bg-white" />
              </div>
            </button>
          </div>

        </div>
      </header>

        <div
        className={`
            fixed inset-0 z-[60]
            transition-opacity duration-300
            ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        >
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

        {/* CLOSE BUTTON */}
        <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 z-[70]
            w-12 h-12
            flex items-center justify-center
            hover:border-white/40 transition"
            aria-label="Close menu"
        >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24px" height="24px" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
        </button>

        {/* MENU CONTENT */}
        <nav className="relative h-full flex flex-col justify-center px-8 gap-4 text-left">
            <div className="mb-12">
              <img
                  src="/miutifinlogo.png"
                  alt="Miutifin"
                  className="w-[25%] w-[45%]"
                  />
            </div>

            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-medium"
              >
              Home
            </a>

            <a
              href="/secret"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-medium"
              >
              Request access
            </a>

            <a
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-medium"
              >
              Login
            </a>

            <div className="h-px bg-white/10 my-3" />

            <div className="inline text-white/70">
              <div className="mb-4">
                <a href="https://instagram.com/miutifinglobal" target="_blank">Instagram</a>
              </div>
              <div className="mb-4">
                <a href="https://www.tiktok.com/@loris_caputo" target="_blank">TikTok</a>
              </div>

              <div className="mb-4">
                <a 
                  href="https://linkedin.com/company/miutifin" 
                  target="_blank" 
                >
                  LinkedIn
                </a>
              </div>
              <div className="mb-4">
                <a 
                  href="https://wa.me/393478655415" 
                  target="_blank" 
                >
                  WhatsApp
                </a>
              </div>

              <div className="mb-4">
                <a 
                  href="mailto:miutifin.ask@gmail.com"
                >
                  Email
                </a>
              </div>

            </div>

        </nav>
        </div>

    </>
  );
}
