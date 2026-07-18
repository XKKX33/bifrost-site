"use client";

import { useCallback, useState, type ReactNode } from "react";
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

/**
 * Brand chrome shell: loader, header, full-screen menu, cursor, Lenis, bridge transition.
 */
export function AppChrome({ children }: AppChromeProps) {
  const { ui } = useUi();
  const [menuOpen, setMenuOpen] = useState(false);

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
