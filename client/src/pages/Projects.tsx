import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import projectImage1 from '@assets/generated_images/Project_dashboard_interface_694e38f2.png';
import projectImage2 from '@assets/generated_images/Mobile_app_mockup_7d3897fd.png';
import projectImage3 from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';

// TODO: remove mock functionality
const allProjects = [
  {
    title: "TaskFlow Pro",
    description: "A modern task management application with real-time collaboration, beautiful UI, and powerful features for teams.",
    image: projectImage1,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: "Web App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "MobileHub",
    description: "Cross-platform mobile application built with React Native featuring smooth animations and native performance.",
    image: projectImage2,
    tags: ["React Native", "Firebase", "Redux"],
    category: "Mobile App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and data visualization components.",
    image: projectImage3,
    tags: ["Next.js", "D3.js", "TailwindCSS"],
    category: "Web App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with payment integration and inventory management.",
    image: projectImage1,
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    category: "Web App",
    liveUrl: "#",
  },
  {
    title: "Social Media App",
    description: "Social networking application with real-time messaging and content sharing features.",
    image: projectImage2,
    tags: ["React Native", "GraphQL", "AWS"],
    category: "Mobile App",
    githubUrl: "#",
  },
  {
    title: "Portfolio Generator",
    description: "Tool for developers to create and deploy beautiful portfolio websites in minutes.",
    image: projectImage3,
    tags: ["Next.js", "TypeScript", "Vercel"],
    category: "Tool",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const categories = ["All", "Web App", "Mobile App", "Tool"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A collection of projects I've built and contributed to
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
