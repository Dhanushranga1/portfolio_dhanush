import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
          dhanushranga1
        </h1>
        
        <p className="text-base md:text-lg font-mono text-muted-foreground leading-relaxed">
          hey there! i'm dhanush, a full-stack developer interested in building beautiful things for the web.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm font-mono">
          <Link href="/about" data-testid="link-about">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              /about
            </span>
          </Link>
          <Link href="/projects" data-testid="link-projects">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              /projects
            </span>
          </Link>
          <Link href="/blog" data-testid="link-blog">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              /blog
            </span>
          </Link>
          <Link href="/photos" data-testid="link-pics">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              /pics
            </span>
          </Link>
          <Link href="/contact" data-testid="link-contact">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              /contact
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
