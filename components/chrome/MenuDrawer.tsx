"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { localePath } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { useUi } from "./useUi";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const { locale, ui, pathname } = useUi();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const t = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  const openLabel = locale === "en" ? "Close menu" : "关闭菜单";
  const navLabel = locale === "en" ? "Primary" : "主导航";

  return (
    <div
      className={`menu-drawer${open ? " is-open" : ""}`}
      id="site-menu-panel"
      role="dialog"
      aria-modal={open}
      aria-labelledby={titleId}
      aria-hidden={!open}
      {...(!open ? { inert: true as const } : {})}
    >
      <h2 id={titleId} className="sr-only">
        {navLabel}
      </h2>

      <button
        ref={closeRef}
        type="button"
        className="menu-toggle"
        style={{
          position: "absolute",
          top: "var(--space-4)",
          right: "var(--space-6)",
        }}
        onClick={onClose}
        aria-label={openLabel}
        aria-expanded={open}
        tabIndex={open ? 0 : -1}
      >
        <span className="menu-toggle__bars" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </button>

      <ul className="menu-drawer__list">
        {ui.nav.map((item) => {
          const href = localePath(locale, item.href);
          const isCurrent =
            pathname === href ||
            (item.href !== "/" && pathname.startsWith(href));

          return (
            <li key={item.href}>
              <Link
                href={href}
                className="menu-drawer__link"
                aria-current={isCurrent ? "page" : undefined}
                onClick={onClose}
              >
                <span className="menu-drawer__index">{item.index}</span>
                <span className="menu-drawer__label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="menu-drawer__footer">
        <span>{ui.brandSupport}</span>
        <LanguageSwitch />
      </div>
    </div>
  );
}
