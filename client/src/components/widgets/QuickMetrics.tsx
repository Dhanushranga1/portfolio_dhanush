/**
 * QuickMetrics - Lightweight monospace badges
 * 
 * Displays high-density metrics in terminal-style badges:
 * [12 projects] [2.4k commits] [3 years exp]
 */

interface Metric {
  label: string;
  value: string | number;
}

interface QuickMetricsProps {
  metrics: Metric[];
  className?: string;
}

export default function QuickMetrics({ metrics, className = "" }: QuickMetricsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 type-label-medium font-mono ${className}`}>
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="px-2.5 py-1 bg-surface-2 border border-surface-contrast rounded text-foreground hover:border-accent-info-muted transition-colors duration-150"
        >
          <span className="text-accent-info font-medium">{metric.value}</span>
          <span className="ml-1.5 text-muted-foreground">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
