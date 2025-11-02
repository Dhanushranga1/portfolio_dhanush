import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MessageFormProps {
  onSubmit?: (message: string) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit?.(message);
      toast({
        title: "message sent",
        description: "thanks for your message!",
      });
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-mono" data-testid="form-message">
      <Textarea
        placeholder="your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[120px] resize-none font-mono text-sm border-border"
        data-testid="input-message"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        data-testid="button-send-message"
      >
        submit →
      </button>
    </form>
  );
}
