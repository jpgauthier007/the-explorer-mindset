import { Assessment } from "@/components/Assessment";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function AssessmentPage() {
  const dict = await getDictionary("en");
  return <Assessment dict={dict.assessment} lang="en" />;
}
