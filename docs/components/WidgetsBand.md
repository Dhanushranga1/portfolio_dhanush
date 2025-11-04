# WidgetsBand Component Specification

**Version**: 1.0.0  
**Status**: Implemented  
**File**: `client/src/components/WidgetsBand.tsx`

---

## Overview

Mid-band container with glassmorphism aesthetic and scroll-triggered animation. Integrates AsciiSkillBar, ActivityFeed, and QuickMetrics into cohesive widget section.

---

## Component API

### Props

```typescript
interface WidgetsBandProps {
  className?: string;  // Additional Tailwind classes
}
```

### Internal State

```typescript
interface Skill {
  label: string;
  percentage: number;
  category: string;
}

const [skills, setSkills] = useState<Skill[]>([]);
const [loading, setLoading] = useState(true);
```

---

## Visual Structure

```
┌──────────────────────────────────────────┐
│        Currently Working On              │
│   > building TicketPilot v2.1...█        │
├──────────────────────────────────────────┤
│               Skills                     │
│   React         [██████████] 90%         │
│   TypeScript    [█████████░] 85%         │
│   (2-column grid, 6 skills total)        │
├──────────────────────────────────────────┤
│            Quick Metrics                 │
│   [12 projects] [8 tech stacks] ...      │
└──────────────────────────────────────────┘
```

---

## Glassmorphism Styling

### CSS Implementation

```tsx
<motion.div
  ref={ref}
  className="
    relative max-w-2xl mx-auto p-6 rounded-lg
    bg-white/[0.02]           /* 2% white lift */
    backdrop-blur-sm          /* Blur background */
    border border-white/5     /* Subtle border */
    shadow-lg
  "
  style={{
    background: `
      radial-gradient(circle at 50% 50%, rgba(127, 208, 189, 0.05), transparent 60%),
      rgba(255, 255, 255, 0.02)
    `
  }}
>
```

### Visual Properties

- **Background**: 2% white opacity (`bg-white/[0.02]`)
- **Blur**: `backdrop-blur-sm` (4px Gaussian blur)
- **Border**: `border-white/5` (5% white)
- **Glow**: Radial gradient (5% mint at center, fades to transparent)
- **Shadow**: `shadow-lg` (depth illusion)

---

## Scroll-Triggered Animation

### Implementation

```tsx
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{
    duration: 0.15,
    ease: [0.2, 0.9, 0.25, 1]  // Custom cubic-bezier
  }}
>
```

### Animation Properties

- **Initial state**: `opacity: 0`, `y: 20px` (below viewport)
- **Final state**: `opacity: 1`, `y: 0` (visible, in place)
- **Duration**: 150ms (fast, subtle)
- **Easing**: `cubic-bezier(0.2, 0.9, 0.25, 1)` (snappy start, smooth end)
- **Trigger margin**: `-100px` (starts animation 100px before entering viewport)
- **Once**: `true` (animation plays only once, not on scroll up)

### useInView Hook

Framer Motion wrapper around Intersection Observer API:

```typescript
import { useInView } from 'framer-motion';

const isInView = useInView(ref, {
  once: true,       // Animate once, don't replay
  margin: "-100px"  // Trigger 100px before entering viewport
});
```

**Performance**: Uses native Intersection Observer (no scroll event listeners).

---

## Layout Structure

### Three Sections with Dividers

```tsx
<div>
  {/* Section 1: Activity Feed */}
  <div className="text-center border-b border-white/5 pb-6">
    <h3>Currently Working On</h3>
    <ActivityFeed />
  </div>

  {/* Section 2: Skills Grid */}
  <div className="py-6 border-b border-white/5">
    <h3>Skills</h3>
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.slice(0, 6).map(...)}
    </div>
  </div>

  {/* Section 3: Quick Metrics */}
  <div className="pt-6">
    <h3>Quick Metrics</h3>
    <QuickMetrics />
  </div>
</div>
```

### Grid Behavior

- **Mobile**: Single column (stacked)
- **Tablet+**: 2 columns (`sm:grid-cols-2`)
- **Gap**: `gap-3` (12px between items)
- **Limit**: First 6 skills only (`skills.slice(0, 6)`)

---

## Data Fetching

### Fetch Strategy

```typescript
useEffect(() => {
  fetch('/data/stats.json')
    .then(res => res.json())
    .then(data => {
      setSkills(data.skills || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
```

**Note**: ActivityFeed and QuickMetrics fetch independently (no prop drilling).

---

## Loading State

### Skeleton Bars

```tsx
{loading ? (
  <div className="grid gap-3 sm:grid-cols-2">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-6 bg-surface-2 rounded animate-pulse" />
    ))}
  </div>
) : (
  // Render skill bars
)}
```

**Visual**: 4 gray bars with pulse animation while fetching data.

---

## Accessibility

### ARIA Attributes

```tsx
<motion.div
  role="complementary"
  aria-label="Developer metrics and activity"
>
```

### Semantic HTML

- **Section headings**: `<h3>` for each widget group
- **Complementary role**: Indicates supplementary content
- **Descriptive labels**: Screen readers announce "Developer metrics and activity"

---

## Performance

### Optimizations

1. **Single fetch**: Fetches skills once on mount (no polling)
2. **Intersection Observer**: Native API (no scroll listener overhead)
3. **Opacity-only animation**: No layout thrashing
4. **Lazy data**: ActivityFeed/QuickMetrics load independently
5. **Slice limit**: Renders only 6 skills (reduces DOM nodes)

### Bundle Impact

- **File size**: ~2.5KB (119 lines)
- **Dependencies**: Framer Motion (useInView, motion.div)
- **Runtime**: Minimal (single fetch, single observer)

---

## Responsive Behavior

### Breakpoints

```css
/* Mobile (default) */
.container { padding: 1.5rem; }
.grid { grid-template-columns: 1fr; }

/* Tablet+ (sm: 640px) */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
```

### Width Constraints

- **Max width**: `max-w-2xl` (672px)
- **Centering**: `mx-auto` (horizontal center)
- **Padding**: `p-6` (24px all sides)

---

## Design Decisions

### Why Glassmorphism?

1. **Depth**: Creates visual hierarchy (floats above page)
2. **Subtlety**: 2% opacity keeps it understated
3. **Consistency**: Matches CommandPalette overlay aesthetic

### Why 3 Sections?

- **Activity**: Time-based (what's happening now)
- **Skills**: Competency-based (long-term capabilities)
- **Metrics**: Achievement-based (quantified accomplishments)

**Rationale**: Different data types deserve visual separation.

### Why Scroll Trigger?

- **Progressive disclosure**: Reveals content as user scrolls
- **Performance**: Doesn't render offscreen animations
- **Delight**: Subtle motion enhances perceived quality

---

## Integration with Home Page

### Usage in Home.tsx

```tsx
import { WidgetsBand } from '@/components/WidgetsBand';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <WidgetsBand />
      </div>
    </>
  );
}
```

**Note**: Full-height container ensures scroll trigger activates properly.

---

## Testing

### Accessibility Checklist

- [x] ARIA role and label present
- [x] Semantic headings (h3) for each section
- [x] Keyboard navigation (all widgets accessible)
- [x] Reduced motion support (animation respects prefers-reduced-motion)

### Visual Testing

- [x] Glassmorphism renders correctly
- [x] Radial gradient glow visible
- [x] Scroll trigger activates 100px before viewport
- [x] Grid layout responsive (1 col → 2 col)

---

## Future Enhancements

- [ ] Add collapsible sections (click heading to toggle)
- [ ] Add "View All Skills" link (navigates to /about)
- [ ] Add real-time activity updates (WebSocket)
- [ ] Add drag-to-reorder widgets (localStorage persistence)
- [ ] Add theme variants (glass/solid/glow)

---

**Spec Compliance**: 
- Hybrid Terminal v2.0 Section II.D (Implementation Matrix)
- Section IV.B (Scroll-Triggered Fade-In)
- Section VI.C (Glassmorphism Container)
