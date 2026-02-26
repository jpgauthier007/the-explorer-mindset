import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - The Explorer Mindset",
  description: "How we handle your data at The Explorer Mindset.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header bar */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-[720px] px-5 md:px-10 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
          >
            <span className="text-accent">T</span>EM
          </Link>
          <span className="text-xs font-display uppercase tracking-[0.1em] text-gray-secondary">
            Privacy Policy
          </span>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-[720px] px-5 md:px-10 py-16 md:py-24">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-offwhite tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-secondary font-display uppercase tracking-[0.08em]">
          Last updated: February 25, 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-muted font-body text-base leading-[1.85]">
          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              What We Collect
            </h2>
            <p>
              When you subscribe to The Explorer Mindset newsletter, we collect
              only your <strong className="text-offwhite">email address</strong>.
              We do not collect names, payment information, browsing history, or
              any other personal data.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              How We Use Your Data
            </h2>
            <p>
              Your email address is used solely to send you occasional
              reflections on curiosity, adaptability, and resilience related to
              the book. We will never sell, rent, or share your email address
              with third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              Where Your Data Is Stored
            </h2>
            <p>
              Your email is stored securely in our database hosted by{" "}
              <a
                href="https://convex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                Convex
              </a>
              , which uses encryption at rest and in transit. The website is
              hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                Vercel
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              CAPTCHA Protection
            </h2>
            <p>
              We use Cloudflare Turnstile to protect our subscription form from
              automated abuse. Turnstile is a privacy-preserving alternative
              that does not track users or use cookies. See{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                Cloudflare&rsquo;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-offwhite">Unsubscribe</strong> at any
                time via our{" "}
                <Link
                  href="/unsubscribe"
                  className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
                >
                  unsubscribe page
                </Link>
              </li>
              <li>
                <strong className="text-offwhite">Request deletion</strong> of
                your data by contacting us
              </li>
              <li>
                <strong className="text-offwhite">Know what data</strong> we
                hold about you (it&rsquo;s only your email)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              Cookies &amp; Analytics
            </h2>
            <p>
              This website does not use cookies and does not run any analytics
              or tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              Data Retention
            </h2>
            <p>
              We retain your email address for as long as you remain subscribed.
              Once you unsubscribe, your record is marked as inactive. You may
              request full deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              Contact
            </h2>
            <p>
              For any privacy-related questions, please reach out at{" "}
              <strong className="text-offwhite">theexplorermindset.com</strong>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border-subtle">
          <Link
            href="/"
            className="text-sm text-gray-secondary font-display uppercase tracking-[0.08em] hover:text-offwhite transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </article>
    </div>
  );
}
