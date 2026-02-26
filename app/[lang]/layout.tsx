import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "https://theexplorermindset.com",
      languages: {
        en: "https://theexplorermindset.com",
        fr: "https://theexplorermindset.com/fr",
      },
    },
  };
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Set the html lang attribute via a script since the root layout owns <html>
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${lang === "fr" ? "fr" : "en"}";`,
        }}
      />
      {children}
    </>
  );
}
