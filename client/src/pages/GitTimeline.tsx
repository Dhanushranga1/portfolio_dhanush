import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchCommits, fetchCommitDetails, transformGitHubCommit } from "@/lib/githubApi";
import { useToast } from "@/hooks/use-toast";
import { 
  GitCommit, 
  GitBranch, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Calendar,
  User,
  FileCode,
  Filter
} from "lucide-react";

interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
  branch: string;
  files: number;
  additions: number;
  deletions: number;
  tags?: string[];
}

// Mock data - in production, this would come from git API
const mockCommits: GitCommit[] = [
  {
    hash: "4fd4d0a",
    message: "feat(homepage): revamp with terminal hero and widgets",
    author: "dhanush",
    date: "2025-01-03T22:28:00Z",
    branch: "enhance/hybrid-terminal",
    files: 3,
    additions: 200,
    deletions: 15,
    tags: ["ui", "enhancement"]
  },
  {
    hash: "4a5fe70",
    message: "feat(favorites): add unified Favorites page",
    author: "dhanush",
    date: "2025-01-03T20:15:00Z",
    branch: "enhance/hybrid-terminal",
    files: 4,
    additions: 642,
    deletions: 10,
    tags: ["feature", "ui"]
  },
  {
    hash: "cefc4b9",
    message: "feat(boot): add boot sequence with dev mode",
    author: "dhanush",
    date: "2025-01-03T18:45:00Z",
    branch: "enhance/hybrid-terminal",
    files: 2,
    additions: 150,
    deletions: 8,
    tags: ["feature", "animation"]
  },
  {
    hash: "a1b2c3d",
    message: "fix(navigation): update mobile menu",
    author: "dhanush",
    date: "2025-01-02T14:30:00Z",
    branch: "main",
    files: 1,
    additions: 25,
    deletions: 12,
    tags: ["bugfix"]
  },
  {
    hash: "e4f5g6h",
    message: "docs: update README with new features",
    author: "dhanush",
    date: "2025-01-02T12:00:00Z",
    branch: "main",
    files: 1,
    additions: 40,
    deletions: 5,
    tags: ["docs"]
  },
  {
    hash: "i7j8k9l",
    message: "feat(projects): add project filtering",
    author: "dhanush",
    date: "2025-01-01T16:20:00Z",
    branch: "main",
    files: 2,
    additions: 180,
    deletions: 20,
    tags: ["feature", "ui"]
  }
];

export default function GitTimeline() {
  const { toast } = useToast();
  const [commits, setCommits] = useState<GitCommit[]>(mockCommits);
  const [filteredCommits, setFilteredCommits] = useState<GitCommit[]>(mockCommits);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [selectedCommit, setSelectedCommit] = useState<GitCommit | null>(mockCommits[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [isLoadingGitHub, setIsLoadingGitHub] = useState(false);
  const [useRealData, setUseRealData] = useState(false);
  
  // Configuration - update these with your GitHub details
  const GITHUB_OWNER = "dhanush"; // Your GitHub username
  const GITHUB_REPO = "UniquePortfolio"; // Your repo name
  const GITHUB_BRANCH = "enhance/hybrid-terminal"; // Default branch
  
  // Load GitHub data
  const loadGitHubData = useCallback(async () => {
    setIsLoadingGitHub(true);
    try {
      const githubCommits = await fetchCommits(GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, 30);
      const transformedCommits = githubCommits.map(commit => 
        transformGitHubCommit(commit, GITHUB_BRANCH)
      );
      setCommits(transformedCommits);
      setFilteredCommits(transformedCommits);
      setCurrentIndex(0);
      if (transformedCommits.length > 0) {
        setSelectedCommit(transformedCommits[0]);
      }
      setUseRealData(true);
      toast({
        title: "GitHub data loaded",
        description: `Loaded ${transformedCommits.length} commits from ${GITHUB_OWNER}/${GITHUB_REPO}`,
      });
    } catch (error) {
      toast({
        title: "Failed to load GitHub data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      console.error("GitHub API error:", error);
    } finally {
      setIsLoadingGitHub(false);
    }
  }, [GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, toast]);

  // Get unique branches
  const branches = Array.from(new Set(commits.map(c => c.branch)));

  // Filter commits
  useEffect(() => {
    let filtered = commits;

    // Branch filter
    if (branchFilter !== "all") {
      filtered = filtered.filter(c => c.branch === branchFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCommits(filtered);
    if (filtered.length > 0 && currentIndex >= filtered.length) {
      setCurrentIndex(filtered.length - 1);
      setSelectedCommit(filtered[filtered.length - 1]);
    }
  }, [searchQuery, branchFilter, commits, currentIndex]);

  // Playback effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= filteredCommits.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        const next = prev + 1;
        setSelectedCommit(filteredCommits[next]);
        return next;
      });
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, filteredCommits]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setSelectedCommit(filteredCommits[0]);
  }, [filteredCommits]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      setSelectedCommit(filteredCommits[prev]);
    }
  }, [currentIndex, filteredCommits]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredCommits.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setSelectedCommit(filteredCommits[next]);
    }
  }, [currentIndex, filteredCommits]);

  const handleCommitClick = useCallback((commit: GitCommit, index: number) => {
    setSelectedCommit(commit);
    setCurrentIndex(index);
    setIsPlaying(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <GitBranch className="w-8 h-8 text-terminal-accent-info" />
            <h1 className="text-3xl font-bold text-terminal-accent-info">
              $ git log --graph --oneline
            </h1>
          </div>
          <p className="text-terminal-muted">
            # replay commit history with time travel navigation
          </p>
        </div>

        {/* Controls */}
        <Card className="border-terminal-muted bg-terminal-bg/50">
          <CardHeader>
            <CardTitle className="text-terminal-accent-action flex items-center gap-2 justify-between">
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                playback controls
              </span>
              <Button
                onClick={loadGitHubData}
                disabled={isLoadingGitHub}
                variant={useRealData ? "secondary" : "default"}
                size="sm"
                className="gap-2"
              >
                <GitBranch className="w-4 h-4" />
                {isLoadingGitHub ? "loading..." : useRealData ? "using real data" : "load from GitHub"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-xs text-terminal-muted flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  search commits
                </label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="message, hash, or author..."
                  className="font-mono border-terminal-muted bg-terminal-bg focus:border-terminal-accent-info"
                />
              </div>

              {/* Branch filter */}
              <div className="space-y-2">
                <label className="text-xs text-terminal-muted flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  filter by branch
                </label>
                <Select value={branchFilter} onValueChange={setBranchFilter}>
                  <SelectTrigger className="font-mono border-terminal-muted bg-terminal-bg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">all branches</SelectItem>
                    {branches.map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Playback speed */}
              <div className="space-y-2">
                <label className="text-xs text-terminal-muted">
                  playback speed: {playbackSpeed}ms
                </label>
                <Select 
                  value={playbackSpeed.toString()} 
                  onValueChange={(v) => setPlaybackSpeed(Number(v))}
                >
                  <SelectTrigger className="font-mono border-terminal-muted bg-terminal-bg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">fast (1s)</SelectItem>
                    <SelectItem value="2000">normal (2s)</SelectItem>
                    <SelectItem value="3000">slow (3s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex items-center gap-2 justify-center pt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="font-mono border-terminal-muted hover:border-terminal-accent-warn hover:text-terminal-accent-warn"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
                size="sm"
                className="font-mono border-terminal-muted hover:border-terminal-accent-info hover:text-terminal-accent-info"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={handlePlayPause}
                variant="outline"
                size="sm"
                className="font-mono border-terminal-muted hover:border-terminal-accent-action hover:text-terminal-accent-action px-6"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="ml-2">{isPlaying ? 'pause' : 'play'}</span>
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIndex === filteredCommits.length - 1}
                variant="outline"
                size="sm"
                className="font-mono border-terminal-muted hover:border-terminal-accent-info hover:text-terminal-accent-info"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-terminal-muted">
                <span>commit {currentIndex + 1} of {filteredCommits.length}</span>
                <span>{Math.round(((currentIndex + 1) / filteredCommits.length) * 100)}%</span>
              </div>
              <div className="w-full bg-terminal-muted/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-terminal-accent-action h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / filteredCommits.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Commit list */}
          <Card className="border-terminal-muted bg-terminal-bg/50">
            <CardHeader>
              <CardTitle className="text-terminal-accent-info flex items-center gap-2">
                <GitCommit className="w-5 h-5" />
                commit history
              </CardTitle>
              <CardDescription className="font-mono text-terminal-muted">
                {filteredCommits.length} commits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredCommits.map((commit, index) => (
                  <div
                    key={commit.hash}
                    onClick={() => handleCommitClick(commit, index)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      index === currentIndex
                        ? 'border-terminal-accent-action bg-terminal-accent-action/10'
                        : index < currentIndex
                        ? 'border-terminal-muted/50 bg-terminal-muted/5 opacity-60'
                        : 'border-terminal-muted hover:border-terminal-accent-info'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-xs text-terminal-accent-info">{commit.hash}</code>
                          <Badge 
                            variant="outline" 
                            className="text-xs font-mono border-terminal-muted"
                          >
                            {commit.branch}
                          </Badge>
                        </div>
                        <p className="text-sm text-terminal-text truncate">{commit.message}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-terminal-muted">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {commit.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(commit.date)}
                          </span>
                        </div>
                      </div>
                      {index === currentIndex && (
                        <div className="w-2 h-2 bg-terminal-accent-action rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Commit details */}
          {selectedCommit && (
            <Card className="border-terminal-muted bg-terminal-bg/50">
              <CardHeader>
                <CardTitle className="text-terminal-accent-action flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  commit details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-terminal-muted">hash</label>
                    <code className="block text-terminal-accent-info mt-1">{selectedCommit.hash}</code>
                  </div>
                  <div>
                    <label className="text-xs text-terminal-muted">message</label>
                    <p className="text-terminal-text mt-1">{selectedCommit.message}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-terminal-muted">author</label>
                      <p className="text-terminal-text mt-1">{selectedCommit.author}</p>
                    </div>
                    <div>
                      <label className="text-xs text-terminal-muted">branch</label>
                      <p className="text-terminal-text mt-1">{selectedCommit.branch}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-terminal-muted">date</label>
                    <p className="text-terminal-text mt-1">{formatDate(selectedCommit.date)}</p>
                  </div>

                  {selectedCommit.tags && selectedCommit.tags.length > 0 && (
                    <div>
                      <label className="text-xs text-terminal-muted">tags</label>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {selectedCommit.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline"
                            className="font-mono border-terminal-muted text-terminal-accent-info"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-terminal-muted">
                    <label className="text-xs text-terminal-muted">stats</label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div className="text-center p-2 rounded border border-terminal-muted">
                        <p className="text-xs text-terminal-muted">files</p>
                        <p className="text-lg text-terminal-accent-info">{selectedCommit.files}</p>
                      </div>
                      <div className="text-center p-2 rounded border border-terminal-muted">
                        <p className="text-xs text-terminal-muted">additions</p>
                        <p className="text-lg text-green-500">+{selectedCommit.additions}</p>
                      </div>
                      <div className="text-center p-2 rounded border border-terminal-muted">
                        <p className="text-xs text-terminal-muted">deletions</p>
                        <p className="text-lg text-red-500">-{selectedCommit.deletions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Diff preview placeholder */}
                  <div className="pt-4 border-t border-terminal-muted">
                    <label className="text-xs text-terminal-muted">diff preview</label>
                    <div className="mt-2 p-3 bg-terminal-muted/10 rounded border border-terminal-muted overflow-x-auto">
                      <pre className="text-xs">
                        <code className="text-green-500">+ {selectedCommit.message}</code>{'\n'}
                        <code className="text-terminal-muted">  # simulated diff output</code>{'\n'}
                        <code className="text-green-500">+ added {selectedCommit.additions} lines across {selectedCommit.files} files</code>{'\n'}
                        <code className="text-red-500">- removed {selectedCommit.deletions} lines</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
