import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
}: ProjectCardProps) {
  return (
    <div className="group cursor-pointer" data-testid={`card-project-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {image && (
        <div className="relative aspect-video overflow-hidden mb-3 border border-border">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-base font-mono font-semibold group-hover:text-primary transition-colors" data-testid={`text-project-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title} <ExternalLink className="inline h-3 w-3 ml-1" />
        </h3>
        <p className="text-sm font-mono text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
