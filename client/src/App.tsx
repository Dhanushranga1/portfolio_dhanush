import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TerminalNavbar from "@/components/TerminalNavbar";
import CommandHints from "@/components/CommandHints";
import CommandPalette from "@/components/CommandPalette";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Favorites from "@/pages/Favorites";
import Photos from "@/pages/Photos";
import GitTimeline from "@/pages/GitTimeline";
import Messages from "@/pages/Messages";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/photos" component={Photos} />
      <Route path="/git-timeline" component={GitTimeline} />
      <Route path="/messages" component={Messages} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
            <TerminalNavbar />
            <CommandHints />
            <main id="main-content" className="flex-1 overflow-auto" tabIndex={-1}>
              <PageTransition distance={10} mainId="main-content">
                <Router />
              </PageTransition>
            </main>
            <CommandPalette />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
