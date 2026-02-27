import { SectionBadge } from "./SectionBadge";
import { AnimateOnScroll } from "./AnimateOnScroll";
import type { Dictionary } from "@/dictionaries/getDictionary";

type ThreePillarsDict = Dictionary["threePillars"];

export function ThreePillars({ dict }: { dict: ThreePillarsDict }) {
  return (
    <section id="framework" className="relative bg-navy-800 py-24 md:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-10">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionBadge label={dict.badge} />
            <h2 className="mt-6 font-display font-bold text-2xl md:text-4xl text-offwhite tracking-tight">
              {dict.heading}
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.pillars.map((pillar, index) => (
            <AnimateOnScroll key={pillar.title} delay={index * 150}>
              <div className="group relative h-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-10 md:p-12 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]">
                {/* Number + dot */}
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_20px_4px_rgba(203,74,51,0.3)]" />
                  <span className="text-xs font-display uppercase tracking-[0.16em] text-accent/60">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display font-bold text-xl md:text-2xl text-offwhite tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-gray-muted font-body text-base leading-[1.75]">
                  {pillar.description}
                </p>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
