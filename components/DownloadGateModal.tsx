"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type DownloadGateDict = Dictionary["resources"]["downloadGate"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Props {
  resourceTitle: string;
  downloadUrl: string;
  source: "worksheets" | "extras";
  lang: Lang;
  dict: DownloadGateDict;
  onClose: () => void;
}

export function DownloadGateModal({ resourceTitle, downloadUrl, source, lang, dict, onClose }: Props) {
  const subscribe = useMutation(api.subscribers.subscribe);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mount animation
    const raf = requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 200);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !EMAIL_RE.test(email.trim())) return;
    setStatus("submitting");
    try {
      await subscribe({
        email: email.trim(),
        firstName: firstName.trim(),
        preferredLang: lang,
        source,
        resourceTitle,
      });
      window.open(downloadUrl, "_blank");
      handleClose();
    } catch {
      setStatus("error");
    }
  }

  const transition = "opacity 0.2s ease, transform 0.2s ease";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(10px)",
          transition,
        }}
      >
        <div className="bg-navy-900 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6),0_0_80px_-32px_rgba(203,74,51,0.15)]">
          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="p-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-1.5 text-gray-secondary/40 hover:text-offwhite transition-colors rounded-md hover:bg-white/[0.06]"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>

              <h3 className="font-display font-bold text-xl text-offwhite mb-1.5 tracking-tight">
                {dict.heading}
              </h3>
              <p className="font-body text-sm text-gray-muted leading-relaxed">
                {dict.description}
              </p>

              {/* Resource chip */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-accent/[0.08] border border-accent/20 rounded-xl max-w-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-accent shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="font-display text-xs font-semibold text-offwhite/80 tracking-wide truncate">
                  {resourceTitle}
                </span>
              </div>

              <div className="mt-5 h-px bg-gradient-to-r from-white/[0.06] via-white/[0.04] to-transparent" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary mb-1.5">
                  {dict.firstName}
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={dict.firstName}
                  required
                  autoFocus
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-offwhite placeholder:text-gray-secondary/30 focus:outline-none focus:border-accent/40 transition-colors font-body"
                />
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary mb-1.5">
                  {dict.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.emailPlaceholder}
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-offwhite placeholder:text-gray-secondary/30 focus:outline-none focus:border-accent/40 transition-colors font-body"
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-body text-red-400/90">{dict.error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-offwhite font-display font-semibold text-sm uppercase tracking-[0.08em] rounded-xl transition-colors duration-200"
              >
                {status !== "submitting" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                )}
                {status === "submitting" ? dict.submitting : dict.submit}
              </button>
            </form>

            {/* Privacy */}
            <p className="mt-5 text-center font-body text-[11px] text-gray-secondary/40 leading-relaxed">
              {dict.privacy}{" "}
              <a
                href={lang === "fr" ? "/fr/privacy" : "/privacy"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-secondary/60 underline underline-offset-2 hover:text-gray-muted transition-colors"
              >
                {dict.privacyLink}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
