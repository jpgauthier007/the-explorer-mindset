"use client";

import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type HeaderDict = Dictionary["header"];

export function Header({ dict, lang }: { dict: HeaderDict; lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const home = lang === "fr" ? "/fr" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: `${home}#about`, label: dict.navBook },
    { href: `${home}#framework`, label: dict.navFramework },
    { href: `${home}#author`, label: dict.navAuthor },
    { href: `${home}#join`, label: dict.navJoin },
    { href: lang === "fr" ? "/fr/resources" : "/resources", label: dict.navResources },
    { href: lang === "fr" ? "/fr/gratitude" : "/gratitude", label: dict.navGratitude },
  ];

  return (
    <>
      {/* ── Main header bar ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1120px] px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href={home}
            className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
          >
            T<span className="text-accent">E</span>M
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-xs uppercase tracking-[0.1em] text-offwhite/70 hover:text-offwhite transition-colors py-3"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageToggle lang={lang} />

            {/* Desktop BUY */}
            <a
              href={`${home}#buy`}
              className="hidden sm:inline-flex font-display text-sm font-semibold uppercase tracking-[0.08em] px-5 py-2 rounded-full bg-accent text-offwhite hover:bg-accent-hover transition-all duration-300"
            >
              {dict.ctaBuy}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="sm:hidden flex flex-col justify-center items-end w-9 h-9 gap-[5px]"
            >
              <span className="w-5 h-[1.5px] bg-offwhite/80 rounded-full transition-all duration-300" />
              <span className="w-5 h-[1.5px] bg-offwhite/80 rounded-full transition-all duration-300" />
              <span className="w-3 h-[1.5px] bg-accent rounded-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ───────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-navy-950 sm:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay header bar */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06] shrink-0">
          <a
            href={home}
            onClick={() => setMobileOpen(false)}
            className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80"
          >
            T<span className="text-accent">E</span>M
          </a>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="w-9 h-9 flex items-center justify-center text-offwhite/60 hover:text-offwhite transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links — large, staggered */}
        <nav className="flex-1 flex flex-col justify-center px-8 overflow-y-auto">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                transitionDelay: mobileOpen ? `${i * 55 + 60}ms` : "0ms",
              }}
              className={`font-display font-bold text-[2rem] leading-none text-offwhite/90 hover:text-accent transition-all duration-300 py-4 border-b border-white/[0.06] last:border-0 ${
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom: language + BUY */}
        <div
          style={{ transitionDelay: mobileOpen ? "440ms" : "0ms" }}
          className={`px-8 pb-10 pt-5 border-t border-white/[0.06] shrink-0 space-y-4 transition-all duration-300 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[10px] uppercase tracking-[0.14em] text-gray-secondary">
              {lang === "fr" ? "Langue" : "Language"}
            </span>
            <LanguageToggle lang={lang} />
          </div>
          <a
            href={`${home}#buy`}
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center font-display text-sm font-semibold uppercase tracking-[0.08em] px-5 py-4 rounded-full bg-accent text-offwhite hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(203,74,51,0.5)]"
          >
            {dict.ctaBuy}
          </a>
        </div>
      </div>
    </>
  );
}
