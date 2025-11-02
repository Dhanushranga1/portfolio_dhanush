import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@dhanushranga.dev",
      action: () => {
        navigator.clipboard.writeText("hello@dhanushranga.dev");
        toast({
          title: "Email copied!",
          description: "Email address copied to clipboard.",
        });
      },
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote / Available Worldwide",
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={info.label}
                      className={`p-6 ${info.action ? "cursor-pointer hover-elevate active-elevate-2" : ""}`}
                      onClick={info.action}
                      data-testid={`card-${info.label.toLowerCase()}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{info.label}</h3>
                          <p className="text-muted-foreground">{info.value}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-3">
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
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-3/10 border-primary/20">
              <h3 className="font-display font-bold mb-2">Open to Opportunities</h3>
              <p className="text-muted-foreground">
                I'm currently available for freelance projects and full-time opportunities. 
                Let's build something amazing together!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
