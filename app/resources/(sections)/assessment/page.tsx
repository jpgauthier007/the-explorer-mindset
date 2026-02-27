import { ResourcesAssessment } from "@/components/ResourcesAssessment";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function AssessmentPage() {
  const dict = await getDictionary("en");
  return <ResourcesAssessment dict={dict.resources} />;
}
