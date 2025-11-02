import ContactForm from "@/components/ContactForm";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-mono font-bold mb-4">contact</h1>
        <p className="text-sm font-mono text-muted-foreground mb-12">
          ways to get in touch.
        </p>

        <div className="space-y-12">
          <div className="space-y-4 font-mono text-sm">
            <a
              href="mailto:hello@dhanushranga.dev"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-email"
            >
              <Mail className="h-4 w-4" />
              <span>email → hello@dhanushranga.dev <ExternalLink className="inline h-3 w-3 ml-1" /></span>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-discord"
            >
              <MessageCircle className="h-4 w-4" />
              <span>discord → dhanushranga1 <ExternalLink className="inline h-3 w-3 ml-1" /></span>
            </a>
          </div>

          <div>
            <h2 className="text-lg font-mono font-semibold mb-6">contact form</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
