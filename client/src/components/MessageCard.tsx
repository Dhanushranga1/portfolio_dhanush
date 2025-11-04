import { formatDistanceToNow } from "date-fns";
import CardPrimitive, { CardContent } from "@/components/primitives/CardPrimitive";

interface MessageCardProps {
  content: string;
  timestamp: Date;
}

export default function MessageCard({ content, timestamp }: MessageCardProps) {
  return (
    <CardPrimitive
      variant="default"
      padding="md"
      testId="card-message"
    >
      <CardContent spacing="sm">
        <div className="text-xs text-muted-foreground" data-testid="text-message-time">
          <span className="text-accent-info">[</span>
          {formatDistanceToNow(timestamp, { addSuffix: true })}
          <span className="text-accent-info">]</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed" data-testid="text-message-content">
          {content}
        </p>
      </CardContent>
    </CardPrimitive>
  );
}
