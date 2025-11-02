import ProjectCard from "@/components/ProjectCard";
import projectImage1 from '@assets/generated_images/Project_dashboard_interface_694e38f2.png';
import projectImage2 from '@assets/generated_images/Mobile_app_mockup_7d3897fd.png';
import projectImage3 from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';

// TODO: remove mock functionality
const projects = [
  {
    title: "taskflow",
    description: "a context-aware desktop focus companion",
    image: projectImage1,
    tags: ["React", "TypeScript", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "mobilehub",
    description: "your ai-powered shortcut to open source",
    image: projectImage2,
    tags: ["React Native", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "analytics-dashboard",
    description: "a tui-style browser startpage",
    image: projectImage3,
    tags: ["Next.js", "D3.js"],
    liveUrl: "#",
  },
  {
    title: "social-platform",
    description: "a crowdsourced, gamified urban exploration map",
    image: projectImage1,
    tags: ["React", "GraphQL"],
    githubUrl: "#",
  },
  {
    title: "cms-builder",
    description: "an interplanetary messaging system",
    image: projectImage2,
    tags: ["Next.js", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "portfolio-gen",
    description: "a tui-style discord theme",
    image: projectImage3,
    tags: ["Next.js", "TypeScript"],
    liveUrl: "#",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-mono font-bold mb-12">projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
