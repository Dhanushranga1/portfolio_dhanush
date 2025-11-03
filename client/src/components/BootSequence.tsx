import { useEffect, useState } from "react";

const BOOT_ASCII = `
     _  _                           _     
  __| || |_  __ _ _ __  _   _ ___ | |__  
 / _' ||  _|/ _' | '_ \\| | | / __|| '_ \\ 
| (_| || | | (_| | | | | |_| \\__ \\| | | |
 \\__,_||_|  \\__,_|_| |_|\\__,_|___/|_| |_|
                                          
   _ __ __ _ _ __   __ _  __ _ 
  | '__/ _' | '_ \\ / _' |/ _' |
  | | | (_| | | | | (_| | (_| |
  |_|  \\__,_|_| |_|\\__, |\\__,_|
                    |___/       
                                
  __ _  ___  _ __  (_)___  ___ | |_ _   _ 
 / _' |/ _ \\| '_ \\ | / __|/ _ \\| __| | | |
| (_| | (_) | |_) || \\__ \\  __/| |_| |_| |
 \\__, |\\___/| .__/ |_|___/\\___| \\__|\\__, |
 |___/      |_|                     |___/ 
`;

const BOOT_MESSAGES = [
  "> initializing portfolio system...",
  "> loading components...",
  "> mounting react application...",
  "> establishing connections...",
  "> ready.",
];

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Check if user has seen the boot sequence before
    const hasSeenBoot = localStorage.getItem("hasSeenBoot");
    
    // In development, always show boot sequence (can be skipped)
    // In production, show only once
    const isDev = import.meta.env.DEV;
    
    if (!hasSeenBoot || isDev) {
      setIsVisible(true);
      setShowContent(true);
      
      // Show messages sequentially
      const messageInterval = setInterval(() => {
        setMessageIndex((prev) => {
          if (prev >= BOOT_MESSAGES.length - 1) {
            clearInterval(messageInterval);
            // Hide boot sequence after messages complete
            setTimeout(() => {
              setIsVisible(false);
              localStorage.setItem("hasSeenBoot", "true");
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 400);

      return () => clearInterval(messageInterval);
    }
  }, []);

  // Add escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleSkip();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVisible]);

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenBoot", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-terminal-bg flex items-center justify-center">
      {/* Screen reader announcement */}
      <div role="status" className="sr-only">
        Loading portfolio...
      </div>

      <div className="relative w-full max-w-3xl px-6">
        {/* ASCII Art - hidden from screen readers */}
        <pre 
          aria-hidden="true"
          className="text-terminal-accent text-xs md:text-sm overflow-hidden whitespace-pre font-mono mb-8 animate-fade-in"
          style={{
            animation: showContent ? "none" : undefined,
          }}
        >
          {BOOT_ASCII}
        </pre>

        {/* Boot messages */}
        <div 
          aria-hidden="true" 
          className="space-y-2 font-mono text-sm text-terminal-text"
        >
          {BOOT_MESSAGES.slice(0, messageIndex + 1).map((message, idx) => (
            <div
              key={idx}
              className="animate-fade-in"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {message}
            </div>
          ))}
          
          {messageIndex < BOOT_MESSAGES.length - 1 && (
            <span className="inline-block w-2 h-4 bg-terminal-accent animate-blink ml-1" />
          )}
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 font-mono text-xs text-terminal-muted hover:text-terminal-accent transition-colors border border-terminal-muted hover:border-terminal-accent px-3 py-1 rounded"
        >
          skip [esc]
        </button>
      </div>
    </div>
  );
}
