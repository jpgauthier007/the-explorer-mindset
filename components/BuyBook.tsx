"use client";

import { SectionBadge } from "@/components/SectionBadge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import type { Dictionary } from "@/dictionaries/getDictionary";

type BuyBookDict = Dictionary["buyBook"];

const icons = {
  digital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-11 h-11">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  hardcover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-11 h-11">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
      <line x1="9" y1="7" x2="16" y2="7" />
      <line x1="9" y1="11" x2="14" y2="11" />
    </svg>
  ),
  softcover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-11 h-11">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
    </svg>
  ),
};

const formatKeys = ["digital", "hardcover", "softcover"] as const;

export function BuyBook({ dict }: { dict: BuyBookDict }) {
  return (
    <section
      id="buy"
      className="relative bg-navy-900 py-24 md:py-32 overflow-hidden scroll-mt-16"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-10">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionBadge label={dict.badge} />
            <h2 className="mt-6 font-display font-bold text-2xl md:text-4xl text-offwhite tracking-tight">
              {dict.heading}
            </h2>
            <p className="mt-4 text-gray-muted font-body text-base md:text-lg">
              {dict.subtitle}
            </p>
            {/* Launch date badge */}
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-xs font-display font-semibold uppercase tracking-[0.12em] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {dict.launchDate}
            </span>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {formatKeys.map((key, index) => {
            const format = dict.formats[key];
            return (
              <AnimateOnScroll key={key} delay={index * 150}>
                <div className="group relative flex h-full flex-col items-center bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 text-center transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]">
                  {/* Format icon */}
                  <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent">
                    {icons[key]}
                  </div>

                  <h3 className="mt-5 font-display font-bold text-xl text-offwhite tracking-tight">
                    {format.name}
                  </h3>
                  <p className="mt-2 text-gray-muted font-body text-sm leading-[1.75]">
                    {format.description}
                  </p>

                  {/* Disabled until launch */}
                  <span className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.12em] text-gray-secondary/60">
                    <span className="w-4 h-px bg-gray-secondary/30" />
                    {dict.comingSoon}
                    <span className="w-4 h-px bg-gray-secondary/30" />
                  </span>

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
