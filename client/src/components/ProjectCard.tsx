import { forwardRef } from "react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "deployed" | "active" | "archived";
  impact?: string;
  isFocused?: boolean;
  projectNumber?: number;
}

const ProjectCard = forwardRef<HTMLLIElement, ProjectCardProps>(
  (
    {
      title,
      description,
      tags,
      liveUrl,
      githubUrl,
      status = "active",
      impact,
      isFocused = false,
      projectNumber,
    },
    ref
  ) => {
    const statusColors = {
      deployed: "text-green-500 bg-green-500/10 border-green-500/30",
      active: "text-accent-info bg-accent-info/10 border-accent-info/30",
      archived: "text-muted-foreground bg-surface-2 border-border",
    };

    const statusLabels = {
      deployed: "DEPLOYED",
      active: "ACTIVE",
      archived: "ARCHIVED",
    };

    const statusIcons = {
      deployed: "✓",
      active: "◉",
      archived: "◌",
    };

    return (
      <li
        ref={ref}
        className={`group font-mono text-sm border-l-4 transition-all duration-200 pl-6 py-4 rounded-r-md ${
          isFocused
            ? "border-accent-action bg-accent-action/5 shadow-lg"
            : "border-transparent hover:border-accent-info hover:bg-surface-2"
        }`}
        aria-current={isFocused ? "location" : undefined}
      >
        <div className="space-y-3">
          {/* Status, Number, and Title */}
          <div className="flex items-start gap-3 flex-wrap">
            {projectNumber && (
              <span className="text-muted-foreground font-bold min-w-[2ch] text-right">
                {projectNumber}.
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-bold border rounded ${statusColors[status]}`}
            >
              <span>{statusIcons[status]}</span>
              <span>{statusLabels[status]}</span>
            </span>
            <h3
              className="text-lg font-bold text-foreground flex-1 min-w-[200px]"
              data-testid={`text-project-title-${title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {title}
            </h3>
          </div>

          {/* Impact Statement as Comment */}
          {impact && (
            <p className="text-accent-info pl-8 leading-relaxed">
              <span className="text-muted-foreground"># </span>
              {impact}
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed pl-8">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pl-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-accent-info border border-accent-info/30 bg-accent-info/5 px-2 py-1 rounded font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pl-8 pt-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-info hover:text-accent-action transition-colors inline-flex items-center gap-1.5 group/link"
                aria-label={`Open live demo of ${title}`}
              >
                <span className="group-hover/link:translate-x-0.5 transition-transform">
                  →
                </span>
                <span className="underline decoration-dotted underline-offset-4">
                  [live]
                </span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-info hover:text-accent-action transition-colors inline-flex items-center gap-1.5 group/link"
                aria-label={`View source code of ${title} on GitHub`}
              >
                <span className="group-hover/link:translate-x-0.5 transition-transform">
                  →
                </span>
                <span className="underline decoration-dotted underline-offset-4">
                  [source]
                </span>
                <Github className="h-3.5 w-3.5 opacity-70" />
              </a>
            )}
          </div>
        </div>
      </li>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
