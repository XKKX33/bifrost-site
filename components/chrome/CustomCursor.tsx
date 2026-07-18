"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Desktop-only small glacier glow cursor.
 * Disabled on touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || isTouchDevice()) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.body.classList.add("has-custom-cursor");
    const el = elRef.current;

    const render = (): void => {
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = window.requestAnimationFrame(render);
    };
    raf.current = window.requestAnimationFrame(render);

    const onMove = (e: MouseEvent): void => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onLeave = (): void => setVisible(false);

    const onOver = (e: MouseEvent): void => {
      const target = e.target;
      if (!(target instanceof Element)) {
        setHovering(false);
        return;
      }
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, label",
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      className={`custom-cursor${visible ? " is-visible" : ""}${hovering ? " is-hover" : ""}`}
      aria-hidden
    />
  );
}
