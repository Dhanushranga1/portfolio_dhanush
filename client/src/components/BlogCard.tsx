import { FileText } from "lucide-react";
import CardPrimitive, {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/primitives/CardPrimitive";

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
    <CardPrimitive
      variant="default"
      padding="md"
      className="group cursor-pointer"
      testId={`card-blog-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent spacing="md">
        <CardHeader>
          <span className="text-xs text-muted-foreground mt-0.5">
            {date}
          </span>
          <div className="flex-1 space-y-2">
            <CardTitle
              level={3}
              className="text-base group-hover:text-accent-info flex items-center gap-2"
              data-testid={`text-blog-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <FileText className="h-4 w-4" />
              {title}
            </CardTitle>
            <CardDescription>{excerpt}</CardDescription>
          </div>
        </CardHeader>
      </CardContent>
    </CardPrimitive>
  );
}
