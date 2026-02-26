import Image from "next/image";
import { DottedPathHero } from "./DottedPath";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800">
      {/* Background dotted path motif */}
      <DottedPathHero className="absolute right-0 top-0 h-full w-1/2 opacity-60 pointer-events-none hidden md:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 md:px-10 py-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-[0.08em]">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-offwhite">
                THE
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-accent">
                EXPLORER
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-offwhite">
                MINDSET
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-offwhite/90 font-body max-w-md mx-auto md:mx-0">
              A Guide to Growth for Your Life, Family, and Work
            </p>

            <p className="mt-3 text-base text-gray-secondary font-body">
              By Jean-Philippe Gauthier&ensp;|&ensp;Foreword by Sean Downey
            </p>
          </div>

          {/* Right: Book Cover */}
          <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96">
            <div className="rotate-2 drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/book-cover.png"
                alt="The Explorer Mindset book cover"
                width={400}
                height={600}
                priority
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-offwhite/40"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
