import { FileText } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
}: BlogCardProps) {
  return (
    <div className="group cursor-pointer py-6 border-b border-border last:border-0" data-testid={`card-blog-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xs font-mono text-muted-foreground mt-0.5">
            {date}
          </span>
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-mono font-semibold group-hover:text-primary transition-colors flex items-center gap-2" data-testid={`text-blog-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <FileText className="h-4 w-4" />
              {title}
            </h3>
            <p className="text-sm font-mono text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
