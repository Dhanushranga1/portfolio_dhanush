# AsciiSkillBar Component Specification

**Version**: 1.0.0  
**Status**: Implemented  
**File**: `client/src/components/AsciiSkillBar.tsx`

---

## Overview

Terminal-style skill indicator using ASCII block characters to create visual progress bars. Part of the Widgets Band (M9 implementation).

---

## Component API

### Props

```typescript
interface AsciiSkillBarProps {
  label: string;           // Skill name (e.g., "React", "TypeScript")
  percentage: number;      // Skill level 0-100
  barLength?: number;      // Number of character segments (default: 10)
  className?: string;      // Additional Tailwind classes
}
```

### Default Values

- `barLength`: 10 segments
- Bar characters:
  - Filled: `█` (U+2588 FULL BLOCK)
  - Empty: `░` (U+2591 LIGHT SHADE)

---

## Visual Format

```
React          [██████████] 90%
TypeScript     [█████████░] 85%
Python         [██████████] 95%
PostgreSQL     [███████░░░] 70%
```

### Character Calculation

```typescript
const filledSegments = Math.round((percentage / 100) * barLength);
const emptySegments = barLength - filledSegments;
const barString = `[${filled}${empty}]`;
```

---

## Accessibility

### ARIA Attributes

- `role="progressbar"`: Identifies as progress indicator
- `aria-valuetext="{percentage}%"`: Announces numeric value
- `aria-label="{label} skill level: {percentage} percent"`: Full descriptive label

### Screen Reader Announcement

Example: "React skill level: 90 percent"

---

## Data Source

Fetches from `/data/stats.json`:

```json
{
  "skills": [
    {
      "label": "React",
      "percentage": 90,
      "category": "frontend"
    }
  ]
}
```

---

## Styling

### Base Styles

```tsx
<div className="flex items-center gap-3 font-mono text-sm">
  <span className="text-text-primary min-w-[100px]">{label}</span>
  <code className="text-accent-info tabular-nums">{barString}</code>
  <span className="text-terminal-muted text-xs tabular-nums">{percentage}%</span>
</div>
```

### Typography

- Font: JetBrains Mono (monospace ensures perfect alignment)
- Size: `text-sm` (14px)
- Color: `text-accent-info` (mint green #7fd0bd)
- Numbers: `tabular-nums` for consistent width

---

## Hydration Safety

Uses `mounted` state to prevent SSR mismatch:

```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div className="...">Loading...</div>;
}
```

**Rationale**: Programmatic bar generation could differ between server/client rendering.

---

## Performance

- **No animation**: Static render (no transition overhead)
- **Minimal DOM**: Single flex container with 3 text elements
- **Bundle impact**: ~1.5KB (77 lines, no dependencies beyond React)

---

## Usage Example

```tsx
import { AsciiSkillBar } from '@/components/AsciiSkillBar';

<AsciiSkillBar
  label="React"
  percentage={90}
  barLength={10}
  className="mb-2"
/>
```

### In WidgetsBand Context

```tsx
<div className="grid gap-3 sm:grid-cols-2">
  {skills.slice(0, 6).map((skill) => (
    <AsciiSkillBar
      key={skill.label}
      label={skill.label}
      percentage={skill.percentage}
    />
  ))}
</div>
```

---

## Design Decisions

### Why ASCII Characters?

1. **Terminal aesthetic**: Aligns with Hybrid Terminal design language
2. **Accessibility**: Doesn't rely on color alone (shape + text)
3. **Performance**: Text-based (no canvas/SVG overhead)
4. **Simplicity**: No animation complexity

### Why 10 Segments Default?

- Fits `max-w-content` (1100px) without overflow
- Each segment = 10% (intuitive mental model)
- Balances granularity vs. visual clarity

---

## Testing

### Accessibility Checklist

- [x] Role and ARIA attributes present
- [x] Screen reader announces skill + percentage
- [x] Keyboard navigation (focusable parent container)
- [x] High contrast mode compatible (uses text, not borders)

### Edge Cases

- **0% skill**: Shows `[░░░░░░░░░░]` (empty bar)
- **100% skill**: Shows `[██████████]` (full bar)
- **Invalid percentage**: Clamped to 0-100 range

---

## Future Enhancements

- [ ] Add `category` filter (frontend/backend/devops)
- [ ] Add hover tooltip with detailed skill description
- [ ] Add animation on scroll into view (subtle fade-in)
- [ ] Support custom bar characters (e.g., `=` for retro look)

---

**Spec Compliance**: Hybrid Terminal v2.0 Section II.A (ASCII Skill Bars)
