import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResourcesSubNav } from "@/components/ResourcesSubNav";
import { SectionBadge } from "@/components/SectionBadge";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function ResourcesSectionsLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);
  const resourcesBase = lang === "fr" ? "/fr/resources" : "/resources";

  return (
    <>
      <Header dict={dict.header} lang={lang} />
      <main>
        <div className="relative bg-navy-900 min-h-screen">
          {/* Background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 pt-28 pb-20">
            {/* Back to hub */}
            <a
              href={resourcesBase}
              className="inline-block font-body text-sm text-gray-secondary hover:text-offwhite transition-colors mb-12"
            >
              {dict.resources.backResources}
            </a>

            {/* Page header */}
            <div className="mb-10">
              <SectionBadge label={dict.resources.badge} />
              <h1 className="mt-8 font-display font-bold text-3xl md:text-5xl text-offwhite tracking-tight">
                {dict.resources.heading}
              </h1>
              <p className="mt-5 text-gray-muted font-body text-base md:text-lg max-w-lg leading-relaxed">
                {dict.resources.description}
              </p>
            </div>

            {/* Sub-nav */}
            <ResourcesSubNav dict={dict.resources.subnav} lang={lang} />

            {/* Section content */}
            <div className="mt-12">{children}</div>
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
