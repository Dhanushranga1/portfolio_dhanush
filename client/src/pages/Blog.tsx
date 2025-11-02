import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import blogImage from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';

// TODO: remove mock functionality
const allPosts = [
  {
    title: "Building Modern Web Applications",
    excerpt: "Learn how to create beautiful, performant web applications using React and TypeScript with best practices.",
    date: "Nov 2, 2025",
    readTime: "5 min read",
    category: "Development",
    image: blogImage,
  },
  {
    title: "The Future of Web Design",
    excerpt: "Exploring upcoming trends in web design and how they'll shape the digital landscape in the coming years.",
    date: "Oct 28, 2025",
    readTime: "7 min read",
    category: "Design",
  },
  {
    title: "TypeScript Best Practices",
    excerpt: "Essential TypeScript patterns and practices for writing maintainable and type-safe code.",
    date: "Oct 15, 2025",
    readTime: "6 min read",
    category: "Development",
    image: blogImage,
  },
  {
    title: "UI/UX Principles for Developers",
    excerpt: "Understanding core design principles to build better user interfaces as a developer.",
    date: "Oct 5, 2025",
    readTime: "8 min read",
    category: "Design",
  },
  {
    title: "State Management in React",
    excerpt: "Comparing different state management solutions and when to use each one in your applications.",
    date: "Sep 28, 2025",
    readTime: "10 min read",
    category: "Development",
    image: blogImage,
  },
  {
    title: "Accessibility in Modern Web Apps",
    excerpt: "Making your web applications accessible to everyone with practical tips and techniques.",
    date: "Sep 15, 2025",
    readTime: "6 min read",
    category: "Development",
  },
];

const categories = ["All", "Development", "Design"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Thoughts on development, design, and technology
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
