import ContactForm from "@/components/ContactForm";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  {
    icon: Mail,
    label: "email",
    value: "dhanushrangag@gmail.com",
    href: "mailto:dhanushrangag@gmail.com",
    testId: "link-email",
  },
  {
    icon: Github,
    label: "github",
    value: "dhanushranga1",
    href: "https://github.com/dhanushranga1",
    testId: "link-github",
    external: true,
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: "dhanush-ranga",
    href: "https://linkedin.com/in/dhanush-ranga",
    testId: "link-linkedin",
    external: true,
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-2">
            <span className="text-accent-info">$</span> contact
            <span className="animate-pulse text-accent-info">_</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            open to collaboration, internship opportunities, and interesting conversations.
          </p>
        </motion.div>

        <div className="space-y-14">

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.08 }}
            className="space-y-3 font-mono text-sm"
          >
            {contacts.map(({ icon: Icon, label, value, href, testId, external }) => (
              <a
                key={testId}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-testid={testId}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
              >
                <Icon className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform duration-150" />
                <span className="text-muted-foreground/50 select-none">{label}</span>
                <span className="text-accent-info/30 select-none">→</span>
                <span className="nav-link">{value}</span>
                {external && (
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity duration-150" />
                )}
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, delay: 0.15 }}
            className="flex items-center gap-4 font-mono text-xs text-muted-foreground/40"
          >
            <div className="h-px flex-1 bg-border/30" />
            <span>or send a message</span>
            <div className="h-px flex-1 bg-border/30" />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.2 }}
          >
            <h2 className="text-base font-mono font-semibold mb-6 text-foreground">
              <span className="text-accent-info">$</span> contact_form
            </h2>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
