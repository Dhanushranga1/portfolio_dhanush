import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Camera, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FavoritesWidget() {
  return (
    <Card className="border-terminal-muted bg-terminal-bg/50 hover:border-terminal-accent-info transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-terminal-accent-info" />
          <CardTitle className="font-mono text-terminal-accent-info">favorites</CardTitle>
        </div>
        <CardDescription className="font-mono text-terminal-muted">
          # movies & photos i love
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 font-mono text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-terminal-accent-action" />
              <span className="text-terminal-text">8 movies</span>
            </div>
            <span className="text-xs text-terminal-muted">curated collection</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-terminal-accent-action" />
              <span className="text-terminal-text">6 photos</span>
            </div>
            <span className="text-xs text-terminal-muted">shot on pixel 8</span>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/favorites">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full font-mono border-terminal-muted hover:border-terminal-accent-action hover:text-terminal-accent-action"
            >
              view collection
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Preview thumbnails */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="aspect-square bg-terminal-muted/20 rounded border border-terminal-muted overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=100&fit=crop" 
              alt="Movie preview"
              loading="lazy"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="aspect-square bg-terminal-muted/20 rounded border border-terminal-muted overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=100&h=100&fit=crop" 
              alt="Movie preview"
              loading="lazy"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="aspect-square bg-terminal-muted/20 rounded border border-terminal-muted overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=100&h=100&fit=crop" 
              alt="Movie preview"
              loading="lazy"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
