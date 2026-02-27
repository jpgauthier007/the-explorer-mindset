import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResourcesSubNav } from "@/components/ResourcesSubNav";
import { SectionBadge } from "@/components/SectionBadge";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function ResourcesSectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("en");

  return (
    <>
      <Header dict={dict.header} lang="en" />
      <main>
        <div className="relative bg-navy-900 min-h-screen">
          {/* Background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 pt-24 pb-20">
            {/* Page header */}
            <div className="mb-8 text-center">
              <SectionBadge label={dict.resources.badge} />
              <h1 className="mt-8 font-display font-bold text-3xl md:text-5xl text-offwhite tracking-tight">
                {dict.resources.heading}
              </h1>
              <p className="mt-5 text-gray-muted font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                {dict.resources.description}
              </p>
            </div>

            {/* Sub-nav */}
            <ResourcesSubNav dict={dict.resources.subnav} lang="en" />

            {/* Section content */}
            <div className="mt-12">{children}</div>
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} lang="en" />
    </>
  );
}
