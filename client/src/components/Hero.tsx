import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import TextAnim from "./animations/TextAnim";
import CursorBlinker from "./animations/CursorBlinker";
import ActionButtons from "./ActionButtons";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  // Scale-to-fit logic to prevent scrolling
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    function computeScale() {
      if (!content) return 1;
      
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Temporarily remove transform to measure natural size
      const prevTransform = content.style.transform;
      content.style.transform = 'none';
      const rect = content.getBoundingClientRect();
      const contentW = rect.width;
      const contentH = rect.height;
      content.style.transform = prevTransform;

      // Compute scale with padding
      const scaleW = (vw - 32) / contentW;
      const scaleH = (vh - 32) / contentH;
      const scale = Math.min(1, scaleW, scaleH);

      // Minimum scale to keep readable
      const minScale = 0.7;
      return Math.max(minScale, scale);
    }

    function applyScale() {
      if (!content) return;
      const scale = computeScale();
      content.style.transform = `scale(${scale}) translateZ(0)`;
    }

    let resizeTimeout: NodeJS.Timeout;
    function scheduleUpdate() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(applyScale, 80);
    }

    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('orientationchange', scheduleUpdate);
    window.addEventListener('load', applyScale);
    
    // Apply immediately
    applyScale();

    return () => {
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('orientationchange', scheduleUpdate);
      window.removeEventListener('load', applyScale);
    };
  }, []);

  // Main hero UI
  return (
    <section className="homepage-viewport">
      <div ref={contentRef} className="homepage-content max-w-3xl text-center space-y-6 px-6">
        {/* Username/Title with typing animation */}
        <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight">
          <span className="text-accent-info">$ </span>
          {shouldReduceMotion ? (
            <>dhanushranga1</>
          ) : (
            <>
              <TextAnim text="dhanushranga1" delay={0.2} duration={1} />
              <CursorBlinker className="ml-1" />
            </>
          )}
        </h1>
        
        {/* Bio - staggered entry */}
        <motion.p 
          className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.15 }}
        >
          <span className="text-accent-info">~</span> computer science student passionate about ai/ml & full-stack development
        </motion.p>

        {/* Quick links with underline reveal effect - staggered entry */}
        <motion.div 
          className="flex items-center justify-center gap-6 text-sm font-mono"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08, // 80ms stagger
                delayChildren: 1.6, // Start after tagline
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
            }}
          >
            <Link href="/about" data-testid="link-about">
              <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
                /about
              </span>
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
            }}
          >
            <Link href="/projects" data-testid="link-projects">
              <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
                /projects
              </span>
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
            }}
          >
            <Link href="/blog" data-testid="link-blog">
              <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
                /blog
              </span>
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
            }}
          >
            <Link href="/photos" data-testid="link-pics">
              <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
                /pics
              </span>
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
            }}
          >
            <Link href="/contact" data-testid="link-contact">
              <span className="nav-link text-muted-foreground hover:text-accent-info cursor-pointer">
                /contact
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Terminal-style Action Buttons */}
        <div className="pt-8">
          <ActionButtons />
        </div>

        {/* Command Palette Hint - Phase 4 */}
        <motion.div
          className="pt-6"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.15 }}
        >
          <p className="type-label-small text-muted-foreground/70">
            press{" "}
            <kbd className="px-1.5 py-0.5 bg-surface-2 border border-surface-contrast rounded font-mono text-accent-info-muted">
              ⌘K
            </kbd>{" "}
            for quick navigation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
