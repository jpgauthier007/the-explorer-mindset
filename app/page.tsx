import { Hero } from "@/components/Hero";
import { AboutBook } from "@/components/AboutBook";
import { ThreePillars } from "@/components/ThreePillars";
import { AboutAuthor } from "@/components/AboutAuthor";
import { EmailSignup } from "@/components/EmailSignup";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutBook />
      <ThreePillars />
      <AboutAuthor />
      <EmailSignup />
      <Footer />
    </main>
  );
}
