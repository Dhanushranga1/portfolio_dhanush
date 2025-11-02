import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  category,
  image,
}: BlogCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-300" data-testid={`card-blog-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {image && (
        <div className="relative aspect-[2/1] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>

        <div>
          <Badge variant="secondary" className="mb-3" data-testid={`badge-${category.toLowerCase()}`}>
            {category}
          </Badge>
          <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors" data-testid={`text-blog-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </div>

        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read More
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
}
