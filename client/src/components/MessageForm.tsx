import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MessageFormProps {
  onSubmit?: (message: string) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit?.(message);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll read it soon!",
      });
      setMessage("");
      setCharCount(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setMessage(value);
      setCharCount(value.length);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-message">
      <div className="space-y-2">
        <Textarea
          placeholder="Leave an anonymous message..."
          value={message}
          onChange={handleChange}
          className="min-h-[150px] resize-none"
          data-testid="input-message"
        />
        <div className="flex items-center justify-between text-sm">
          <span className={`${charCount > maxChars * 0.9 ? "text-destructive" : "text-muted-foreground"}`}>
            {charCount} / {maxChars}
          </span>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={!message.trim()} data-testid="button-send-message">
        <Send className="h-4 w-4 mr-2" />
        Send Message
      </Button>
    </form>
  );
}
