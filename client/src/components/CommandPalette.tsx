import { useMemo } from "react";
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
  User,
  FolderKanban, 
  BookOpen, 
  Heart,
  Camera, 
  GitBranch,
  Mail, 
  MessageSquare,
  Download,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCommandPalette } from "@/hooks/useCommandPalette";

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  keywords: string[];
  action: () => void;
  category: "navigation" | "action" | "external";
}

export default function CommandPalette() {
  const { open, setOpen, searchQuery, setSearchQuery, parsedCommand, closeDialog } = useCommandPalette();
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  // Navigation handler
  const navigate = (path: string) => {
    setLocation(path);
    closeDialog();
  };

  // Define all commands
  const commands: Command[] = useMemo(() => [
    // Navigation
    {
      id: "nav-home",
      label: "Home",
      icon: <Home className="mr-2 h-4 w-4" />,
      shortcut: "/",
      keywords: ["home", "index", "root"],
      action: () => navigate("/"),
      category: "navigation",
    },
    {
      id: "nav-about",
      label: "About",
      icon: <User className="mr-2 h-4 w-4" />,
      shortcut: "/about",
      keywords: ["about", "bio", "profile"],
      action: () => navigate("/about"),
      category: "navigation",
    },
    {
      id: "nav-projects",
      label: "Projects",
      icon: <FolderKanban className="mr-2 h-4 w-4" />,
      shortcut: "/projects",
      keywords: ["projects", "work", "portfolio", "code"],
      action: () => navigate("/projects"),
      category: "navigation",
    },
    {
      id: "nav-blog",
      label: "Blog",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      shortcut: "/blog",
      keywords: ["blog", "posts", "articles", "writing"],
      action: () => navigate("/blog"),
      category: "navigation",
    },
    {
      id: "nav-favorites",
      label: "Favorites",
      icon: <Heart className="mr-2 h-4 w-4" />,
      shortcut: "/favorites",
      keywords: ["favorites", "movies", "likes"],
      action: () => navigate("/favorites"),
      category: "navigation",
    },
    {
      id: "nav-photos",
      label: "Photos",
      icon: <Camera className="mr-2 h-4 w-4" />,
      shortcut: "/photos",
      keywords: ["photos", "gallery", "images", "pictures"],
      action: () => navigate("/photos"),
      category: "navigation",
    },
    {
      id: "nav-git",
      label: "Git Timeline",
      icon: <GitBranch className="mr-2 h-4 w-4" />,
      shortcut: "/git-timeline",
      keywords: ["git", "timeline", "commits", "history"],
      action: () => navigate("/git-timeline"),
      category: "navigation",
    },
    {
      id: "nav-contact",
      label: "Contact",
      icon: <Mail className="mr-2 h-4 w-4" />,
      shortcut: "/contact",
      keywords: ["contact", "email", "reach"],
      action: () => navigate("/contact"),
      category: "navigation",
    },
    {
      id: "nav-messages",
      label: "Messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
      shortcut: "/messages",
      keywords: ["messages", "inbox", "chat"],
      action: () => navigate("/messages"),
      category: "navigation",
    },
    // Actions
    {
      id: "action-download-cv",
      label: "Download CV",
      icon: <Download className="mr-2 h-4 w-4" />,
      keywords: ["download", "cv", "resume", "pdf"],
      action: () => {
        const cvUrl = "/cv/dhanush-ranga-gopisetty-cv.pdf";
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = "dhanush-ranga-gopisetty-cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeDialog();
      },
      category: "action",
    },
    {
      id: "action-toggle-theme",
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon: theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />,
      keywords: ["theme", "dark", "light", "mode", "appearance"],
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        closeDialog();
      },
      category: "action",
    },
    // External Links
    {
      id: "external-github",
      label: "GitHub",
      icon: <Github className="mr-2 h-4 w-4" />,
      keywords: ["github", "code", "repository"],
      action: () => {
        window.open("https://github.com/dhanushranga1", "_blank", "noopener,noreferrer");
        closeDialog();
      },
      category: "external",
    },
    {
      id: "external-linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="mr-2 h-4 w-4" />,
      keywords: ["linkedin", "professional", "network"],
      action: () => {
        window.open("https://linkedin.com/in/dhanush-ranga", "_blank", "noopener,noreferrer");
        closeDialog();
      },
      category: "external",
    },
  ], [theme, navigate, setTheme, closeDialog]);

  // Filter commands based on search query and parsed command
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return commands;

    const query = searchQuery.toLowerCase();
    
    return commands.filter(cmd => {
      // Check if label or keywords match
      const matchesLabel = cmd.label.toLowerCase().includes(query);
      const matchesKeywords = cmd.keywords.some(kw => kw.toLowerCase().includes(query));
      
      // Check if parsed command flags match (e.g., "ls --category navigation")
      const matchesFlags = parsedCommand.flags.category 
        ? cmd.category === parsedCommand.flags.category 
        : true;
      
      return (matchesLabel || matchesKeywords) && matchesFlags;
    });
  }, [searchQuery, commands, parsedCommand]);

  // Group filtered commands by category
  const navigationCommands = filteredCommands.filter(cmd => cmd.category === "navigation");
  const actionCommands = filteredCommands.filter(cmd => cmd.category === "action");
  const externalCommands = filteredCommands.filter(cmd => cmd.category === "external");

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Command Palette</DialogTitle>
        <DialogDescription>
          Quick navigation and actions. Use arrow keys to navigate, enter to select, ESC to close.
        </DialogDescription>
      </VisuallyHidden>
      
      <CommandInput 
        placeholder="Type a command or search... (try 'ls --category navigation')" 
        className="font-mono text-sm"
        aria-label="Search for commands or pages"
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      
      <CommandList>
        <CommandEmpty className="font-mono text-sm py-6 text-muted-foreground">
          <span className="text-accent-info">$</span> no results found
          {parsedCommand.command && (
            <div className="mt-2 text-xs text-muted">
              Command: {parsedCommand.command} {JSON.stringify(parsedCommand.flags)}
            </div>
          )}
        </CommandEmpty>
        
        {navigationCommands.length > 0 && (
          <>
            <CommandGroup heading="Navigation" className="font-mono">
              {navigationCommands.map(cmd => (
                <CommandItem 
                  key={cmd.id}
                  onSelect={cmd.action} 
                  className="font-mono"
                >
                  {cmd.icon}
                  <span>{cmd.label}</span>
                  {cmd.shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground">{cmd.shortcut}</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {actionCommands.length > 0 && (
          <>
            <CommandGroup heading="Actions" className="font-mono">
              {actionCommands.map(cmd => (
                <CommandItem 
                  key={cmd.id}
                  onSelect={cmd.action} 
                  className="font-mono"
                >
                  {cmd.icon}
                  <span>{cmd.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {externalCommands.length > 0 && (
          <CommandGroup heading="External Links" className="font-mono">
            {externalCommands.map(cmd => (
              <CommandItem 
                key={cmd.id}
                onSelect={cmd.action} 
                className="font-mono"
              >
                {cmd.icon}
                <span>{cmd.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">↗</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
