import { forwardRef, useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import CardPrimitive, {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/primitives/CardPrimitive";

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
      projectNumber,
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false);

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
      <li ref={ref} aria-current={isFocused ? "location" : undefined} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
        <CardPrimitive
          variant={isFocused ? "focused" : "accent"}
          padding="md"
          className="group text-sm pl-6 transition-all duration-200 hover:bg-surface-2/50"
        >
          <CardContent spacing="md">
            {/* Status, Number, Title */}
            <CardHeader className="mb-2">
              {projectNumber && (
                <span className="text-muted-foreground font-bold min-w-[2ch] text-right">
                  {projectNumber}.
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider border rounded ${statusColors[status]}`}
              >
                <span>{statusIcons[status]}</span>
                <span>{statusLabels[status]}</span>
              </span>
              <CardTitle
                level={3}
                className="text-lg md:text-xl font-semibold flex-1 min-w-[200px]"
                data-testid={`text-project-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {title}
              </CardTitle>
            </CardHeader>

            {/* Impact */}
            {impact && (
              <p className="text-accent-info/90 pl-8 leading-[1.5] mb-3 text-[0.9rem] font-medium">
                <span className="text-muted-foreground"># </span>
                {impact}
              </p>
            )}

            {/* Description: summary → full on expand */}
            <div className="pl-8 mb-4">
              <CardDescription className="leading-[1.6] text-[0.9rem]">
                {expanded ? description : summary}
              </CardDescription>

              <button
                type="button"
                onClick={() => setExpanded(v => !v)}
                className="mt-2 flex items-center gap-1 text-[0.75rem] text-accent-info/60 hover:text-accent-info transition-colors duration-150 font-mono focus:outline-none focus-visible:underline"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>show less <ChevronUp className="h-3 w-3" /></>
                ) : (
                  <>technical details <ChevronDown className="h-3 w-3" /></>
                )}
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pl-8 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.75rem] text-foreground/90 bg-surface-2 border border-border/50 px-2.5 py-1 rounded font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <CardFooter className="pl-8 gap-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-info hover:text-accent-action transition-all duration-200 inline-flex items-center gap-1.5 group/link text-[0.85rem]"
                  aria-label={`Open live demo of ${title}`}
                >
                  <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  <span className="group-hover/link:underline decoration-1 underline-offset-4">[live]</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-info hover:text-accent-action transition-all duration-200 inline-flex items-center gap-1.5 group/link text-[0.85rem]"
                  aria-label={`View source code of ${title} on GitHub`}
                >
                  <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  <Github className="h-3.5 w-3.5" />
                  <span className="group-hover/link:underline decoration-1 underline-offset-4">[source]</span>
                </a>
              )}
            </CardFooter>
          </CardContent>
        </CardPrimitive>
      </li>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
