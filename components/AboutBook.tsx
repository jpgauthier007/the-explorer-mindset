import { SectionBadge } from "./SectionBadge";
import { DottedPathDivider } from "./DottedPath";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function AboutBook() {
  return (
    <section className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <AnimateOnScroll>
          <SectionBadge label="About the Book" />

          <blockquote className="mt-10 max-w-2xl mx-auto font-display font-bold text-2xl md:text-3xl text-offwhite leading-snug">
            &ldquo;Swap safety for curiosity and discover how energizing that
            choice can be.&rdquo;
          </blockquote>

          <div className="mt-8 max-w-[650px] mx-auto space-y-5 text-gray-muted font-body text-base md:text-lg leading-relaxed">
            <p>
              Change isn&rsquo;t slowing down. It shapes how we lead, parent, and
              live. The question isn&rsquo;t whether you can keep up&mdash;it&rsquo;s
              how you&rsquo;ll move through it.
            </p>
            <p>
              This guide shows why an Explorer Mindset fuels happiness, resilience,
              and forward momentum. You&rsquo;ll find practical ways to experiment
              every day, adapt on the fly, transform setbacks into springboards,
              and ask bigger questions that pull you toward purpose.
            </p>
          </div>

          <DottedPathDivider className="mx-auto mt-14 w-48" />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
