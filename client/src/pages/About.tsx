import TechStack from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, Download } from "lucide-react";
import profileImage from '@assets/generated_images/Profile_headshot_placeholder_08f16e74.png';

export default function About() {
  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Mail, label: "Email", href: "mailto:hello@dhanushranga.dev" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-display font-bold">
              <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
              <p>
                Hey there! I'm <span className="font-bold text-foreground">Dhanush Ranga Gopisetty</span>, 
                a full-stack developer passionate about creating beautiful, functional digital experiences.
              </p>
              <p>
                I love building applications that not only work flawlessly but also delight users with 
                thoughtful design and smooth interactions. My approach combines technical excellence 
                with creative problem-solving.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                or capturing moments through photography. I believe in continuous learning and sharing knowledge 
                with the developer community.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="lg"
                    asChild
                    data-testid={`link-${link.label.toLowerCase()}`}
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-5 w-5 mr-2" />
                      {link.label}
                    </a>
                  </Button>
                );
              })}
            </div>

            <Button size="lg" variant="default" className="mt-4" data-testid="button-download-resume">
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-2xl blur-3xl" />
              <img
                src={profileImage}
                alt="Dhanush Ranga Gopisetty"
                className="relative rounded-2xl w-full max-w-md shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Skills & Tools</h2>
          <p className="text-muted-foreground text-lg mb-12">
            Technologies and tools I work with regularly
          </p>
          <TechStack />
        </div>

        {/* Timeline/Experience */}
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg mb-12">
            My professional journey so far
          </p>

          <div className="space-y-8">
            {/* TODO: remove mock functionality */}
            {[
              {
                role: "Senior Full-Stack Developer",
                company: "Tech Innovations Inc.",
                period: "2023 - Present",
                description: "Leading development of scalable web applications and mentoring junior developers.",
              },
              {
                role: "Full-Stack Developer",
                company: "Digital Solutions Co.",
                period: "2021 - 2023",
                description: "Built and maintained multiple client projects using modern web technologies.",
              },
              {
                role: "Frontend Developer",
                company: "Startup Labs",
                period: "2020 - 2021",
                description: "Developed responsive user interfaces and implemented design systems.",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-primary/30 pb-8 last:pb-0"
                data-testid={`experience-${index}`}
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold">{job.role}</h3>
                  <p className="text-primary font-medium">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                  <p className="text-foreground/80">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
