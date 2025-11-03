import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, GitBranch, ExternalLink, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function GitTimelineWidget() {
  // Mock recent commits - in production, fetch from API
  const recentCommits = [
    { hash: "4fd4d0a", message: "feat(homepage): revamp with terminal hero", date: "2 hours ago" },
    { hash: "4a5fe70", message: "feat(favorites): add unified Favorites page", date: "4 hours ago" },
    { hash: "cefc4b9", message: "feat(boot): add boot sequence with dev mode", date: "8 hours ago" },
  ];

  return (
    <Card className="border-terminal-muted bg-terminal-bg/50 hover:border-terminal-accent-info transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-terminal-accent-info" />
          <CardTitle className="font-mono text-terminal-accent-info">git log</CardTitle>
        </div>
        <CardDescription className="font-mono text-terminal-muted">
          # recent commits with playback
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {recentCommits.map((commit) => (
            <div 
              key={commit.hash}
              className="p-2 rounded border border-terminal-muted/50 hover:border-terminal-accent-action/50 transition-colors"
            >
              <div className="flex items-start gap-2">
                <GitCommit className="w-3 h-3 text-terminal-accent-action mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <code className="text-xs text-terminal-accent-info">{commit.hash}</code>
                  <p className="text-xs text-terminal-text truncate mt-1">{commit.message}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-terminal-muted">
                    <Calendar className="w-3 h-3" />
                    <span>{commit.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-terminal-muted">
          <Link href="/git-timeline">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full font-mono border-terminal-muted hover:border-terminal-accent-action hover:text-terminal-accent-action"
            >
              view timeline
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
