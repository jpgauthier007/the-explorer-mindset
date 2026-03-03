import { Assessment } from "@/components/Assessment";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = { params: Promise<{ lang: string }> };

export default async function AssessmentPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);
  return <Assessment dict={dict.assessment} lang={lang} />;
}
