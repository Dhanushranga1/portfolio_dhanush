import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FileText, Layers } from "lucide-react";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  const fullText = "Hello. I'm Dhanush, building high-impact web applications.";

  // Typewriter effect
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [displayedText, fullText]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Cursor blink speed
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Terminal-style Header */}
        <div className="terminal-card p-8 md:p-12">
          {/* Terminal Top Bar */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-terminal-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-terminal-text-dim ml-4">~/dhanush/portfolio</span>
          </div>

          {/* Typewriter Text */}
          <div className="space-y-6">
            <div className="text-lg md:text-xl font-mono">
              <span className="text-terminal-accent-green">❯</span>{" "}
              <span className="text-terminal-text">{displayedText}</span>
              {showCursor && <span className="text-terminal-accent-blue animate-pulse">▊</span>}
            </div>

            {/* Commands appear after typing completes */}
            {typingComplete && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p className="text-sm md:text-base text-terminal-text-dim">
                  <span className="text-terminal-accent-green">❯</span> Type 'help' or use the commands below:
                </p>

                {/* Command CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/contact">
                    <div className="group cursor-pointer terminal-card p-4 hover:border-terminal-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-terminal-accent-blue/20">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-terminal-accent-blue" />
                        <div className="flex-1">
                          <div className="text-sm font-mono mb-1">
                            <span className="text-terminal-accent-green">❯</span>{" "}
                            <span className="text-terminal-accent-blue">cat</span>{" "}
                            <span className="text-terminal-text">./resume.md</span>
                          </div>
                          <div className="text-xs text-terminal-text-dim">
                            View résumé & contact info
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/projects">
                    <div className="group cursor-pointer terminal-card p-4 hover:border-terminal-accent-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-accent-green/20">
                      <div className="flex items-center gap-3">
                        <Layers className="h-5 w-5 text-terminal-accent-green" />
                        <div className="flex-1">
                          <div className="text-sm font-mono mb-1">
                            <span className="text-terminal-accent-green">❯</span>{" "}
                            <span className="text-terminal-accent-green">ls</span>{" "}
                            <span className="text-terminal-text">--impact</span>
                          </div>
                          <div className="text-xs text-terminal-text-dim">
                            Browse featured projects
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Keyboard Hint */}
                <div className="pt-6 border-t border-terminal-border">
                  <p className="text-xs text-terminal-text-dim">
                    <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border font-mono">
                      Cmd+K
                    </kbd>{" "}
                    to open command palette
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        {typingComplete && (
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm animate-in fade-in duration-700 delay-300">
            <Link href="/about" data-testid="link-about">
              <span className="text-terminal-text-dim hover:text-terminal-accent-blue cursor-pointer transition-colors font-mono">
                /about
              </span>
            </Link>
            <Link href="/projects" data-testid="link-projects">
              <span className="text-terminal-text-dim hover:text-terminal-accent-green cursor-pointer transition-colors font-mono">
                /projects
              </span>
            </Link>
            <Link href="/blog" data-testid="link-blog">
              <span className="text-terminal-text-dim hover:text-terminal-accent-yellow cursor-pointer transition-colors font-mono">
                /blog
              </span>
            </Link>
            <Link href="/photos" data-testid="link-pics">
              <span className="text-terminal-text-dim hover:text-terminal-accent-blue cursor-pointer transition-colors font-mono">
                /photos
              </span>
            </Link>
            <Link href="/favorites" data-testid="link-favorites">
              <span className="text-terminal-text-dim hover:text-terminal-accent-yellow cursor-pointer transition-colors font-mono">
                /favorites
              </span>
            </Link>
            <Link href="/git-timeline" data-testid="link-git">
              <span className="text-terminal-text-dim hover:text-terminal-accent-green cursor-pointer transition-colors font-mono">
                /git-timeline
              </span>
            </Link>
            <Link href="/algo-playground" data-testid="link-algo">
              <span className="text-terminal-text-dim hover:text-terminal-accent-blue cursor-pointer transition-colors font-mono">
                /algo-playground
              </span>
            </Link>
            <Link href="/contact" data-testid="link-contact">
              <span className="text-terminal-text-dim hover:text-terminal-accent-blue cursor-pointer transition-colors font-mono">
                /contact
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
