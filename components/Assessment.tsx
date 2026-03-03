"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SectionBadge } from "./SectionBadge";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type AssessmentDict = Dictionary["assessment"];
type ProfileKey = "mapmaker" | "pathfinder" | "trailblazer" | "pioneer";
type Step = "intro" | "curiosity" | "adaptability" | "resilience" | "gate" | "results";

type Results = {
  curiosityScore: number;
  adaptabilityScore: number;
  resilienceScore: number;
  totalScore: number;
  profile: ProfileKey;
};

type Answers = Record<number, number>;

const SECTION_STEPS: Step[] = ["curiosity", "adaptability", "resilience"];

const PROGRESS: Record<Step, number> = {
  intro: 0,
  curiosity: 20,
  adaptability: 45,
  resilience: 70,
  gate: 88,
  results: 100,
};

// ─── Rating row ───────────────────────────────────────────────────────────────

function RatingRow({
  questionId,
  text,
  number,
  answer,
  scaleLabels,
  onAnswer,
}: {
  questionId: number;
  text: string;
  number: number;
  answer: number | undefined;
  scaleLabels: string[];
  onAnswer: (id: number, val: number) => void;
}) {
  return (
    <div className="py-5 border-b border-white/[0.05] last:border-0">
      <p className="font-body text-base text-offwhite/90 leading-relaxed mb-4">
        <span className="font-display text-xs uppercase tracking-[0.12em] text-accent/60 mr-3">
          {number}
        </span>
        {text}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-display text-gray-secondary/50 w-14 shrink-0">
          {scaleLabels[0]}
        </span>
        <div className="flex flex-1 gap-2">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              onClick={() => onAnswer(questionId, val)}
              className={`flex-1 h-10 rounded-xl font-display text-sm font-bold transition-all duration-200 ${
                answer === val
                  ? "bg-accent text-offwhite shadow-[0_0_20px_-4px_rgba(203,74,51,0.5)]"
                  : "bg-white/[0.04] border border-white/[0.08] text-gray-secondary hover:bg-white/[0.08] hover:text-offwhite"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-display text-gray-secondary/50 w-14 shrink-0 text-right">
          {scaleLabels[4]}
        </span>
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden mb-10">
      <div
        className="h-full bg-accent transition-all duration-700 ease-out rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Score bar ────────────────────────────────────────────────────────────────

function ScoreBar({ label, score, max, suffix }: { label: string; score: number; max: number; suffix: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth((score / max) * 100), 120);
    return () => clearTimeout(t);
  }, [score, max]);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-display text-xs uppercase tracking-[0.12em] text-gray-secondary">
          {label}
        </span>
        <span className="font-display text-sm font-bold text-offwhite">
          {score}
          <span className="text-gray-secondary/60 font-normal">{suffix}</span>
        </span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Assessment({ dict, lang }: { dict: AssessmentDict; lang: Lang }) {
  const submitAssessment = useMutation(api.assessment.submitAssessment);

  const [step, setStep] = useState<Step>("intro");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Results | null>(null);

  function setAnswer(id: number, val: number) {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  function reset() {
    setStep("intro");
    setSectionIdx(0);
    setAnswers({});
    setFirstName("");
    setEmail("");
    setError(null);
    setResults(null);
  }

  // Section helpers
  const currentSection = dict.sections[sectionIdx];
  const sectionStartId = sectionIdx * 6 + 1;
  const sectionQIds = Array.from({ length: 6 }, (_, i) => sectionStartId + i);
  const sectionAnswered = sectionQIds.every((id) => answers[id] !== undefined);
  const isLastSection = sectionIdx === 2;

  function goNextSection() {
    if (isLastSection) {
      setStep("gate");
    } else {
      setSectionIdx((i) => i + 1);
      setStep(SECTION_STEPS[sectionIdx + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goPrevSection() {
    if (sectionIdx === 0) {
      setStep("intro");
    } else {
      setSectionIdx((i) => i - 1);
      setStep(SECTION_STEPS[sectionIdx - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const answersArray = Object.entries(answers).map(([id, answer]) => ({
      questionId: Number(id),
      answer,
    }));

    setLoading(true);
    try {
      const res = await submitAssessment({
        email,
        firstName: firstName.trim() || undefined,
        lang,
        answers: answersArray,
      });
      setResults(res as Results);
      setStep("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(msg.includes("email") ? dict.errors.email : dict.errors.generic);
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-offwhite placeholder:text-gray-secondary/50 font-body text-base focus:outline-none focus:border-accent/40 transition-colors";

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (step === "intro") {
    return (
      <div className="max-w-2xl mx-auto">
        <ProgressBar pct={PROGRESS.intro} />
        <div className="text-center">
          <SectionBadge label={dict.badge} />
          <h2 className="mt-8 font-display font-bold text-2xl md:text-4xl text-offwhite tracking-tight">
            {dict.heading}
          </h2>
          <p className="mt-6 font-body text-base md:text-lg text-gray-muted leading-relaxed">
            {dict.instructions}
          </p>

          {/* Scale preview */}
          <div className="mt-8 flex justify-between items-center bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-4">
            {dict.scaleLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center font-display text-sm font-bold text-gray-secondary">
                  {i + 1}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.1em] text-gray-secondary/70">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Section overview */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {dict.sections.map((s, i) => (
              <div key={s.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-center">
                <p className="font-display text-[10px] uppercase tracking-[0.12em] text-accent/60 mb-1">
                  {i + 1}
                </p>
                <p className="font-display text-sm font-semibold text-offwhite">{s.title}</p>
                <p className="font-body text-xs text-gray-secondary/60 mt-0.5">6 questions</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setStep("curiosity"); setSectionIdx(0); }}
            className="mt-10 w-full bg-accent text-offwhite font-display font-semibold rounded-xl px-8 py-4 text-sm uppercase tracking-[0.08em] hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(203,74,51,0.4)]"
          >
            {dict.start}
          </button>
        </div>
      </div>
    );
  }

  // ── Section ────────────────────────────────────────────────────────────────
  if (step === "curiosity" || step === "adaptability" || step === "resilience") {
    return (
      <div className="max-w-2xl mx-auto">
        <ProgressBar pct={PROGRESS[step]} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.16em] text-accent/70">
              {currentSection.questionsLabel}
            </p>
            <h2 className="mt-1 font-display font-bold text-2xl md:text-3xl text-offwhite tracking-tight">
              {currentSection.title}
            </h2>
          </div>
          <span className="font-display text-xs uppercase tracking-[0.1em] text-gray-secondary/50">
            {sectionIdx + 1} / 3
          </span>
        </div>

        {/* Questions */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl px-6 py-2 mb-8">
          {currentSection.questions.map((q, i) => (
            <RatingRow
              key={i}
              questionId={sectionStartId + i}
              text={q}
              number={sectionStartId + i}
              answer={answers[sectionStartId + i]}
              scaleLabels={dict.scaleLabels}
              onAnswer={setAnswer}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={goPrevSection}
            className="px-6 py-3.5 font-display text-sm uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-xl hover:text-offwhite hover:border-white/20 transition-colors"
          >
            {dict.previous}
          </button>
          <button
            onClick={goNextSection}
            disabled={!sectionAnswered}
            className="flex-1 bg-accent text-offwhite font-display font-semibold rounded-xl px-8 py-3.5 text-sm uppercase tracking-[0.08em] hover:bg-accent-hover transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_30px_-4px_rgba(203,74,51,0.4)]"
          >
            {dict.next}
          </button>
        </div>

        {!sectionAnswered && (
          <p className="mt-3 text-center font-body text-xs text-gray-secondary/50">
            {lang === "fr"
              ? "Répondez à toutes les questions pour continuer."
              : "Answer all questions to continue."}
          </p>
        )}
      </div>
    );
  }

  // ── Gate ───────────────────────────────────────────────────────────────────
  if (step === "gate") {
    return (
      <div className="max-w-md mx-auto">
        <ProgressBar pct={PROGRESS.gate} />

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-accent">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-offwhite tracking-tight">
            {dict.gate.heading}
          </h2>
          <p className="mt-3 font-body text-base text-gray-muted">
            {dict.gate.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder={dict.gate.firstNamePlaceholder}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputCls}
          />
          <input
            type="email"
            required
            placeholder={dict.gate.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />

          {error && <p className="font-body text-sm text-accent">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-offwhite font-display font-semibold rounded-xl px-8 py-4 text-sm uppercase tracking-[0.08em] hover:bg-accent-hover transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? dict.gate.submitting : dict.gate.submit}
          </button>

          <p className="text-center font-body text-xs text-gray-secondary/50 pt-1">
            {dict.gate.privacyNote}
          </p>
        </form>

        <button
          onClick={() => { setStep("resilience"); setSectionIdx(2); }}
          className="mt-6 w-full text-center font-display text-xs uppercase tracking-[0.1em] text-gray-secondary/50 hover:text-gray-secondary transition-colors"
        >
          {dict.previous}
        </button>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (step === "results" && results) {
    const profile = dict.profiles[results.profile];

    return (
      <div className="max-w-2xl mx-auto">
        <ProgressBar pct={PROGRESS.results} />

        {/* Profile */}
        <div className="text-center mb-12">
          <SectionBadge label={dict.results.badge} />
          <div className="mt-8 inline-flex items-center gap-3 bg-accent/[0.08] border border-accent/20 rounded-full px-5 py-1.5">
            <span className="font-display text-xs uppercase tracking-[0.12em] text-accent/70">
              {profile.range}
            </span>
          </div>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl text-offwhite tracking-tight">
            {profile.name}
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-gray-muted leading-relaxed max-w-xl mx-auto">
            {profile.description}
          </p>
        </div>

        {/* Score bars */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 space-y-6 mb-6">
          <ScoreBar label={dict.results.curiosityLabel} score={results.curiosityScore} max={30} suffix={dict.results.outOf30} />
          <ScoreBar label={dict.results.adaptabilityLabel} score={results.adaptabilityScore} max={30} suffix={dict.results.outOf30} />
          <ScoreBar label={dict.results.resilienceLabel} score={results.resilienceScore} max={30} suffix={dict.results.outOf30} />

          {/* Total */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="font-display text-sm uppercase tracking-[0.12em] text-offwhite/80">
              {dict.results.totalLabel}
            </span>
            <span className="font-display text-2xl font-bold text-offwhite">
              {results.totalScore}
              <span className="text-gray-secondary/60 text-sm font-normal">{dict.results.outOf90}</span>
            </span>
          </div>
        </div>

        {/* Restart */}
        <button
          onClick={reset}
          className="w-full border border-white/[0.08] text-gray-secondary font-display text-sm uppercase tracking-[0.08em] rounded-xl px-8 py-3.5 hover:text-offwhite hover:border-white/20 transition-colors"
        >
          {dict.results.restart}
        </button>

        {/* Footnote */}
        <p className="mt-8 font-body text-xs text-gray-secondary/40 text-center leading-relaxed">
          {dict.results.footnote}
        </p>
      </div>
    );
  }

  return null;
}
