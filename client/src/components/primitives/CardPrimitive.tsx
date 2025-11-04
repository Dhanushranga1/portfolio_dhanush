import { forwardRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "font-mono transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "border-b border-border last:border-0",
          "hover:bg-surface-2",
        ],
        bordered: [
          "border border-border rounded-md",
          "hover:border-accent-info hover:bg-surface-2",
        ],
        glass: [
          "backdrop-blur-sm bg-surface-2/50 border border-border/50 rounded-md",
          "hover:bg-surface-2 hover:border-accent-info/50",
        ],
        accent: [
          "border-l-4 border-transparent rounded-r-md",
          "hover:border-accent-info hover:bg-surface-2",
        ],
        focused: [
          "border-l-4 border-accent-action bg-accent-action/5 rounded-r-md shadow-lg",
        ],
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4 md:p-6",
        lg: "p-6 md:p-8",
      },
      spacing: {
        none: "",
        sm: "space-y-2",
        md: "space-y-3",
        lg: "space-y-4",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      spacing: "md",
    },
  }
);

export interface CardPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  asChild?: boolean;
  testId?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | "true" | "false";
}

const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(
  (
    {
      className,
      variant,
      padding,
      spacing,
      children,
      testId,
      ariaLabel,
      ariaCurrent,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, spacing }), className)}
        data-testid={testId}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardPrimitive.displayName = "CardPrimitive";

// Utility component for card content wrapper
export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { spacing?: "sm" | "md" | "lg" }
>(({ className, spacing = "md", children, ...props }, ref) => {
  const spacingClasses = {
    sm: "space-y-2",
    md: "space-y-3",
    lg: "space-y-4",
  };

  return (
    <div
      ref={ref}
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

// Utility component for card header
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-start gap-3 flex-wrap", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

// Utility component for card title
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { level?: 2 | 3 | 4 }
>(({ className, level = 3, children, ...props }, ref) => {
  const titleClasses = cn(
    "font-bold text-foreground transition-colors",
    level === 2 && "text-xl",
    level === 3 && "text-lg",
    level === 4 && "text-base",
    className
  );

  if (level === 2) {
    return (
      <h2 ref={ref} className={titleClasses} {...props}>
        {children}
      </h2>
    );
  }

  if (level === 4) {
    return (
      <h4 ref={ref} className={titleClasses} {...props}>
        {children}
      </h4>
    );
  }

  return (
    <h3 ref={ref} className={titleClasses} {...props}>
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

// Utility component for card description
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

// Utility component for card footer
export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-4 pt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

export default CardPrimitive;
