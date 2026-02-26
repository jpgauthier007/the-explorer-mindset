import { Header } from "@/components/Header";
import { Resources } from "@/components/Resources";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function ResourcesPage() {
  const dict = await getDictionary("en");

  return (
    <>
      <Header dict={dict.header} lang="en" />
      <main>
        <Resources dict={dict.resources} lang="en" />
      </main>
      <Footer dict={dict.footer} lang="en" />
    </>
  );
}
