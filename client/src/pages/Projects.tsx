import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "ticketpilot",
    description: "ai-powered multi-tenant support platform with rag pipeline and vector search, reducing query resolution time by 60%",
    impact: "Reduced customer query resolution time by 60% across 50+ monthly support tickets",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Supabase", "FAISS", "Gemini LLM"],
    liveUrl: "https://ticketpilot.demo", // Update with actual URL
    githubUrl: "https://github.com/dhanushranga1/ticketpilot", // Update with actual URL
    status: "ok" as const,
  },
  {
    title: "cinereads",
    description: "movie-to-book recommendation platform integrating gpt-4 with hardcover and tmdb apis, serving 1,000+ monthly users",
    impact: "85% cache hit rate saving $200/month in API costs, 1,000+ monthly active users",
    tags: ["FastAPI", "Docker", "Kubernetes", "Terraform", "Prometheus", "GPT-4"],
    liveUrl: "https://cinereads.demo", // Update with actual URL
    githubUrl: "https://github.com/dhanushranga1/cinereads", // Update with actual URL
    status: "ok" as const,
  },
  {
    title: "scrubpy",
    description: "python library automating csv preprocessing with mistral llm integration for conversational data queries",
    impact: "30+ downloads in first month, 40% reduction in manual data cleaning effort",
    tags: ["Python", "pandas", "scikit-learn", "Mistral LLM"],
    liveUrl: "https://pypi.org/project/scrubpy/",
    githubUrl: "https://github.com/dhanushranga1/scrubpy", // Update with actual URL
    status: "ok" as const,
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Terminal-style header */}
        <div className="mb-8 font-mono">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-terminal-muted">$</span> ls --impact ~/projects
          </h1>
          <p className="text-sm text-muted-foreground">
            showing {projects.length} items • sorted by impact
          </p>
        </div>

        {/* Projects as terminal list */}
        <ul className="space-y-8" role="list">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </ul>

        {/* Terminal-style footer */}
        <div className="mt-12 pt-8 border-t border-border font-mono text-sm text-muted-foreground">
          <p>
            <span className="text-terminal-muted">$</span> total {projects.length} projects
          </p>
          <p className="mt-2 text-xs">
            tip: press{" "}
            <kbd className="px-2 py-0.5 border border-border rounded bg-muted">
              ⌘K
            </kbd>{" "}
            to open command palette
          </p>
        </div>
      </div>
    </div>
  );
}
