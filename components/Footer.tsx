import Link from "next/link";
import { DottedPathDivider } from "./DottedPath";
import { UnsubscribePopover } from "./UnsubscribePopover";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type FooterDict = Dictionary["footer"];

export function Footer({ dict, lang }: { dict: FooterDict; lang: Lang }) {
  const privacyHref = lang === "fr" ? "/fr/privacy" : "/privacy";

  return (
    <footer className="relative bg-navy-950 pt-16 pb-10 overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        {/* Upper footer */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-20">
          {/* Left: brand block */}
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold uppercase tracking-[0.1em] text-offwhite/90">
              The <span className="text-accent">Explorer</span> Mindset
            </p>
            <p className="mt-2 font-body text-sm text-gray-muted leading-relaxed max-w-xs">
              {dict.tagline}
            </p>
          </div>

          {/* Right: nav links */}
          <nav className="flex items-center gap-8">
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
            <a
              href={lang === "fr" ? "/fr/resources" : "/resources"}
              className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary hover:text-offwhite transition-colors"
            >
              {dict.navResources}
            </a>
            <a
              href="#buy"
              className="font-display text-xs uppercase tracking-[0.1em] text-accent hover:text-accent-hover transition-colors"
            >
              {dict.navBuy}
            </a>
          </nav>
        </div>

        {/* Dotted divider */}
        <div className="mt-12 mb-8 flex justify-center">
          <DottedPathDivider className="w-40" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-secondary">
          <p className="font-body text-xs">
            {dict.copyright}
          </p>
          <div className="flex items-center gap-6 font-display text-xs uppercase tracking-[0.08em]">
            <Link
              href={lang === "fr" ? "/fr/gratitude" : "/gratitude"}
              className="text-gray-secondary hover:text-offwhite transition-colors"
            >
              {dict.navGratitude}
            </Link>
            <Link
              href={privacyHref}
              className="text-gray-secondary hover:text-offwhite transition-colors"
            >
              {dict.privacy}
            </Link>
            <UnsubscribePopover
              className="text-gray-secondary"
              dict={{ label: dict.unsubscribe, message: dict.unsubscribeMessage }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
