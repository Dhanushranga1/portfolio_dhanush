export default function Recruiter() {
  // Personal info
  const profile = {
    name: "Dhanush Ranga Gopisetty",
    title: "Full-Stack Developer",
    email: "dhanushranga@example.com",
    phone: "+1 (XXX) XXX-XXXX",
    location: "Location, Country",
    github: "github.com/dhanushranga1",
    linkedin: "linkedin.com/in/dhanush-ranga",
    website: "your-portfolio-url.com",
  };

  const summary = "Full-stack developer with expertise in React, TypeScript, Node.js, and modern web technologies. Passionate about building accessible, performant web applications with clean, maintainable code.";

  const skills = {
    "Frontend": ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"],
    "Backend": ["Node.js", "Express", "PostgreSQL", "Drizzle ORM"],
    "Tools": ["Git", "Docker", "VS Code", "Figma"],
    "Practices": ["Accessibility (WCAG)", "Test-Driven Development", "CI/CD", "Agile"],
  };

  const experience = [
    {
      title: "Full-Stack Developer",
      company: "Company Name",
      period: "Jan 2023 - Present",
      achievements: [
        "Built responsive web applications using React and TypeScript",
        "Implemented RESTful APIs with Node.js and Express",
        "Improved application performance by 40% through code optimization",
        "Mentored junior developers on best practices and code reviews",
      ],
    },
    // Add more experiences as needed
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University Name",
      period: "2019 - 2023",
    },
  ];

  const projects = [
    {
      name: "Portfolio Website",
      description: "Terminal-inspired portfolio with boot sequence animation, command palette, and accessibility features",
      tech: ["React", "TypeScript", "Tailwind CSS", "Strapi CMS"],
      link: "github.com/dhanushranga1/portfolio",
    },
    // Add more projects
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-6 print:bg-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="border-b-2 border-surface-contrast pb-6 print:border-black">
          <h1 className="text-4xl font-mono font-bold mb-2 print:text-black">
            {profile.name}
          </h1>
          <p className="text-xl text-accent-info font-mono mb-4 print:text-gray-700">
            {profile.title}
          </p>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono text-muted-foreground print:text-gray-600">
            <div>📧 {profile.email}</div>
            <div>📱 {profile.phone}</div>
            <div>📍 {profile.location}</div>
            <div className="print:hidden">🌐 {profile.website}</div>
          </div>
          
          {/* Links */}
          <div className="mt-4 flex gap-4 text-sm font-mono print:text-gray-600">
            <a 
              href={`https://${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-info hover:underline print:text-gray-700"
            >
              GitHub →
            </a>
            <a 
              href={`https://${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-info hover:underline print:text-gray-700"
            >
              LinkedIn →
            </a>
          </div>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="mt-4 px-4 py-2 bg-accent-action text-white rounded font-mono text-sm hover:bg-accent-action/80 transition-colors print:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-action/40"
          >
            🖨️ Print / Export PDF
          </button>
        </header>

        {/* Summary */}
        <section className="print:break-inside-avoid">
          <h2 className="text-2xl font-mono font-bold mb-3 text-accent-info print:text-black">
            $ summary
          </h2>
          <p className="text-muted-foreground font-mono leading-relaxed print:text-gray-700">
            {summary}
          </p>
        </section>

        {/* Skills */}
        <section className="print:break-inside-avoid">
          <h2 className="text-2xl font-mono font-bold mb-3 text-accent-info print:text-black">
            $ skills --list
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-mono font-semibold text-accent-action print:text-gray-800">
                  {category}:
                </h3>
                <ul className="space-y-1 font-mono text-sm text-muted-foreground print:text-gray-600">
                  {items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="text-accent-info print:text-gray-400">›</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="print:break-inside-avoid">
          <h2 className="text-2xl font-mono font-bold mb-4 text-accent-info print:text-black">
            $ experience --recent
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="font-mono font-semibold text-lg print:text-gray-900">
                    {job.title}
                  </h3>
                  <span className="font-mono text-sm text-muted-foreground print:text-gray-600">
                    {job.period}
                  </span>
                </div>
                <p className="font-mono text-accent-action print:text-gray-700">
                  {job.company}
                </p>
                <ul className="space-y-1 font-mono text-sm text-muted-foreground print:text-gray-600">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent-info print:text-gray-400">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="print:break-inside-avoid">
          <h2 className="text-2xl font-mono font-bold mb-4 text-accent-info print:text-black">
            $ projects --featured
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="space-y-2 border-l-2 border-accent-info pl-4 print:border-gray-400">
                <h3 className="font-mono font-semibold print:text-gray-900">
                  {project.name}
                </h3>
                <p className="font-mono text-sm text-muted-foreground print:text-gray-600">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-surface-2 border border-surface-contrast rounded text-xs font-mono print:bg-gray-100 print:border-gray-300 print:text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={`https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-mono text-accent-action hover:underline print:text-gray-600"
                  >
                    {project.link} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="print:break-inside-avoid">
          <h2 className="text-2xl font-mono font-bold mb-4 text-accent-info print:text-black">
            $ education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <h3 className="font-mono font-semibold print:text-gray-900">
                  {edu.degree}
                </h3>
                <p className="font-mono text-sm text-muted-foreground print:text-gray-600">
                  {edu.school}
                </p>
                <p className="font-mono text-xs text-muted print:text-gray-500">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-surface-contrast print:border-gray-300">
          <p className="text-xs font-mono text-muted print:text-gray-500">
            Generated on {new Date().toLocaleDateString()} • View interactive portfolio at {profile.website}
          </p>
        </footer>
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
