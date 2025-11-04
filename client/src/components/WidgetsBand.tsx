import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AsciiSkillBar } from "./AsciiSkillBar";
import { ActivityFeed } from "./ActivityFeed";
import { QuickMetrics } from "./QuickMetrics";

interface WidgetsBandProps {
  className?: string;
}

interface SkillData {
  label: string;
  percentage: number;
  category: string;
}

/**
 * WidgetsBand - Mid-band widget container
 * 
 * Lightweight data-driven widgets section between hero and main content.
 * Implements:
 * - Glassmorphism container (minimal 2% white lift, backdrop blur)
 * - Scroll-triggered fade-in using Intersection Observer (useInView)
 * - ASCII skill bars, activity feed, and quick metrics
 * 
 * Performance: Uses Intersection Observer to trigger animation only once
 * when widgets enter viewport, avoiding scroll listener overhead.
 * 
 * @example
 * <WidgetsBand />
 */
export function WidgetsBand({ className = "" }: WidgetsBandProps) {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/data/stats.json");
        const data = await response.json();
        setSkills(data.skills || []);
      } catch (error) {
        console.error("Failed to fetch skills data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.15, ease: [0.2, 0.9, 0.25, 1] }}
      className={`w-full max-w-5xl mx-auto ${className}`}
      aria-label="Developer metrics and activity"
    >
      {/* Glassmorphism container */}
      <div className="relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
        {/* Content grid */}
        <div className="space-y-6">
          {/* Activity Feed - Top priority */}
          <div className="flex items-center justify-center">
            <ActivityFeed />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-surface-contrast to-transparent" />

          {/* Skills Grid */}
          <div>
            <h3 className="text-sm font-mono text-terminal-muted uppercase tracking-wider mb-4">
              Core Skills
            </h3>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-surface-2 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {skills.slice(0, 6).map((skill) => (
                  <AsciiSkillBar
                    key={skill.label}
                    label={skill.label}
                    percentage={skill.percentage}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-surface-contrast to-transparent" />

          {/* Quick Metrics */}
          <div>
            <h3 className="text-sm font-mono text-terminal-muted uppercase tracking-wider mb-4">
              Quick Stats
            </h3>
            <QuickMetrics />
          </div>
        </div>

        {/* Subtle radial glow accent */}
        <div 
          className="absolute inset-0 -z-10 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(127,208,189,0.05),transparent_60%)]"
          aria-hidden="true"
        />
      </div>
    </motion.section>
  );
}
