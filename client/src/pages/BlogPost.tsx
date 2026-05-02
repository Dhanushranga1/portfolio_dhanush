import { useRoute, Link } from "wouter";
import { Calendar, Clock, ChevronLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SEO } from "@/components/SEO";
import { BlogPostStructuredData } from "@/components/StructuredData";

function renderContent(md: string) {
  return md
    .split("\n\n")
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-lg font-semibold text-accent-info mt-10 mb-4">
            {block.slice(3)}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="text-base font-semibold text-foreground mt-8 mb-3">
            {block.slice(4)}
          </h3>
        );
      }
      if (block.startsWith("```")) {
        const code = block.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
        return (
          <pre key={i} className="bg-surface-2 border border-border/40 rounded p-4 overflow-x-auto my-4 text-xs text-accent-info/90 leading-relaxed">
            <code>{code}</code>
          </pre>
        );
      }
      if (block.match(/^- /m) || block.match(/^\* /m)) {
        const items = block.split("\n").filter(Boolean);
        return (
          <ul key={i} className="space-y-1.5 my-4">
            {items.map((line, j) => (
              <li key={j} className="flex gap-2 text-muted-foreground">
                <span className="text-accent-info/40 shrink-0 select-none mt-0.5">›</span>
                <span>{line.replace(/^[-*]\s+/, "")}</span>
              </li>
            ))}
          </ul>
        );
      }
      // inline bold with **text**
      const withBold = block.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
      // inline code with `text`
      const withCode = withBold.replace(/`([^`]+)`/g, '<code class="bg-surface-2 border border-border/30 text-accent-info px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
      return (
        <p
          key={i}
          className="text-muted-foreground leading-[1.75] my-4"
          dangerouslySetInnerHTML={{ __html: withCode }}
        />
      );
    });
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const { toast } = useToast();
  const post = params?.slug ? BLOG_POSTS[params.slug] : null;

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post?.slug}`;
    navigator.clipboard.writeText(url);
    toast({ description: "Link copied to clipboard", duration: 2000 });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 font-mono">
        <div className="space-y-4 text-center">
          <p className="text-accent-warn text-sm">bash: /blog/{params?.slug}: No such file or directory</p>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-accent-info hover:underline cursor-pointer text-sm">
              <ChevronLeft className="h-3.5 w-3.5" />
              back to /blog
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | Dhanush Ranga`}
        description={post.seo?.metaDescription ?? post.excerpt}
        keywords={post.tags.join(", ")}
        ogType="article"
        canonicalUrl={`https://dhanushranga1.dev/blog/${post.slug}`}
      />
      <BlogPostStructuredData
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author.name}
        image={post.coverImage}
        url={`https://dhanushranga1.dev/blog/${post.slug}`}
      />

      <div className="min-h-screen pt-24 pb-32 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back nav */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-10"
          >
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent-info transition-colors duration-150 cursor-pointer group">
                <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
                ~/blog
              </span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.05 }}
            className="mb-10 pb-8 border-b border-border/20"
          >
            {/* Category */}
            {post.category && (
              <span className="inline-block font-mono text-[0.68rem] uppercase tracking-widest text-accent-info/70 mb-4">
                {post.category.name}
              </span>
            )}

            <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground leading-snug mb-5">
              {post.title}
            </h1>

            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6 max-w-[60ch]">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.readTime} min read
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 ml-auto hover:text-accent-info transition-colors duration-150 focus:outline-none"
                aria-label="Copy link"
              >
                <Share2 className="h-3 w-3" />
                share
              </button>
            </div>
          </motion.header>

          {/* Article body */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="font-mono text-sm"
          >
            {renderContent(post.content)}
          </motion.article>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="mt-12 pt-8 border-t border-border/20"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.68rem] text-muted-foreground/60 bg-surface-2 border border-border/30 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Footer nav */}
          <div className="mt-10 font-mono text-xs text-muted-foreground/50">
            <Link href="/blog">
              <span className="hover:text-accent-info transition-colors duration-150 cursor-pointer">
                ← back to all posts
              </span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
