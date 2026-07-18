import type { Locale } from "@/lib/i18n";
import { enAbout } from "./en";
import type { AboutContent, AboutTheme, AboutThemeId } from "./types";
import { zhAbout } from "./zh";

export type { AboutContent, AboutTheme, AboutThemeId } from "./types";
export { enAbout } from "./en";
export { zhAbout } from "./zh";

export function getAbout(locale: Locale): AboutContent {
  return locale === "en" ? enAbout : zhAbout;
}
