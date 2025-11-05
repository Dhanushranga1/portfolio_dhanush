import { motion } from "framer-motion";

/**
 * CursorBlinker - Terminal-style hard blink cursor
 * 
 * Creates an authentic terminal caret that holds opacity at 0 for 50% 
 * and at 1 for 50% (no soft fade). Perfect for the "Hybrid Terminal" aesthetic.
 * 
 * Based on research: https://blog.noelcserepy.com/how-i-created-a-typing-text-animation-with-framer-motion
 */

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1], // Hold at 0 for first 50%, then at 1 for next 50%
    },
  },
};

interface CursorBlinkerProps {
  className?: string;
}

export default function CursorBlinker({ className = "" }: CursorBlinkerProps) {
  return (
    <motion.span
      variants={cursorVariants}
      animate="blinking"
      className={`inline-block h-[1em] w-[0.5em] bg-accent-info ${className}`}
      aria-hidden="true"
    />
  );
}
