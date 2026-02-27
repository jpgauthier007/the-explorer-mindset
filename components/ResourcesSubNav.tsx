"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type SubNavDict = Dictionary["resources"]["subnav"];

export function ResourcesSubNav({
  dict,
  lang,
}: {
  dict: SubNavDict;
  lang: Lang;
}) {
  const pathname = usePathname();
  const base = lang === "fr" ? "/fr/resources" : "/resources";

  const tabs = [
    { label: dict.worksheets, href: `${base}/worksheets`, segment: "worksheets" },
    { label: dict.assessment, href: `${base}/assessment`, segment: "assessment" },
    { label: dict.extras, href: `${base}/extras`, segment: "extras" },
  ];

  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  const activeIndex = tabs.findIndex((t) => pathname.endsWith(t.segment));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const idx = activeIndex >= 0 ? activeIndex : 0;
    const el = tabRefs.current[idx];
    if (el) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeIndex, mounted]);

  return (
    <div className="relative flex gap-8 border-b border-white/[0.06]">
      {tabs.map((tab, i) => (
        <a
          key={tab.href}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          href={tab.href}
          className={`font-display text-xs uppercase tracking-[0.12em] pb-4 transition-colors duration-200 ${
            i === activeIndex
              ? "text-offwhite"
              : "text-gray-secondary hover:text-offwhite/70"
          }`}
        >
          {tab.label}
        </a>
      ))}
      {/* Sliding underline */}
      <div
        className="absolute bottom-[-1px] h-[2px] bg-accent transition-all duration-300 ease-out"
        style={
          mounted
            ? { left: underline.left, width: underline.width }
            : { opacity: 0 }
        }
      />
    </div>
  );
}
