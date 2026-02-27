import type { Dictionary } from "@/dictionaries/getDictionary";

type ResourcesDict = Dictionary["resources"];

const assessmentIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

function ComingSoonLabel({ label }: { label: string }) {
  return (
    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.12em] text-gray-secondary/60">
      <span className="w-4 h-px bg-gray-secondary/30" />
      {label}
      <span className="w-4 h-px bg-gray-secondary/30" />
    </span>
  );
}

export function ResourcesAssessment({ dict }: { dict: ResourcesDict }) {
  return (
    <div className="group relative flex flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent shrink-0">
          {assessmentIcon}
        </div>
        <div>
          <p className="text-gray-muted font-body text-base leading-[1.75]">
            {dict.assessment.description}
          </p>
        </div>
      </div>
      <ComingSoonLabel label={dict.comingSoon} />
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
