export default function Recruiter() {
  // Personal info
  const profile = {
    name: "Dhanush Ranga Gopisetty",
    title: "Full-Stack Developer & Software Engineer",
    email: "hello@dhanushranga.dev",
    phone: "+1 (555) 123-4567", // Update with your real number
    location: "San Francisco Bay Area, CA",
    github: "github.com/Dhanushranga1",
    linkedin: "linkedin.com/in/dhanush-ranga",
    website: "dhanushranga.dev",
  };

  const summary = "Full-stack developer with 3+ years building high-performance web applications. Specialized in React, TypeScript, Python/FastAPI, and PostgreSQL. Proven track record of delivering accessible, scalable solutions with 95%+ code quality scores. Currently architecting TicketPilot v2.1 - a real-time ticketing system handling 10k+ concurrent users.";

  const skills = {
    "Frontend": ["React (90%)", "TypeScript (85%)", "Tailwind CSS (90%)", "Next.js", "Vite"],
    "Backend": ["Python (95%)", "FastAPI (80%)", "Node.js (75%)", "Express", "REST APIs"],
    "Database": ["PostgreSQL (70%)", "Drizzle ORM", "Redis", "Database Design"],
    "DevOps": ["Docker (65%)", "CI/CD", "Git", "Linux", "AWS/Vercel"],
    "Practices": ["WCAG 2 AA Compliance", "TDD", "Agile/Scrum", "Code Review", "Lighthouse 92+"],
  };

  const experience = [
    {
      title: "Lead Full-Stack Developer",
      company: "Independent / Freelance",
      period: "2022 - Present",
      achievements: [
        "Built 12+ production web applications using React, TypeScript, and Python/FastAPI",
        "Achieved 92/100 Lighthouse performance score through code optimization and lazy loading",
        "Implemented WCAG 2 AA accessibility standards - 0 critical violations (axe-core validated)",
        "Reduced bundle size by 40% (155KB gzipped) through strategic code splitting",
        "Mentored 2 junior developers on React best practices and accessibility patterns",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "Tech Startup",
      period: "Summer 2021",
      achievements: [
        "Developed RESTful API endpoints serving 50k+ daily requests",
        "Optimized database queries, reducing response time from 800ms to 120ms",
        "Contributed to open-source projects including React component libraries",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University Name", // Update with your school
      period: "2019 - 2023",
      gpa: "3.8/4.0",
    },
  ];

  const projects = [
    {
      name: "TicketPilot v2.1",
      description: "Real-time event ticketing platform with live seat selection, payment processing, and admin dashboard. Handles 10k+ concurrent users.",
      tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "WebSocket"],
      link: "github.com/Dhanushranga1/ticketpilot",
      status: "In Development",
    },
    {
      name: "Hybrid Terminal Portfolio",
      description: "Terminal-inspired portfolio with boot sequence animation, command palette (Cmd+K), scroll-triggered widgets, and 0 accessibility violations.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      link: "github.com/Dhanushranga1/portfolio",
      status: "Live",
    },
    {
      name: "CodeCollab IDE",
      description: "Collaborative code editor with real-time syntax highlighting, multi-user cursors, and live chat. Built for pair programming.",
      tech: ["React", "Node.js", "Socket.io", "Monaco Editor", "PostgreSQL"],
      link: "github.com/Dhanushranga1/codecollab",
      status: "Live",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-6 print:bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Terminal Header Bar */}
        <div className="mb-8 flex items-center justify-between bg-surface-2 border border-surface-contrast rounded-t-lg px-4 py-2 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 text-xs font-mono text-text-muted">
              recruiter_snapshot.sh
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-accent-action/10 border border-accent-action/30 text-accent-action rounded text-xs font-mono hover:bg-accent-action/20 transition-colors duration-150"
          >
            [Ctrl+P] Print / Export PDF
          </button>
        </div>

        {/* Main Content Container */}
        <div className="bg-surface/50 border border-surface-contrast rounded-b-lg p-8 space-y-10 print:bg-white print:border-0 print:p-0">
          {/* Header */}
          <header className="border-b border-white/10 pb-6 print:border-gray-300">
            {/* Boot Prompt */}
            <div className="text-xs font-mono text-accent-info mb-4 print:hidden">
              <span className="text-text-muted">$</span> cat recruiter_snapshot.sh
            </div>
            
            <h1 className="text-5xl font-mono font-bold mb-2 text-text-primary print:text-black tracking-tight">
              {profile.name}
            </h1>
            <p className="text-2xl text-accent-info font-mono mb-6 print:text-gray-700 tracking-wide">
              {profile.title}
            </p>
            
            {/* Contact Info - Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-mono text-text-primary/80 print:text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-accent-info print:text-gray-400">›</span>
                <a href={`mailto:${profile.email}`} className="hover:text-accent-info transition-colors">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-info print:text-gray-400">›</span>
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-info print:text-gray-400">›</span>
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-info print:text-gray-400">›</span>
                <a 
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-info transition-colors"
                >
                  {profile.website}
                </a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-6 text-sm font-mono">
              <a 
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-info hover:text-accent-info-700 transition-colors duration-150 print:text-gray-700"
              >
                [GitHub] →
              </a>
              <a 
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-info hover:text-accent-info-700 transition-colors duration-150 print:text-gray-700"
              >
                [LinkedIn] →
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="print:break-inside-avoid">
            <h2 className="text-xl font-mono font-semibold mb-4 text-accent-info print:text-black flex items-center gap-2">
              <span className="text-text-muted">$</span> cat summary.txt
            </h2>
            <p className="text-text-primary/90 font-mono leading-relaxed text-sm print:text-gray-700 pl-4 border-l-2 border-accent-info/30 print:border-gray-300">
              {summary}
            </p>
          </section>

          {/* Skills */}
          <section className="print:break-inside-avoid">
            <h2 className="text-xl font-mono font-semibold mb-4 text-accent-info print:text-black flex items-center gap-2">
              <span className="text-text-muted">$</span> ls -la ./skills/
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-3 bg-surface-2/50 border border-surface-contrast/50 rounded-lg p-4 print:bg-white print:border-gray-200">
                  <h3 className="font-mono font-semibold text-base text-accent-action print:text-gray-800 mb-2 border-b border-accent-action/20 pb-2 print:border-gray-300">
                    [{category}]
                  </h3>
                  <ul className="space-y-1.5 font-mono text-xs text-text-primary/80 print:text-gray-600">
                    {items.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="text-accent-info print:text-gray-400 text-xs">▸</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="print:break-inside-avoid">
            <h2 className="text-xl font-mono font-semibold mb-4 text-accent-info print:text-black flex items-center gap-2">
              <span className="text-text-muted">$</span> git log --experience --reverse
            </h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-accent-info/30 print:border-gray-300">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent-info print:bg-gray-400"></div>
                  
                  <div className="space-y-2 pb-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="font-mono font-semibold text-base text-text-primary print:text-gray-900">
                        {job.title}
                      </h3>
                      <span className="font-mono text-xs bg-surface-2/50 border border-surface-contrast px-2 py-1 rounded text-text-muted print:bg-gray-100 print:border-gray-300 print:text-gray-600">
                        {job.period}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-accent-action/90 print:text-gray-700 font-medium">
                      @ {job.company}
                    </p>
                    <ul className="space-y-2 font-mono text-xs text-text-primary/80 print:text-gray-600 mt-3">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent-info print:text-gray-400 mt-0.5">▸</span>
                          <span className="flex-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="print:break-inside-avoid">
            <h2 className="text-xl font-mono font-semibold mb-4 text-accent-info print:text-black flex items-center gap-2">
              <span className="text-text-muted">$</span> npm run showcase --production
            </h2>
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-surface-2/30 border border-surface-contrast/50 rounded-lg p-5 hover:border-accent-info/30 transition-all duration-150 print:bg-white print:border-gray-200 print:hover:border-gray-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-mono font-semibold text-base text-text-primary print:text-gray-900 flex items-center gap-2">
                      <span className="text-accent-info print:text-gray-400">[</span>
                      {project.name}
                      <span className="text-accent-info print:text-gray-400">]</span>
                    </h3>
                    <span className="font-mono text-xs bg-accent-info/10 border border-accent-info/30 text-accent-info px-2 py-0.5 rounded whitespace-nowrap print:bg-gray-100 print:border-gray-300 print:text-gray-700">
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="font-mono text-xs text-text-primary/80 leading-relaxed mb-4 print:text-gray-600">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <code
                        key={tech}
                        className="px-2 py-1 bg-surface border border-surface-contrast/50 text-accent-info text-xs font-mono rounded print:bg-gray-50 print:border-gray-300 print:text-gray-700"
                      >
                        {tech}
                      </code>
                    ))}
                  </div>
                  
                  {project.link && (
                    <a
                      href={`https://${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-accent-action hover:text-accent-action/80 transition-colors duration-150 print:text-gray-600"
                    >
                      <span>View on GitHub</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="print:break-inside-avoid">
            <h2 className="text-xl font-mono font-semibold mb-4 text-accent-info print:text-black flex items-center gap-2">
              <span className="text-text-muted">$</span> cat education.log
            </h2>
            <div className="space-y-4 bg-surface-2/30 border border-surface-contrast/50 rounded-lg p-5 print:bg-white print:border-gray-200">
              {education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-mono font-semibold text-base text-text-primary print:text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-sm text-accent-action/90 print:text-gray-700">
                    {edu.school}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-text-muted print:text-gray-500">
                    <span>{edu.period}</span>
                    {edu.gpa && (
                      <span className="text-accent-info print:text-gray-600">GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center pt-8 border-t border-white/10 print:border-gray-300">
            <p className="text-xs font-mono text-text-muted print:text-gray-500 flex items-center justify-center gap-2">
              <span className="text-accent-info print:text-gray-400">$</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <span className="text-text-muted/50">•</span>
              <span>Interactive portfolio: {profile.website}</span>
            </p>
          </footer>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
