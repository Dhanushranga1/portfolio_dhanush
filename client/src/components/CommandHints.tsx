import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "terminal-hints-dismissed";

export default function CommandHints() {
  const [isDismissed, setIsDismissed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    setIsDismissed(dismissed === "true");
    setIsLoading(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  // Don't render anything while loading or if dismissed
  if (isLoading || isDismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Keyboard shortcuts help"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="bg-surface-2/90 backdrop-blur-sm border border-surface-contrast rounded-lg px-4 py-2 shadow-lg max-w-2xl">
        <div className="flex items-center gap-4">
          {/* Hints */}
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-surface border border-surface-contrast rounded text-text-primary">/</kbd> to search
            </span>
            <span className="hidden md:inline">•</span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-surface border border-surface-contrast rounded text-text-primary">
                {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+K
              </kbd>{" "}
              Command Palette
            </span>
            <span className="hidden lg:inline">•</span>
            <span className="hidden lg:inline">
              <kbd className="px-1.5 py-0.5 bg-surface border border-surface-contrast rounded text-text-primary">V</kbd> Toggle view
            </span>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss keyboard shortcuts help"
            className="ml-2 p-1 rounded hover:bg-surface-contrast transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-info/40"
          >
            <X className="w-4 h-4 text-muted hover:text-text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
