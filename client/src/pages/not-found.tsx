import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-md w-full font-mono space-y-6"
      >
        {/* Prompt line */}
        <div className="text-sm text-muted-foreground">
          <span className="text-accent-info">dhanushranga1</span>
          <span className="text-muted-foreground/50">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-muted-foreground/50">$</span>
          <span className="ml-2">cd {window.location.pathname}</span>
        </div>

        {/* Error output */}
        <div className="space-y-1 text-sm">
          <p className="text-accent-warn">
            bash: cd: {window.location.pathname}: No such file or directory
          </p>
          <p className="text-muted-foreground/60">exit code 1</p>
        </div>

        {/* 404 display */}
        <div className="py-6 border-y border-border/20">
          <p className="text-6xl font-bold text-accent-info/10 select-none tracking-tight">404</p>
          <p className="text-foreground mt-2">this page doesn't exist.</p>
          <p className="text-muted-foreground text-sm mt-1">
            the path you requested was not found in the directory tree.
          </p>
        </div>

        {/* Recovery */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>try one of these instead:</p>
          <div className="space-y-1 pl-4">
            {[
              { path: "/", label: "~/ home" },
              { path: "/about", label: "~/about" },
              { path: "/projects", label: "~/projects" },
              { path: "/blog", label: "~/blog" },
              { path: "/contact", label: "~/contact" },
            ].map(({ path, label }) => (
              <Link key={path} href={path}>
                <span className="flex items-center gap-2 hover:text-accent-info transition-colors duration-150 cursor-pointer w-fit group">
                  <span className="text-accent-info/40 group-hover:text-accent-info">›</span>
                  <span className="nav-link">{label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Blinking cursor */}
        <div className="text-sm text-muted-foreground">
          <span className="text-accent-info">dhanushranga1</span>
          <span className="text-muted-foreground/50">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-muted-foreground/50">$</span>
          <span className="ml-2 terminal-prompt" />
        </div>
      </motion.div>
    </div>
  );
}
