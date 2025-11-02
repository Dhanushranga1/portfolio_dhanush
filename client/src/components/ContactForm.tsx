import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "message sent",
      description: "thanks for reaching out. i'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono" data-testid="form-contact">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-muted-foreground">
          name
        </label>
        <Input
          id="name"
          placeholder="your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="font-mono text-sm border-border"
          data-testid="input-name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-muted-foreground">
          email (if you want a reply)
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="font-mono text-sm border-border"
          data-testid="input-email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-muted-foreground">
          your message...
        </label>
        <Textarea
          id="message"
          placeholder=""
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px] resize-none font-mono text-sm border-border"
          required
          data-testid="input-message"
        />
      </div>

      <button
        type="submit"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-testid="button-submit"
      >
        submit →
      </button>
    </form>
  );
}
