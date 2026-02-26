import { Header } from "@/components/Header";
import { Resources } from "@/components/Resources";
import { Footer } from "@/components/Footer";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function ResourcesPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict.header} lang={lang} />
      <main>
        <Resources dict={dict.resources} lang={lang} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
