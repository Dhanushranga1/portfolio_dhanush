import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";

interface MessageCardProps {
  content: string;
  timestamp: Date;
}

export default function MessageCard({ content, timestamp }: MessageCardProps) {
  return (
    <Card className="p-6 border-l-4 border-l-primary hover-elevate transition-all" data-testid="card-message">
      <p className="text-foreground mb-3" data-testid="text-message-content">{content}</p>
      <p className="text-sm text-muted-foreground" data-testid="text-message-time">
        {formatDistanceToNow(timestamp, { addSuffix: true })}
      </p>
    </Card>
  );
}
