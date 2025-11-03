import { useState } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Tag, Search, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// For production, replace with: import { useBlogPosts, useBlogCategories } from "@/hooks/useStrapi";
// For now, we'll use mock data since Strapi isn't set up yet

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
  readTime: number; // in minutes
  author: {
    name: string;
    avatar: string | null;
  };
};

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
};

// Mock data
const MOCK_CATEGORIES: BlogCategory[] = [
  {
    id: "1",
    name: "Development",
    slug: "development",
    description: "Software development, coding tutorials, and best practices",
    postCount: 12,
  },
  {
    id: "2",
    name: "Design",
    slug: "design",
    description: "UI/UX design, visual design, and design systems",
    postCount: 8,
  },
  {
    id: "3",
    name: "Career",
    slug: "career",
    description: "Career advice, job hunting, and professional growth",
    postCount: 6,
  },
  {
    id: "4",
    name: "Tech",
    slug: "tech",
    description: "Technology trends, tools, and industry insights",
    postCount: 10,
  },
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building a Modern Portfolio with React and TypeScript",
    slug: "modern-portfolio-react-typescript",
    excerpt:
      "A comprehensive guide to building a developer portfolio using React 18, TypeScript, and modern tooling. Learn best practices for structure, performance, and SEO.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    category: { id: "1", name: "Development", slug: "development" },
    tags: ["react", "typescript", "portfolio", "web-development"],
    featured: true,
    publishedAt: "2024-10-15T10:00:00Z",
    readTime: 12,
    author: {
      name: "Dhanush",
      avatar: null,
    },
  },
  {
    id: "2",
    title: "The Terminal Aesthetic: Designing Developer-First UIs",
    slug: "terminal-aesthetic-developer-ui",
    excerpt:
      "Exploring the terminal-inspired design trend. Why developers love terminal UIs and how to implement them effectively in modern web applications.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    category: { id: "2", name: "Design", slug: "design" },
    tags: ["design", "ui-ux", "terminal", "developer-tools"],
    featured: true,
    publishedAt: "2024-10-10T14:30:00Z",
    readTime: 8,
    author: {
      name: "Dhanush",
      avatar: null,
    },
  },
  {
    id: "3",
    title: "From Bootcamp to Senior Developer: My 5-Year Journey",
    slug: "bootcamp-to-senior-developer",
    excerpt:
      "Reflections on my journey from coding bootcamp graduate to senior developer. Lessons learned, mistakes made, and advice for aspiring developers.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    category: { id: "3", name: "Career", slug: "career" },
    tags: ["career", "bootcamp", "learning", "advice"],
    featured: false,
    publishedAt: "2024-10-05T09:00:00Z",
    readTime: 15,
    author: {
      name: "Dhanush",
      avatar: null,
    },
  },
  {
    id: "4",
    title: "API Design Best Practices: Building RESTful Services",
    slug: "api-design-best-practices",
    excerpt:
      "A deep dive into REST API design patterns, versioning strategies, authentication, and documentation. Learn how to build APIs that developers love.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    category: { id: "1", name: "Development", slug: "development" },
    tags: ["api", "rest", "backend", "best-practices"],
    featured: true,
    publishedAt: "2024-09-28T11:00:00Z",
    readTime: 10,
    author: {
      name: "Dhanush",
      avatar: null,
    },
  },
  {
    id: "5",
    title: "The Rise of AI-Assisted Development",
    slug: "ai-assisted-development",
    excerpt:
      "How AI tools like GitHub Copilot and ChatGPT are changing software development. Practical tips for integrating AI into your workflow.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    category: { id: "4", name: "Tech", slug: "tech" },
    tags: ["ai", "copilot", "productivity", "tools"],
    featured: false,
    publishedAt: "2024-09-20T16:00:00Z",
    readTime: 7,
    author: {
      name: "Dhanush",
      avatar: null,
    },
  },
  {
    id: "6",
    title: "Mastering CSS Grid and Flexbox",
    slug: "mastering-css-grid-flexbox",
    excerpt:
      "A practical guide to modern CSS layouts. When to use Grid vs Flexbox, common patterns, and real-world examples from production applications.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=600&fit=crop",
    category: { id: "2", name: "Design", slug: "design" },
    tags: ["css", "grid", "flexbox", "layout"],
    featured: false,
    publishedAt: "2024-09-15T13:00:00Z",
    readTime: 9,
    author: {
      name: "Dhanush",
      avatar: null,
    },
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterFeatured, setFilterFeatured] = useState(false);

  // Filter posts
  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || post.category?.slug === selectedCategory;
    const matchesFeatured = !filterFeatured || post.featured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const featuredPosts = MOCK_POSTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text p-4 sm:p-6 lg:p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-terminal-accent-blue mb-2">
            <span className="text-terminal-accent-green">❯</span> Blog
          </h1>
          <p className="text-terminal-text-dim">
            Thoughts on development, design, and technology • {filteredPosts.length} posts
          </p>
        </div>

        {/* Featured Posts */}
        {!searchQuery && !selectedCategory && !filterFeatured && featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-terminal-accent-blue mb-6">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="terminal-card overflow-hidden cursor-pointer group hover:border-terminal-accent-blue transition-colors h-full">
                    <div className="aspect-video relative overflow-hidden bg-terminal-bg-alt">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-terminal-text-dim">
                          No cover image
                        </div>
                      )}
                      <Badge
                        variant="secondary"
                        className="absolute top-3 right-3 bg-terminal-accent-yellow text-terminal-bg"
                      >
                        Featured
                      </Badge>
                    </div>
                    <div className="p-6 space-y-3">
                      {post.category && (
                        <Badge variant="secondary" className="text-xs">
                          {post.category.name}
                        </Badge>
                      )}
                      <h3 className="font-bold text-terminal-accent-blue text-lg line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-terminal-text-dim line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-terminal-text-dim pt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {!searchQuery && !selectedCategory && !filterFeatured && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-terminal-accent-blue mb-6">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_CATEGORIES.map((category) => (
                <Card
                  key={category.id}
                  className="terminal-card p-4 cursor-pointer hover:border-terminal-accent-blue transition-colors"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-terminal-accent-blue">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.postCount}
                    </Badge>
                  </div>
                  <p className="text-sm text-terminal-text-dim line-clamp-2">
                    {category.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="terminal-card p-4 mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-terminal-bg-alt border-terminal-border"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-terminal-text-dim" />
              <Select
                value={selectedCategory || "all"}
                onValueChange={(v) => setSelectedCategory(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-[180px] bg-terminal-bg-alt border-terminal-border">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {MOCK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Filter */}
            <Button
              variant={filterFeatured ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterFeatured(!filterFeatured)}
              className={filterFeatured ? "bg-terminal-accent-yellow" : ""}
            >
              Featured Only
            </Button>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory || filterFeatured) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setFilterFeatured(false);
                }}
                className="ml-auto"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Category */}
          {selectedCategory && (
            <div className="pt-2 border-t border-terminal-border">
              <span className="text-sm text-terminal-text-dim">Viewing: </span>
              <Badge variant="secondary">
                {MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="terminal-card p-12 text-center">
            <p className="text-terminal-text-dim text-lg">
              No posts found matching your criteria
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="terminal-card overflow-hidden cursor-pointer group hover:border-terminal-accent-blue transition-colors">
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="md:w-64 flex-shrink-0">
                        <div className="aspect-video relative overflow-hidden bg-terminal-bg-alt rounded">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {post.category && (
                              <Badge variant="secondary" className="text-xs">
                                {post.category.name}
                              </Badge>
                            )}
                            {post.featured && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-terminal-accent-yellow text-terminal-bg"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h2 className="text-xl font-bold text-terminal-accent-blue mb-2 group-hover:text-terminal-accent-green transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-terminal-text-dim mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-terminal-text-dim group-hover:text-terminal-accent-blue transition-colors flex-shrink-0" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-terminal-text-dim pt-2 border-t border-terminal-border">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min read
                        </span>
                        <span className="ml-auto text-terminal-accent-blue group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
