import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AsciiProgressProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  variant?: "bar" | "spinner" | "dots";
  size?: "sm" | "md" | "lg";
}

export default function AsciiProgress({
  value,
  max = 100,
  label,
  showPercentage = true,
  className,
  variant = "bar",
  size = "md",
}: AsciiProgressProps) {
  const [frame, setFrame] = useState(0);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Animated spinner frames
  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const dotsFrames = ["   ", ".  ", ".. ", "..."];

  useEffect(() => {
    if (variant === "spinner" || variant === "dots") {
      const frames = variant === "spinner" ? spinnerFrames : dotsFrames;
      const interval = setInterval(() => {
        setFrame((prev) => (prev + 1) % frames.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const renderBar = () => {
    const barLength = size === "sm" ? 20 : size === "md" ? 30 : 40;
    const filledLength = Math.round((percentage / 100) * barLength);
    const emptyLength = barLength - filledLength;

    const filled = "█".repeat(filledLength);
    const empty = "░".repeat(emptyLength);

    return (
      <div className="flex items-center gap-3 font-mono">
        {label && (
          <span className="text-muted-foreground min-w-[80px]">{label}</span>
        )}
        <div className="flex items-center gap-2 flex-1">
          <span className="text-accent-info">
            [<span className="text-accent-action">{filled}</span>
            <span className="text-muted-foreground">{empty}</span>]
          </span>
          {showPercentage && (
            <span className="text-muted-foreground tabular-nums min-w-[3ch] text-right">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderSpinner = () => {
    return (
      <div className="flex items-center gap-3 font-mono">
        <span className="text-accent-info animate-pulse">
          {spinnerFrames[frame]}
        </span>
        {label && <span className="text-muted-foreground">{label}</span>}
        {showPercentage && (
          <span className="text-muted-foreground tabular-nums">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  };

  const renderDots = () => {
    return (
      <div className="flex items-center gap-2 font-mono">
        {label && <span className="text-muted-foreground">{label}</span>}
        <span className="text-accent-info min-w-[3ch]">{dotsFrames[frame]}</span>
        {showPercentage && (
          <span className="text-muted-foreground tabular-nums">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(sizeClasses[size], className)}
      role="progressbar"
      aria-label={label || "Progress"}
      aria-valuetext={`${Math.round(percentage)} percent`}
      data-value={value}
      data-max={max}
    >
      {variant === "bar" && renderBar()}
      {variant === "spinner" && renderSpinner()}
      {variant === "dots" && renderDots()}
    </div>
  );
}

// Example usage component for demonstration
export function AsciiProgressExamples() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-surface rounded-md border border-border">
      <div className="space-y-3">
        <h3 className="text-sm font-mono font-bold text-foreground">
          Progress Bar Variants
        </h3>
        <AsciiProgress
          value={progress}
          label="Loading"
          variant="bar"
          size="md"
        />
        <AsciiProgress
          value={75}
          label="Completed"
          variant="bar"
          size="sm"
        />
        <AsciiProgress
          value={100}
          label="Done"
          variant="bar"
          size="lg"
          showPercentage={false}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-mono font-bold text-foreground">
          Spinner Variants
        </h3>
        <AsciiProgress
          value={progress}
          label="Processing"
          variant="spinner"
        />
        <AsciiProgress
          value={progress}
          label="Building"
          variant="dots"
        />
      </div>
    </div>
  );
}
