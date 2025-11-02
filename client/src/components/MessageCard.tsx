import { formatDistanceToNow } from "date-fns";

interface MessageCardProps {
  content: string;
  timestamp: Date;
}

export default function MessageCard({ content, timestamp }: MessageCardProps) {
  return (
    <div className="py-4 border-b border-border last:border-0 font-mono" data-testid="card-message">
      <div className="text-xs text-muted-foreground mb-2" data-testid="text-message-time">
        [{formatDistanceToNow(timestamp, { addSuffix: true })}]
      </div>
      <p className="text-sm text-foreground leading-relaxed" data-testid="text-message-content">
        {content}
      </p>
    </div>
  );
}
