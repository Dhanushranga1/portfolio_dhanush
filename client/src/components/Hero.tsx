import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { useHomePage, useSiteSettings } from "@/hooks/useStrapi";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { data: homeData } = useHomePage();
  const { data: siteData } = useSiteSettings();

  const home = homeData?.data;
  const settings = siteData?.data;

  const heading = home?.heading ?? "Dhanush Ranga Gopisetty";
  const subheading =
    home?.subheading ?? "Full-stack & AI engineer building intelligent, production-grade platforms";
  const primaryLabel = home?.primaryCtaLabel ?? "View Projects";
  const primaryUrl = home?.primaryCtaUrl ?? "/projects";
  const secondaryLabel = home?.secondaryCtaLabel ?? "Get in Touch";
  const secondaryUrl = home?.secondaryCtaUrl ?? "/contact";

  return (
    <section className="px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium text-accent-info mb-4"
        >
          Hi, I'm {heading.split(" ")[0]} 👋
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          <Link href={primaryUrl}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity duration-150 cursor-pointer">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link href={secondaryUrl}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors duration-150 cursor-pointer">
              {secondaryLabel}
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex items-center justify-center gap-5 text-muted-foreground"
        >
          {settings?.githubUrl && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-foreground transition-colors duration-150"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {settings?.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-foreground transition-colors duration-150"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {settings?.resumeFile?.url && (
            <a
              href={settings.resumeFile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="hover:text-foreground transition-colors duration-150"
            >
              <FileText className="h-5 w-5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
