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

  // Keyboard navigation
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
      role="navigation"
      aria-label="Primary navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto"
    >
      <div className="bg-surface/70 backdrop-blur-sm border border-surface-contrast rounded-xl px-3 py-2 shadow-lg">
        <ul className="flex items-center gap-2" role="menubar">
          {NAV_ITEMS.map((item, index) => {
            const isActive = location === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path} role="none">
                <Link href={item.path}>
                  <a
                    ref={(el) => (itemRefs.current[index] = el)}
                    role="menuitem"
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? "page" : undefined}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => {
                      // Small delay to allow focus to move to another nav item
                      setTimeout(() => {
                        if (!itemRefs.current.some(ref => ref === document.activeElement)) {
                          setFocusedIndex(-1);
                        }
                      }, 50);
                    }}
                    className={`
                      group relative flex items-center gap-2 px-3 py-2 rounded-lg
                      font-mono text-sm transition-all duration-150 ease-out
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-info/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
                      ${
                        isActive
                          ? "text-accent-info bg-accent-info/10"
                          : "text-muted hover:text-text-primary hover:bg-surface-2/50"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute -left-1 text-accent-info font-bold" aria-hidden="true">
                        &gt;
                      </span>
                    )}

                    {/* Icon */}
                    <Icon
                      className={`w-4 h-4 transition-transform duration-150 ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Label */}
                    <span className="hidden sm:inline">{item.label}</span>

                    {/* Mobile: show label on hover/focus */}
                    <span className="sm:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-surface-contrast rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
                      {item.label}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 -z-10 bg-accent-info/5 blur-xl rounded-2xl opacity-50"
        aria-hidden="true"
      />
    </nav>
  );
}
