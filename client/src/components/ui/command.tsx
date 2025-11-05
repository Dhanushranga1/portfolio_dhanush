import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-lg bg-transparent text-[#d1e8e5]",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent 
        hideClose
        className="overflow-hidden p-0 rounded-xl max-w-2xl w-[min(800px,92vw)]"
        style={{
          // Enhanced glassmorphism following NN/g best practices
          // Higher opacity for better text contrast (80% vs 90%)
          background: 'linear-gradient(135deg, rgba(15, 17, 18, 0.85) 0%, rgba(15, 17, 18, 0.75) 100%)',
          // Increased blur for better background distortion (40px)
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          // Gradient border for depth and light reflection
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
          // Multi-layer shadow system for depth
          boxShadow: 
            // Inner glow (top light reflection)
            'inset 0 1px 1px 0 rgba(127, 208, 189, 0.15), ' +
            // Inner shadow (depth)
            'inset 0 -1px 2px 0 rgba(0, 0, 0, 0.2), ' +
            // Outer border highlight
            '0 0 0 1px rgba(127, 208, 189, 0.1), ' +
            // Main shadow (elevation)
            '0 20px 60px -10px rgba(0, 0, 0, 0.6), ' +
            // Ambient glow
            '0 0 100px rgba(127, 208, 189, 0.1)',
        }}
      >
        {/* Gradient border overlay for frosted glass edge */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(127, 208, 189, 0.2) 0%, rgba(127, 208, 189, 0.05) 50%, rgba(127, 208, 189, 0.1) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          aria-hidden="true"
        />
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#6b6f70] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-input-wrapper]_svg]:text-[#7fd0bd] [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div 
    className="flex items-center border-b px-3" 
    cmdk-input-wrapper=""
    style={{
      // Subtle gradient for depth
      background: 'linear-gradient(180deg, rgba(15, 17, 18, 0.6) 0%, rgba(15, 17, 18, 0.4) 100%)',
      // Improved border with gradient for glass edge
      borderImage: 'linear-gradient(90deg, rgba(127, 208, 189, 0.2), rgba(127, 208, 189, 0.05), rgba(127, 208, 189, 0.2)) 1',
      borderBottom: '1px solid rgba(127, 208, 189, 0.15)',
    }}
  >
    <span className="mr-2 text-[#7fd0bd] font-mono text-sm shrink-0" aria-hidden="true">$</span>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-12 w-full bg-transparent py-3 text-sm font-mono text-[#d1e8e5] outline-none placeholder:text-[#6b6f70] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm font-mono text-[#6b6f70]"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-[#202425]", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-md px-3 py-2.5 text-sm font-mono text-[#9ca3af] outline-none transition-colors duration-150 data-[disabled=true]:pointer-events-none data-[selected='true']:bg-[#7fd0bd]/10 data-[selected='true']:text-[#7fd0bd] data-[disabled=true]:opacity-50 hover:bg-[#202425]/40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
