"use client";

import Link from "next/link";
import { localePath } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { useUi } from "./useUi";

type SiteHeaderProps = {
  menuOpen: boolean;
  onMenuToggle: () => void;
};

export function SiteHeader({ menuOpen, onMenuToggle }: SiteHeaderProps) {
  const { locale, ui, pathname } = useUi();
  const homeHref = localePath(locale, "/");
  const menuLabel =
    locale === "en"
      ? menuOpen
        ? "Close menu"
        : "Open menu"
      : menuOpen
        ? "关闭菜单"
        : "打开菜单";

  /** Desktop strip: skip home (brand already links home) */
  const desktopNav = ui.nav.filter((item) => item.href !== "/");

  return (
    <header className="site-header">
      <Link href={homeHref} className="site-header__brand">
        {ui.brand}
      </Link>

      <nav className="site-header__nav" aria-label={locale === "en" ? "Primary" : "主导航"}>
        {desktopNav.map((item) => {
          const href = localePath(locale, item.href);
          const isCurrent =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.href}
              href={href}
              className="site-header__link"
              aria-current={isCurrent ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="site-header__actions">
        <LanguageSwitch />
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-menu-panel"
          aria-label={menuLabel}
          onClick={onMenuToggle}
        >
          <span className="menu-toggle__bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
