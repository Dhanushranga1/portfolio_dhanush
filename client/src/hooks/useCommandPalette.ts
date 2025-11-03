import { useState, useEffect, useCallback } from "react";

interface CommandParseResult {
  command: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

/**
 * Parse terminal-style commands like "ls --tech react" or "search posts --tag ai"
 */
export function parseCommand(input: string): CommandParseResult {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] || "";
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    if (part.startsWith("--")) {
      // Long flag: --tech=react or --tech react
      const flagName = part.slice(2);
      if (flagName.includes("=")) {
        const [key, value] = flagName.split("=");
        flags[key] = value;
      } else if (i + 1 < parts.length && !parts[i + 1].startsWith("-")) {
        // Next part is the value
        flags[flagName] = parts[i + 1];
        i++; // Skip next part
      } else {
        // Boolean flag
        flags[flagName] = true;
      }
    } else if (part.startsWith("-")) {
      // Short flag: -a or -abc (multiple flags)
      const shortFlags = part.slice(1).split("");
      shortFlags.forEach(flag => {
        flags[flag] = true;
      });
    } else {
      // Regular argument
      args.push(part);
    }
  }

  return { command, args, flags };
}

/**
 * Custom hook for command palette state management
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [parsedCommand, setParsedCommand] = useState<CommandParseResult>({
    command: "",
    args: [],
    flags: {},
  });

  // Parse command when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setParsedCommand(parseCommand(searchQuery));
    } else {
      setParsedCommand({ command: "", args: [], flags: {} });
    }
  }, [searchQuery]);

  // Keyboard shortcuts: Cmd/Ctrl+K and /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      
      // Forward slash (only if not in input field)
      if (
        e.key === "/" &&
        !open &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen(true);
      }

      // Escape to close
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setSearchQuery("");
  }, []);

  return {
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    parsedCommand,
    closeDialog,
  };
}
