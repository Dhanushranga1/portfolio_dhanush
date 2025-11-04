import { useEffect, useState } from "react";

interface ActivityFeedProps {
  className?: string;
}

interface ActivityData {
  project: string;
  status: string;
  lastUpdated: string;
}

/**
 * ActivityFeed - Live "Currently Working On" indicator
 * 
 * Displays real-time project status with a blinking caret animation.
 * Fetches data from /data/stats.json and updates automatically.
 * 
 * Design pattern: Reuses the terminal caret aesthetic from Hero component.
 * 
 * @example
 * <ActivityFeed />
 * // Output: > building ticketpilot v2.1...█
 */
export function ActivityFeed({ className = "" }: ActivityFeedProps) {
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch("/data/stats.json");
        const data = await response.json();
        setActivity(data.activity);
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div 
        className={`flex items-center gap-2 text-sm font-mono text-terminal-muted ${className}`}
        aria-live="polite"
        aria-busy="true"
      >
        <span className="text-accent-info">&gt;</span>
        <span>loading...</span>
        <CursorBlinker />
      </div>
    );
  }

  if (!activity) {
    return null;
  }

  return (
    <div 
      className={`flex items-center gap-2 text-sm font-mono ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`Currently ${activity.status} ${activity.project}`}
    >
      <span className="text-accent-info" aria-hidden="true">&gt;</span>
      <span className="text-terminal-muted">{activity.status}</span>
      <span className="text-text-primary font-medium">{activity.project}</span>
      <span className="text-terminal-muted">...</span>
      <CursorBlinker />
    </div>
  );
}

/**
 * CursorBlinker - Terminal-style blinking cursor
 * 
 * Implements a "hard" terminal blink (not a soft fade).
 * Uses CSS animation for 60 FPS performance.
 * 
 * Pattern: Reused from Hero component's typing effect.
 */
function CursorBlinker() {
  return (
    <span
      className="inline-block w-[0.6ch] h-[1.2em] bg-accent-info ml-0.5 animate-cursor-blink"
      aria-hidden="true"
    />
  );
}
