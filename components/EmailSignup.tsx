"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SectionBadge } from "./SectionBadge";
import { DottedPathConnector } from "./DottedPath";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const subscribe = useMutation(api.subscribers.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await subscribe({ email });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="join"
      className="relative bg-gradient-to-br from-navy-800 to-navy-600 py-16 md:py-24 overflow-hidden"
    >
      <DottedPathConnector className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <SectionBadge label="Join the Journey" />

        <h2 className="mt-8 font-display font-bold text-2xl md:text-3xl text-offwhite max-w-xl mx-auto leading-snug">
          The world won&rsquo;t stop changing. Choose how you grow with it.
        </h2>

        <p className="mt-4 text-gray-muted font-body text-base md:text-lg max-w-lg mx-auto">
          Sign up for reflections on curiosity, adaptability, and
          resilience&mdash;straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="mt-10 flex items-center justify-center gap-3 text-offwhite text-lg font-body">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#CB4A33" />
              <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            You&rsquo;re on the path.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full sm:flex-1 bg-navy-900 border border-border-subtle text-offwhite placeholder:text-gray-secondary rounded-xl px-5 py-3 font-body text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-accent text-offwhite font-display font-semibold rounded-xl px-6 py-3 text-base hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-accent text-sm font-body">{errorMessage}</p>
        )}

        {status !== "success" && (
          <p className="mt-4 text-gray-secondary text-sm font-body">
            No spam. Unsubscribe anytime.
          </p>
        )}
      </div>
    </section>
  );
}
