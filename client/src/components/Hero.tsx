import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import TextAnim from "./animations/TextAnim";
import CursorBlinker from "./animations/CursorBlinker";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Main hero UI
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        {/* Username/Title with typing animation */}
        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
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
          className="text-base md:text-lg font-mono text-muted-foreground leading-relaxed"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.15 }}
        >
          <span className="text-text-primary">~</span> hey there! i'm dhanush, i like building things
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

        {/* Command Palette Hint - Phase 4 */}
        <motion.div
          className="pt-4"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.15 }}
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
