import type { Lang } from "@/dictionaries/getDictionary";

export function LanguageToggle({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center rounded-full border border-white/[0.1] overflow-hidden">
      <a
        href="/"
        className={`px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
          lang === "en"
            ? "bg-white/[0.1] text-offwhite"
            : "text-gray-secondary hover:text-offwhite"
        }`}
      >
        EN
      </a>
      <a
        href="/fr"
        className={`px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
          lang === "fr"
            ? "bg-white/[0.1] text-offwhite"
            : "text-gray-secondary hover:text-offwhite"
        }`}
      >
        FR
      </a>
    </div>
  );
}
