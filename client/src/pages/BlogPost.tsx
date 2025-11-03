import { useRoute, Link } from "wouter";
import { Calendar, Clock, Tag, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// For production, replace with: import { useBlogPost } from "@/hooks/useStrapi";
// For now, we'll use mock data

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string | null;
  readTime: number;
  author: {
    name: string;
    bio: string;
    avatar: string | null;
  };
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
};

// Mock detailed post data
const MOCK_POSTS: Record<string, BlogPost> = {
  "modern-portfolio-react-typescript": {
    id: "1",
    title: "Building a Modern Portfolio with React and TypeScript",
    slug: "modern-portfolio-react-typescript",
    excerpt:
      "A comprehensive guide to building a developer portfolio using React 18, TypeScript, and modern tooling. Learn best practices for structure, performance, and SEO.",
    content: `# Introduction

Building a portfolio website is a rite of passage for developers. It's your digital handshake, your first impression, and often the deciding factor in landing your next opportunity. In this comprehensive guide, I'll walk you through building a modern, performant portfolio using React 18 and TypeScript.

## Why React and TypeScript?

**React** remains the most popular UI library, with a vast ecosystem and excellent tooling. **TypeScript** adds type safety, better IDE support, and catches bugs before they reach production.

\`\`\`typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}
\`\`\`

## Project Structure

A well-organized project structure is crucial for maintainability:

\`\`\`
src/
├── components/      # Reusable UI components
│   ├── ui/         # shadcn/ui components
│   └── ...
├── pages/          # Page components
├── lib/            # Utilities and helpers
├── hooks/          # Custom React hooks
└── assets/         # Images, fonts, etc.
\`\`\`

## Key Features

### 1. **Component Architecture**

Build reusable components with clear prop types:

\`\`\`tsx
interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  return (
    <Card className={variant === "featured" ? "border-accent" : ""}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </Card>
  );
}
\`\`\`

### 2. **Performance Optimization**

- Use \`React.lazy()\` for code splitting
- Implement image lazy loading
- Optimize bundle size with tree shaking
- Use \`useMemo\` and \`useCallback\` judiciously

### 3. **SEO Considerations**

Even for a single-page app, SEO matters:

- Add meta tags for social sharing
- Use semantic HTML
- Implement proper heading hierarchy
- Add structured data (JSON-LD)

## Styling Approach

I recommend **Tailwind CSS** with **shadcn/ui** components:

\`\`\`tsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold mb-4">
    Welcome to my portfolio
  </h1>
</div>
\`\`\`

## Deployment

Deploy to **Vercel** or **Netlify** for:
- Automatic HTTPS
- CDN distribution
- Easy CI/CD integration
- Preview deployments

## Conclusion

Building a portfolio is an ongoing process. Start simple, iterate, and always showcase your best work. Remember: your portfolio itself is a project that demonstrates your skills.

Happy coding! 🚀`,
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    category: { id: "1", name: "Development", slug: "development" },
    tags: ["react", "typescript", "portfolio", "web-development"],
    featured: true,
    publishedAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-16T08:00:00Z",
    readTime: 12,
    author: {
      name: "Dhanush",
      bio: "Full-stack developer passionate about building great user experiences",
      avatar: null,
    },
    seo: {
      metaTitle: "Building a Modern Portfolio with React and TypeScript | Dhanush",
      metaDescription:
        "Learn how to build a modern, performant developer portfolio using React 18, TypeScript, and best practices for structure, performance, and SEO.",
    },
  },
  "terminal-aesthetic-developer-ui": {
    id: "2",
    title: "The Terminal Aesthetic: Designing Developer-First UIs",
    slug: "terminal-aesthetic-developer-ui",
    excerpt:
      "Exploring the terminal-inspired design trend. Why developers love terminal UIs and how to implement them effectively in modern web applications.",
    content: `# The Terminal Aesthetic

There's a growing trend in developer tools and portfolios: the **terminal aesthetic**. Clean monospace fonts, dark backgrounds, command-line interfaces, and ASCII art. But why?

## Why Developers Love Terminal UIs

### 1. **Familiarity**
Developers spend hours in terminals. A terminal-inspired UI feels like home.

### 2. **Efficiency**
Command-line interfaces prioritize function over form. Every element has purpose.

### 3. **Personality**
In a world of Material Design and iOS-style interfaces, terminal UIs stand out.

## Design Principles

### Color Palette
\`\`\`css
:root {
  --terminal-bg: #0d1117;
  --terminal-text: #c9d1d9;
  --terminal-accent: #58a6ff;
  --terminal-success: #3fb950;
  --terminal-error: #f85149;
}
\`\`\`

### Typography
Use monospace fonts like:
- **Fira Code** (with ligatures)
- **JetBrains Mono**
- **Cascadia Code**
- **SF Mono** (macOS)

### Motion
Keep animations subtle:
- Cursor blinks
- Text typewriter effects
- Smooth fades (not slides)

## Implementation Tips

### 1. Command Palette
Implement a searchable command palette (Cmd+K):

\`\`\`tsx
<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandGroup heading="Navigation">
      <CommandItem>Projects</CommandItem>
      <CommandItem>About</CommandItem>
      <CommandItem>Contact</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
\`\`\`

### 2. ASCII Art
Use ASCII art sparingly for visual interest.

### 3. Accessibility
Don't sacrifice accessibility for aesthetics:
- Ensure sufficient color contrast
- Provide alternative navigation
- Support keyboard shortcuts
- Respect \`prefers-reduced-motion\`

## When to Use (and Not Use)

**✅ Good for:**
- Developer portfolios
- CLI tools
- Developer-focused products
- Technical documentation sites

**❌ Avoid for:**
- E-commerce
- Content-heavy sites
- Non-technical audiences
- Accessibility-critical applications

## Conclusion

The terminal aesthetic isn't just a trend—it's a celebration of developer culture. When done right, it creates memorable, efficient interfaces that developers love to use.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    category: { id: "2", name: "Design", slug: "design" },
    tags: ["design", "ui-ux", "terminal", "developer-tools"],
    featured: true,
    publishedAt: "2024-10-10T14:30:00Z",
    updatedAt: null,
    readTime: 8,
    author: {
      name: "Dhanush",
      bio: "Full-stack developer passionate about building great user experiences",
      avatar: null,
    },
    seo: null,
  },
};

// Mock related posts
const RELATED_POSTS = [
  {
    id: "3",
    title: "From Bootcamp to Senior Developer: My 5-Year Journey",
    slug: "bootcamp-to-senior-developer",
    excerpt: "Reflections on my journey from coding bootcamp graduate to senior developer...",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
  },
  {
    id: "4",
    title: "API Design Best Practices: Building RESTful Services",
    slug: "api-design-best-practices",
    excerpt: "A deep dive into REST API design patterns, versioning strategies...",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
  },
];

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const { toast } = useToast();
  
  const post = params?.slug ? MOCK_POSTS[params.slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-text p-4 sm:p-6 lg:p-8 font-mono">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-card p-12 text-center">
            <h1 className="text-2xl font-bold text-terminal-accent-blue mb-4">
              Post Not Found
            </h1>
            <p className="text-terminal-text-dim mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button>
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
  );
}
