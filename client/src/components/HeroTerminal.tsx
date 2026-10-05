import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CursorBlinker from "@/components/animations/CursorBlinker";
import { useProjects, useSkills } from "@/hooks/useStrapi";

type Tab = "stats" | "stack" | "latest";

const TABS: { key: Tab; label: string; command: string }[] = [
  { key: "stats", label: "stats", command: "cat impact.json" },
  { key: "stack", label: "stack", command: "ls ~/stack" },
  { key: "latest", label: "latest", command: "git log -1" },
];

function useTypedLine(text: string, active: boolean, speed = 18) {
  const [typed, setTyped] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (shouldReduceMotion) {
      setTyped(text);
      return;
    }
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, shouldReduceMotion, speed]);

  return typed;
}

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const shouldReduceMotion = useReducedMotion();
  const { data: projectsData } = useProjects();
  const { data: skillsData } = useSkills();

  const projects = projectsData?.data ?? [];
  const skills = skillsData?.data ?? [];
  const latest = projects[0];

  const currentCommand = TABS.find((t) => t.key === activeTab)?.command ?? "";
  const typedCommand = useTypedLine(currentCommand, true, 22);
  const commandDone = typedCommand.length === currentCommand.length;

  const statRows = projects
    .flatMap((p) => (p.impact ? p.impact.split("·").map((s) => s.trim()) : []))
    .slice(0, 5);

  const stackByCategory = {
    lang: skills.filter((s) => s.category === "lang").map((s) => s.label),
    framework: skills.filter((s) => s.category === "framework").map((s) => s.label),
    infra: skills.filter((s) => s.category === "infra").map((s) => s.label),
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full max-w-md rounded-xl border border-border bg-surface shadow-2xl shadow-black/40 overflow-hidden"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-2">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-muted-foreground font-mono">dhanush@portfolio</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-3 py-2 text-xs font-mono transition-colors duration-150 ${
              activeTab === tab.key
                ? "text-accent-info bg-accent-info/5 border-b-2 border-accent-info"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
            aria-pressed={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="p-4 font-mono text-sm min-h-[220px]">
        <div className="flex items-center gap-2 text-accent-info mb-3">
          <span className="text-muted-foreground">$</span>
          <span>{typedCommand}</span>
          {!commandDone && <CursorBlinker />}
        </div>

        <AnimatePresence mode="wait">
          {commandDone && (
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {activeTab === "stats" && (
                <ul className="space-y-1.5 text-muted-foreground">
                  {statRows.length > 0 ? (
                    statRows.map((row, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent-info/60 shrink-0">›</span>
                        <span>{row}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground/60">Loading metrics…</li>
                  )}
                </ul>
              )}

              {activeTab === "stack" && (
                <div className="space-y-3">
                  {Object.entries(stackByCategory).map(([key, items]) =>
                    items.length > 0 ? (
                      <div key={key}>
                        <div className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-1">
                          {key}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item) => (
                            <span
                              key={item}
                              className="text-xs text-foreground/90 bg-muted px-2 py-0.5 rounded"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}

              {activeTab === "latest" && latest && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.65rem] uppercase tracking-wider px-1.5 py-0.5 rounded border border-accent-info/30 text-accent-info bg-accent-info/5">
                      {latest.status}
                    </span>
                    <span className="text-foreground font-semibold">{latest.title}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{latest.summary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(latest.tags ?? []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
