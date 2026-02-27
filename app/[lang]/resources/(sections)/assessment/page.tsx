import { ResourcesAssessment } from "@/components/ResourcesAssessment";
import { getDictionary, type Lang } from "@/dictionaries/getDictionary";

type Props = { params: Promise<{ lang: string }> };

export default async function AssessmentPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Lang;
  const dict = await getDictionary(lang);
  return <ResourcesAssessment dict={dict.resources} />;
}
