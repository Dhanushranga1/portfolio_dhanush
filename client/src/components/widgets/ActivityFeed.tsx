import CursorBlinker from "../animations/CursorBlinker";

/**
 * ActivityFeed - Live "Currently Working On" status
 * 
 * Shows real-time development activity with optional blinking caret
 * Fetches from /data/stats.json activity field
 */

interface ActivityFeedProps {
  project: string;
  status: string;
  showCursor?: boolean;
  className?: string;
}

export default function ActivityFeed({ 
  project, 
  status, 
  showCursor = true,
  className = ""
}: ActivityFeedProps) {
  return (
    <div className={`type-label-medium font-mono ${className}`}>
      <span className="text-accent-info">{'>'}</span>
      <span className="ml-2 text-muted-foreground">
        currently working on:
      </span>
      <span className="ml-2 text-foreground font-medium">{project}</span>
      <span className="ml-1 text-muted-foreground">— {status}</span>
      {showCursor && <CursorBlinker className="ml-1 w-[0.4em] h-[0.9em]" />}
    </div>
  );
}
