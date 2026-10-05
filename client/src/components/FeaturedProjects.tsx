import { Link } from "wouter";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useProjects } from "@/hooks/useStrapi";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProjects() {
  const { data, isLoading } = useProjects({ featured: true });
  const projects = (data?.data ?? []).slice(0, 3);

  if (!isLoading && projects.length === 0) return null;

  return (
    <section className="px-6 py-16 border-t border-border/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold text-foreground">Featured Projects</h2>
          <Link href="/projects">
            <span className="inline-flex items-center gap-1 text-sm text-accent-info hover:underline cursor-pointer">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.documentId}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 hover:border-accent-info/40 transition-colors duration-150"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent-info transition-colors duration-150">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(p.tags ?? []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.7rem] text-muted-foreground bg-muted px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      <Github className="h-3.5 w-3.5" /> Source
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
