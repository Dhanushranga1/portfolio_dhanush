import { Github, Linkedin, Mail, ExternalLink, Terminal, Cloud, Database, Code } from "lucide-react";

const experiences = [
  {
    title: "full-stack developer intern",
    company: "tonik",
    location: "on-site · chennai, india",
    period: "jan 2026 – present",
    current: true,
    bullets: [
      "own ai governance layer and api gateway infrastructure for internal platform services",
      "building kong-agentic — natural-language interface for kong oss using langgraph + groq with dual-model routing and deterministic short-circuit for simple commands",
      "designed agentic fallback chain: langgraph-groq → degraded-regex on rate-limit, zero downtime",
    ],
  },
  {
    title: "artificial intelligence intern",
    company: "deep algorithms solutions",
    location: "remote · hyderabad, india",
    period: "jun 2025 – jul 2025",
    current: false,
    bullets: [
      "engineered fastapi endpoints for document qa using transformer embeddings, improving answer relevance by 40%",
      "implemented neural architectures (cnns, transformers, diffusion models) achieving 90% accuracy on image segmentation",
      "automated data preparation pipelines, reducing manual processing time by 30%",
    ],
  },
  {
    title: "industrial trainee",
    company: "intel corporation",
    location: "remote · chennai, india",
    period: "may 2024 – jul 2024",
    current: false,
    bullets: [
      "built gps toll-based system simulation using python and computer vision techniques",
      "applied industrial experience in embedded systems and real-world sensor data processing",
    ],
  },
  {
    title: "intern",
    company: "ventura automation services inc",
    location: "on-site · chennai, india",
    period: "may 2024 – jun 2024",
    current: false,
    bullets: [
      "developed automation scripts in python and sql for internal data workflows",
    ],
  },
  {
    title: "community connect intern",
    company: "beyond pages trust",
    location: "on-site · chennai, india",
    period: "jun 2024 – jul 2024",
    current: false,
    bullets: [
      "led fundraising campaigns and managed outreach projects for community education initiatives",
    ],
  },
  {
    title: "developer",
    company: "radiance srmist",
    location: "part-time · chennai, india",
    period: "sep 2023 – oct 2024",
    current: false,
    bullets: [
      "drove technology initiatives and led development projects for the srmist student community",
    ],
  },
];

const techStack = [
  { label: "python",      category: "lang" },
  { label: "typescript",  category: "lang" },
  { label: "javascript",  category: "lang" },
  { label: "java",        category: "lang" },
  { label: "sql",         category: "lang" },
  { label: "bash",        category: "lang" },
  { label: "react",       category: "framework" },
  { label: "next.js",     category: "framework" },
  { label: "fastapi",     category: "framework" },
  { label: "langgraph",   category: "framework" },
  { label: "pandas",      category: "framework" },
  { label: "scikit-learn",category: "framework" },
  { label: "aws",         category: "infra" },
  { label: "docker",      category: "infra" },
  { label: "kubernetes",  category: "infra" },
  { label: "terraform",   category: "infra" },
  { label: "github actions",category: "infra" },
  { label: "postgresql",  category: "data" },
  { label: "supabase",    category: "data" },
  { label: "faiss",       category: "data" },
  { label: "kong oss",    category: "data" },
  { label: "groq",        category: "data" },
];

const categoryStyles: Record<string, string> = {
  lang:      "border-accent-info/30 text-accent-info bg-accent-info/5 hover:bg-accent-info/10",
  framework: "border-blue-400/30 text-blue-300 bg-blue-400/5 hover:bg-blue-400/10",
  infra:     "border-accent-action/30 text-orange-300 bg-accent-action/5 hover:bg-accent-action/10",
  data:      "border-purple-400/30 text-purple-300 bg-purple-400/5 hover:bg-purple-400/10",
};

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">

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
            hey there! i'm <span className="text-accent-info font-medium">dhanush ranga gopisetty</span> — a final-year b.tech computer science student at srm institute of science and technology, kattankulathur, with a deep interest in ai/ml, system design, and full-stack engineering.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
            currently a <span className="text-accent-info">full-stack developer intern at tonik</span>, where i handle ai governance, api gateway management, and am building kong-agentic — a natural-language interface for kong oss api gateway powered by langgraph and groq. maintaining a <span className="text-accent-info">9.06/10 cgpa</span> while shipping production-grade systems.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
            i build intelligent platforms that blend data-driven reasoning with seamless ux — from multi-tenant saas with custom rag pipelines (ticketpilot) to agentic gateway management tools. open-source contributor with a pypi-published library and active fosshack participant.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
            outside code, you'll find me exploring llm architectures, vector database internals, and how agentic systems are reshaping software infrastructure.
          </p>
        </div>

        <div className="space-y-20 font-mono text-sm">

          {/* ── Experience ─────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-10">
              <span className="text-muted-foreground">$</span> experience
            </h2>

            <div className="relative pl-6">
              {/* vertical connector */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border/40" aria-hidden="true" />

              <div className="space-y-10">
                {experiences.map((exp) => (
                  <div key={exp.company + exp.period} className="relative">
                    {/* timeline dot */}
                    {exp.current ? (
                      <span className="absolute -left-6 top-1 flex h-3 w-3" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-info opacity-50" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-info border border-background" />
                      </span>
                    ) : (
                      <span
                        className="absolute -left-6 top-1 h-3 w-3 rounded-full border border-border bg-surface-2 block"
                        aria-hidden="true"
                      />
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.title}</h3>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {exp.company}
                            {exp.current && (
                              <span className="ml-2 inline-flex items-center gap-1 text-accent-info text-[0.65rem] font-bold uppercase tracking-wider border border-accent-info/30 rounded px-1.5 py-0.5 bg-accent-info/5">
                                current
                              </span>
                            )}
                            {" "}· {exp.location}
                          </p>
                        </div>
                        <span className="text-muted-foreground text-xs shrink-0 tabular-nums">{exp.period}</span>
                      </div>
                      <ul className="space-y-1 text-muted-foreground leading-relaxed">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-accent-info/40 shrink-0 select-none">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tech Stack ─────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-8">
              <span className="text-muted-foreground">$</span> tech stack
            </h2>

            <div className="space-y-6">
              {[
                { key: "lang",      icon: Code,     label: "languages & core" },
                { key: "framework", icon: Terminal,  label: "frameworks & libraries" },
                { key: "infra",     icon: Cloud,     label: "cloud & devops" },
                { key: "data",      icon: Database,  label: "databases & tools" },
              ].map(({ key, icon: Icon, label }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-xs uppercase tracking-widest">{label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-5">
                    {techStack
                      .filter(t => t.category === key)
                      .map(t => (
                        <span
                          key={t.label}
                          className={`px-2.5 py-1 text-[0.72rem] rounded border font-medium transition-colors duration-150 cursor-default ${categoryStyles[key]}`}
                        >
                          {t.label}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Education ──────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-6">
              <span className="text-muted-foreground">$</span> education
            </h2>
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="font-semibold">bachelor of technology in computer science engineering</h3>
                <p className="text-muted-foreground mt-0.5">srm institute of science and technology · kattankulathur, india</p>
                <p className="text-accent-info text-xs mt-1">cgpa 9.06 / 10.0</p>
              </div>
              <span className="text-muted-foreground text-xs tabular-nums shrink-0">aug 2022 – may 2026</span>
            </div>
          </section>

          {/* ── Achievements ───────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-6">
              <span className="text-muted-foreground">$</span> achievements
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "aws academy graduate – cloud foundations (2024)",
                "open source contributor – fosshack 2024 & 2025",
                "published scrubpy on pypi – 30+ downloads in first month",
                "maintained 9.06/10.0 cgpa while building production-level projects",
              ].map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent-info/40 shrink-0 select-none">›</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Links ──────────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-6">
              <span className="text-muted-foreground">$</span> links
            </h2>
            <div className="space-y-3">
              <a
                href="https://github.com/dhanushranga1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
                data-testid="link-github"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                <span className="nav-link">github</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
              </a>
              <a
                href="https://linkedin.com/in/dhanush-ranga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                <span className="nav-link">linkedin</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
              </a>
              <a
                href="mailto:dhanushrangag@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                <span className="nav-link">email</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
