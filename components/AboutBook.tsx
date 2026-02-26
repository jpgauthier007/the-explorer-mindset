import { SectionBadge } from "./SectionBadge";
import { DottedPathDivider } from "./DottedPath";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function AboutBook() {
  return (
    <section id="about" className="relative bg-navy-900 py-24 md:py-32 overflow-hidden">
      {/* Subtle top gradient blend */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-navy-900 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <AnimateOnScroll>
          <SectionBadge label="About the Book" />

          <blockquote className="mt-12 max-w-2xl mx-auto">
            <p className="font-body italic text-2xl md:text-[1.75rem] text-offwhite leading-relaxed text-balance">
              &ldquo;Swap safety for curiosity and discover how energizing that
              choice can be.&rdquo;
            </p>
          </blockquote>

          <div className="mt-10 max-w-[600px] mx-auto space-y-6 text-gray-muted font-body text-base md:text-lg leading-[1.8]">
            <p>
              Change isn&rsquo;t slowing down. It shapes how we lead, parent, and
              live. The question isn&rsquo;t whether you can keep up&thinsp;&mdash;&thinsp;it&rsquo;s
              how you&rsquo;ll move through it.
            </p>
            <p>
              This guide shows why an Explorer Mindset fuels happiness, resilience,
              and forward momentum. You&rsquo;ll find practical ways to experiment
              every day, adapt on the fly, transform setbacks into springboards,
              and ask bigger questions that pull you toward purpose.
            </p>
          </div>

          <DottedPathDivider className="mx-auto mt-16 w-60" />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
