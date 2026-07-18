"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Lightweight bridge-bar flash on client navigations.
 * CSS-only; skipped under prefers-reduced-motion.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const first = useRefSkipFirst();

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reducedMotion) return;

    setActive(true);
    const t = window.setTimeout(() => setActive(false), 420);
    return () => window.clearTimeout(t);
  }, [pathname, reducedMotion]);

  return (
    <div
      className={`page-transition${active ? " is-active" : ""}`}
      aria-hidden
    >
      <div className={`bridge-light${active ? " is-open" : ""}`} />
    </div>
  );
}

function useRefSkipFirst(): { current: boolean } {
  const [ref] = useState(() => ({ current: true }));
  return ref;
}
