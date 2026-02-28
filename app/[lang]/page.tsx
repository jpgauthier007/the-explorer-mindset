import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutBook } from "@/components/AboutBook";
import { ThreePillars } from "@/components/ThreePillars";
import { AboutAuthor } from "@/components/AboutAuthor";
import { BuyBook } from "@/components/BuyBook";
import { EmailSignup } from "@/components/EmailSignup";
import { Footer } from "@/components/Footer";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict.header} lang={lang} />
      <main>
        <Hero dict={dict.hero} lang={lang} />
        <AboutBook dict={dict.aboutBook} />
        <BuyBook dict={dict.buyBook} />
        <ThreePillars dict={dict.threePillars} />
        <AboutAuthor dict={dict.aboutAuthor} />
        <EmailSignup dict={dict.emailSignup} lang={lang} />
        <Footer dict={dict.footer} lang={lang} />
      </main>
    </>
  );
}
