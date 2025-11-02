import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-300" data-testid={`card-project-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 gap-2">
          {liveUrl && (
            <Button size="sm" variant="secondary" data-testid={`button-live-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          )}
          {githubUrl && (
            <Button size="sm" variant="outline" data-testid={`button-github-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <Github className="h-4 w-4 mr-2" />
              Code
            </Button>
          )}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-display font-bold" data-testid={`text-project-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" data-testid={`badge-${tag.toLowerCase()}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
