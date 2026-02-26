export function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-accent text-offwhite text-xs font-display font-semibold uppercase tracking-[0.08em] px-4 py-1.5 rounded-full">
      {label}
    </span>
  );
}
