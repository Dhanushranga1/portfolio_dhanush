import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

/**
 * TextAnim - Programmatic typing animation
 * 
 * Animates text character-by-character using Framer Motion's
 * useMotionValue and useTransform hooks for smooth, performant typing.
 * 
 * Based on research: https://blog.noelcserepy.com/how-i-created-a-typing-text-animation-with-framer-motion
 */

interface TextAnimProps {
  text: string;
  delay?: number; // Delay before typing starts (in seconds)
  duration?: number; // Total duration of typing animation (in seconds)
  className?: string;
  onComplete?: () => void;
}

export default function TextAnim({ 
  text, 
  delay = 0, 
  duration = 1.5,
  className = "",
  onComplete 
}: TextAnimProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay,
      duration,
      ease: "easeInOut",
      onComplete,
    });

    return controls.stop;
  }, [count, delay, duration, onComplete, text.length]);

  return (
    <motion.span className={className}>
      {displayText}
    </motion.span>
  );
}
