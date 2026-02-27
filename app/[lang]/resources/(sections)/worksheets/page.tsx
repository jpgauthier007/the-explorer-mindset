import { ResourcesWorksheets } from "@/components/ResourcesWorksheets";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = { params: Promise<{ lang: string }> };

export default async function WorksheetsPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);
  return <ResourcesWorksheets dict={dict.resources} lang={lang} />;
}
