import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutBook } from "@/components/AboutBook";
import { ThreePillars } from "@/components/ThreePillars";
import { AboutAuthor } from "@/components/AboutAuthor";
import { BuyBook } from "@/components/BuyBook";
import { EmailSignup } from "@/components/EmailSignup";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function Home() {
  const dict = await getDictionary("en");

  return (
    <>
      <Header dict={dict.header} lang="en" />
      <main>
        <Hero dict={dict.hero} lang="en" />
        <AboutBook dict={dict.aboutBook} />
        <BuyBook dict={dict.buyBook} />
        <ThreePillars dict={dict.threePillars} />
        <AboutAuthor dict={dict.aboutAuthor} />
        <EmailSignup dict={dict.emailSignup} lang="en" />
        <Footer dict={dict.footer} lang="en" />
      </main>
    </>
  );
}
