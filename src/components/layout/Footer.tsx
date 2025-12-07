import { Container } from "../ui/Container";
import { BodyMuted } from "../ui/Typography";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-12 px-4">
      <Container>
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-14">

          {/* LOGO + ABOUT + SOCIAL + NEWSLETTER */}
          <div className="flex flex-col max-w-sm gap-6">

            {/* LOGO */}
            <img
              src="/logo_small_trasparent.png"
              alt="Miutifin"
              className="h-12 w-12 object-contain opacity-90"
            />

            {/* SHORT ABOUT */}
            <p className="text-white/60 text-sm leading-relaxed">
              Miutifin empowers organizations to automate workflows, accelerate 
              decision-making, and unlock AI-powered operations with precision.
            </p>

            {/* SOCIAL ICONS */}
            {/* SOCIAL ICONS */}
<div className="flex items-center gap-5 mt-2">

  {/* TikTok */}
  <a 
    href="https://www.tiktok.com/@miutifin" 
    target="_blank" 
    className="hover:opacity-80 transition"
  >
    <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
      <path d="M12.7 0h3.3c.1 1 .4 2 1 2.9.7 1 1.7 1.6 2.9 1.8v3.3c-1.3 0-2.6-.3-3.8-.9v7.9c0 2-1.6 3.7-3.7 3.7-2 0-3.7-1.6-3.7-3.7s1.6-3.7 3.7-3.7c.3 0 .7 0 1 .1V7.1c-.3 0-.7.1-1 .1-4.1 0-7.4 3.3-7.4 7.4s3.3 7.4 7.4 7.4 7.4-3.3 7.4-7.4V3.3c-1-.2-1.9-.7-2.7-1.4-.8-.8-1.3-1.7-1.5-2.7h-3.8V0z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a 
    href="https://instagram.com/miutifin" 
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
    href="https://wa.me/393000000000" 
    target="_blank" 
    className="hover:opacity-80 transition"
  >
    <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.47 1.33 4.98L2 22l5.22-1.37c1.45.79 3.06 1.21 4.82 1.21 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.12c-1.52 0-3-.41-4.3-1.18l-.31-.18-3.09.81.83-3.02-.2-.31A7.85 7.85 0 0 1 4.2 11.96a7.84 7.84 0 1 1 7.84 8.16zm4.21-5.83c-.23-.12-1.35-.67-1.56-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06a6.42 6.42 0 0 1-1.89-1.17 7.08 7.08 0 0 1-1.31-1.63c-.14-.23 0-.36.1-.48.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.39-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.21.23-.79.77-.79 1.88s.81 2.18.92 2.33c.12.15 1.6 2.44 3.88 3.42.54.23.97.37 1.3.47.55.17 1.05.15 1.44.09.44-.06 1.35-.55 1.54-1.07.19-.52.19-.96.14-1.07-.06-.11-.21-.17-.44-.29z"/>
    </svg>
  </a>

  {/* Email */}
  <a 
    href="mailto:hello@miutifin.com"
    className="hover:opacity-80 transition"
  >
    <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
      <path d="M12 13.5 1.5 6h21L12 13.5zm0 2.3L1.5 8.3V18c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2V8.3L12 15.8z"/>
    </svg>
  </a>

</div>


            {/* NEWSLETTER */}
            <div className="flex flex-col gap-3 mt-4">
              <h4 className="text-white/80 text-xs uppercase tracking-wider">
                Stay Updated
              </h4>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border border-white/10 text-sm text-white rounded-xl px-4 py-2 placeholder-white/40 focus:bg-white/10 outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  className="bg-white/5 border border-white/10 text-sm text-white rounded-xl px-4 py-2 placeholder-white/40 focus:bg-white/10 outline-none"
                />

                <button className="bg-white text-black font-medium rounded-xl py-2 hover:bg-white/90 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-14 text-sm">

            {/* PRODUCT */}
            <div>
              <h3 className="text-white/80 font-semibold uppercase tracking-wider text-xs mb-3">
                Product
              </h3>
              <ul className="space-y-2 text-white/50">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Solutions</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#how" className="hover:text-white transition">How it Works</a></li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-white/80 font-semibold uppercase tracking-wider text-xs mb-3">
                Company
              </h3>
              <ul className="space-y-2 text-white/50">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="#team" className="hover:text-white transition">Team</a></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="text-white/80 font-semibold uppercase tracking-wider text-xs mb-3">
                Resources
              </h3>
              <ul className="space-y-2 text-white/50">
                <li><a href="#docs" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
                <li><a href="#guides" className="hover:text-white transition">Guides</a></li>
                <li><a href="#support" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-14 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <BodyMuted className="text-xs">
              © {new Date().getFullYear()} Miutifin. All rights reserved.
            </BodyMuted>

            <div className="flex gap-6 text-xs text-white/50">
              <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
