import { useEffect, useState } from "react";

interface AsciiSkillBarProps {
  label: string;
  percentage: number;
  barLength?: number;
  className?: string;
}

/**
 * AsciiSkillBar - Terminal-style skill indicator using ASCII characters
 * 
 * Generates a text-based progress bar: [██████░░░░] FastAPI 60%
 * - Uses █ (U+2588) for filled segments
 * - Uses ░ (U+2591) for empty segments
 * - Implements role="progressbar" for accessibility
 * - Programmatically calculates bar segments based on percentage
 * 
 * @example
 * <AsciiSkillBar label="React" percentage={90} />
 * // Output: [█████████░] React 90%
 */
export function AsciiSkillBar({ 
  label, 
  percentage, 
  barLength = 10,
  className = ""
}: AsciiSkillBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate filled and empty segments
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const filledSegments = Math.round((clampedPercentage / 100) * barLength);
  const emptySegments = barLength - filledSegments;

  // Generate bar string programmatically
  const filled = "█".repeat(filledSegments);
  const empty = "░".repeat(emptySegments);
  const barString = `[${filled}${empty}]`;

  // Prevent hydration mismatch for client-side rendering
  if (!mounted) {
    return (
      <div className={`flex items-center gap-2 text-sm font-mono ${className}`}>
        <span className="text-terminal-muted">[░░░░░░░░░░]</span>
        <span className="text-text-muted">{label}</span>
        <span className="text-terminal-muted ml-auto">---%</span>
      </div>
    );
  }

  return (
    <div 
      role="progressbar"
      aria-valuetext={`${clampedPercentage}%`}
      aria-label={`${label} skill level: ${clampedPercentage} percent`}
      className={`flex items-center gap-2 text-sm font-mono ${className}`}
    >
      <span 
        className="text-accent-info transition-colors duration-300"
        aria-hidden="true"
      >
        {barString}
      </span>
      <span className="text-text-primary font-medium min-w-[100px]">
        {label}
      </span>
      <span className="text-terminal-muted ml-auto tabular-nums">
        {clampedPercentage}%
      </span>
    </div>
  );
}
