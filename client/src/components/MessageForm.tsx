import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { submitMessage } from "@/lib/formspree";

interface MessageFormProps {
  onSubmit?: (message: string) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Keyboard shortcut: Cmd/Ctrl + Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('message-form') as HTMLFormElement;
        if (form && !isSubmitting && message.trim()) {
          form.requestSubmit();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitting, message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await submitMessage({
        message: message.trim(),
        _gotcha: honeypot,
        _subject: "New anonymous message from portfolio",
      });

      if (result.ok) {
        toast({
          title: "message sent",
          description: "thanks for your message!",
        });
        setMessage("");
        setHoneypot("");
        onSubmit?.(message);
      } else {
        toast({
          title: "error sending message",
          description: result.error || "something went wrong. please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "error sending message",
        description: error instanceof Error ? error.message : "something went wrong. please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="message-form" onSubmit={handleSubmit} className="space-y-4 font-mono" data-testid="form-message">
      {/* Honeypot field - hidden from users, catches bots */}
      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Textarea
        placeholder="your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isSubmitting}
        className="min-h-[120px] resize-vertical font-mono text-sm border-border focus:ring-2 focus:ring-accent-info/20 focus:border-accent-info/50"
        data-testid="input-message"
      />
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          tip: press <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">Enter</kbd> to submit
        </p>
        
        <button
          type="submit"
          disabled={!message.trim() || isSubmitting}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-info disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          data-testid="button-send-message"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              sending...
            </>
          ) : (
            <>submit →</>
          )}
        </button>
      </div>
    </form>
  );
}
