import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Disable button during submission to prevent double-submit
    setIsSubmitting(true);
    
    try {
      // Simulate API call (replace with actual submission)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", formData);
      toast({
        title: "message sent",
        description: "thanks for reaching out. i'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "error sending message",
        description: "something went wrong. please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono" data-testid="form-contact">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-muted-foreground">
          name
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="john doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
          className="font-mono border-border"
          data-testid="input-name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-muted-foreground">
          email (if you want a reply)
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          spellCheck="false"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
          className="font-mono border-border"
          data-testid="input-email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-muted-foreground">
          your message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="tell me what's on your mind..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px] resize-none font-mono border-border"
          required
          disabled={isSubmitting}
          data-testid="input-message"
        />
        <p className="text-xs text-muted-foreground">
          tip: press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground">⌘</kbd> + <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground">Enter</kbd> to submit
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-submit"
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
    </form>
  );
}
