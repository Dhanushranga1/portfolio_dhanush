import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Command } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useStrapi";

const NAV_ITEMS = [
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/favorites", label: "Favorites" },
  { path: "/contact", label: "Contact" },
] as const;

function useIsMac() {
  return typeof navigator !== "undefined" && navigator.platform.includes("Mac");
}

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data } = useSiteSettings();
  const isMac = useIsMac();

  const displayName = data?.data?.fullName?.split(" ")[0] ?? "Dhanush";

  const openCommandPalette = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <span className="font-semibold text-base tracking-tight text-foreground hover:text-accent-info transition-colors duration-150 cursor-pointer">
            {displayName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <span
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={openCommandPalette}
            className="hidden sm:flex items-center gap-1.5 text-muted-foreground"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="text-xs">{isMac ? "⌘K" : "Ctrl+K"}</span>
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 mt-10">
                {NAV_ITEMS.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} href={item.path}>
                      <span
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-150 cursor-pointer block ${
                          isActive
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
