import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const allProjects = [
  {
    title: "ticketpilot",
    description: "ai-powered multi-tenant support platform with rag pipeline and vector search, reducing query resolution time by 60%",
    impact: "Reduced customer query resolution time by 60% across 50+ monthly support tickets",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Supabase", "FAISS", "Gemini LLM"],
    liveUrl: "https://ticketpilot.demo", // Update with actual URL
    githubUrl: "https://github.com/dhanushranga1/ticketpilot", // Update with actual URL
    status: "deployed" as const,
  },
  {
    title: "cinereads",
    description: "movie-to-book recommendation platform integrating gpt-4 with hardcover and tmdb apis, serving 1,000+ monthly users",
    impact: "85% cache hit rate saving $200/month in API costs, 1,000+ monthly active users",
    tags: ["FastAPI", "Docker", "Kubernetes", "Terraform", "Prometheus", "GPT-4"],
    liveUrl: "https://cinereads.demo", // Update with actual URL
    githubUrl: "https://github.com/dhanushranga1/cinereads", // Update with actual URL
    status: "deployed" as const,
  },
  {
    title: "scrubpy",
    description: "python library automating csv preprocessing with mistral llm integration for conversational data queries",
    impact: "30+ downloads in first month, 40% reduction in manual data cleaning effort",
    tags: ["Python", "pandas", "scikit-learn", "Mistral LLM"],
    liveUrl: "https://pypi.org/project/scrubpy/",
    githubUrl: "https://github.com/dhanushranga1/scrubpy", // Update with actual URL
    status: "active" as const,
  },
];

type StatusFilter = "all" | "deployed" | "active" | "archived";

export default function Projects() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const projectRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { toast } = useToast();

  const filteredProjects = allProjects.filter(
    (project) => statusFilter === "all" || project.status === statusFilter
  );

  // Keyboard navigation: j/k for vim-style navigation, numbers for direct access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea or if modifier keys are pressed
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey ||
        e.ctrlKey
      ) {
        return;
      }

      // j/k navigation (vim-style)
      if (e.key === "j" && focusedIndex < filteredProjects.length - 1) {
        e.preventDefault();
        const newIndex = focusedIndex + 1;
        setFocusedIndex(newIndex);
        projectRefs.current[newIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (e.key === "k" && focusedIndex > 0) {
        e.preventDefault();
        const newIndex = focusedIndex - 1;
        setFocusedIndex(newIndex);
        projectRefs.current[newIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      // Number keys 1-9 for direct access
      if (e.key >= "1" && e.key <= "9") {
        const index = parseInt(e.key) - 1;
        if (index < filteredProjects.length) {
          e.preventDefault();
          setFocusedIndex(index);
          projectRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          toast({
            description: `Navigated to project ${index + 1}: ${filteredProjects[index].title}`,
            duration: 2000,
          });
        }
      }

      // Enter to open first link (live URL or GitHub)
      if (e.key === "Enter") {
        const project = filteredProjects[focusedIndex];
        if (project) {
          e.preventDefault();
          const url = project.liveUrl || project.githubUrl;
          if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, filteredProjects, toast]);

  // Reset focus index when filter changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [statusFilter]);

  const handleFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
    toast({
      description: `Filtered projects: ${filter === "all" ? "showing all" : filter}`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Terminal-style header */}
        <div className="mb-8 font-mono">
          <h1 className="text-3xl font-bold mb-2 text-accent-info">
            <span className="text-muted-foreground">$</span> ls --impact ~/projects
            {statusFilter !== "all" && (
              <span className="text-accent-action"> --status={statusFilter}</span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            showing {filteredProjects.length} of {allProjects.length} items •
            sorted by impact
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            <kbd className="px-1.5 py-0.5 border border-border rounded bg-surface-2 text-accent-info">
              j
            </kbd>
            /
            <kbd className="px-1.5 py-0.5 border border-border rounded bg-surface-2 text-accent-info">
              k
            </kbd>{" "}
            to navigate •{" "}
            <kbd className="px-1.5 py-0.5 border border-border rounded bg-surface-2 text-accent-info">
              1-9
            </kbd>{" "}
            for direct access •{" "}
            <kbd className="px-1.5 py-0.5 border border-border rounded bg-surface-2 text-accent-info">
              Enter
            </kbd>{" "}
            to open
          </p>
        </div>

        {/* Status filters */}
        <div className="mb-6 flex flex-wrap gap-2 font-mono text-sm">
          <span className="text-muted-foreground self-center">--status:</span>
          {(["all", "deployed", "active", "archived"] as StatusFilter[]).map(
            (filter) => (
              <Button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                variant="ghost"
                size="sm"
                className={`font-mono transition-colors ${
                  statusFilter === filter
                    ? "bg-accent-info text-surface border border-accent-info"
                    : "text-muted-foreground hover:text-accent-info hover:bg-surface-2"
                }`}
                aria-label={`Filter projects by ${filter} status`}
                aria-pressed={statusFilter === filter}
              >
                {filter}
              </Button>
            )
          )}
        </div>

        {/* Projects as terminal list */}
        <h2 className="sr-only">Project List</h2>
        {filteredProjects.length > 0 ? (
          <ul className="space-y-8" role="list" aria-label="Projects list">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                ref={(el) => (projectRefs.current[index] = el)}
                isFocused={focusedIndex === index}
                projectNumber={index + 1}
              />
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center font-mono">
            <p className="text-muted-foreground mb-2">
              <span className="text-accent-action">$</span> No projects found
            </p>
            <p className="text-sm text-muted-foreground">
              // Try adjusting your filters
            </p>
          </div>
        )}

        {/* Terminal-style footer */}
        <div className="mt-12 pt-8 border-t border-border font-mono text-sm text-muted-foreground">
          <p>
            <span className="text-accent-info">$</span> total{" "}
            {filteredProjects.length} projects
            {statusFilter !== "all" && ` with status="${statusFilter}"`}
          </p>
          <p className="mt-2 text-xs">
            tip: press{" "}
            <kbd className="px-2 py-0.5 border border-border rounded bg-surface-2 text-accent-info">
              {navigator.platform.includes("Mac") ? "⌘K" : "Ctrl+K"}
            </kbd>{" "}
            to open command palette
          </p>
        </div>
      </div>
    </div>
  );
}
