import { forwardRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import CardPrimitive, {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/primitives/CardPrimitive";

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
      <li ref={ref} aria-current={isFocused ? "location" : undefined}>
        <CardPrimitive
          variant={isFocused ? "focused" : "accent"}
          padding="md"
          className="group text-sm pl-6"
        >
          <CardContent spacing="md">
            {/* Status, Number, and Title */}
            <CardHeader>
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
              <CardTitle
                level={3}
                className="text-lg flex-1 min-w-[200px]"
                data-testid={`text-project-title-${title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {title}
              </CardTitle>
            </CardHeader>

            {/* Impact Statement as Comment */}
            {impact && (
              <p className="text-accent-info pl-8 leading-relaxed">
                <span className="text-muted-foreground"># </span>
                {impact}
              </p>
            )}

            {/* Description */}
            <CardDescription className="pl-8">{description}</CardDescription>

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
            <CardFooter className="pl-8">
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
            </CardFooter>
          </CardContent>
        </CardPrimitive>
      </li>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
