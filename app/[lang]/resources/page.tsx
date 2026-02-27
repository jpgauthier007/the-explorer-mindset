import { redirect } from "next/navigation";
import type { Lang } from "@/dictionaries/getDictionary";

type Props = { params: Promise<{ lang: string }> };

export default async function ResourcesPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  redirect(lang === "fr" ? "/fr/resources/worksheets" : "/resources/worksheets");
}
