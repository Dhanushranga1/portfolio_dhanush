import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { useHomePage, useSiteSettings } from "@/hooks/useStrapi";
import HeroTerminal from "@/components/HeroTerminal";

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
    <section className="relative px-6 pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-accent-info/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 -left-24 h-[360px] w-[360px] rounded-full bg-accent-action/5 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
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
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
          >
            <Link href={primaryUrl}>
              <span className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
                {primaryLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link href={secondaryUrl}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 cursor-pointer">
                {secondaryLabel}
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="flex items-center justify-center lg:justify-start gap-5 text-muted-foreground"
          >
            {settings?.githubUrl && (
              <a
                href={settings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-foreground transition-all duration-150 hover:-translate-y-0.5 inline-block"
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
                className="hover:text-foreground transition-all duration-150 hover:-translate-y-0.5 inline-block"
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
                className="hover:text-foreground transition-all duration-150 hover:-translate-y-0.5 inline-block"
              >
                <FileText className="h-5 w-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: interactive terminal centerpiece */}
        <div className="flex justify-center lg:justify-end">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
