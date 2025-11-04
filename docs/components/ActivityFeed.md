# ActivityFeed Component Specification

**Version**: 1.0.0  
**Status**: Implemented  
**File**: `client/src/components/ActivityFeed.tsx`

---

## Overview

Live "Currently Working On" indicator with terminal-style blinking caret. Displays real-time project activity in command-line format.

---

## Component API

### Props

```typescript
interface ActivityFeedProps {
  className?: string;  // Additional Tailwind classes
}
```

### Internal State

```typescript
interface Activity {
  project: string;      // Project name
  status: string;       // Action verb (e.g., "building", "deploying")
  lastUpdated: string;  // ISO 8601 timestamp
}
```

---

## Visual Format

```
> building TicketPilot v2.1...█
```

### Format Breakdown

- Prefix: `> ` (command prompt indicator)
- Status: `building` (action verb, color: `text-accent-info`)
- Project: `TicketPilot v2.1` (name + version)
- Suffix: `...` (ellipsis for ongoing work)
- Caret: `█` (blinking block, reused from Hero)

---

## Accessibility

### ARIA Attributes

- `role="status"`: Identifies as live region
- `aria-live="polite"`: Screen reader announces updates (non-interruptive)
- `aria-busy="true"`: Set during loading state
- `aria-label="Current activity: {status} {project}"`: Descriptive label

### Screen Reader Behavior

- **On mount**: Announces "Current activity: building TicketPilot v2.1"
- **On update**: Announces new activity (polite mode, waits for pause)
- **Loading**: "Loading activity..."

---

## Data Source

Fetches from `/data/stats.json`:

```json
{
  "activity": {
    "project": "TicketPilot v2.1",
    "status": "building",
    "lastUpdated": "2025-11-04T10:30:00Z"
  }
}
```

### Loading State

Displays placeholder with blinking caret:

```
> loading...█
```

---

## CursorBlinker Component

### Implementation

```tsx
const CursorBlinker = () => (
  <span
    className="inline-block w-[0.6ch] h-[1.2em] bg-accent-info ml-0.5 animate-cursor-blink"
    aria-hidden="true"
  />
);
```

### CSS Animation (Tailwind)

```css
@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.animate-cursor-blink {
  animation: cursor-blink 1s step-end infinite;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .animate-cursor-blink {
    animation: none;
    opacity: 1;
  }
}
```

**Note**: Caret remains visible (not blinking) when user prefers reduced motion.

---

## Styling

### Base Styles

```tsx
<div
  role="status"
  aria-live="polite"
  className="font-mono text-sm text-text-primary"
>
  <span className="text-terminal-muted">&gt; </span>
  <span className="text-accent-info">{activity.status}</span>{' '}
  {activity.project}
  <span className="text-terminal-muted">...</span>
  <CursorBlinker />
</div>
```

### Typography

- Font: JetBrains Mono (monospace for terminal aesthetic)
- Size: `text-sm` (14px)
- Color scheme:
  - Prompt: `text-terminal-muted` (gray #6e7374)
  - Status: `text-accent-info` (mint #7fd0bd)
  - Project: `text-text-primary` (light cyan #d1e8e5)
  - Ellipsis: `text-terminal-muted`
  - Caret: `bg-accent-info` (solid block)

---

## Pattern Reuse

### Hero Component Inspiration

ActivityFeed reuses the blinking caret pattern from the Hero component's boot sequence:

**Hero**:
```tsx
<span className="animate-cursor-blink">█</span>
```

**ActivityFeed**:
```tsx
<CursorBlinker /> // Extracted as reusable component
```

**Benefit**: Consistent terminal aesthetic across all UI elements.

---

## Performance

- **Fetch strategy**: Single fetch on mount (no polling)
- **No real-time updates**: Static data (future: WebSocket integration)
- **Bundle impact**: ~1.8KB (94 lines)
- **Animation overhead**: CSS-only (no JS loop)

---

## Usage Example

```tsx
import { ActivityFeed } from '@/components/ActivityFeed';

<aside role="complementary" aria-label="Developer activity">
  <h3 className="text-sm font-semibold mb-2">Currently Working On</h3>
  <ActivityFeed />
</aside>
```

### In WidgetsBand Context

```tsx
<div className="text-center border-b border-white/5 pb-6">
  <h3 className="text-sm font-semibold text-text-primary mb-2">
    Currently Working On
  </h3>
  <ActivityFeed />
</div>
```

---

## Design Decisions

### Why Command Prompt Style?

1. **Consistency**: Matches terminal aesthetic of navbar/palette
2. **Familiarity**: Developers recognize `> command` format
3. **Status clarity**: Verb-first structure (building, deploying, testing)

### Why No Real-Time Updates?

- **Simplicity**: Static JSON sufficient for portfolio context
- **Performance**: Avoids WebSocket/polling overhead
- **Future-proof**: Data structure supports live updates (just swap fetch for socket)

---

## Error Handling

### Fetch Failure

Returns `null` (component unmounts silently):

```typescript
if (!activity) {
  return null;
}
```

**Rationale**: Activity feed is non-critical widget; graceful degradation preferred over error UI.

---

## Testing

### Accessibility Checklist

- [x] ARIA live region configured
- [x] Screen reader announces activity updates
- [x] Reduced motion support (caret stays visible)
- [x] Keyboard navigation (not focusable - status only)

### Edge Cases

- **Fetch fails**: Component unmounts, no error shown
- **Empty activity**: Shows "loading..." indefinitely (need timeout?)
- **Long project name**: Ellipsis truncation at container width

---

## Future Enhancements

- [ ] Add timestamp display ("2 hours ago")
- [ ] Add status icons (🔨 building, 🚀 deploying)
- [ ] Add click-to-expand details modal
- [ ] WebSocket integration for real-time updates
- [ ] Multiple activity items (queue display)

---

**Spec Compliance**: Hybrid Terminal v2.0 Section II.B (Activity Feed with Blinking Caret)
