"use client";

import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type HeaderDict = Dictionary["header"];

export function Header({ dict, lang }: { dict: HeaderDict; lang: Lang }) {
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
          href={lang === "fr" ? "/fr" : "/"}
          className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
        >
          T<span className="text-accent">E</span>M
        </a>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-8">
          <a
            href="#about"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            {dict.navBook}
          </a>
          <a
            href="#framework"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            {dict.navFramework}
          </a>
          <a
            href="#author"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            {dict.navAuthor}
          </a>
          <a
            href="#join"
            className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
          >
            {dict.navJoin}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle lang={lang} />

          {/* CTA */}
          <a
            href="#buy"
            className="font-display text-xs font-semibold uppercase tracking-[0.08em] px-5 py-2 rounded-full bg-accent text-offwhite hover:bg-accent-hover transition-all duration-300"
          >
            {dict.ctaBuy}
          </a>
        </div>
      </div>
    </header>
  );
}
