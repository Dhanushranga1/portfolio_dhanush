import { Link, useLocation } from "wouter";
import { Home, User, FolderGit2, BookOpen, Heart, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "home" },
  { path: "/about", icon: User, label: "about" },
  { path: "/projects", icon: FolderGit2, label: "projects" },
  { path: "/blog", icon: BookOpen, label: "blog" },
  { path: "/favorites", icon: Heart, label: "favorites" },
  { path: "/contact", icon: Mail, label: "contact" },
] as const;

export default function TerminalNavbar() {
  const [location] = useLocation();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Keyboard navigation: Tab enters, Arrow keys move, Enter activates
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if focus is within navbar or no element focused
      const isInNav = itemRefs.current.some(ref => ref === document.activeElement);
      if (!isInNav && focusedIndex === -1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (focusedIndex + 1) % NAV_ITEMS.length;
        setFocusedIndex(nextIndex);
        itemRefs.current[nextIndex]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (focusedIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
        setFocusedIndex(prevIndex);
        itemRefs.current[prevIndex]?.focus();
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        e.preventDefault();
        itemRefs.current[focusedIndex]?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex]);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto"
    >
      <div className="relative bg-surface/70 backdrop-blur-sm border border-surface-contrast rounded-2xl px-4 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-all duration-150 motion-safe">
        <ul className="flex items-center gap-3">
          {NAV_ITEMS.map((item, index) => {
            const isActive = location === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link href={item.path}>
                  <a
                    ref={(el) => (itemRefs.current[index] = el)}
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? "page" : undefined}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => {
                      setTimeout(() => {
                        if (!itemRefs.current.some(ref => ref === document.activeElement)) {
                          setFocusedIndex(-1);
                        }
                      }, 50);
                    }}
                    className={`
                      group relative flex items-center gap-1.5 px-3 py-2 rounded-md
                      font-mono text-sm tracking-wide transition-all duration-medium ease-motion-ease
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-info focus-visible:ring-offset-2 focus-visible:ring-offset-surface
                      ${
                        isActive
                          ? "text-accent-info bg-accent-info/8 shadow-[0_0_0_1px_rgba(127,208,189,0.3)]"
                          : "text-text-muted hover:text-accent-info hover:bg-surface-2/70"
                      }
                    `}
                  >
                    {/* Active indicator - terminal prefix ">" */}
                    {isActive && (
                      <span className="text-accent-info font-bold mr-0.5" aria-hidden="true">
                        &gt;
                      </span>
                    )}

                    {/* Icon - stroke-only with slight vertical alignment */}
                    <Icon
                      className={`w-4 h-4 translate-y-[1px] transition-all duration-medium ${
                        isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                      }`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />

                    {/* Label - desktop only */}
                    <span className="hidden sm:inline transition-colors duration-medium">
                      {item.label}
                    </span>

                    {/* Mobile tooltip - appears on hover/focus */}
                    <span 
                      className="sm:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                      bg-surface border border-surface-contrast rounded text-xs text-accent-info whitespace-nowrap 
                      opacity-0 group-hover:opacity-100 group-focus:opacity-100 
                      transition-opacity duration-medium pointer-events-none z-10
                      shadow-lg backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Subtle glow effect under navbar */}
      <div 
        className="absolute inset-0 -z-10 bg-accent-info/5 blur-xl rounded-2xl opacity-40"
        aria-hidden="true"
      />
    </nav>
  );
}
