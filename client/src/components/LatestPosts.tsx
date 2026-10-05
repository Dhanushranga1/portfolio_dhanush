import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { useBlogPosts } from "@/hooks/useStrapi";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedSection from "@/components/AnimatedSection";

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function LatestPosts() {
  const { data, isLoading } = useBlogPosts({ limit: 3 });
  const posts = data?.data ?? [];

  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="px-6 py-16 border-t border-border/60">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold text-foreground">Latest Writing</h2>
          <Link href="/blog">
            <span className="inline-flex items-center gap-1 text-sm text-accent-info hover:underline cursor-pointer">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </AnimatedSection>

        {isLoading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {posts.map((post, i) => (
              <AnimatedSection key={post.documentId} delay={i * 0.06}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group py-5 cursor-pointer flex items-start justify-between gap-6 transition-colors duration-150 -mx-3 px-3 rounded-lg hover:bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-accent-info transition-colors duration-150 mb-1">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-[60ch]">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-xs text-muted-foreground flex items-center gap-3 pt-1">
                      <span>{fmt(post.publishedAt ?? post.createdAt)}</span>
                      {post.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}m
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
