import type { LocaleCode } from "@/lib/locale-cookie";
import { en } from "./en";
import { pt, type Messages } from "./pt";

export type { LocaleCode, Messages };
export { en, pt };

const dictionaries: Record<LocaleCode, Messages> = {
  pt,
  en,
};

export function getMessages(locale: LocaleCode): Messages {
  return dictionaries[locale] ?? dictionaries.pt;
}

export function htmlLang(locale: LocaleCode): string {
  return locale === "en" ? "en" : "pt-BR";
}
