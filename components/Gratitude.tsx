"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SectionBadge } from "./SectionBadge";
import { DottedPathDivider } from "./DottedPath";
import type { Lang, Dictionary } from "@/dictionaries/getDictionary";

type GratitudeDict = Dictionary["gratitude"];

export function Gratitude({ dict, lang }: { dict: GratitudeDict; lang: Lang }) {
  const convexFeatured = useQuery(api.gratitude.listFeatured, {});
  const convexGroups = useQuery(api.gratitude.listGroups, {});

  const featured =
    convexFeatured && convexFeatured.length > 0
      ? convexFeatured.map((p) => ({
          name: p.name,
          role: lang === "fr" ? p.roleFr : p.roleEn,
          note: lang === "fr" ? p.noteFr : p.noteEn,
          photoUrl: p.photoUrl ?? null,
        }))
      : dict.featured.map((p) => ({ name: p.name, role: p.role, note: p.note, photoUrl: null }));

  const groups =
    convexGroups && convexGroups.length > 0
      ? convexGroups.map((g) => ({
          label: lang === "fr" ? g.labelFr : g.labelEn,
          description: lang === "fr" ? (g.descriptionFr ?? null) : (g.descriptionEn ?? null),
          names: g.names,
        }))
      : dict.groups.map((g) => ({ label: g.label, description: null, names: g.names }));

  return (
    <div className="relative bg-navy-900 min-h-screen overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 pt-28 pb-24">

        {/* Page header */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionBadge label={dict.badge} />
          <h1 className="mt-8 font-display font-bold text-3xl md:text-5xl text-offwhite tracking-tight">
            {dict.heading}
          </h1>
          <blockquote className="mt-8 font-body italic text-xl md:text-2xl text-offwhite/70 leading-relaxed">
            &ldquo;{dict.openingQuote}&rdquo;
          </blockquote>
        </div>

        {/* Featured people */}
        {featured.length > 0 && (
          <section className="mt-20">
            <p className="font-display text-xs uppercase tracking-[0.16em] text-accent/70 text-center mb-10">
              {dict.featuredHeading}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((person) => (
                <div
                  key={person.name}
                  className="group relative flex flex-col items-center text-center bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.05] hover:border-accent/20 hover:shadow-[0_0_60px_-12px_rgba(203,74,51,0.12)]"
                >
                  {/* Avatar */}
                  {person.photoUrl ? (
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={person.photoUrl}
                        alt={person.name}
                        className="relative w-24 h-24 rounded-full object-cover border-2 border-white/[0.1] group-hover:border-accent/30 transition-colors duration-500"
                      />
                    </div>
                  ) : null}
                  <p className="font-display text-[10px] uppercase tracking-[0.18em] text-accent/80 mb-3">
                    {person.role}
                  </p>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-offwhite tracking-tight">
                    {person.name}
                  </h2>
                  <p className="mt-4 font-body italic text-base text-gray-muted leading-[1.8]">
                    {person.note}
                  </p>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dotted divider */}
        {featured.length > 0 && groups.length > 0 && (
          <div className="flex justify-center my-20">
            <DottedPathDivider className="w-48" />
          </div>
        )}

        {/* Name groups */}
        {groups.length > 0 && (
          <section>
            <p className="font-display text-xs uppercase tracking-[0.16em] text-accent/70 text-center mb-12">
              {dict.groupsHeading}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {groups.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex-1 h-px bg-white/[0.06]" />
                    <span className="font-display text-[10px] uppercase tracking-[0.18em] text-gray-secondary">
                      {group.label}
                    </span>
                    <span className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                  {group.description && (
                    <p className="font-body text-sm text-gray-secondary/70 italic text-center leading-relaxed mb-5">
                      {group.description}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {group.names.map((name) => (
                      <li key={name} className="font-body text-base text-offwhite/75 text-center leading-relaxed">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
