import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Home, User, FolderGit2, Heart, MessageSquare, Mail, BookOpen, Image } from "lucide-react";

/**
 * Terminal-style Bottom Dock
 * 
 * Design principles:
 * - Monochrome/muted terminal aesthetic (no glossy effects)
 * - Semi-transparent surface with subtle border
 * - Mint accent for active state only
 * - Keyboard-first: arrow navigation, Enter/Space to activate
 * - Accessible: role="toolbar", ARIA labels, visible focus rings
 * - Motion-aware: respects prefers-reduced-motion
 * 
 * Tokens used (adjust in tailwind.config.ts):
 * - bg-[#0f1112] (surface)
 * - border-[#202425] (surface-contrast)
 * - text-[#6b6f70] (muted)
 * - text-[#7fd0bd] (accent-info/mint)
 */

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  glyph: string; // terminal character representation
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: Home, glyph: "~" },
  { id: "about", label: "About", href: "/about", icon: User, glyph: "i" },
  { id: "projects", label: "Projects", href: "/projects", icon: FolderGit2, glyph: "</>" },
  { id: "blog", label: "Blog", href: "/blog", icon: BookOpen, glyph: "doc" },
  { id: "favorites", label: "Favorites", href: "/favorites", icon: Heart, glyph: "♥" },
  { id: "photos", label: "Photos", href: "/photos", icon: Image, glyph: "img" },
  { id: "messages", label: "Messages", href: "/messages", icon: MessageSquare, glyph: "msg" },
  { id: "contact", label: "Contact", href: "/contact", icon: Mail, glyph: "@" },
];

export default function TerminalDock() {
  const [location, navigate] = useLocation();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Determine active item based on current route
  const activeId = NAV_ITEMS.find((item) => {
    if (item.href === "/") return location === "/";
    return location.startsWith(item.href);
  })?.id || "home";

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Only handle when dock has focus
      if (!itemRefs.current.some((ref) => ref === document.activeElement)) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, NAV_ITEMS.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const item = NAV_ITEMS[focusedIndex];
        navigate(item.href);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedIndex, navigate]);

  // Focus management
  useEffect(() => {
    const el = itemRefs.current[focusedIndex];
    if (el && document.activeElement && itemRefs.current.includes(document.activeElement as HTMLAnchorElement)) {
      el.focus({ preventScroll: true });
    }
  }, [focusedIndex]);

  return (
    <nav
      role="toolbar"
      aria-label="Main navigation toolbar"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#202425] bg-[#0f1112]/70 backdrop-blur-sm shadow-sm"
        style={{ minWidth: 420, height: 52 }}
      >
        {NAV_ITEMS.map((item, idx) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredIndex === idx;
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={item.href}
              ref={(el) => (itemRefs.current[idx] = el)}
              role="button"
              aria-label={item.label}
              aria-pressed={isActive}
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.href);
              }}
              onFocus={() => setFocusedIndex(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative flex flex-col items-center justify-center w-12 h-10 rounded-md
                transition-all duration-150 ease-out
                focus:outline-none focus:ring-2 focus:ring-[#7fd0bd]/30 focus:ring-offset-2 focus:ring-offset-[#0f1112]
                ${isActive 
                  ? "bg-[#7fd0bd]/10 text-[#7fd0bd]" 
                  : "text-[#6b6f70] hover:bg-[#202425]/40 hover:text-[#9ca3af]"
                }
                motion-safe:hover:scale-[1.04]
              `}
            >
              {/* Icon */}
              <Icon 
                className="w-4 h-4" 
                strokeWidth={isActive ? 2 : 1.5}
                aria-hidden="true"
              />

              {/* Terminal glyph hint (shows on hover) */}
              {isHovered && (
                <span 
                  className="absolute -top-6 text-[10px] font-mono text-[#7fd0bd] opacity-80 animate-in fade-in duration-150"
                  aria-hidden="true"
                >
                  {item.glyph}
                </span>
              )}

              {/* Active indicator: subtle underline */}
              {isActive && (
                <span 
                  className="absolute -bottom-1 w-4 h-[2px] bg-[#7fd0bd] rounded-full"
                  aria-hidden="true"
                />
              )}

              {/* Tooltip */}
              <span 
                className={`
                  absolute -top-10 px-2 py-1 rounded text-xs font-mono
                  bg-[#0f1112] border border-[#202425] text-[#9ca3af]
                  pointer-events-none whitespace-nowrap
                  transition-opacity duration-150
                  ${isHovered ? "opacity-100" : "opacity-0"}
                `}
                role="tooltip"
              >
                {item.label}
                {/* Tooltip arrow */}
                <span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f1112] border-r border-b border-[#202425] rotate-45"
                  aria-hidden="true"
                />
              </span>

              {/* Screen reader only text */}
              <span className="sr-only">{item.label}</span>
            </a>
          );
        })}
      </div>

      {/* Keyboard hint (shows when dock is focused) */}
      <div 
        className={`
          absolute -top-8 left-1/2 -translate-x-1/2 
          text-xs font-mono text-[#6b6f70] whitespace-nowrap
          transition-opacity duration-200
          ${itemRefs.current.some((ref) => ref === document.activeElement) ? "opacity-60" : "opacity-0"}
        `}
        aria-hidden="true"
      >
        ← → to navigate • Enter to select
      </div>
    </nav>
  );
}
