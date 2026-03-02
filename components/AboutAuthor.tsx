import Image from "next/image";
import { SectionBadge } from "./SectionBadge";
import { AnimateOnScroll } from "./AnimateOnScroll";
import type { Dictionary } from "@/dictionaries/getDictionary";

type AboutAuthorDict = Dictionary["aboutAuthor"];

export function AboutAuthor({ dict }: { dict: AboutAuthorDict }) {
  return (
    <section id="author" className="relative bg-navy-900 py-24 md:py-32 overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-10">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <SectionBadge label={dict.badge} />
          </div>
        </AnimateOnScroll>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Author photo */}
          <AnimateOnScroll className="flex-shrink-0">
            <div className="relative w-56 md:w-72">
              {/* Photo glow */}
              <div className="absolute inset-0 scale-105 bg-accent/[0.08] rounded-2xl blur-[40px] pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/[0.08]">
                <Image
                  src="/author-photo.jpg"
                  alt={dict.photoAlt}
                  width={480}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent pointer-events-none" />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Bio */}
          <AnimateOnScroll delay={150} className="flex-1">
            <div className="text-center md:text-left">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-offwhite tracking-tight">
                {dict.name}
              </h2>

              <div className="mt-2 flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-px bg-accent/40" />
                <span className="text-xs font-display uppercase tracking-[0.14em] text-accent/70">
                  {dict.role}
                </span>
              </div>

              <div className="mt-6 space-y-5 text-gray-muted font-body text-base md:text-lg leading-[1.8] max-w-xl">
                <p>{dict.bio1}</p>
                <p>{dict.bio2}</p>
                <p>{dict.bio3}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
