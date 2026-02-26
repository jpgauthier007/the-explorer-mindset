"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1120px] px-5 md:px-10 flex items-center justify-between h-16">
        {/* Logo / wordmark */}
        <a
          href="#"
          className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
        >
          <span className="text-accent">T</span>EM
        </a>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-8">
          <a
            href="#about"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            The Book
          </a>
          <a
            href="#framework"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            Framework
          </a>
          <a
            href="#author"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            Author
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#join"
          className={`font-display text-xs font-semibold uppercase tracking-[0.08em] px-5 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-accent text-offwhite hover:bg-accent-hover"
              : "border border-offwhite/20 text-offwhite/80 hover:border-offwhite/40 hover:text-offwhite"
          }`}
        >
          Join
        </a>
      </div>
    </header>
  );
}
