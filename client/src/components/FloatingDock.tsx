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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto">
      <div className="bg-gray-900 backdrop-blur-xl border-2 border-gray-700 rounded-2xl shadow-2xl px-4 py-3 min-w-[500px]">
        <div className="flex items-center justify-center gap-3">
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
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-black border border-white/30 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-200 text-white shadow-lg ${
                      hoveredIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                  >
                    {item.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-black border-r border-b border-white/30 rotate-45" />
                  </div>

                  {/* Icon Button */}
                  <button
                    className={`relative w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/50"
                        : "text-gray-300 hover:text-white hover:bg-gray-700 hover:scale-110"
                    }`}
                  >
                    <Icon
                      className={`transition-all duration-300 ${
                        hoveredIndex === index ? "scale-125" : "scale-100"
                      } ${isActive ? "w-6 h-6" : "w-5 h-5"}`}
                    />
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-blue-500/10 blur-2xl rounded-3xl" />
    </div>
  );
}
