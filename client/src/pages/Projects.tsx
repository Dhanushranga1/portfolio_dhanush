import { useState, useEffect, useRef, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useStrapi";

type StatusFilter = "all" | "deployed" | "active" | "archived";

export default function Projects() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const projectRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { toast } = useToast();

  const { data, isLoading, isError, refetch } = useProjects();

  const allProjects = useMemo(
    () =>
      (data?.data ?? []).map((p) => ({
        title: p.title,
        summary: p.summary,
        description: p.description ?? "",
        tags: p.tags ?? [],
        liveUrl: p.liveUrl ?? undefined,
        githubUrl: p.githubUrl ?? undefined,
        status: p.status,
        impact: p.impact,
      })),
    [data]
  );

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
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Projects</h1>
          <p className="text-muted-foreground">
            {filteredProjects.length} of {allProjects.length} projects
          </p>
        </div>

        {/* Status filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "deployed", "active", "archived"] as StatusFilter[]).map(
            (filter) => (
              <Button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                variant="ghost"
                size="sm"
                className={`capitalize transition-colors ${
                  statusFilter === filter
                    ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label={`Filter projects by ${filter} status`}
                aria-pressed={statusFilter === filter}
              >
                {filter}
              </Button>
            )
          )}
        </div>

        <h2 className="sr-only">Project List</h2>
        {isLoading ? (
          <div className="space-y-6" aria-busy="true" aria-label="Loading projects">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : isError ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-3">Failed to load projects.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <ul className="space-y-6" role="list" aria-label="Projects list">
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
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No projects match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
