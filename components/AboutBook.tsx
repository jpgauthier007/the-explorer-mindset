import { SectionBadge } from "./SectionBadge";
import { DottedPathDivider } from "./DottedPath";
import { AnimateOnScroll } from "./AnimateOnScroll";
import type { Dictionary } from "@/dictionaries/getDictionary";

type AboutBookDict = Dictionary["aboutBook"];

export function AboutBook({ dict }: { dict: AboutBookDict }) {
  return (
    <section id="about" className="relative bg-navy-900 py-24 md:py-32 overflow-hidden">
      {/* Subtle top gradient blend */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-navy-900 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <AnimateOnScroll>
          <SectionBadge label={dict.badge} />

          <blockquote className="mt-12 max-w-2xl mx-auto">
            <p className="font-body italic text-2xl md:text-[1.75rem] text-offwhite leading-relaxed text-balance">
              {dict.pullQuote}
            </p>
          </blockquote>

          <div className="mt-10 max-w-[600px] mx-auto space-y-6 text-gray-muted font-body text-base md:text-lg leading-[1.8] text-left">
            <p>{dict.description1}</p>
            <p>{dict.description2}</p>
          </div>

          <DottedPathDivider className="mx-auto mt-16 w-60" />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
