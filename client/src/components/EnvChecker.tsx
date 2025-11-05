/**
 * Environment Variable Checker
 * Drop this in your Contact page temporarily to verify the env var is loaded
 */

export default function EnvChecker() {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  
  return (
    <div className="fixed top-4 right-4 bg-card border border-border rounded-lg p-4 font-mono text-xs max-w-sm shadow-lg z-50">
      <div className="font-semibold text-accent-info mb-2">🔧 Environment Check</div>
      <div className="space-y-1 text-muted-foreground">
        <div>
          <span className="text-foreground">VITE_FORMSPREE_ENDPOINT:</span>
        </div>
        <div className="pl-4">
          {endpoint ? (
            <span className="text-green-500">✅ {endpoint}</span>
          ) : (
            <span className="text-red-500">❌ undefined</span>
          )}
        </div>
        <div className="pt-2 text-xs border-t border-border mt-2">
          {endpoint ? (
            <span className="text-green-500">✅ Ready to submit</span>
          ) : (
            <span className="text-red-500">❌ Restart dev server</span>
          )}
        </div>
      </div>
    </div>
  );
}
