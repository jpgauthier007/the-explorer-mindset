import Image from "next/image";
import { SectionBadge } from "./SectionBadge";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function AboutAuthor() {
  return (
    <section className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <SectionBadge label="About the Author" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Author photo */}
            <div className="flex-shrink-0 w-60 md:w-80">
              <div className="rounded-2xl overflow-hidden border-2 border-accent/40">
                <Image
                  src="/author-photo.jpg"
                  alt="Jean-Philippe Gauthier"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-offwhite">
                Jean-Philippe Gauthier
              </h2>

              <div className="mt-5 space-y-4 text-gray-muted font-body text-base md:text-lg leading-relaxed max-w-xl">
                <p>
                  A seasoned leader, coach, and trusted advisor with a thirty-year
                  career, including more than a decade at Google. He describes
                  himself as an &ldquo;ordinary man,&rdquo; not a natural-born
                  risk-taker. He developed this mindset to navigate life&rsquo;s
                  twists.
                </p>
                <p>
                  He wrote this book out of a deep desire to guide his children,
                  Ana&iuml;s and Louis, and his nephews, Jules and Samuel.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
