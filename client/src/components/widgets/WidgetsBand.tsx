import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AsciiSkillBar from "./AsciiSkillBar";
import ActivityFeed from "./ActivityFeed";
import QuickMetrics from "./QuickMetrics";

/**
 * WidgetsBand - Mid-band data-driven widgets container
 * 
 * Fetches stats from /data/stats.json and displays:
 * - Live activity feed
 * - ASCII skill bars
 * - Quick metrics badges
 * 
 * Features scroll-triggered fade-in animation using Intersection Observer
 */

interface StatsData {
  skills: Array<{ label: string; percentage: number }>;
  metrics: Array<{ label: string; value: string | number }>;
  activity: { project: string; status: string };
}

export default function WidgetsBand() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch('/data/stats.json')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-6 py-12"
    >
      {/* Glassmorphism container - Phase 3: Enhanced depth with inset shadow */}
      <div 
        className="relative rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 space-y-8"
        style={{
          boxShadow: 
            'inset 0 1px 0 rgba(255, 255, 255, 0.1), ' +
            '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Activity Feed */}
        <ActivityFeed
          project={stats.activity.project}
          status={stats.activity.status}
        />

        {/* Divider */}
        <div className="border-t border-surface-contrast" />

        {/* Skills Grid */}
        <div>
          <p className="type-label-small font-mono text-muted-foreground mb-4 uppercase tracking-wider">
            $ ls -la ./skills/
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stats.skills.slice(0, 6).map((skill, index) => (
              <AsciiSkillBar
                key={index}
                label={skill.label}
                percentage={skill.percentage}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-contrast" />

        {/* Metrics */}
        <div>
          <p className="type-label-small font-mono text-muted-foreground mb-4 uppercase tracking-wider">
            $ cat ./metrics.txt
          </p>
          <QuickMetrics metrics={stats.metrics} />
        </div>
      </div>
    </motion.section>
  );
}
