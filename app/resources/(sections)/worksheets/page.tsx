import { ResourcesWorksheets } from "@/components/ResourcesWorksheets";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function WorksheetsPage() {
  const dict = await getDictionary("en");
  return <ResourcesWorksheets dict={dict.resources} lang="en" />;
}
