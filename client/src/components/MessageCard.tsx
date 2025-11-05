import { formatDistanceToNow } from "date-fns";
import CardPrimitive, { CardContent } from "@/components/primitives/CardPrimitive";
import { Badge } from "@/components/ui/badge";

export type MessageStatus = 'published' | 'queued' | 'rejected';

interface MessageCardProps {
  content: string;
  timestamp: Date;
  status?: MessageStatus;
}

const statusConfig: Record<MessageStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  published: { label: 'published', variant: 'default' },
  queued: { label: 'queued', variant: 'secondary' },
  rejected: { label: 'rejected', variant: 'destructive' },
};

export default function MessageCard({ content, timestamp, status = 'published' }: MessageCardProps) {
  const config = statusConfig[status];
  
  return (
    <CardPrimitive
      variant="default"
      padding="md"
      testId="card-message"
      className="hover:border-accent-info/30 transition-colors"
    >
      <CardContent spacing="sm">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="text-xs text-muted-foreground" data-testid="text-message-time">
            <span className="text-accent-info">[</span>
            {formatDistanceToNow(timestamp, { addSuffix: true })}
            <span className="text-accent-info">]</span>
          </div>
          
          <Badge 
            variant={config.variant} 
            className="text-xs font-mono"
            data-testid="badge-message-status"
          >
            {config.label}
          </Badge>
        </div>
        
        <p className="text-sm text-foreground leading-relaxed font-mono" data-testid="text-message-content">
          {content}
        </p>
      </CardContent>
    </CardPrimitive>
  );
}
