import { Github, Linkedin, Mail, ExternalLink, Terminal, Cloud, Database, Code } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-accent-info">$</span> about
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            whoami && cat bio.txt
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-6 font-mono text-sm leading-relaxed text-foreground mb-16">
          <p className="text-base md:text-lg">
            hey there! i'm <span className="text-accent-info font-semibold">dhanush ranga gopisetty</span>, a computer science student at srm institute of science and technology with a passion for ai/ml and full-stack development.
          </p>
          <p>
            currently maintaining a <span className="text-accent-info">9.06/10.0 cgpa</span> while building production-level projects that solve real-world problems. i've worked as an artificial intelligence intern at deep algorithms solutions, where i engineered fastapi endpoints for document qa systems and implemented neural architectures for image segmentation.
          </p>
          <p>
            i'm passionate about creating intelligent systems that combine modern web technologies with machine learning. my projects include ai-powered support platforms, movie-to-book recommendation engines, and data preprocessing libraries published on pypi.
          </p>
          <p>
            when i'm not coding, you'll find me contributing to open source (fosshack 2024 & 2025), exploring cloud architecture patterns, or learning about the latest in llms and vector databases.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 font-mono text-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">experience</h2>
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

          <div className="space-y-4">
            <h2 className="text-xl font-bold">education</h2>
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

          <div className="space-y-4">
            <h2 className="text-xl font-bold">achievements</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>aws academy graduate – cloud foundations (2024)</li>
              <li>open source contributor – fosshack 2024 & 2025</li>
              <li>published scrubpy on pypi – 30+ downloads in first month</li>
              <li>maintained 9.06/10.0 cgpa while building production-level projects</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">links</h2>
            <div className="space-y-2">
              <a
                href="https://github.com/dhanushranga1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-github"
              >
                <Github className="h-4 w-4" />
                <span>github <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
              <a
                href="https://linkedin.com/in/dhanush-ranga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-4 w-4" />
                <span>linkedin <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
              <a
                href="mailto:dhanushrangag@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4" />
                <span>email <ExternalLink className="inline h-3 w-3 ml-1" /></span>
              </a>
            </div>
          </div>

          {/* Tech Stack - Clean Categorized View */}
          <div className="space-y-4">
            <h2 className="text-xl font-mono font-bold flex items-center gap-2">
              <span className="text-accent-info">$</span> tech stack
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Languages & Core */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider">languages & core</h3>
                </div>
                <div className="font-mono text-sm text-foreground space-y-1 pl-6">
                  <p>• python, typescript, javascript</p>
                  <p>• sql, java, c++, bash</p>
                </div>
              </div>

              {/* Frameworks */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Terminal className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider">frameworks</h3>
                </div>
                <div className="font-mono text-sm text-foreground space-y-1 pl-6">
                  <p>• react, next.js, fastapi</p>
                  <p>• sqlalchemy, pandas, numpy</p>
                  <p>• scikit-learn, transformers</p>
                </div>
              </div>

              {/* Cloud & DevOps */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Cloud className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider">cloud & devops</h3>
                </div>
                <div className="font-mono text-sm text-foreground space-y-1 pl-6">
                  <p>• aws (ec2, s3, rds, lambda)</p>
                  <p>• docker, kubernetes, terraform</p>
                  <p>• github actions, jenkins</p>
                </div>
              </div>

              {/* Databases & Tools */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Database className="h-4 w-4 text-accent-info" />
                  <h3 className="text-sm uppercase tracking-wider">databases & tools</h3>
                </div>
                <div className="font-mono text-sm text-foreground space-y-1 pl-6">
                  <p>• postgresql, supabase, faiss</p>
                  <p>• git, prometheus, grafana</p>
                  <p>• ansible, langchain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
