import { forwardRef, useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectCardProps {
  title: string;
  summary: string;
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
      summary,
      description,
      tags,
      liveUrl,
      githubUrl,
      status = "active",
      impact,
      isFocused = false,
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false);

    const statusColors = {
      deployed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
      active: "text-accent-info bg-accent-info/10 border-accent-info/30",
      archived: "text-muted-foreground bg-muted border-border",
    };

    const statusLabels = {
      deployed: "Deployed",
      active: "Active",
      archived: "Archived",
    };

    return (
      <li
        ref={ref}
        aria-current={isFocused ? "location" : undefined}
        className="animate-in fade-in slide-in-from-bottom-3 duration-500"
      >
        <div
          className={`group rounded-lg border bg-card p-6 transition-all duration-200 ${
            isFocused
              ? "border-accent-info/50 ring-1 ring-accent-info/20"
              : "border-border hover:border-accent-info/30 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
          }`}
        >
          {/* Status + Title */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider border rounded-full ${statusColors[status]}`}
            >
              {statusLabels[status]}
            </span>
            <h3
              className="text-lg font-semibold text-foreground"
              data-testid={`text-project-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {title}
            </h3>
          </div>

          {/* Impact */}
          {impact && (
            <p className="text-accent-info text-sm font-medium leading-relaxed mb-3">
              {impact}
            </p>
          )}

          {/* Description: summary → full on expand */}
          <div className="mb-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {expanded ? description : summary}
            </p>

            {description && description !== summary && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 flex items-center gap-1 text-sm text-accent-info hover:underline transition-colors duration-150 focus:outline-none focus-visible:underline"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                ) : (
                  <>Technical details <ChevronDown className="h-3.5 w-3.5" /></>
                )}
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-foreground/90 bg-muted border border-border px-2.5 py-1 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent-info transition-colors duration-150 inline-flex items-center gap-1.5"
                aria-label={`Open live demo of ${title}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent-info transition-colors duration-150 inline-flex items-center gap-1.5"
                aria-label={`View source code of ${title} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
                Source
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
