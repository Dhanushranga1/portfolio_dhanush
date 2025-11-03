import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
}

function SkillBar({ name, level }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate width after a small delay
          setTimeout(() => setWidth(level), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, level]);

  const filledBars = Math.round((level / 100) * 10);
  const emptyBars = 10 - filledBars;

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground">[</span>
        <div 
          className="flex overflow-hidden transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${width}%` : '0%' }}
        >
          {Array.from({ length: filledBars }).map((_, i) => (
            <span key={i} className="text-terminal-accent">█</span>
          ))}
        </div>
        {Array.from({ length: emptyBars }).map((_, i) => (
          <span key={i} className="text-muted-foreground opacity-30">░</span>
        ))}
        <span className="text-muted-foreground">]</span>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <div className="space-y-8 font-mono text-sm">
      <div className="space-y-4">
        <h3 className="text-muted-foreground text-xs uppercase tracking-wider">key skills</h3>
        <div className="space-y-3">
          <SkillBar name="Python / FastAPI" level={90} />
          <SkillBar name="JavaScript / TypeScript" level={85} />
          <SkillBar name="React / Next.js" level={85} />
          <SkillBar name="AWS / Cloud Infrastructure" level={80} />
          <SkillBar name="Docker / Kubernetes" level={75} />
          <SkillBar name="PostgreSQL / Databases" level={80} />
          <SkillBar name="Machine Learning / AI" level={75} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-xs uppercase tracking-wider">languages</h3>
        <p className="text-foreground leading-relaxed">
          python / sql / java / c++ / bash
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-xs uppercase tracking-wider">frameworks & libraries</h3>
        <p className="text-foreground leading-relaxed">
          fastapi / next.js / sqlalchemy / pandas / numpy / scikit-learn
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-xs uppercase tracking-wider">cloud & devops</h3>
        <p className="text-foreground leading-relaxed">
          aws (ec2, s3, rds, lambda) / docker / kubernetes / terraform / github actions / jenkins
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-xs uppercase tracking-wider">databases & tools</h3>
        <p className="text-foreground leading-relaxed">
          postgresql / supabase / faiss / git / prometheus / grafana / ansible
        </p>
      </div>
    </div>
  );
}
