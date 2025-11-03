import { Link, useLocation } from "wouter";
import { Home, User, FolderGit2, BookOpen, Heart, ImageIcon, GitBranch, Mail } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About" },
  { path: "/projects", icon: FolderGit2, label: "Projects" },
  { path: "/blog", icon: BookOpen, label: "Blog" },
  { path: "/favorites", icon: Heart, label: "Favorites" },
  { path: "/photos", icon: ImageIcon, label: "Photos" },
  { path: "/git-timeline", icon: GitBranch, label: "Git" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

export default function FloatingDock() {
  const [location] = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-terminal-bg/95 backdrop-blur-xl border border-terminal-border rounded-2xl shadow-2xl px-3 py-3">
        <div className="flex items-center gap-2">
          {navItems.map((item, index) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-terminal-bg border border-terminal-border rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                      hoveredIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                  >
                    {item.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-terminal-bg border-r border-b border-terminal-border rotate-45" />
                  </div>

                  {/* Icon Button */}
                  <button
                    className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-terminal-accent-blue/20 text-terminal-accent-blue scale-110"
                        : "text-terminal-text-dim hover:text-terminal-text hover:bg-terminal-bg-alt hover:scale-110"
                    }`}
                  >
                    <Icon
                      className={`transition-all duration-300 ${
                        hoveredIndex === index ? "scale-125" : "scale-100"
                      } ${isActive ? "w-6 h-6" : "w-5 h-5"}`}
                    />
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terminal-accent-blue animate-pulse" />
                    )}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-terminal-accent-blue/5 blur-xl rounded-3xl" />
    </div>
  );
}
