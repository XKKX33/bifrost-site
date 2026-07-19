"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";
import { Loader } from "./Loader";
import { MenuDrawer } from "./MenuDrawer";
import { PageTransition } from "./PageTransition";
import { SiteHeader } from "./SiteHeader";
import { SmoothScroll } from "./SmoothScroll";
import { useUi } from "./useUi";

type AppChromeProps = {
  children: ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const { locale, ui } = useUi();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((v) => !v);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <div className="app-chrome">
      <SmoothScroll />
      <Loader />
      <CustomCursor />
      <PageTransition />
      <SiteHeader menuOpen={menuOpen} onMenuToggle={toggleMenu} />
      <MenuDrawer open={menuOpen} onClose={closeMenu} />
      <div className="app-chrome__main">{children}</div>
      <footer className="app-chrome__footer">
        <span className="app-chrome__footer-mark">{ui.brand}</span>
        <span>{ui.brandClaim}</span>
      </footer>
    </div>
  );
}
