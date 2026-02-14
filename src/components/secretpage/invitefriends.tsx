"use client";

import { ArrowRight, UserPlus } from "lucide-react";

export function InviteFriends() {
  const inviteMessage = encodeURIComponent(
    "Hey! I found this private platform called Miutifin. " +
    "It’s invite-only and focused on curated city experiences. " +
    "This page isn’t public, but you might like it: " +
    "https://miutifin.com/secret"
  );

  const whatsappLink = `https://wa.me/?text=${inviteMessage}`;

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="invite">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.9))]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* EYEBROW */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 backdrop-blur">
          <UserPlus className="w-4 h-4 text-red-500" />
          Private access
        </span>

        {/* TITLE */}
        <h2 className="mt-8 text-4xl md:text-5xl font-semibold leading-tight">
          Cities are better <br /> when shared with the right people
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          Miutifin grows through people, not ads.  
          Invite friends who explore intentionally, plan thoughtfully and care
          about how the city is lived.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-red-600 text-white font-medium transition hover:bg-red-500"
          >
            Invite friends
            <ArrowRight className="w-5 h-5 transition group-hover:translate-x-1" />
          </a>

          <span className="text-sm text-white/50">
            Invitations are limited and intentional
          </span>
        </div>
      </div>
    </section>
  );
}
