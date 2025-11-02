import { Code2, Database, Layout, Server, Smartphone, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const skills = [
  {
    category: "Frontend",
    icon: Layout,
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "Python", "Django"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    items: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    category: "Tools",
    icon: Zap,
    items: ["Git", "Docker", "AWS", "Vercel"],
  },
  {
    category: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "Python", "Dart"],
  },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => {
        const Icon = skill.icon;
        return (
          <Card
            key={skill.category}
            className="p-6 hover-elevate active-elevate-2 transition-all"
            data-testid={`card-skill-${skill.category.toLowerCase()}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg">{skill.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                  data-testid={`badge-${item.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
