import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "i like building things";
  const bootLines = [
    "[    0.000000] Initializing portfolio system...",
    "[    0.012843] Loading user profile: dhanushranga1",
    "[    0.024567] Mounting projects directory... OK",
    "[    0.031234] Starting web services... OK",
    "[    0.045678] System ready.",
  ];

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Skip animations if user prefers reduced motion or boot was previously completed
    const bootSkipped = localStorage.getItem("portfolio-boot-skipped");
    if (prefersReducedMotion || bootSkipped === "true") {
      setBootComplete(true);
      setTypedText(fullText);
      return;
    }

    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    // Boot sequence (2 seconds)
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
    }, 2000);

    // Handle Esc key to skip boot
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !bootComplete) {
        localStorage.setItem("portfolio-boot-skipped", "true");
        setBootComplete(true);
        setTypedText(fullText);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(bootTimer);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [bootComplete, prefersReducedMotion, fullText]);

  // Typing effect after boot
  useEffect(() => {
    if (!bootComplete || typedText === fullText) return;

    const typingTimer = setTimeout(() => {
      setTypedText(fullText.slice(0, typedText.length + 1));
    }, 80); // 80ms per character

    return () => clearTimeout(typingTimer);
  }, [bootComplete, typedText, fullText]);

  // Blinking cursor
  useEffect(() => {
    if (typedText !== fullText) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorTimer);
    } else {
      setShowCursor(false); // Hide cursor when typing complete
    }
  }, [typedText, fullText]);

  const handleSkip = () => {
    localStorage.setItem("portfolio-boot-skipped", "true");
    setBootComplete(true);
    setTypedText(fullText);
  };

  // Boot sequence UI
  if (!bootComplete) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 bg-surface">
        <div className="max-w-3xl w-full">
          <div className="font-mono text-xs md:text-sm space-y-1 text-text-secondary">
            {bootLines.map((line, index) => (
              <div
                key={index}
                className="animate-in fade-in slide-in-from-left-2 duration-200"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {line}
              </div>
            ))}
          </div>

          {showSkip && (
            <button
              onClick={handleSkip}
              className="mt-8 text-xs font-mono text-muted hover:text-accent-info transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-info/40 rounded px-2 py-1"
              aria-label="Skip boot sequence"
            >
              Press <kbd className="px-1.5 py-0.5 bg-surface-2 border border-surface-contrast rounded">Esc</kbd> to skip
            </button>
          )}
        </div>
      </section>
    );
  }

  // Main hero UI
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        {/* Username/Title */}
        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="text-accent-info">$</span> dhanushranga1
        </h1>
        
        {/* Bio with typing effect */}
        <p className="text-base md:text-lg font-mono text-muted-foreground leading-relaxed min-h-[2rem]">
          <span className="text-text-primary">~</span> hey there! i'm dhanush, {typedText}
          {showCursor && <span className="animate-pulse">_</span>}
        </p>

        {/* Quick links with underline reveal effect */}
        <div 
          className="flex items-center justify-center gap-6 text-sm font-mono animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/about" data-testid="link-about">
            <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
              /about
            </span>
          </Link>
          <Link href="/projects" data-testid="link-projects">
            <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
              /projects
            </span>
          </Link>
          <Link href="/blog" data-testid="link-blog">
            <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
              /blog
            </span>
          </Link>
          <Link href="/photos" data-testid="link-pics">
            <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
              /pics
            </span>
          </Link>
          <Link href="/contact" data-testid="link-contact">
            <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
              /contact
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
