import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Subtle fade + rise on scroll into view. Fires once, respects
 * prefers-reduced-motion.
 */
export default function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay, ease: [0.2, 0.9, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
