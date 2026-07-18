"use client";

import Link from "next/link";
import { switchLocalePath } from "@/lib/i18n";
import { useUi } from "./useUi";

export function LanguageSwitch() {
  const { locale, ui, pathname } = useUi();
  const zhHref = switchLocalePath(pathname, "zh");
  const enHref = switchLocalePath(pathname, "en");

  return (
    <nav className="lang-switch" aria-label={ui.language.switchAria}>
      <Link
        href={zhHref}
        className="lang-switch__link"
        aria-current={locale === "zh" ? "true" : undefined}
        hrefLang="zh-CN"
        lang="zh-CN"
      >
        {ui.language.zhLabel}
      </Link>
      <span className="lang-switch__sep" aria-hidden>
        /
      </span>
      <Link
        href={enHref}
        className="lang-switch__link"
        aria-current={locale === "en" ? "true" : undefined}
        hrefLang="en"
        lang="en"
      >
        {ui.language.enLabel}
      </Link>
    </nav>
  );
}
