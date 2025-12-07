"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import clsx from "clsx";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
        />
      )}

      <header
        className={clsx(
          "pointer-events-none fixed inset-x-0 top-0 z-50 transition-all px-4 duration-500",
          scrolled
            ? "backdrop-blur-xl bg-black/50"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav
  className={clsx(
    `
      pointer-events-auto flex items-center justify-between
      text-[0.65rem] md:text-xs font-medium uppercase
      tracking-[0.05em] text-white/75 transition-all duration-500
    `,
    scrolled ? "py-3 md:py-4" : "py-6 md:py-8"
  )}
>
  {/* MOBILE: Logo Left */}
  <Link href="/" className="flex md:hidden items-center">
    <img
      src="./logo_small_trasparent.png"
      className="h-8 aspect-square object-contain"
    />
  </Link>

  {/* DESKTOP LEFT ITEMS */}
  <div className="hidden md:flex items-center gap-10 md:gap-16 lg:gap-20 xl:gap-24">
    <Link className="hover:text-white" href="#features">FEATURES</Link>
    <Link className="hover:text-white" href="#solutions">SOLUTIONS</Link>
    <Link className="hover:text-white" href="#how">HOW IT WORKS</Link>
  </div>

  {/* DESKTOP: CENTER LOGO */}
  <Link href="/" className="hidden md:flex items-center justify-center">
    <img
      src="./logo_small_trasparent.png"
      className="h-7 md:h-10 aspect-square object-contain"
    />
  </Link>

  {/* DESKTOP RIGHT ITEMS */}
  <div className="hidden md:flex items-center gap-10 md:gap-16 lg:gap-20 xl:gap-24">
    <Link className="hover:text-white" href="#resources">SOCIAL</Link>
    <Link className="hover:text-white" href="#resources">RESOURCES</Link>
<Link
  href="#get-started"
  className="
    px-5 py-3 rounded-full 
    bg-white hover:bg-red-600 
    text-black hover:text-white
    transition
  "
>
  GET STARTED
</Link>
  </div>

  {/* MOBILE: Hamburger right */}
  <button
    className="md:hidden text-white hover:opacity-80 transition z-50"
    onClick={() => setOpen(true)}
  >
    <div className="space-y-1">
      <span className="block h-[2px] w-6 bg-white" />
      <span className="block h-[2px] w-6 bg-white" />
      <span className="block h-[2px] w-6 bg-white" />
    </div>
  </button>
</nav>

        </Container>
      </header>

      {/* ⚡ FULLSCREEN MOBILE SIDEBAR */}
      <aside
        className={clsx(
          `
          fixed inset-0 h-full w-full bg-black/90 backdrop-blur-xl
          z-50 p-10 flex flex-col gap-10
          transform transition-transform duration-500
        `,
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* HEADER SIDEBAR WITH CLOSE BUTTON */}
        <div className="flex items-center justify-between">
          <img
            src="./logo_small_trasparent.png"
            className="h-12 aspect-square object-contain"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-white text-lg tracking-wide hover:opacity-80 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" fill="white" height="24px" viewBox="0 0 640 640"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/></svg>
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col gap-6 mt-4">
          <Link href="#features" onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-white transition">FEATURES</Link>
          <Link href="#solutions" onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-white transition">SOLUTIONS</Link>
          <Link href="#how" onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-white transition">HOW IT WORKS</Link>
          <Link href="#pricing" onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-white transition">PRICING</Link>
          <Link href="#resources" onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-white transition">RESOURCES</Link>
          <Link href="#get-started" onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-white transition">GET STARTED</Link>
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Miutifin.  
            <br />All rights reserved.
          </p>

          <p className="text-xs text-white/50 mt-2">
            Built for AI-driven operations at scale.
          </p>
        </div>


      </aside>
    </>
  );
}
