import { useEffect, useState } from "react";

interface QuickMetricsProps {
  className?: string;
}

interface Metric {
  label: string;
  value: string | number;
}

/**
 * QuickMetrics - Monospace metric badges
 * 
 * Displays high-density, scannable metrics in a terminal aesthetic.
 * Format: [3 projects][2 tech stacks][5 years exp]
 * 
 * Fetches data from /data/stats.json and renders as monospace badges.
 * 
 * @example
 * <QuickMetrics />
 * // Output: [12 projects] [8 tech stacks] [3 years exp] [2.4k commits]
 */
export function QuickMetrics({ className = "" }: QuickMetricsProps) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/data/stats.json");
        const data = await response.json();
        setMetrics(data.metrics || []);
      } catch (error) {
        console.error("Failed to fetch metrics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div 
        className={`flex flex-wrap gap-2 text-sm font-mono ${className}`}
        aria-live="polite"
        aria-busy="true"
      >
        {[1, 2, 3, 4].map((i) => (
          <MetricBadge key={i} label="loading" value="..." />
        ))}
      </div>
    );
  }

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div 
      className={`flex flex-wrap gap-2 text-sm font-mono ${className}`}
      aria-label="Quick metrics summary"
    >
      {metrics.map((metric) => (
        <MetricBadge 
          key={metric.label} 
          label={metric.label} 
          value={metric.value} 
        />
      ))}
    </div>
  );
}

/**
 * MetricBadge - Individual metric display
 * 
 * Minimal monospace badge with muted background and border.
 * Uses label-medium typographic style for consistency.
 */
interface MetricBadgeProps {
  label: string;
  value: string | number;
}

function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <code 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-2 border border-surface-contrast rounded text-text-muted hover:text-text-primary hover:border-accent-info/30 transition-colors duration-150"
      aria-label={`${value} ${label}`}
    >
      <span className="tabular-nums font-semibold text-accent-info">
        {value}
      </span>
      <span className="text-xs">{label}</span>
    </code>
  );
}
