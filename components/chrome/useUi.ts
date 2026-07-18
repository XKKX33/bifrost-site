"use client";

import { usePathname } from "next/navigation";
import { getUi, type UiCopy } from "@/content/i18n";
import { localeFromPathname, type Locale } from "@/lib/i18n";

export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  return localeFromPathname(pathname);
}

export function useUi(): { locale: Locale; ui: UiCopy; pathname: string } {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  return { locale, ui: getUi(locale), pathname };
}
