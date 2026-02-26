"use client";

import { useEffect, useState } from "react";
import { SectionBadge } from "./SectionBadge";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { UnsubscribePopover } from "./UnsubscribePopover";

function generateChallenge() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b, question: `${a} + ${b}` };
}

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [challenge, setChallenge] = useState<{ a: number; b: number; answer: number; question: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setChallenge(generateChallenge());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!challenge || parseInt(mathAnswer, 10) !== challenge.answer) {
      setStatus("error");
      setErrorMessage("Incorrect answer. Please try again.");
      setChallenge(generateChallenge());
      setMathAnswer("");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          mathChallenge: { a: challenge.a, b: challenge.b },
          mathAnswer: parseInt(mathAnswer, 10),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        setChallenge(generateChallenge());
        setMathAnswer("");
        return;
      }

      setStatus(data.alreadySubscribed ? "already" : "success");
      setEmail("");
      setMathAnswer("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
      setChallenge(generateChallenge());
      setMathAnswer("");
    }
  };

  return (
    <section
      id="join"
      className="relative bg-navy-900 py-28 md:py-36 overflow-hidden"
    >
      {/* Large radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <AnimateOnScroll>
          <SectionBadge label="Join the Journey" />

          <h2 className="mt-8 font-display font-bold text-3xl md:text-4xl text-offwhite max-w-xl mx-auto leading-tight tracking-tight">
            The world won&rsquo;t stop changing.
            <br />
            <span className="text-accent">Choose how you grow</span> with it.
          </h2>

          <p className="mt-5 text-gray-muted font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Sign up for reflections on curiosity, adaptability, and
            resilience&thinsp;&mdash;&thinsp;straight to your inbox.
          </p>

          {status === "success" ? (
            <div className="mt-12 inline-flex items-center gap-3 bg-white/[0.04] border border-accent/20 rounded-2xl px-8 py-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="#CB4A33" opacity="0.9" />
                <path d="M8 14.5l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-offwhite text-lg font-body">
                You&rsquo;re on the path. Welcome aboard.
              </span>
            </div>
          ) : status === "already" ? (
            <div className="mt-12 inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-8 py-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="#CB4A33" opacity="0.6" />
                <path d="M14 9v6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="14" cy="19" r="1.5" fill="white" />
              </svg>
              <span className="text-offwhite text-lg font-body">
                You&rsquo;re already subscribed&thinsp;&mdash;&thinsp;stay tuned!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-12 relative max-w-lg mx-auto"
            >
              {/* Glass form container */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-2">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-offwhite placeholder:text-gray-secondary rounded-xl px-5 py-3.5 font-body text-base focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-accent text-offwhite font-display font-semibold rounded-xl px-8 py-3.5 text-sm uppercase tracking-[0.06em] hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-300 disabled:opacity-60 cursor-pointer hover:shadow-[0_0_30px_-4px_rgba(203,74,51,0.4)]"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    "Start Exploring"
                  )}
                </button>
              </div>

              {/* Math challenge */}
              {challenge && (
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="text-offwhite text-sm font-body">
                    What is {challenge.question}?
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    placeholder="?"
                    className="w-14 bg-white/[0.04] border border-white/[0.08] text-offwhite text-center rounded-lg px-2 py-1.5 font-body text-sm focus:outline-none focus:border-accent/40 transition-colors"
                  />
                </div>
              )}
            </form>
          )}

          {status === "error" && (
            <p className="mt-4 text-accent text-sm font-body">{errorMessage}</p>
          )}

          {status !== "success" && status !== "already" && (
            <p className="mt-5 text-gray-secondary text-xs font-body">
              No spam &middot;{" "}
              <UnsubscribePopover />
              {" "}&middot;{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-offwhite transition-colors">
                Privacy
              </a>
            </p>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
