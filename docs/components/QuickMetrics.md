# QuickMetrics Component Specification

**Version**: 1.0.0  
**Status**: Implemented  
**File**: `client/src/components/QuickMetrics.tsx`

---

## Overview

Monospace metric badges displaying high-density developer stats in terminal-inspired format. Part of the Widgets Band (M9 implementation).

---

## Component API

### Props

```typescript
interface QuickMetricsProps {
  className?: string;  // Additional Tailwind classes
}
```

### Internal Types

```typescript
interface Metric {
  label: string;    // Metric description
  value: string;    // Formatted value
}
```

---

## Visual Format

```
[12 projects] [8 tech stacks] [3 years exp] [2.4k commits]
```

### Badge Anatomy

Each metric badge consists of:
- **Brackets**: `[` `]` (terminal-style container)
- **Value**: Numeric/alphanumeric (bold, accent color)
- **Label**: Descriptive text (muted color, lowercase)

---

## Data Source

Fetches from `/data/stats.json`:

```json
{
  "metrics": [
    { "label": "projects", "value": "12" },
    { "label": "tech stacks", "value": "8" },
    { "label": "years exp", "value": "3" },
    { "label": "commits", "value": "2.4k" }
  ]
}
```

---

## MetricBadge Component

### Implementation

```tsx
const MetricBadge = ({ value, label }: Metric) => (
  <code
    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 border border-surface-contrast rounded text-xs font-mono transition-colors duration-150 hover:text-text-primary hover:border-accent-info/30"
    aria-label={`${value} ${label}`}
  >
    <span className="tabular-nums font-semibold text-accent-info">{value}</span>
    <span className="text-terminal-muted">{label}</span>
  </code>
);
```

### Styling Breakdown

- **Container**: `bg-surface-2` (dark background), `border-surface-contrast`, `rounded`
- **Value**: `text-accent-info` (mint), `font-semibold`, `tabular-nums`
- **Label**: `text-terminal-muted` (gray)
- **Hover**: `hover:text-text-primary`, `hover:border-accent-info/30`, `transition-colors duration-150`

---

## Accessibility

### ARIA Attributes

- Container: `aria-label="Quick metrics"` on parent `<div>`
- Each badge: `aria-label="{value} {label}"` on `<code>` element

### Screen Reader Behavior

Example: "12 projects, 8 tech stacks, 3 years experience, 2.4k commits"

**Note**: Badges are not focusable (display-only, no interaction).

---

## Typography

### Font Properties

- **Font**: JetBrains Mono (monospace)
- **Size**: `text-xs` (12px)
- **Weight**: Value: 600 (semibold), Label: 400 (normal)
- **Letter spacing**: `tracking-wide` (0.02em) on labels
- **Numbers**: `tabular-nums` for consistent digit width

### Why Tabular Nums?

Ensures all numeric values align vertically in grid layouts:

```
12  projects
8   tech stacks
3   years exp
```

---

## Loading State

Displays placeholder badges during fetch:

```tsx
<div className="flex flex-wrap items-center justify-center gap-2">
  {[1, 2, 3, 4].map((i) => (
    <code key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 border border-surface-contrast rounded text-xs">
      <span className="text-terminal-muted">...</span>
    </code>
  ))}
</div>
```

---

## Responsive Behavior

### Layout Wrapping

```tsx
<div className="flex flex-wrap items-center justify-center gap-2">
  {metrics.map((metric) => (
    <MetricBadge key={metric.label} {...metric} />
  ))}
</div>
```

- **Mobile**: Wraps to multiple rows, centered
- **Tablet+**: Single row if space permits, wraps gracefully

### Spacing

- **Gap**: `gap-2` (8px) between badges
- **Internal padding**: `px-3 py-1.5` (12px horizontal, 6px vertical)

---

## Performance

- **Fetch strategy**: Single fetch on mount (no polling)
- **No animation**: Static badges (hover transition only)
- **Bundle impact**: ~2KB (101 lines)
- **DOM nodes**: 1 container + 4 badges = 5 elements

---

## Usage Example

```tsx
import { QuickMetrics } from '@/components/QuickMetrics';

<aside aria-label="Developer statistics">
  <h3 className="text-sm font-semibold mb-2">Quick Stats</h3>
  <QuickMetrics />
</aside>
```

### In WidgetsBand Context

```tsx
<div className="pt-6">
  <h3 className="text-sm font-semibold text-text-primary mb-3 text-center">
    Quick Metrics
  </h3>
  <QuickMetrics />
</div>
```

---

## Design Decisions

### Why Brackets Over Chips?

1. **Terminal aesthetic**: `[text]` matches command syntax
2. **Density**: More compact than rounded pills
3. **Scanability**: Brackets create visual rhythm

### Why Separate Value + Label?

- **Hierarchy**: Emphasizes numeric data (bold + color)
- **Accessibility**: Screen readers announce "12 projects" naturally
- **Flexibility**: Values can be strings ("2.4k") or numbers

---

## Hover Behavior

### Visual Feedback

```css
.badge:hover {
  color: var(--text-primary);         /* Light cyan */
  border-color: rgba(127, 208, 189, 0.3); /* Mint glow */
  transition: color 150ms, border-color 150ms;
}
```

**Purpose**: Indicates interactivity (future: click to filter/expand).

---

## Error Handling

### Fetch Failure

Falls back to empty array, no badges rendered:

```typescript
if (!metrics || metrics.length === 0) {
  return null;
}
```

**Rationale**: Metrics are non-critical; graceful degradation preferred.

---

## Testing

### Accessibility Checklist

- [x] ARIA labels on container and badges
- [x] Semantic HTML (`<code>` for monospace text)
- [x] High contrast mode compatible (border + text)
- [x] Keyboard navigation (not focusable - display only)

### Edge Cases

- **0 metrics**: Component returns `null`
- **Long labels**: Text wraps within badge, may break layout (need `max-w`?)
- **Large values**: Tabular nums prevent overflow

---

## Future Enhancements

- [ ] Add click handler to filter/drill down
- [ ] Add tooltip with extended description
- [ ] Add animated counter on scroll into view
- [ ] Add icons for each metric type (📁 projects, 🛠️ tech, etc.)
- [ ] Add sparkline charts for trends

---

**Spec Compliance**: Hybrid Terminal v2.0 Section II.C (Quick Metrics)
