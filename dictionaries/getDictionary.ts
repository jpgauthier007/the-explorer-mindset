import type enDict from "./en.json";

export type Dictionary = typeof enDict;
export type Lang = "en" | "fr";

const dictionaries: Record<Lang, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default),
  fr: () => import("./fr.json").then((m) => m.default),
};

export async function getDictionary(lang: string): Promise<Dictionary> {
  const loader = dictionaries[lang as Lang] ?? dictionaries.en;
  return loader();
}
