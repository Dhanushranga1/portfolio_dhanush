import ContactForm from "@/components/ContactForm";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useStrapi";
import { Skeleton } from "@/components/ui/skeleton";

function urlHandle(url: string) {
  try {
    return new URL(url).pathname.replace(/^\//, "") || url;
  } catch {
    return url;
  }
}

type ContactLink = {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  testId: string;
  external?: boolean;
};

export default function Contact() {
  const { data, isLoading } = useSiteSettings();
  const settings = data?.data;

  const contacts: ContactLink[] = [];
  if (settings?.email) {
    contacts.push({
      icon: Mail,
      label: "email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      testId: "link-email",
    });
  }
  if (settings?.githubUrl) {
    contacts.push({
      icon: Github,
      label: "github",
      value: urlHandle(settings.githubUrl),
      href: settings.githubUrl,
      testId: "link-github",
      external: true,
    });
  }
  if (settings?.linkedinUrl) {
    contacts.push({
      icon: Linkedin,
      label: "linkedin",
      value: urlHandle(settings.linkedinUrl),
      href: settings.linkedinUrl,
      testId: "link-linkedin",
      external: true,
    });
  }

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Contact</h1>
          <p className="text-muted-foreground max-w-[55ch]">
            {settings?.contactIntro ?? "Open to collaboration, interesting projects, and good conversations."}
          </p>
        </motion.div>

        <div className="space-y-14">

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.08 }}
            className="space-y-3"
          >
            {isLoading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-5 w-48" />
                ))}
              </div>
            ) : contacts.map(({ icon: Icon, label, value, href, testId, external }) => (
              <a
                key={testId}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-testid={testId}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform duration-150" />
                <span className="capitalize">{label}:</span>
                <span className="text-foreground group-hover:text-accent-info transition-colors duration-150">{value}</span>
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
            className="flex items-center gap-4 text-xs text-muted-foreground/60"
          >
            <div className="h-px flex-1 bg-border" />
            <span>or send a message</span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
