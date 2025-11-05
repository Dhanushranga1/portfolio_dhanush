import ContactForm from "@/components/ContactForm";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-2 text-accent-info">
            $ contact
            <span className="animate-pulse">_</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground mb-12">
            ways to get in touch.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 font-mono text-sm"
          >
            <a
              href="mailto:hello@dhanushranga.dev"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors group"
              data-testid="link-email"
            >
              <Mail className="h-4 w-4" />
              <span>email → hello@dhanushranga.dev <ExternalLink className="inline h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors group"
              data-testid="link-discord"
            >
              <MessageCircle className="h-4 w-4" />
              <span>discord → dhanushranga1 <ExternalLink className="inline h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-mono font-semibold mb-6 text-foreground">$ contact_form</h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
