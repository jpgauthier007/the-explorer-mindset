import { Header } from "@/components/Header";
import { Gratitude } from "@/components/Gratitude";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function GratitudePage() {
  const dict = await getDictionary("en");

  return (
    <>
      <Header dict={dict.header} lang="en" />
      <main>
        <Gratitude dict={dict.gratitude} lang="en" />
      </main>
      <Footer dict={dict.footer} lang="en" />
    </>
  );
}
