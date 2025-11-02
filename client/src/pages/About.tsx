import TechStack from "@/components/TechStack";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-mono font-bold mb-12">about</h1>

        <div className="space-y-12 font-mono text-sm">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>
              hey there! i'm dhanush, a full-stack developer passionate about building beautiful, functional web applications.
            </p>
            <p>
              i love creating things that are both aesthetically pleasing and solve real problems. my work spans from frontend interfaces to backend systems, and i enjoy every part of the process.
            </p>
            <p>
              when i'm not coding, you'll find me exploring new technologies, contributing to open source, or capturing moments through photography.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">links</h2>
            <div className="space-y-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-github"
              >
                <Github className="h-4 w-4" />
                <span>github <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-4 w-4" />
                <span>linkedin <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
              <a
                href="mailto:hello@dhanushranga.dev"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4" />
                <span>email <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">tech</h2>
            <TechStack />
          </div>
        </div>
      </div>
    </div>
  );
}
