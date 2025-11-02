import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  const navLinks = [
    { path: "/about", label: "about" },
    { path: "/projects", label: "projects" },
    { path: "/blog", label: "blog" },
    { path: "/photos", label: "pics" },
    { path: "/messages", label: "messages" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-sm font-mono cursor-pointer hover:text-primary transition-colors">
              dhanushranga1
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} data-testid={`link-${link.label}`}>
                <span
                  className={`text-sm font-mono cursor-pointer transition-colors ${
                    location === link.path
                      ? "text-foreground underline decoration-primary decoration-2 underline-offset-4"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  /{link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
