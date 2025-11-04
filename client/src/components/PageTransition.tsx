"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "wouter";

/**
 * PageTransition
 * - Wraps page content and animates on route changes
 * - Respects prefers-reduced-motion
 * - Focuses main content after route change
 * - Uses vertical slide + fade (default) or horizontal swipe variant
 */

type Props = {
  children: React.ReactNode;
  distance?: number; // px; default 10
  mainId?: string; // id of main for focus management
  horizontal?: boolean; // optional horizontal swipe variant
};

export default function PageTransition({
  children,
  distance = 10,
  mainId = "main-content",
  horizontal = false,
}: Props) {
  const [location] = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const mountedRef = useRef(false);

  const verticalVariants = {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -Math.round(distance * 0.7) },
  };

  const horizontalVariants = {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
  };

  const variants = horizontal ? horizontalVariants : verticalVariants;

  const transition = {
    duration: 0.15, // 150ms
    ease: [0.2, 0.9, 0.25, 1], // cubic-bezier(.2,.9,.25,1)
  };

  // Focus management: focus main after route change + animation finishes
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const timeout = window.setTimeout(() => {
      const el = document.getElementById(mainId);
      if (el) {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        (el as HTMLElement).focus({ preventScroll: true });
      }
    }, Math.round((transition.duration + 0.02) * 1000)); // 170ms buffer

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (shouldReduceMotion) {
    // Render children directly when reduced motion is enabled
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
