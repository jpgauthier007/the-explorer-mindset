import { ResourcesExtras } from "@/components/ResourcesExtras";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = { params: Promise<{ lang: string }> };

export default async function ExtrasPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);
  return <ResourcesExtras dict={dict.resources} lang={lang} />;
}
