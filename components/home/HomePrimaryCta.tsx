"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

type HomePrimaryCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * Primary home CTA with light Motion hover/tap. Respects reduced motion.
 */
export function HomePrimaryCta({
  href,
  children,
  className = "home-btn home-btn--primary",
}: HomePrimaryCtaProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <motion.div
      style={{ display: "inline-block" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
