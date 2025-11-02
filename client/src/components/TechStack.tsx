export default function TechStack() {
  return (
    <div className="space-y-8 font-mono text-sm">
      <div className="space-y-2">
        <h3 className="text-muted-foreground">languages</h3>
        <p className="text-foreground leading-relaxed">
          js / ts / html / css / python / go
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground">frameworks</h3>
        <p className="text-foreground leading-relaxed">
          react / next.js / node.js / express / tailwind
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground">tools</h3>
        <p className="text-foreground leading-relaxed">
          git / docker / vscode / figma / postgres
        </p>
      </div>
    </div>
  );
}
