import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  Home, 
  FolderKanban, 
  BookOpen, 
  Camera, 
  Mail, 
  MessageSquare,
  Download,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Forward slash
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const navigate = (path: string) => {
    setLocation(path);
    setOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const downloadCV = () => {
    // TODO: Update with actual CV URL
    const cvUrl = "/cv/dhanush-ranga-gopisetty-cv.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "dhanush-ranga-gopisetty-cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        className="font-mono"
      />
      <CommandList>
        <CommandEmpty className="font-mono text-sm py-6 text-muted-foreground">
          No results found.
        </CommandEmpty>
        
        <CommandGroup heading="Navigation" className="font-mono">
          <CommandItem onSelect={() => navigate("/")} className="font-mono">
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
            <span className="ml-auto text-xs text-muted-foreground">/</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/projects")} className="font-mono">
            <FolderKanban className="mr-2 h-4 w-4" />
            <span>Projects</span>
            <span className="ml-auto text-xs text-muted-foreground">/projects</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/blog")} className="font-mono">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Blog</span>
            <span className="ml-auto text-xs text-muted-foreground">/blog</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/photos")} className="font-mono">
            <Camera className="mr-2 h-4 w-4" />
            <span>Photos</span>
            <span className="ml-auto text-xs text-muted-foreground">/photos</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/contact")} className="font-mono">
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
            <span className="ml-auto text-xs text-muted-foreground">/contact</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/messages")} className="font-mono">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
            <span className="ml-auto text-xs text-muted-foreground">/messages</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions" className="font-mono">
          <CommandItem onSelect={downloadCV} className="font-mono">
            <Download className="mr-2 h-4 w-4" />
            <span>Download CV</span>
          </CommandItem>
          <CommandItem onSelect={handleThemeToggle} className="font-mono">
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark Mode</span>
              </>
            )}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="External Links" className="font-mono">
          <CommandItem 
            onSelect={() => openExternal("https://github.com/dhanushranga1")} 
            className="font-mono"
          >
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
            <span className="ml-auto text-xs text-muted-foreground">↗</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => openExternal("https://linkedin.com/in/dhanush-ranga")} 
            className="font-mono"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
            <span className="ml-auto text-xs text-muted-foreground">↗</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
