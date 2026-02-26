import { SectionBadge } from "./SectionBadge";
import { AnimateOnScroll } from "./AnimateOnScroll";

const pillars = [
  {
    title: "Curiosity",
    number: "01",
    description:
      "The desire to understand and learn. To ask \u201Cwhat if\u201D before settling for \u201Cthat\u2019s how it is.\u201D",
  },
  {
    title: "Adaptability",
    number: "02",
    description:
      "The ability to adjust when the ground shifts. To welcome detours as part of the journey.",
  },
  {
    title: "Resilience",
    number: "03",
    description:
      "The capacity to recover and keep moving. To turn every fall into forward momentum.",
  },
];

export function ThreePillars() {
  return (
    <section id="framework" className="relative bg-navy-800 py-24 md:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-10">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionBadge label="The Framework" />
            <h2 className="mt-6 font-display font-bold text-2xl md:text-4xl text-offwhite tracking-tight">
              Three traits that change everything.
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, index) => (
            <AnimateOnScroll key={pillar.title} delay={index * 150}>
              <div className="group relative h-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]">
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
