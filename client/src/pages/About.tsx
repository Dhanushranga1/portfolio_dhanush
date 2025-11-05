import { Github, Linkedin, Mail, ExternalLink, Terminal, Cloud, Database, Code } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-in fade-in slide-in-from-top-2 duration-700">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-accent-info">$</span> about
          </h1>
          <p className="text-muted-foreground font-mono text-sm opacity-80 terminal-prompt">
            whoami && cat bio.txt
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-5 font-mono text-sm md:text-base leading-[1.6] text-foreground mb-16 max-w-[65ch]">
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            hey there! i'm <span className="text-accent-info font-medium">dhanush ranga gopisetty</span> — a computer science student at srm institute of science and technology with a deep interest in ai/ml, system design, and full-stack engineering.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
            currently maintaining a <span className="text-accent-info">9.06/10 cgpa</span> while building production-grade systems that bridge modern web technologies with intelligent automation. as an ai intern at deep algorithms solutions, i engineered fastapi endpoints for document-qa workflows and implemented neural architectures for medical image segmentation.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
            i enjoy creating intelligent platforms that blend data-driven reasoning with seamless user experiences. some of my projects include ai-powered support agents, movie-to-book recommendation systems, and open-source preprocessing libraries published on pypi.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
            outside code, you'll find me exploring cloud infrastructure patterns, contributing to fosshack 2024 & 2025, or studying how llms and vector databases shape the next generation of ai systems.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16 font-mono text-sm">
          {/* Experience Section */}
          <div className="space-y-4 border-t border-border/30 pt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2">
              <span className="text-muted-foreground">$</span> experience
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">artificial intelligence intern</h3>
                    <p className="text-muted-foreground">deep algorithms solutions • remote</p>
                  </div>
                  <span className="text-muted-foreground text-xs">may 2025 – jun 2025</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>engineered fastapi endpoints for document qa using transformer embeddings, improving answer relevance by 40%</li>
                  <li>implemented neural architectures (cnns, transformers, diffusion models) achieving 90% accuracy on image segmentation</li>
                  <li>automated data preparation pipelines, reducing manual processing time by 30%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tech Stack - Clean Categorized View */}
          <div className="space-y-4 border-t border-border/30 pt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2">
              <span className="text-muted-foreground">$</span> tech stack
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Languages & Core */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider font-mono">languages & core</h3>
                </div>
                <div className="font-mono text-sm text-foreground pl-6">
                  <p>python • typescript • javascript • sql</p>
                  <p className="text-muted-foreground">java • c++ • bash</p>
                </div>
              </div>

              {/* Frameworks */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Terminal className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider font-mono">frameworks & libraries</h3>
                </div>
                <div className="font-mono text-sm text-foreground pl-6">
                  <p>react • next.js • fastapi</p>
                  <p className="text-muted-foreground">pandas • numpy • scikit-learn • transformers</p>
                </div>
              </div>

              {/* Cloud & DevOps */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Cloud className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider font-mono">cloud & devops</h3>
                </div>
                <div className="font-mono text-sm text-foreground pl-6">
                  <p>aws • docker • kubernetes • terraform</p>
                  <p className="text-muted-foreground">github actions • jenkins • ansible</p>
                </div>
              </div>

              {/* Databases & Tools */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Database className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider font-mono">databases & tools</h3>
                </div>
                <div className="font-mono text-sm text-foreground pl-6">
                  <p>postgresql • supabase • faiss</p>
                  <p className="text-muted-foreground">git • prometheus • grafana • langchain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-4 border-t border-border/30 pt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2">
              <span className="text-muted-foreground">$</span> education
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">bachelor of technology in computer science engineering</h3>
                  <p className="text-muted-foreground">srm institute of science and technology • kattankulathur, india</p>
                  <p className="text-muted-foreground">cgpa: 9.06/10.0</p>
                </div>
                <span className="text-muted-foreground text-xs">aug 2022 – may 2026</span>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-4 border-t border-border/30 pt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2">
              <span className="text-muted-foreground">$</span> achievements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>aws academy graduate – cloud foundations (2024)</li>
              <li>open source contributor – fosshack 2024 & 2025</li>
              <li>published scrubpy on pypi – 30+ downloads in first month</li>
              <li>maintained 9.06/10.0 cgpa while building production-level projects</li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="space-y-4 border-t border-border/30 pt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2">
              <span className="text-muted-foreground">$</span> links
            </h2>
            <div className="space-y-2">
              <a
                href="https://github.com/dhanushranga1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-200 group"
                data-testid="link-github"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">github <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
              <a
                href="https://linkedin.com/in/dhanush-ranga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-200 group"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">linkedin <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
              <a
                href="mailto:dhanushrangag@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-200 group"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">email <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
