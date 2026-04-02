"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PickType = "Book" | "Quote" | "Tool";

interface NewsletterFields {
  issueNumber: string;
  date: string;
  insightTitle: string;
  insightBody: string;
  pickType: PickType;
  pickLabel: string;
  pickContent: string;
  signoff: string;
}

const DEFAULTS: NewsletterFields = {
  issueNumber: "1",
  date: "April 2026",
  insightTitle: "Your insight title",
  insightBody:
    "Your main reflection goes here. Share what you've been exploring, learning, or noticing. Keep it personal and direct.\n\nA second paragraph can add depth or a practical takeaway readers can use this week.",
  pickType: "Book",
  pickLabel: "Title by Author",
  pickContent: "One or two sentences on why you're sharing this. What did it open up for you?",
  signoff: "Until next time, stay curious.",
};

const PICK_COLORS: Record<PickType, { border: string; text: string; bg: string }> = {
  Book:  { border: "rgba(96,165,250,0.3)",  text: "#60A5FA", bg: "rgba(96,165,250,0.08)"  },
  Quote: { border: "rgba(167,139,250,0.3)", text: "#A78BFA", bg: "rgba(167,139,250,0.08)" },
  Tool:  { border: "rgba(52,211,153,0.3)",  text: "#34D399", bg: "rgba(52,211,153,0.08)"  },
};

// ─── HTML generation ──────────────────────────────────────────────────────────

function formatBodyHTML(text: string): string {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return paragraphs
    .map((p, i) => {
      const mb = i < paragraphs.length - 1 ? "16px" : "0";
      return `<p style="margin:0 0 ${mb};font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#C6CBC7;line-height:1.75;">${p.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function generateHTML(f: NewsletterFields): string {
  const pc = PICK_COLORS[f.pickType];
  const bodyHtml = formatBodyHTML(f.insightBody);
  const signoffHtml = f.signoff.trim()
    ? `<p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#C6CBC7;font-style:italic;line-height:1.65;">${f.signoff}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>The Explorer Mindset</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0F14;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0F14;">
<tr><td align="center" style="padding:32px 16px;">

<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

<!-- HEADER -->
<tr><td style="background-color:#141B2D;padding:28px 36px;border-radius:12px 12px 0 0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:middle;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:#F5F6F9;line-height:1;">T<span style="color:#CB4A33;">E</span>M</p>
  <p style="margin:5px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A8299;">The Explorer Mindset</p>
</td>
<td align="right" style="vertical-align:middle;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#7A8299;text-align:right;line-height:1.6;">Issue #${f.issueNumber}<br><span style="color:#C6CBC7;">${f.date}</span></p>
</td>
</tr></table>
</td></tr>

<!-- FEATURED INSIGHT -->
<tr><td style="background-color:#1E2D4D;padding:36px 36px 32px;border-top:1px solid rgba(245,246,249,0.08);">
  <p style="margin:0 0 20px;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#CB4A33;border:1px solid rgba(203,74,51,0.3);padding:5px 14px;border-radius:20px;background-color:rgba(203,74,51,0.08);">&#9679;&nbsp; Featured Insight</p>
  <h2 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:#F5F6F9;line-height:1.3;">${f.insightTitle}</h2>
  ${bodyHtml}
</td></tr>

<!-- EXPLORER PICK -->
<tr><td style="background-color:#141B2D;padding:28px 36px;border-top:1px solid rgba(245,246,249,0.06);">
  <p style="margin:0 0 14px;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${pc.text};border:1px solid ${pc.border};padding:5px 14px;border-radius:20px;background-color:${pc.bg};">Explorer ${f.pickType}</p>
  <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#F5F6F9;line-height:1.4;">${f.pickLabel}</p>
  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#C6CBC7;line-height:1.65;">${f.pickContent}</p>
</td></tr>

<!-- ORANGE DIVIDER -->
<tr><td style="background-color:#141B2D;padding:0 36px;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="height:2px;background-color:#CB4A33;font-size:0;line-height:0;">&nbsp;</td></tr>
  </table>
</td></tr>

<!-- SIGN OFF -->
<tr><td style="background-color:#141B2D;padding:24px 36px 32px;">
  ${signoffHtml}
  <p style="margin:0 0 3px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#F5F6F9;letter-spacing:0.3px;">Jean-Philippe Gauthier</p>
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#7A8299;">Author, The Explorer Mindset</p>
</td></tr>

<!-- FOOTER -->
<tr><td style="background-color:#0D0F14;padding:20px 36px;border-radius:0 0 12px 12px;border-top:1px solid rgba(245,246,249,0.06);">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#7A8299;text-align:center;line-height:1.9;">
    You're receiving this because you signed up at theexplorermindset.com.<br>
    <a href="{{unsubscribe_url}}" style="color:#CB4A33;text-decoration:none;">Unsubscribe</a>
    &nbsp;&middot;&nbsp;
    <a href="https://theexplorermindset.com/privacy" style="color:#7A8299;text-decoration:none;">Privacy Policy</a>
  </p>
</td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;
}

// ─── Shared input styles (matching AdminCMS) ───────────────────────────────────

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body";
const textareaCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body resize-none";
const labelCls =
  "block font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary mb-1.5";

// ─── Component ────────────────────────────────────────────────────────────────

export function NewsletterCMS() {
  const [fields, setFields] = useState<NewsletterFields>(DEFAULTS);
  const [copied, setCopied] = useState(false);

  const html = generateHTML(fields);

  function set<K extends keyof NewsletterFields>(key: K, value: NewsletterFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[460px_1fr] gap-6 items-start">

      {/* ── LEFT: Form ──────────────────────────────────────────────────────── */}
      <div className="space-y-4">

        {/* Issue info */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <p className={labelCls}>Issue Info</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Issue Number</label>
              <input
                className={inputCls}
                type="text"
                placeholder="1"
                value={fields.issueNumber}
                onChange={(e) => set("issueNumber", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input
                className={inputCls}
                type="text"
                placeholder="April 2026"
                value={fields.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Featured Insight */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <p className={labelCls}>Featured Insight</p>
          <div>
            <label className={labelCls}>Title</label>
            <input
              className={inputCls}
              type="text"
              placeholder="Your insight title"
              value={fields.insightTitle}
              onChange={(e) => set("insightTitle", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Body</label>
            <textarea
              className={textareaCls}
              rows={9}
              placeholder="Your main reflection. Use a blank line between paragraphs."
              value={fields.insightBody}
              onChange={(e) => set("insightBody", e.target.value)}
            />
            <p className="mt-1 font-body text-[11px] text-gray-secondary/50">
              Blank line = new paragraph in the email.
            </p>
          </div>
        </div>

        {/* Explorer Pick */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <p className={labelCls}>Explorer Pick</p>
          <div>
            <label className={labelCls}>Type</label>
            <div className="flex gap-2">
              {(["Book", "Quote", "Tool"] as PickType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("pickType", t)}
                  className={`flex-1 py-2 rounded-lg font-display text-xs uppercase tracking-[0.08em] border transition-all duration-200 ${
                    fields.pickType === t
                      ? "bg-accent/10 text-accent border-accent/30"
                      : "text-gray-secondary border-white/[0.08] hover:text-offwhite hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Label</label>
            <input
              className={inputCls}
              type="text"
              placeholder={
                fields.pickType === "Book"
                  ? "Title by Author"
                  : fields.pickType === "Quote"
                  ? "Author Name"
                  : "Tool Name"
              }
              value={fields.pickLabel}
              onChange={(e) => set("pickLabel", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Content</label>
            <textarea
              className={textareaCls}
              rows={3}
              placeholder="A short note on why you're sharing this."
              value={fields.pickContent}
              onChange={(e) => set("pickContent", e.target.value)}
            />
          </div>
        </div>

        {/* Sign-off */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <p className={labelCls}>Sign-off</p>
          <div>
            <label className={labelCls}>Personal note (optional)</label>
            <input
              className={inputCls}
              type="text"
              placeholder="Until next time, stay curious."
              value={fields.signoff}
              onChange={(e) => set("signoff", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT: Preview + Copy ────────────────────────────────────────────── */}
      <div className="space-y-3 sticky top-24">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <p className={labelCls}>Email Preview</p>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs uppercase tracking-[0.08em] border transition-all duration-200 ${
              copied
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-offwhite"
            }`}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-3.5 h-3.5">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy HTML
              </>
            )}
          </button>
        </div>

        {/* Browser chrome + iframe */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            <div className="flex-1 mx-3 py-1 px-3 rounded bg-white/[0.04] border border-white/[0.06]">
              <p className="font-body text-[11px] text-gray-secondary/50 truncate">
                Newsletter preview — email-safe HTML
              </p>
            </div>
          </div>
          <iframe
            srcDoc={html}
            className="w-full border-0 block"
            style={{ height: "720px" }}
            title="Newsletter email preview"
            sandbox="allow-same-origin"
          />
        </div>

        {/* Hint */}
        <p className="font-body text-[11px] text-gray-secondary/40 text-center">
          Click "Copy HTML" then paste directly into Mailchimp, Klaviyo, or ConvertKit as a custom HTML template.
        </p>
      </div>
    </div>
  );
}
