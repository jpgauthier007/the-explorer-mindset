import Link from "next/link";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);
  const p = dict.privacy;
  const homeHref = lang === "fr" ? "/fr" : "/";

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header bar */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-[720px] px-5 md:px-10 py-6 flex items-center justify-between">
          <Link
            href={homeHref}
            className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors"
          >
            T<span className="text-accent">E</span>M
          </Link>
          <span className="text-xs font-display uppercase tracking-[0.1em] text-gray-secondary">
            {p.headerLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-[720px] px-5 md:px-10 py-16 md:py-24">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-offwhite tracking-tight">
          {p.title}
        </h1>
        <p className="mt-3 text-sm text-gray-secondary font-display uppercase tracking-[0.08em]">
          {p.lastUpdated}
        </p>

        <div className="mt-12 space-y-10 text-gray-muted font-body text-base leading-[1.85]">
          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.whatWeCollect}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: p.whatWeCollectText }} />
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.howWeUse}
            </h2>
            <p>{p.howWeUseText}</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.whereStored}
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: p.whereStoredText }}
              className="[&_a]:text-accent [&_a]:hover:text-accent-hover [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors"
            />
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.yourRights}
            </h2>
            <p>{p.yourRightsIntro}</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li dangerouslySetInnerHTML={{ __html: p.rightUnsubscribe }} className="[&_strong]:text-offwhite" />
              <li dangerouslySetInnerHTML={{ __html: p.rightDeletion }} className="[&_strong]:text-offwhite" />
              <li dangerouslySetInnerHTML={{ __html: p.rightKnow }} className="[&_strong]:text-offwhite" />
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.cookies}
            </h2>
            <p>{p.cookiesText}</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.retention}
            </h2>
            <p>{p.retentionText}</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-offwhite mb-3">
              {p.contact}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: p.contactText }} className="[&_strong]:text-offwhite" />
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border-subtle">
          <Link
            href={homeHref}
            className="text-sm text-gray-secondary font-display uppercase tracking-[0.08em] hover:text-offwhite transition-colors"
          >
            {p.backHome}
          </Link>
        </div>
      </article>
    </div>
  );
}
