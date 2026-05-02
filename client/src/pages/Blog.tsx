import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
import { SEO, seoConfigs } from "@/components/SEO";

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
    description: "Web frameworks, APIs, and best practices",
    postCount: 2,
  },
  {
    id: "2",
    name: "AI",
    slug: "ai",
    description: "Machine Learning, LLMs, and applied AI workflows",
    postCount: 2,
  },
  {
    id: "3",
    name: "Career",
    slug: "career",
    description: "Personal growth, DevOps journey, student life",
    postCount: 1,
  },
  {
    id: "4",
    name: "Tech",
    slug: "tech",
    description: "Open-source tools, utilities, and experiments",
    postCount: 1,
  },
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Bringing AI to Everyday Projects",
    slug: "bringing-ai-to-everyday-projects",
    excerpt:
      "How I integrated AI models like GPT-4 and Mistral into real projects. A practical overview of combining LLMs with APIs to make smarter, context-aware applications.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    category: { id: "2", name: "AI", slug: "ai" },
    tags: ["ai", "llm", "fastapi", "automation"],
    featured: true,
    publishedAt: "2024-11-03T10:00:00Z",
    readTime: 7,
    author: {
      name: "Dhanush Ranga",
      avatar: null,
    },
  },
  {
    id: "2",
    title: "Deploying FastAPI Apps with Docker & Render",
    slug: "deploying-fastapi-docker-render",
    excerpt:
      "A step-by-step breakdown of how I containerized and deployed my FastAPI apps using Docker and Render. Covers setup, CI/CD integration, and scaling best practices.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=600&fit=crop",
    category: { id: "1", name: "Development", slug: "development" },
    tags: ["fastapi", "docker", "backend", "deployment"],
    featured: true,
    publishedAt: "2024-11-06T14:30:00Z",
    readTime: 9,
    author: {
      name: "Dhanush Ranga",
      avatar: null,
    },
  },
  {
    id: "3",
    title: "How I Built ScrubPy — A Data Cleaning Library in Python",
    slug: "how-i-built-scrubpy",
    excerpt:
      "A behind-the-scenes look at ScrubPy — my open-source Python package for quick data cleaning. The motivation, design choices, and lessons from publishing to PyPI.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    category: { id: "4", name: "Tech", slug: "tech" },
    tags: ["python", "pandas", "data-cleaning", "pypi"],
    featured: true,
    publishedAt: "2024-11-10T09:00:00Z",
    readTime: 8,
    author: {
      name: "Dhanush Ranga",
      avatar: null,
    },
  },
  {
    id: "4",
    title: "My Journey into Cloud & DevOps",
    slug: "my-journey-cloud-devops",
    excerpt:
      "Reflecting on my first real experience with AWS, Terraform, and Kubernetes. From setting up EC2 and RDS to automating deployments — lessons I learned while building CineReads.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    category: { id: "3", name: "Career", slug: "career" },
    tags: ["cloud", "aws", "devops", "infrastructure"],
    featured: false,
    publishedAt: "2024-11-13T11:00:00Z",
    readTime: 10,
    author: {
      name: "Dhanush Ranga",
      avatar: null,
    },
  },
  {
    id: "5",
    title: "Building Smarter Search with FAISS and Gemini",
    slug: "building-smarter-search-faiss-gemini",
    excerpt:
      "Explaining how I used FAISS for semantic search and combined it with Gemini LLM to build a context-aware retrieval system in TicketPilot. Includes architecture and tuning notes.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200&h=600&fit=crop",
    category: { id: "2", name: "AI", slug: "ai" },
    tags: ["faiss", "gemini", "rag", "search"],
    featured: false,
    publishedAt: "2024-11-17T16:00:00Z",
    readTime: 9,
    author: {
      name: "Dhanush Ranga",
      avatar: null,
    },
  },
  {
    id: "6",
    title: "Balancing Studies and Real Projects",
    slug: "balancing-studies-real-projects",
    excerpt:
      "As a Computer Science student, managing academic load and real-world projects is tricky. Here's how I balance both — planning, learning from mentors, and turning coursework into portfolio-ready work.",
    content: "Full content would be here...",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    category: { id: "3", name: "Career", slug: "career" },
    tags: ["student-life", "projects", "productivity", "learning"],
    featured: false,
    publishedAt: "2024-11-20T13:00:00Z",
    readTime: 6,
    author: {
      name: "Dhanush Ranga",
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
    <>
      <SEO {...seoConfigs.blog} />
      <div className="min-h-screen bg-terminal-bg text-terminal-text pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-accent-info mb-3">
            <span className="text-accent-info/70">$</span> cat ~/blog
          </h1>
          <p className="text-terminal-text-dim text-base md:text-lg max-w-[65ch]" style={{ lineHeight: '1.6' }}>
            thoughts on development, design, and technology —{" "}
            <span className="text-accent-info/80">
              {filteredPosts.length} {filteredPosts.length === 1 ? "entry" : "entries"}
            </span>
          </p>
        </motion.div>

        {/* Featured Posts */}
        {!searchQuery && !selectedCategory && !filterFeatured && featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-accent-info">
              <span className="text-accent-info/70">$</span> ls -la featured/
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="terminal-card h-full overflow-hidden cursor-pointer group hover:border-accent-info/50 hover:bg-surface-2/30 transition-all duration-200">
                      <div className="aspect-video relative overflow-hidden bg-terminal-bg-alt border-b border-border/30">
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
                          className="absolute top-3 right-3 uppercase tracking-wider bg-amber-950/50 text-amber-400 border-amber-400/30 font-medium backdrop-blur-sm"
                        >
                          Featured
                        </Badge>
                      </div>
                      <div className="p-5 space-y-3">
                        {post.category && (
                          <Badge variant="secondary" className="text-xs uppercase tracking-wider bg-[#064E3B] text-[#10B981] border-[#10B981]/30 font-medium">
                            {post.category.name}
                          </Badge>
                        )}
                        <h3 className="text-xl font-semibold text-accent-info group-hover:text-accent-info/80 transition-colors line-clamp-2" style={{ lineHeight: '1.4' }}>
                          {post.title}
                        </h3>
                        <p className="text-[0.95rem] text-terminal-text-dim/90 line-clamp-3" style={{ lineHeight: '1.6' }}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-terminal-text-dim/80 pt-3 border-t border-border/30">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime} min
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories */}
        {!searchQuery && !selectedCategory && !filterFeatured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-accent-info">
              <span className="text-accent-info/70">$</span> ls categories/
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_CATEGORIES.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                >
                  <Link href={`/blog?category=${category.slug}`}>
                    <Card className="terminal-card p-5 cursor-pointer group hover:border-accent-info/50 hover:bg-surface-2/30 transition-all duration-200 h-full">
                      <div className="flex items-start justify-between mb-3">
                        <Tag className="h-5 w-5 text-accent-info/70 group-hover:text-accent-info transition-colors" />
                        <Badge variant="secondary" className="text-xs bg-surface-2 text-accent-info/80 border border-border/50 font-medium">
                          {category.postCount}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg text-accent-info group-hover:text-accent-info/80 transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-terminal-text-dim/90 line-clamp-2" style={{ lineHeight: '1.6' }}>
                        {category.description}
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="terminal-card p-5 mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-terminal-bg-alt border-terminal-border focus:border-accent-info/50 focus:ring-2 focus:ring-accent-info/20 transition-all duration-200"
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
        </motion.div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="terminal-card p-12 text-center"
          >
            <p className="text-terminal-text-dim text-lg">
              No posts found matching your criteria
            </p>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(0.6 + idx * 0.1, 1.2) }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="terminal-card overflow-hidden cursor-pointer group hover:border-l-4 hover:border-l-accent-info hover:border-accent-info/50 hover:bg-surface-2/30 transition-all duration-200">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Cover Image */}
                      {post.coverImage && (
                        <div className="md:w-64 flex-shrink-0">
                          <div className="aspect-video relative overflow-hidden bg-terminal-bg-alt rounded border border-border/30">
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
                            <div className="flex items-center gap-2 mb-3">
                              {post.category && (
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs uppercase tracking-wider bg-[#064E3B] text-[#10B981] border-[#10B981]/30 font-medium"
                                >
                                  {post.category.name}
                                </Badge>
                              )}
                              {post.featured && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs uppercase tracking-wider bg-amber-950/50 text-amber-400 border-amber-400/30 font-medium"
                                >
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-accent-info mb-3 group-hover:text-accent-info/80 transition-colors" style={{ lineHeight: '1.4' }}>
                              {post.title}
                            </h2>
                            <p className="text-[0.95rem] text-terminal-text-dim/90 mb-4 line-clamp-2" style={{ lineHeight: '1.6' }}>
                              {post.excerpt}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-terminal-text-dim group-hover:text-accent-info transition-colors flex-shrink-0 mt-1" />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-surface-2 text-terminal-text-dim/80 border-border/50 hover:border-accent-info/50 transition-colors">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-terminal-text-dim/80 pt-3 border-t border-border/30">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime} min read
                          </span>
                          <span className="ml-auto text-accent-info/80 group-hover:text-accent-info group-hover:underline transition-colors">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
