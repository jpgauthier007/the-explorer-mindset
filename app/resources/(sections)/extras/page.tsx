import { ResourcesExtras } from "@/components/ResourcesExtras";
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function ExtrasPage() {
  const dict = await getDictionary("en");
  return <ResourcesExtras dict={dict.resources} />;
}
