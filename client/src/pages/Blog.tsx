import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Search } from "lucide-react";
import { SEO, seoConfigs } from "@/components/SEO";

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

const POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building CASPER: an adaptive RAG scoring algorithm",
    slug: "building-casper-adaptive-rag",
    excerpt:
      "How I designed CASPER — a custom RAG engine for TicketPilot that classifies query intent across four types and adjusts retrieval strategy, MMR lambda, and escalation thresholds per query. Includes the experiment that cut overconfidence bias from 0.0028 → 0.0003.",
    category: "AI",
    tags: ["rag", "faiss", "gemini", "python", "ticketpilot"],
    featured: true,
    publishedAt: "2025-04-10T10:00:00Z",
    readTime: 10,
  },
  {
    id: "2",
    title: "Natural language API gateway management with LangGraph",
    slug: "natural-language-api-gateway-langgraph",
    excerpt:
      "Building Kong-Agentic at Tonik: how I wired LangGraph + Groq to Kong's Admin API, added dual-model routing (8b for reads, 70b for writes), and a three-tier fallback chain so the tool never goes down even when the LLM rate-limits.",
    category: "AI",
    tags: ["langgraph", "groq", "kong", "fastapi", "agentic"],
    featured: true,
    publishedAt: "2025-03-18T09:00:00Z",
    readTime: 9,
  },
  {
    id: "3",
    title: "Bringing AI to everyday projects",
    slug: "bringing-ai-to-everyday-projects",
    excerpt:
      "A practical overview of integrating GPT-4 and Mistral into real projects — combining LLMs with APIs to make smarter, context-aware applications without over-engineering.",
    category: "AI",
    tags: ["ai", "llm", "fastapi", "automation"],
    featured: true,
    publishedAt: "2024-11-03T10:00:00Z",
    readTime: 7,
  },
  {
    id: "4",
    title: "Deploying FastAPI apps with Docker and Render",
    slug: "deploying-fastapi-docker-render",
    excerpt:
      "A step-by-step breakdown of containerising and deploying FastAPI apps. Covers production Dockerfiles, CI/CD integration, connection timeout handling, and the specific quirks of Render's free tier.",
    category: "Development",
    tags: ["fastapi", "docker", "backend", "deployment"],
    featured: false,
    publishedAt: "2024-11-06T14:30:00Z",
    readTime: 9,
  },
  {
    id: "5",
    title: "How I built ScrubPy — a data cleaning library in Python",
    slug: "how-i-built-scrubpy",
    excerpt:
      "Behind the scenes of ScrubPy: the motivation, design decisions, publishing to PyPI, and how I added a Streamlit web GUI plus an LLM chat interface on top of a pure pandas/numpy core.",
    category: "Tech",
    tags: ["python", "pandas", "data-cleaning", "pypi"],
    featured: false,
    publishedAt: "2024-11-10T09:00:00Z",
    readTime: 8,
  },
  {
    id: "6",
    title: "Building smarter search with FAISS and Gemini",
    slug: "building-smarter-search-faiss-gemini",
    excerpt:
      "How I used FAISS for semantic vector search and combined it with Gemini embeddings to build context-aware retrieval in TicketPilot — including cold-start persistence via binary snapshots in PostgreSQL.",
    category: "AI",
    tags: ["faiss", "gemini", "rag", "search", "postgresql"],
    featured: false,
    publishedAt: "2024-11-17T16:00:00Z",
    readTime: 9,
  },
  {
    id: "7",
    title: "My journey into cloud and DevOps",
    slug: "my-journey-cloud-devops",
    excerpt:
      "Reflecting on my first real experience with AWS, Terraform, and Kubernetes while building CineReads — from EC2 and RDS basics to automating deployments and learning what actually breaks in production.",
    category: "Career",
    tags: ["cloud", "aws", "devops", "kubernetes", "terraform"],
    featured: false,
    publishedAt: "2024-11-13T11:00:00Z",
    readTime: 10,
  },
  {
    id: "8",
    title: "Balancing studies and real projects",
    slug: "balancing-studies-real-projects",
    excerpt:
      "Managing a 9.06 CGPA alongside production-grade side projects isn't magic — it's planning, saying no to the wrong things, and learning to treat coursework as a launchpad, not a ceiling.",
    category: "Career",
    tags: ["student-life", "productivity", "learning"],
    featured: false,
    publishedAt: "2024-11-20T13:00:00Z",
    readTime: 6,
  },
];

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
      <div className="min-h-screen pt-24 pb-32 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-3">
              <span className="text-accent-info">$</span> cat ~/blog
            </h1>
            <p className="text-sm font-mono text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "entry" : "entries"} · thoughts on ai, systems, and shipping things
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
            <div className="relative font-mono">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search posts, tags…"
                className="w-full pl-9 pr-4 py-2 text-sm bg-surface-2/50 border border-border/40 rounded focus:outline-none focus:border-accent-info/40 text-foreground placeholder:text-muted-foreground/40 transition-colors duration-150"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 rounded border transition-colors duration-150 ${
                    category === cat
                      ? "bg-accent-info text-surface border-accent-info font-semibold"
                      : "border-border/40 text-muted-foreground hover:text-accent-info hover:border-accent-info/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {(search || category !== "All") && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setCategory("All"); }}
                  className="px-2.5 py-1 rounded border border-border/40 text-muted-foreground/50 hover:text-accent-warn hover:border-accent-warn/30 transition-colors duration-150"
                >
                  ✕ clear
                </button>
              )}
            </div>
          </motion.div>

          {/* Post list */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm text-muted-foreground py-12 text-center"
            >
              <p><span className="text-accent-action">$</span> no posts match &quot;{search}&quot;</p>
              <p className="text-xs mt-1 opacity-60">// try a different search term</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, delay: 0.1 }}
              className="space-y-px"
            >
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: 0.12 + i * 0.04 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group relative py-5 border-b border-border/20 cursor-pointer hover:bg-surface-2/30 -mx-4 px-4 rounded transition-colors duration-150">

                      {/* Featured accent */}
                      {post.featured && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent-info/60 rounded-r"
                          aria-label="featured"
                        />
                      )}

                      {/* Top row: category + date + read-time */}
                      <div className="flex items-center gap-3 mb-2 font-mono text-xs text-muted-foreground">
                        <span
                          className={`px-2 py-0.5 rounded border text-[0.68rem] font-medium uppercase tracking-wider ${categoryColors[post.category] ?? ""}`}
                        >
                          {post.category}
                        </span>
                        <span>{fmt(post.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}m
                        </span>
                        {post.featured && (
                          <span className="text-accent-info/60 text-[0.65rem] uppercase tracking-widest ml-auto">featured</span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-mono font-semibold text-base text-foreground group-hover:text-accent-info transition-colors duration-150 mb-2 leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-mono text-xs text-muted-foreground leading-relaxed line-clamp-2 max-w-[65ch]">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[0.65rem] text-muted-foreground/60 bg-surface-2 border border-border/30 px-1.5 py-0.5 rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Hover arrow */}
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-info opacity-0 group-hover:opacity-100 transition-opacity duration-150 font-mono text-sm">
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-border/20 font-mono text-xs text-muted-foreground/50">
            <p>
              <span className="text-accent-info">$</span> total {filtered.length} posts
              {category !== "All" && ` in "${category}"`}
              {search && ` matching "${search}"`}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
