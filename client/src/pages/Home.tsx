import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import projectImage1 from '@assets/generated_images/Project_dashboard_interface_694e38f2.png';
import projectImage2 from '@assets/generated_images/Mobile_app_mockup_7d3897fd.png';
import blogImage from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';

// TODO: remove mock functionality
const featuredProjects = [
  {
    title: "TaskFlow Pro",
    description: "A modern task management application with real-time collaboration, beautiful UI, and powerful features for teams.",
    image: projectImage1,
    tags: ["React", "TypeScript", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "MobileHub",
    description: "Cross-platform mobile application built with React Native featuring smooth animations and native performance.",
    image: projectImage2,
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

// TODO: remove mock functionality
const recentPosts = [
  {
    title: "Building Modern Web Applications",
    excerpt: "Learn how to create beautiful, performant web applications using React and TypeScript.",
    date: "Nov 2, 2025",
    readTime: "5 min read",
    category: "Development",
    image: blogImage,
  },
  {
    title: "The Future of Web Design",
    excerpt: "Exploring upcoming trends in web design and how they'll shape the digital landscape.",
    date: "Oct 28, 2025",
    readTime: "7 min read",
    category: "Design",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Projects */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Work</h2>
            <p className="text-muted-foreground text-lg">
              Some of my recent projects and experiments
            </p>
          </div>
          <Link href="/projects">
            <Button variant="ghost" className="hidden md:flex" data-testid="button-view-all-projects">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <Link href="/projects">
          <Button variant="ghost" className="md:hidden mt-8 w-full" data-testid="button-view-all-projects-mobile">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Latest Posts</h2>
            <p className="text-muted-foreground text-lg">
              Thoughts on development, design, and technology
            </p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="hidden md:flex" data-testid="button-view-all-posts">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentPosts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>

        <Link href="/blog">
          <Button variant="ghost" className="md:hidden mt-8 w-full" data-testid="button-view-all-posts-mobile">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground">
            Have a project in mind? Let's discuss how we can work together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" data-testid="button-get-in-touch">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/messages">
              <Button size="lg" variant="outline" data-testid="button-leave-message">
                Leave a Message
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
