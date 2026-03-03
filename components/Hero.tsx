import Image from "next/image";
import { DottedPathHero } from "./DottedPath";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type HeroDict = Dictionary["hero"];

export function Hero({ dict, lang }: { dict: HeroDict; lang: Lang }) {
  const coverSrc = lang === "fr" ? "/book-cover-fr.png" : "/book-cover.png";
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-600 via-navy-800 to-navy-900" />
      {/* Radial glow behind book area */}
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />
      {/* Top edge vignette */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-navy-950/40 to-transparent pointer-events-none" />

      {/* Dotted path motif */}
      <DottedPathHero className="absolute right-0 top-0 h-full w-[45%] pointer-events-none hidden md:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 md:px-10 pt-28 pb-20 md:pt-0 md:pb-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: Title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-[0.06em]">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-offwhite">
                THE
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-accent drop-shadow-[0_0_40px_rgba(203,74,51,0.3)]">
                EXPLORER
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-offwhite">
                MINDSET
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-offwhite/80 font-body italic max-w-sm mx-auto md:mx-0 leading-relaxed text-balance">
              {dict.subtitle}
            </p>

            <div className="mt-4 flex items-center gap-3 justify-center md:justify-start">
              <span className="w-6 h-px bg-accent/50" />
              <p className="text-sm text-gray-secondary font-display uppercase tracking-[0.1em]">
                {dict.author}
              </p>
            </div>
          </div>

          {/* Right: Book Cover */}
          <div className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-[22rem]">
            {/* Glow behind book */}
            <div className="absolute inset-0 scale-110 bg-accent/[0.08] rounded-3xl blur-[60px] pointer-events-none" />
            <div className="relative transition-transform duration-700 hover:scale-[1.03]">
              <Image
                src={coverSrc}
                alt={dict.bookAlt}
                width={900}
                height={1384}
                priority
                className="w-full h-auto drop-shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-display uppercase tracking-[0.2em] text-offwhite/30">
          {dict.scroll}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-offwhite/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
