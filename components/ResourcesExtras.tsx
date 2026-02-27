import type { Dictionary } from "@/dictionaries/getDictionary";

type ResourcesDict = Dictionary["resources"];

const extrasIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
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

export function ResourcesExtras({ dict }: { dict: ResourcesDict }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {dict.extras.items.map((item) => (
        <div
          key={item.title}
          className="group relative flex h-full flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]"
        >
          <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent">
            {extrasIcon}
          </div>
          <h3 className="mt-5 font-display font-bold text-xl text-offwhite tracking-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-gray-muted font-body text-sm leading-[1.75]">
            {item.description}
          </p>
          <ComingSoonLabel label={dict.comingSoon} />
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
}
