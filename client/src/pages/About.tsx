import { Github, Linkedin, Mail, ExternalLink, Terminal, Cloud, Database, Code } from "lucide-react";
import { useExperiences, useSkills, useSiteSettings } from "@/hooks/useStrapi";
import { Skeleton } from "@/components/ui/skeleton";

const categoryStyles: Record<string, string> = {
  lang:      "border-accent-info/30 text-accent-info bg-accent-info/5 hover:bg-accent-info/10",
  framework: "border-blue-400/30 text-blue-300 bg-blue-400/5 hover:bg-blue-400/10",
  infra:     "border-accent-action/30 text-orange-300 bg-accent-action/5 hover:bg-accent-action/10",
  data:      "border-purple-400/30 text-purple-300 bg-purple-400/5 hover:bg-purple-400/10",
};

const skillCategories = [
  { key: "lang",      icon: Code,     label: "languages & core" },
  { key: "framework", icon: Terminal, label: "frameworks & libraries" },
  { key: "infra",     icon: Cloud,    label: "cloud & devops" },
  { key: "data",      icon: Database, label: "databases & tools" },
];

export default function About() {
  const { data: expData, isLoading: expLoading } = useExperiences();
  const { data: skillData, isLoading: skillLoading } = useSkills();
  const { data: siteData, isLoading: siteLoading } = useSiteSettings();

  const experiences = expData?.data ?? [];
  const techStack = skillData?.data ?? [];
  const settings = siteData?.data;

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
          {siteLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : (
            <p className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {settings?.bio}
            </p>
          )}
        </div>

        <div className="space-y-20 font-mono text-sm">

          {/* ── Experience ─────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-10">
              <span className="text-muted-foreground">$</span> experience
            </h2>

            {expLoading ? (
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
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
                          {(exp.bullets ?? []).map((b, i) => (
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
            )}
          </section>

          {/* ── Tech Stack ─────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-8">
              <span className="text-muted-foreground">$</span> tech stack
            </h2>

            {skillLoading ? (
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-20" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {skillCategories.map(({ key, icon: Icon, label }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="text-xs uppercase tracking-widest">{label}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-5">
                      {techStack
                        .filter((t) => t.category === key)
                        .map((t) => (
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
            )}
          </section>

          {/* ── Education ──────────────────────────────────────────── */}
          {!siteLoading && settings?.education && settings.education.length > 0 && (
            <section className="border-t border-border/30 pt-10">
              <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-6">
                <span className="text-muted-foreground">$</span> education
              </h2>
              {settings.education.map((edu) => (
                <div key={edu.degree} className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground mt-0.5">{edu.institution}</p>
                    {edu.detail && <p className="text-accent-info text-xs mt-1">{edu.detail}</p>}
                  </div>
                  <span className="text-muted-foreground text-xs tabular-nums shrink-0">{edu.period}</span>
                </div>
              ))}
            </section>
          )}

          {/* ── Achievements ───────────────────────────────────────── */}
          {!siteLoading && settings?.achievements && settings.achievements.length > 0 && (
            <section className="border-t border-border/30 pt-10">
              <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-6">
                <span className="text-muted-foreground">$</span> achievements
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {settings.achievements.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-info/40 shrink-0 select-none">›</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Links ──────────────────────────────────────────────── */}
          <section className="border-t border-border/30 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-accent-info flex items-center gap-2 mb-6">
              <span className="text-muted-foreground">$</span> links
            </h2>
            <div className="space-y-3">
              {settings?.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
                  data-testid="link-github"
                >
                  <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                  <span className="nav-link">github</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
                </a>
              )}
              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                  <span className="nav-link">linkedin</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
                </a>
              )}
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent-info transition-colors duration-150 group w-fit"
                  data-testid="link-email"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                  <span className="nav-link">email</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
                </a>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
