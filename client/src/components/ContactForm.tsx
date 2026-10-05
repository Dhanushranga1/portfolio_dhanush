import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitContactForm } from "@/lib/formspree";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "", // honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Keyboard shortcut: Cmd/Ctrl + Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form && !isSubmitting) {
          form.requestSubmit();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double-submit
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _gotcha: formData._gotcha,
        _subject: "New contact form submission from portfolio",
      });

      if (result.ok) {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out — I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "", _gotcha: "" });
      } else {
        toast({
          title: "Error sending message",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
      {/* Honeypot field - hidden from users, catches bots */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
          className="border-border focus:ring-2 focus:ring-accent-info/20 focus:border-accent-info/50"
          data-testid="input-name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email <span className="text-muted-foreground font-normal">(if you want a reply)</span>
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
          className="border-border focus:ring-2 focus:ring-accent-info/20 focus:border-accent-info/50"
          data-testid="input-email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="What's on your mind?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px] resize-vertical border-border focus:ring-2 focus:ring-accent-info/20 focus:border-accent-info/50"
          required
          disabled={isSubmitting}
          data-testid="input-message"
        />
        <p className="text-xs text-muted-foreground">
          tip: press <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">Enter</kbd> (mac) or <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">Enter</kbd> to submit
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
