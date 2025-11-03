import BlogCard from "@/components/BlogCard";
import { Rss } from "lucide-react";

// TODO: remove mock functionality
const posts = [
  {
    title: "spatial page transitions",
    excerpt: "intuitive page transitions that map website hierarchy to 2D space (in sveltekit)",
    date: "02/22/2025",
    category: "Development",
  },
  {
    title: "playing atari with deep reinforcement learning",
    excerpt: "a deep learning model learns superhuman atari skills",
    date: "07/10/2024",
    category: "AI",
  },
  {
    title: "you only look once",
    excerpt: "real-time object detection using a single neural network",
    date: "07/02/2024",
    category: "AI",
  },
  {
    title: "the platonic representation hypothesis",
    excerpt: "the theory that AI models converge on shared model of reality",
    date: "06/22/2024",
    category: "AI",
  },
  {
    title: "attention is all you need",
    excerpt: "a revolutionary neural network architecture",
    date: "06/02/2024",
    category: "AI",
  },
  {
    title: "optimizing my sveltekit blog",
    excerpt: "improving performance on a static sveltekit site",
    date: "04/15/2024",
    category: "Development",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-mono font-bold">blog</h1>
          <a
            href="#"
            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            data-testid="link-rss"
          >
            <Rss className="h-4 w-4" />
            rss
          </a>
        </div>

        <div className="divide-y divide-border">
          {posts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
