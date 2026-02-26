import { SectionBadge } from "./SectionBadge";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type ResourcesDict = Dictionary["resources"];

const worksheetIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const assessmentIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const extrasIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

function ComingSoonLabel({ label }: { label: string }) {
  return (
    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.12em] text-gray-secondary/60">
      <span className="w-4 h-px bg-gray-secondary/30" />
      {label}
      <span className="w-4 h-px bg-gray-secondary/30" />
    </span>
  );
}

export function Resources({ dict, lang }: { dict: ResourcesDict; lang: Lang }) {
  const homeHref = lang === "fr" ? "/fr" : "/";

  return (
    <div className="relative bg-navy-900 min-h-screen">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 pt-28 pb-20">
        {/* Back link */}
        <a
          href={homeHref}
          className="inline-block font-body text-sm text-gray-secondary hover:text-offwhite transition-colors mb-12"
        >
          {dict.backHome}
        </a>

        {/* Page header */}
        <div className="text-center">
          <SectionBadge label={dict.badge} />
          <h1 className="mt-8 font-display font-bold text-3xl md:text-5xl text-offwhite tracking-tight">
            {dict.heading}
          </h1>
          <p className="mt-5 text-gray-muted font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {dict.description}
          </p>
        </div>

        {/* Sub-section 1: Worksheets */}
        <section className="mt-20">
          <h2 className="font-display font-bold text-xl md:text-2xl text-offwhite tracking-tight mb-8">
            {dict.worksheets.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dict.worksheets.items.map((item) => (
              <div
                key={item.title}
                className="group relative flex h-full flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]"
              >
                <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent">
                  {worksheetIcon}
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-offwhite tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-muted font-body text-sm leading-[1.75]">
                  {item.description}
                </p>
                <ComingSoonLabel label={dict.comingSoon} />
                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Sub-section 2: Assessment */}
        <section className="mt-16">
          <h2 className="font-display font-bold text-xl md:text-2xl text-offwhite tracking-tight mb-8">
            {dict.assessment.heading}
          </h2>
          <div className="group relative flex flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent shrink-0">
                {assessmentIcon}
              </div>
              <div>
                <p className="text-gray-muted font-body text-base leading-[1.75]">
                  {dict.assessment.description}
                </p>
              </div>
            </div>
            <ComingSoonLabel label={dict.comingSoon} />
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </section>

        {/* Sub-section 3: Extras */}
        <section className="mt-16">
          <h2 className="font-display font-bold text-xl md:text-2xl text-offwhite tracking-tight mb-8">
            {dict.extras.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dict.extras.items.map((item) => (
              <div
                key={item.title}
                className="group relative flex h-full flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]"
              >
                <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent">
                  {extrasIcon}
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-offwhite tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-muted font-body text-sm leading-[1.75]">
                  {item.description}
                </p>
                <ComingSoonLabel label={dict.comingSoon} />
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
