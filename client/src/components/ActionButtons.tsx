import { motion, useReducedMotion } from "framer-motion";
import { FileText, Github, Linkedin } from "lucide-react";

const actionButtons = [
  {
    id: "resume",
    label: "$ resume",
    description: "download my resume",
    href: "https://drive.google.com/file/d/1dcRbKpSEXjdp10vLqtXs2a_nYFeoL1wJ/view?usp=sharing",
    icon: FileText,
    external: true,
    ariaLabel: "Download resume (PDF)",
  },
  {
    id: "github",
    label: "$ github",
    description: "view code & projects",
    href: "https://github.com/Dhanushranga1",
    icon: Github,
    external: true,
    ariaLabel: "Open GitHub profile",
  },
  {
    id: "linkedin",
    label: "$ linkedin",
    description: "connect professionally",
    href: "https://www.linkedin.com/in/dhanush-ranga-gopisetty-0a910b123/",
    icon: Linkedin,
    external: true,
    ariaLabel: "Open LinkedIn profile",
  },
];

export default function ActionButtons() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-4xl mx-auto px-4"
      role="toolbar"
      aria-label="Quick actions"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 0.3 }}
    >
      {actionButtons.map((button, index) => {
        const Icon = button.icon;
        return (
          <motion.a
            key={button.id}
            href={button.href}
            target={button.external ? "_blank" : undefined}
            rel={button.external ? "noopener noreferrer" : undefined}
            aria-label={button.ariaLabel}
            className="group relative flex flex-col justify-center min-w-[200px] flex-1 bg-card text-foreground border border-border rounded-xl px-4 py-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-accent-info/30 hover:shadow-lg hover:shadow-accent-info/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-info/20 focus-visible:border-accent-info/50 overflow-hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 + index * 0.1, duration: 0.3 }}
          >
            {/* Left accent bar - appears on hover */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-info to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-xl" />

            <div className="flex items-center gap-2.5 mb-1.5 ml-1">
              <Icon className="h-4 w-4 text-accent-info/80 group-hover:text-accent-info transition-colors" />
              <span className="font-mono font-semibold text-accent-info tracking-wide">
                {button.label}
              </span>
            </div>
            
            <p className="font-mono text-xs text-muted-foreground ml-1 group-hover:text-muted-foreground/80 transition-colors">
              {button.description}
            </p>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
