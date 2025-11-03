import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "ok" | "wip" | "archived";
  impact?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
  status = "ok",
  impact,
}: ProjectCardProps) {
  const statusColors = {
    ok: "text-terminal-accent",
    wip: "text-terminal-action",
    archived: "text-terminal-muted",
  };

  const statusLabels = {
    ok: "OK",
    wip: "WIP",
    archived: "ARCHIVED",
  };

  return (
    <li className="group font-mono text-sm border-l-2 border-transparent hover:border-terminal-accent transition-colors pl-4 py-2">
      <div className="space-y-2">
        {/* Status and Title */}
        <div className="flex items-baseline gap-2">
          <span className={`${statusColors[status]} font-bold`}>
            [{statusLabels[status]}]
          </span>
          <h3 
            className="text-base font-semibold text-foreground"
            data-testid={`text-project-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {title}
          </h3>
        </div>

        {/* Impact Statement as Comment */}
        {impact && (
          <p className="text-terminal-muted italic pl-16">
            // {impact}
          </p>
        )}

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed pl-16">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pl-16">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs text-terminal-muted border border-terminal-muted px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pl-16 pt-1">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-accent hover:text-terminal-action transition-colors inline-flex items-center gap-1"
            >
              <span>→</span>
              <span>[live]</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-accent hover:text-terminal-action transition-colors inline-flex items-center gap-1"
            >
              <span>→</span>
              <span>[source]</span>
              <Github className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
