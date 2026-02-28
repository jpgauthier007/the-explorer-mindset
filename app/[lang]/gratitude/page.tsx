import { Header } from "@/components/Header";
import { Gratitude } from "@/components/Gratitude";
import { Footer } from "@/components/Footer";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = { params: Promise<{ lang: string }> };

export default async function GratitudePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict.header} lang={lang} />
      <main>
        <Gratitude dict={dict.gratitude} lang={lang} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
