import { SectionBadge } from "./SectionBadge";
import { AnimateOnScroll } from "./AnimateOnScroll";

const pillars = [
  {
    title: "Curiosity",
    description:
      "The desire to understand and learn. To ask \"what if\" before settling for \"that's how it is.\"",
  },
  {
    title: "Adaptability",
    description:
      "The ability to adjust when the ground shifts. To welcome detours as part of the journey.",
  },
  {
    title: "Resilience",
    description:
      "The capacity to recover and keep moving. To turn every fall into forward momentum.",
  },
];

export function ThreePillars() {
  return (
    <section className="relative bg-navy-800 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionBadge label="The Framework" />
            <h2 className="mt-6 font-display font-bold text-2xl md:text-3xl text-offwhite">
              Three traits that change everything.
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <AnimateOnScroll key={pillar.title} delay={index * 150}>
              <div
                className="group relative bg-navy-700 border border-white/[0.08] rounded-2xl p-8 transition-all duration-300 hover:border-accent/30 hover:bg-navy-700/80"
              >
                {/* Orange dot */}
                <div className="w-6 h-6 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />

                <h3 className="mt-5 font-display font-semibold text-xl text-offwhite">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-gray-muted font-body text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Connecting dotted line between dots (desktop) */}
        <div className="hidden md:block absolute top-[calc(50%+40px)] left-1/2 -translate-x-1/2 w-[60%] pointer-events-none">
          <svg viewBox="0 0 600 4" fill="none" aria-hidden="true">
            <line
              x1="0" y1="2" x2="600" y2="2"
              stroke="#CB4A33"
              strokeWidth="2"
              strokeDasharray="8 12"
              strokeLinecap="round"
              opacity="0.2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
