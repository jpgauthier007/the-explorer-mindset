import Link from "next/link";
import { DottedPathDivider } from "./DottedPath";
import { UnsubscribePopover } from "./UnsubscribePopover";

export function Footer() {
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
              <span className="text-accent">The Explorer</span> Mindset
            </p>
            <p className="mt-2 font-body text-sm text-gray-secondary leading-relaxed max-w-xs">
              A guide to growth for your life, family, and work.
            </p>
          </div>

          {/* Right: nav links */}
          <nav className="flex items-center gap-8">
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
            <a
              href="#join"
              className="font-display text-xs uppercase tracking-[0.1em] text-accent hover:text-accent-hover transition-colors"
            >
              Join
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
            &copy; 2026 Jean-Philippe Gauthier. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-display text-xs uppercase tracking-[0.08em]">
            <Link
              href="/privacy"
              className="text-gray-secondary hover:text-offwhite transition-colors"
            >
              Privacy
            </Link>
            <UnsubscribePopover className="text-gray-secondary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
