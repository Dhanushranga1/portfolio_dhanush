import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, onKeyDown, ...props }, ref) => {
  // Handle Cmd/Ctrl+Enter to submit form (parent form submission)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      // Find parent form and trigger submit
      const form = e.currentTarget.form;
      if (form) {
        // Trigger form submission
        form.requestSubmit();
      }
    }
    // Call parent onKeyDown if provided
    onKeyDown?.(e);
  };

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
