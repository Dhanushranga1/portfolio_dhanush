import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Search } from "lucide-react";
import { SEO, seoConfigs } from "@/components/SEO";
import { useBlogPosts } from "@/hooks/useStrapi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  readTime: number;
};

const CATEGORIES = ["All", "AI", "Development", "Tech", "Career"];

const categoryColors: Record<string, string> = {
  AI:          "text-purple-300 bg-purple-400/8 border-purple-400/25",
  Development: "text-blue-300 bg-blue-400/8 border-blue-400/25",
  Tech:        "text-accent-info bg-accent-info/8 border-accent-info/25",
  Career:      "text-orange-300 bg-orange-400/8 border-orange-400/25",
};

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data, isLoading, isError, refetch } = useBlogPosts();

  const POSTS: BlogPost[] = useMemo(
    () =>
      (data?.data ?? []).map((p) => ({
        id: p.documentId,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt ?? "",
        category: p.blog_category?.name ?? "Uncategorized",
        tags: p.tags ?? [],
        featured: p.featured,
        publishedAt: p.publishedAt ?? p.createdAt,
        readTime: p.readTime ?? 5,
      })),
    [data]
  );

  const filtered = POSTS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q));
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <>
      <SEO {...seoConfigs.blog} />
      <div className="min-h-screen pt-20 pb-28 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Blog</h1>
            <p className="text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "post" : "posts"} on AI, systems, and shipping things
            </p>
          </motion.div>

          {/* Search + category filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.06 }}
            className="space-y-4 mb-10"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts, tags…"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-info/30 focus:border-accent-info/40 text-foreground placeholder:text-muted-foreground/50 transition-colors duration-150"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 text-sm">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                    category === cat
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {(search || category !== "All") && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setCategory("All"); }}
                  className="px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-accent-warn hover:border-accent-warn/30 transition-colors duration-150"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          {/* Post list */}
          {isLoading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading posts">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-sm text-muted-foreground py-12 text-center">
              <p className="mb-3">Failed to load posts.</p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground py-12 text-center"
            >
              <p>No posts match &quot;{search}&quot;.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, delay: 0.1 }}
              className="divide-y divide-border/60"
            >
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: 0.12 + i * 0.04 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group relative py-6 cursor-pointer -mx-4 px-4 rounded-lg hover:bg-muted/40 transition-colors duration-150">

                      {/* Top row: category + date + read-time */}
                      <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[0.68rem] font-medium uppercase tracking-wider ${categoryColors[post.category] ?? ""}`}
                        >
                          {post.category}
                        </span>
                        <span>{fmt(post.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}m
                        </span>
                        {post.featured && (
                          <span className="text-accent-info text-[0.65rem] uppercase tracking-widest ml-auto font-medium">Featured</span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-semibold text-lg text-foreground group-hover:text-accent-info transition-colors duration-150 mb-2 leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[65ch]">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs text-muted-foreground/80 bg-muted px-2 py-0.5 rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}
