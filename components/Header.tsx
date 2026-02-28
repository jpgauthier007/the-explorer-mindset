"use client";

import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type HeaderDict = Dictionary["header"];

export function Header({ dict, lang }: { dict: HeaderDict; lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const home = lang === "fr" ? "/fr" : "/";

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
          href={home}
          className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
        >
          T<span className="text-accent">E</span>M
        </a>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          <a
            href={`${home}#about`}
            className="font-display text-xs uppercase tracking-[0.1em] text-offwhite/70 hover:text-offwhite transition-colors py-3"
          >
            {dict.navBook}
          </a>
          <a
            href={`${home}#framework`}
            className="font-display text-xs uppercase tracking-[0.1em] text-offwhite/70 hover:text-offwhite transition-colors py-3"
          >
            {dict.navFramework}
          </a>
          <a
            href={`${home}#author`}
            className="font-display text-xs uppercase tracking-[0.1em] text-offwhite/70 hover:text-offwhite transition-colors py-3"
          >
            {dict.navAuthor}
          </a>
          <a
            href={`${home}#join`}
            className="font-display text-xs uppercase tracking-[0.1em] text-offwhite/70 hover:text-offwhite transition-colors py-3"
          >
            {dict.navJoin}
          </a>
          <a
            href={lang === "fr" ? "/fr/resources" : "/resources"}
            className="font-display text-xs uppercase tracking-[0.1em] text-offwhite/70 hover:text-offwhite transition-colors py-3"
          >
            {dict.navResources}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle lang={lang} />

          {/* CTA */}
          <a
            href={`${home}#buy`}
            className="font-display text-sm font-semibold uppercase tracking-[0.08em] px-5 py-2 rounded-full bg-accent text-offwhite hover:bg-accent-hover transition-all duration-300"
          >
            {dict.ctaBuy}
          </a>
        </div>
      </div>
    </header>
  );
}
