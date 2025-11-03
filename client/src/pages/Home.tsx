import Hero from "@/components/Hero";
import FavoritesWidget from "@/components/FavoritesWidget";
import GitTimelineWidget from "@/components/GitTimelineWidget";
import TechStack from "@/components/TechStack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Book, Code2, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono">
      {/* Hero Section */}
      <Hero />

      {/* Metrics Strip */}
      <section className="border-y border-terminal-border bg-terminal-bg-alt py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-terminal-accent-blue font-bold text-3xl mb-2">5+</div>
              <div className="text-terminal-text-dim text-sm mb-2">Years Experience</div>
              <div className="flex justify-center">
                <div className="text-terminal-accent-green text-xs">
                  [#########---] 75%
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-terminal-accent-green font-bold text-3xl mb-2">2M+</div>
              <div className="text-terminal-text-dim text-sm mb-2">Users Served</div>
              <div className="flex justify-center">
                <div className="text-terminal-accent-green text-xs animate-pulse">
                  &lt;●●●&gt;
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-terminal-accent-yellow font-bold text-3xl mb-2">15</div>
              <div className="text-terminal-text-dim text-sm mb-2">Projects Shipped</div>
              <div className="flex justify-center">
                <div className="text-terminal-accent-yellow text-xs">
                  ███████████████
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-terminal-accent-blue">
              <span className="text-terminal-accent-green">❯</span> Featured Projects
            </h2>
            <Link href="/projects">
              <span className="text-sm text-terminal-text-dim hover:text-terminal-accent-blue cursor-pointer transition-colors">
                view all →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Cards - Using existing terminal card style */}
            <Card className="terminal-card group hover:border-terminal-accent-blue transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-5 w-5 text-terminal-accent-blue" />
                  <CardTitle className="text-terminal-accent-blue">Portfolio Site</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-terminal-text-dim mb-4">
                  Terminal-inspired developer portfolio with interactive features and Git timeline visualization
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">React</span>
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">TypeScript</span>
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">Tailwind</span>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card group hover:border-terminal-accent-blue transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="h-5 w-5 text-terminal-accent-green" />
                  <CardTitle className="text-terminal-accent-green">Movie Platform</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-terminal-text-dim mb-4">
                  Movie-to-book recommendation platform integrating GPT-4 with TMDb APIs, serving 1,000+ users
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">Next.js</span>
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">OpenAI</span>
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">TMDb</span>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card group hover:border-terminal-accent-blue transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-5 w-5 text-terminal-accent-yellow" />
                  <CardTitle className="text-terminal-accent-yellow">Git Timeline</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-terminal-text-dim mb-4">
                  Interactive commit history visualizer with playback controls and GitHub API integration
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">React</span>
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">GitHub API</span>
                  <span className="text-xs px-2 py-1 bg-terminal-bg-alt border border-terminal-border rounded">D3.js</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Widgets Area */}
      <section className="py-16 bg-terminal-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-terminal-accent-blue mb-8">
            <span className="text-terminal-accent-green">❯</span> Personal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Favorites Widget */}
            <FavoritesWidget />

            {/* Git Timeline Widget */}
            <GitTimelineWidget />

            {/* Tech Stack Widget */}
            <Card className="terminal-card hover:border-terminal-accent-blue transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-terminal-accent-blue" />
                  <CardTitle className="text-terminal-accent-blue">Tech Stack</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-terminal-text-dim mb-1">Frontend</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">React</span>
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">TypeScript</span>
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">Next.js</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-terminal-text-dim mb-1">Backend</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">Node.js</span>
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">Express</span>
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">PostgreSQL</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-terminal-text-dim mb-1">Tools</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">Git</span>
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">Docker</span>
                    <span className="text-xs px-2 py-1 bg-terminal-bg border border-terminal-border rounded">VS Code</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Now Playing / Reading Widget */}
            <Card className="terminal-card hover:border-terminal-accent-blue transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-terminal-accent-green" />
                  <CardTitle className="text-terminal-accent-green">Now</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="h-4 w-4 text-terminal-accent-blue" />
                    <span className="text-sm font-semibold text-terminal-text">Reading</span>
                  </div>
                  <p className="text-sm text-terminal-text-dim">
                    "Dune" by Frank Herbert
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="h-4 w-4 text-terminal-accent-green" />
                    <span className="text-sm font-semibold text-terminal-text">Listening</span>
                  </div>
                  <p className="text-sm text-terminal-text-dim">
                    Synthwave & Lo-fi Beats
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-terminal-accent-yellow" />
                    <span className="text-sm font-semibold text-terminal-text">Learning</span>
                  </div>
                  <p className="text-sm text-terminal-text-dim">
                    Rust & WebAssembly
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
