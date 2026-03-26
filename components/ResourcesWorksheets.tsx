"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Dictionary, Lang } from "@/dictionaries/getDictionary";
import { DownloadGateModal } from "./DownloadGateModal";

type ResourcesDict = Dictionary["resources"];

const worksheetIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
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

function DownloadButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-auto pt-6 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent hover:text-accent-hover transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </button>
  );
}

type CardItem = { title: string; description: string; published: boolean; url: string | null };

function WorksheetsGrid({
  items,
  comingSoon,
  download,
  onDownload,
}: {
  items: CardItem[];
  comingSoon: string;
  download: string;
  onDownload: (item: CardItem) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="group relative flex h-full flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-9 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.15)]"
        >
          <div className="text-accent/70 transition-colors duration-500 group-hover:text-accent">
            {worksheetIcon}
          </div>
          <h3 className="mt-5 font-display font-bold text-xl text-offwhite tracking-tight">{item.title}</h3>
          <p className="mt-2 text-gray-muted font-body text-sm leading-[1.75]">{item.description}</p>
          {item.published && item.url ? (
            <DownloadButton label={download} onClick={() => onDownload(item)} />
          ) : (
            <ComingSoonLabel label={comingSoon} />
          )}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
}

function WorksheetsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[0, 1].map((i) => (
        <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-9 animate-pulse">
          <div className="w-8 h-8 bg-white/[0.08] rounded-lg mb-5" />
          <div className="h-5 bg-white/[0.08] rounded-full w-1/2 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-white/[0.05] rounded-full w-full" />
            <div className="h-3 bg-white/[0.05] rounded-full w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResourcesWorksheets({ dict, lang }: { dict: ResourcesDict; lang: Lang }) {
  const convexItems = useQuery(api.resources.listBySection, { section: "worksheets" });
  const [gateItem, setGateItem] = useState<CardItem | null>(null);

  const fallback: CardItem[] = dict.worksheets.items.map((i) => ({
    title: i.title,
    description: i.description,
    published: false,
    url: null,
  }));

  if (convexItems === undefined) return <WorksheetsSkeleton />;

  const items: CardItem[] =
    convexItems.length === 0
      ? fallback
      : convexItems.map((r) => ({
          title: lang === "fr" ? r.titleFr : r.titleEn,
          description: lang === "fr" ? r.descriptionFr : r.descriptionEn,
          published: r.published,
          url: lang === "fr" ? r.urlFr : r.urlEn,
        }));

  return (
    <>
      <WorksheetsGrid
        items={items}
        comingSoon={dict.comingSoon}
        download={dict.download}
        onDownload={setGateItem}
      />
      {gateItem && gateItem.url && (
        <DownloadGateModal
          resourceTitle={gateItem.title}
          downloadUrl={gateItem.url}
          source="worksheets"
          lang={lang}
          dict={dict.downloadGate}
          onClose={() => setGateItem(null)}
        />
      )}
    </>
  );
}
