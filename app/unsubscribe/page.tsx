"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="w-full max-w-md px-5">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
          >
            <span className="text-accent">T</span>EM
          </Link>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-10">
          <h1 className="font-display font-bold text-2xl text-offwhite tracking-tight text-center">
            Unsubscribe
          </h1>

          {status === "done" ? (
            <div className="mt-8 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
                <circle cx="24" cy="24" r="24" fill="#CB4A33" opacity="0.15" />
                <path d="M14 24.5l6 6 14-14" stroke="#CB4A33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-4 text-gray-muted font-body text-base leading-relaxed">
                You&rsquo;ve been unsubscribed. We&rsquo;re sorry to see you go.
              </p>
              <p className="mt-2 text-gray-secondary font-body text-sm">
                You can always re-subscribe from the{" "}
                <Link href="/#join" className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">
                  homepage
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mt-4 text-gray-muted font-body text-sm text-center leading-relaxed">
                Enter your email to unsubscribe from The Explorer Mindset
                newsletter.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-navy-900 border border-border-subtle text-offwhite placeholder:text-gray-secondary rounded-xl px-5 py-3.5 font-body text-base focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white/[0.06] border border-white/[0.08] text-offwhite font-display font-semibold rounded-xl px-6 py-3.5 text-sm uppercase tracking-[0.06em] hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {status === "loading" ? "Processing..." : "Unsubscribe"}
                </button>
              </form>

              {status === "error" && (
                <p className="mt-4 text-accent text-sm font-body text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-secondary font-display uppercase tracking-[0.08em] hover:text-offwhite transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
