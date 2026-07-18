import type { Locale } from "@/lib/i18n";
import { enUi } from "./en";
import type { UiCopy } from "./types";
import { zhUi } from "./zh";

export type { UiCopy, UiNavItem } from "./types";
export { enUi } from "./en";
export { zhUi } from "./zh";

export function getUi(locale: Locale): UiCopy {
  return locale === "en" ? enUi : zhUi;
}
