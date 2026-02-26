export function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-accent text-[11px] font-display font-semibold uppercase tracking-[0.16em]">
      <span className="w-8 h-px bg-accent/40" />
      {label}
      <span className="w-8 h-px bg-accent/40" />
    </span>
  );
}
