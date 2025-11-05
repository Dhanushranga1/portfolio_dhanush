import { useRoute, Link } from "wouter";
import { Calendar, Clock, Tag, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BLOG_POSTS as MOCK_POSTS, RELATED_POSTS, type BlogPost } from "@/data/blogPosts";
import { SEO } from "@/components/SEO";
import { BlogPostStructuredData } from "@/components/StructuredData";

// For production, replace with: import { useBlogPost } from "@/hooks/useStrapi";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const { toast } = useToast();

  const post = params?.slug ? MOCK_POSTS[params.slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-text p-4 sm:p-6 lg:p-8 font-mono">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-card p-8 text-center">
            <h1 className="text-2xl font-bold text-terminal-accent-red mb-4">
              404: Post Not Found
            </h1>
            <p className="text-terminal-text-dim mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button variant="outline">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: url,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Post URL copied to clipboard",
        });
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Post URL copied to clipboard",
      });
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} | Dhanush Ranga Gopisetty`}
        description={post.seo?.metaDescription || post.excerpt}
        keywords={post.tags.join(", ")}
        ogImage={post.coverImage || "https://dhanushranga1.dev/og-image.png"}
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
      <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full aspect-[21/9] bg-terminal-bg-alt relative overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-terminal-bg" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-32 relative z-10">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="outline" size="sm" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <article className="terminal-card p-8 mb-8">
          {/* Category & Featured Badge */}
          <div className="flex items-center gap-2 mb-4">
            {post.category && (
              <Badge variant="secondary">{post.category.name}</Badge>
            )}
            {post.featured && (
              <Badge variant="secondary" className="bg-terminal-accent-yellow text-terminal-bg">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-terminal-accent-blue mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-terminal-text-dim mb-6">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-terminal-text-dim pb-6 border-b border-terminal-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-terminal-accent-blue/20 flex items-center justify-center text-terminal-accent-blue font-bold">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-terminal-text">{post.author.name}</div>
                <div className="text-xs">{post.author.bio}</div>
              </div>
            </div>

            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </span>

            {/* Actions */}
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-terminal max-w-none mt-8">
            {/* This would be rendered markdown in production */}
            <div
              className="space-y-6 text-terminal-text"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split("\n\n")
                  .map((paragraph) => {
                    // Simple markdown-to-HTML converter for demo
                    if (paragraph.startsWith("# ")) {
                      return `<h1 class="text-3xl font-bold text-terminal-accent-blue mb-4">${paragraph.slice(2)}</h1>`;
                    }
                    if (paragraph.startsWith("## ")) {
                      return `<h2 class="text-2xl font-bold text-terminal-accent-blue mb-3 mt-8">${paragraph.slice(3)}</h2>`;
                    }
                    if (paragraph.startsWith("### ")) {
                      return `<h3 class="text-xl font-bold text-terminal-accent-blue mb-2 mt-6">${paragraph.slice(4)}</h3>`;
                    }
                    if (paragraph.startsWith("```")) {
                      return `<pre class="bg-terminal-bg-alt p-4 rounded border border-terminal-border overflow-x-auto my-4"><code>${paragraph.slice(3, -3)}</code></pre>`;
                    }
                    if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
                      return `<ul class="list-disc list-inside space-y-1 ml-4">${paragraph
                        .split("\n")
                        .map((line) => `<li>${line.slice(2)}</li>`)
                        .join("")}</ul>`;
                    }
                    return `<p class="text-terminal-text-dim leading-relaxed">${paragraph}</p>`;
                  })
                  .join(""),
              }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-terminal-border">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Updated Date */}
          {post.updatedAt && (
            <p className="text-xs text-terminal-text-dim mt-6">
              Last updated: {new Date(post.updatedAt).toLocaleDateString()}
            </p>
          )}
        </article>

        {/* Related Posts */}
        {RELATED_POSTS.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-terminal-accent-blue mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RELATED_POSTS.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="terminal-card overflow-hidden cursor-pointer group hover:border-terminal-accent-blue transition-colors">
                    <div className="aspect-video relative overflow-hidden bg-terminal-bg-alt">
                      {relatedPost.coverImage && (
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-terminal-accent-blue mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-terminal-text-dim line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
