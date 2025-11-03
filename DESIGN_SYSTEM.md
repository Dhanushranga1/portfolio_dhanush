# Hybrid Terminal Design System

**Version**: 1.0.0  
**Branch**: `enhance/hybrid-terminal-unification`  
**Status**: Canonical Specification

This document defines the complete design language for the Hybrid Terminal portfolio. All components **MUST** implement these rules exactly.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Primitives](#component-primitives)
5. [Motion & Animation](#motion--animation)
6. [Accessibility](#accessibility)
7. [Images & Media](#images--media)
8. [SEO & Structured Data](#seo--structured-data)

---

## Design Tokens

### A. Color Palette (CSS Variables)

Add these to `:root` in your global CSS:

```css
:root {
  /* Surface colors */
  --surface: #0f1112;
  --surface-rgb: 15, 17, 18;
  --surface-2: #121619;
  --surface-contrast: #202426;
  
  /* Text colors */
  --text-primary: #d1e8e5;
  --text-muted: #6e7374;
  
  /* Accent colors */
  --accent-info: #7fd0bd;        /* Mint - primary accent */
  --accent-info-700: #18cccd;    /* Bright cyan */
  --accent-action: #ea5c2a;      /* Rust/orange - CTAs only */
  
  /* Effects */
  --glass: rgba(255, 255, 255, 0.02);
  --focus-ring: rgba(127, 208, 189, 0.25);
  
  /* Layout */
  --max-width: 1100px;
  
  /* Motion */
  --motion-fast: 120ms;
  --motion-medium: 150ms;
  --motion-long: 200ms;
  --motion-ease: cubic-bezier(0.2, 0.9, 0.25, 1);
  --motion-translate: 10px;      /* Override to 6px on mobile */
}
```

### B. Tailwind Configuration

Map these tokens in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f1112',
          2: '#121619',
          contrast: '#202426',
        },
        text: {
          primary: '#d1e8e5',
          muted: '#6e7374',
        },
        accent: {
          info: '#7fd0bd',
          'info-700': '#18cccd',
          action: '#ea5c2a',
        },
      },
      maxWidth: {
        content: '1100px',
      },
      transitionDuration: {
        fast: '120ms',
        medium: '150ms',
        long: '200ms',
      },
      transitionTimingFunction: {
        terminal: 'cubic-bezier(0.2, 0.9, 0.25, 1)',
      },
    },
  },
};
```

**RULE**: Never use hex color literals in components. Always reference tokens.

---

## Typography

### Font Stack

```css
font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
```

### Type Scale

| Element | Size | Line Height | Weight | Tracking |
|---------|------|-------------|---------|----------|
| H1 (Hero) | 56-72px (text-4xl-6xl) | 1.05 | 700 | -0.02em |
| H2 (Page) | 32-40px (text-3xl-4xl) | 1.1 | 600 | -0.01em |
| H3 (Section) | 20-24px (text-xl-2xl) | 1.2 | 600 | normal |
| Body | 16px (text-base) | 1.6 | 400 | 0.01em |
| Small/Meta | 12-14px (text-xs-sm) | 1.4 | 400 | 0.02em |
| Code/Command | 14px (text-sm) | 1.5 | 500 | 0.02em |

### Usage Rules

- **Headings**: Use `font-mono` with tight tracking
- **Commands/labels**: `letter-spacing: 0.02em` (tracking-wide)
- **Body text**: Generous line-height (1.6-1.8) for readability
- **Inline code**: Wrap in `<code class="text-accent-info">` with subtle background

---

## Spacing System

Based on **8px grid**:

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| xs | 4px | `space-1` |
| sm | 8px | `space-2` |
| md | 16px | `space-4` |
| lg | 24px | `space-6` |
| xl | 32px | `space-8` |
| xxl | 48px | `space-12` |
| xxxl | 64px | `space-16` |

### Layout Constraints

- **Content max-width**: `1100px` (`max-w-content`)
- **Horizontal padding**: `px-4` mobile, `px-6` tablet, `px-8` desktop
- **Section spacing**: `py-12` (48px) mobile, `py-16` (64px) desktop
- **Hero vertical**: `min-h-[70vh]`, `pt-16` (64px)

---

## Component Primitives

### 1. Card Component

**Canonical HTML Structure:**

```html
<article class="card" role="article" aria-labelledby="card-title-123">
  <div class="card-media">
    <img src="..." alt="..." loading="lazy" />
  </div>
  <div class="card-body">
    <h3 id="card-title-123" class="card-title">Title</h3>
    <p class="card-desc">One-line description</p>
    <div class="card-meta">
      <span class="chip">tag</span>
      <a href="..." class="card-action">→ live</a>
    </div>
  </div>
</article>
```

**CSS Rules:**

```css
.card {
  background: rgba(var(--surface-rgb), 0.70);
  border: 1px solid var(--surface-contrast);
  border-radius: 8px;
  padding: 16px;
  overflow: hidden;
  transition: background var(--motion-medium) var(--motion-ease);
}

.card:hover,
.card:focus-within {
  background: rgba(var(--surface-rgb), 0.85);
}

.card-media {
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
```

**Accessibility:**
- Use `role="article"` or semantic `<article>`
- Link entire card with `aria-labelledby` referencing title ID
- Ensure `aria-describedby` for additional context when needed

---

### 2. Chips / Tags

**HTML:**

```html
<span class="chip">react</span>
<button class="chip chip-active">typescript</button>
```

**CSS:**

```css
.chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border: 1px solid var(--surface-contrast);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: transparent;
  transition: all var(--motion-fast) var(--motion-ease);
}

.chip:hover {
  color: var(--text-primary);
  border-color: var(--accent-info);
}

.chip-active {
  color: var(--accent-info);
  border-color: var(--accent-info);
  background: rgba(var(--accent-info-rgb), 0.05);
}
```

---

### 3. Buttons

**Primary CTA (Recruiter action):**

```html
<button class="btn-primary">
  Download CV
</button>
```

**CSS:**

```css
.btn-primary {
  padding: 10px 20px;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background: var(--accent-action);
  border: none;
  cursor: pointer;
  transition: all var(--motion-medium) var(--motion-ease);
}

.btn-primary:hover {
  background: #d94e1e;
  transform: translateY(-1px);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring);
}
```

**Secondary/Ghost:**

```css
.btn-ghost {
  padding: 8px 16px;
  border: 1px solid var(--surface-contrast);
  border-radius: 6px;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-mono);
  transition: all var(--motion-fast) var(--motion-ease);
}

.btn-ghost:hover {
  border-color: var(--accent-info);
  color: var(--accent-info);
}
```

---

### 4. Terminal Navbar

**Position & Layout:**

```css
.terminal-navbar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  
  display: flex;
  align-items: center;
  gap: 2px;
  
  height: 48px;
  padding: 4px;
  
  background: rgba(var(--surface-rgb), 0.70);
  backdrop-filter: blur(16px);
  border: 1px solid var(--surface-contrast);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .terminal-navbar {
    height: 40px;
    bottom: 16px;
  }
}
```

**Nav Items:**

```css
.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: all var(--motion-fast) var(--motion-ease);
}

.nav-item:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.03);
}

.nav-item.active {
  color: var(--accent-info);
  background: rgba(var(--accent-info-rgb), 0.08);
}

.nav-item.active::before {
  content: "> ";
  margin-right: 4px;
}

.nav-item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--focus-ring);
  outline-offset: 2px;
}
```

---

## Motion & Animation

### Principles

1. **Subtle & fast**: Prefer 120-200ms transitions
2. **Natural easing**: Use `cubic-bezier(0.2, 0.9, 0.25, 1)`
3. **Respect user preferences**: Always guard with `prefers-reduced-motion`

### Allowed Properties

Only animate these properties (performance):
- `opacity`
- `transform` (translateX/Y, scale)
- `background-color`
- `border-color`
- `color`

**Never animate**: `width`, `height`, `top`, `left` (causes reflow)

### Reduced Motion Guard

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Terminal Caret Blink

```css
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.caret {
  animation: blink 1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
    opacity: 1;
  }
}
```

---

## Accessibility

### 1. Semantic HTML

Always use semantic elements:

```html
<header role="banner">
<nav role="navigation" aria-label="Primary">
<main id="main-content" role="main">
<aside role="complementary" aria-label="Widgets">
<footer role="contentinfo">
```

### 2. Focus Management

**Focus Ring (global):**

```css
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 3px var(--focus-ring);
  outline-offset: 2px;
}
```

**Focus Order:**
- Navbar → Skip link → Hero → Content → Widgets → Footer
- Test with Tab key; order must be logical

### 3. ARIA Patterns

**Combobox (CommandPalette):**

```html
<div role="combobox" aria-expanded="true" aria-haspopup="listbox" aria-owns="results">
  <input
    type="text"
    aria-autocomplete="list"
    aria-controls="results"
    aria-activedescendant="option-1"
  />
</div>
<ul id="results" role="listbox">
  <li id="option-1" role="option" aria-selected="true">...</li>
</ul>
```

**Dialog (Trailer Modal):**

```html
<dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Watch Trailer</h2>
  <button aria-label="Close dialog">×</button>
  <iframe src="..." title="Movie trailer"></iframe>
</dialog>
```

**Live Regions:**

```html
<div id="announce" aria-live="polite" aria-atomic="true" class="sr-only"></div>
```

Use for dynamic updates (add favorite, export complete).

### 4. Keyboard Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `Cmd/Ctrl + K` | Open CommandPalette | Global |
| `/` | Open CommandPalette (prefilled) | Global |
| `V` | Toggle Grid/List view | Favorites page |
| `Ctrl/Cmd + E` | Export JSON | Favorites page |
| `Esc` | Close modal/palette | Global |
| `Tab` | Navigate forward | Global |
| `Shift + Tab` | Navigate backward | Global |
| `Arrow Up/Down` | Navigate list items | Lists |
| `Enter` | Activate | Buttons/links |

**Document shortcuts** in `CommandHints` component and README.

### 5. Contrast Requirements

| Element | Ratio | Notes |
|---------|-------|-------|
| Body text | ≥ 4.5:1 | Against `--surface` |
| Large text (≥18px) | ≥ 3:1 | |
| Icons | ≥ 3:1 | Small UI elements |
| Focus indicators | ≥ 3:1 | Visible at 200% zoom |

**Test with**: axe DevTools, Lighthouse, manual verification

---

## Images & Media

### 1. Responsive Images

**Use srcset + sizes:**

```html
<img
  src="/images/poster-800.webp"
  srcset="
    /images/poster-400.webp 400w,
    /images/poster-800.webp 800w,
    /images/poster-1200.webp 1200w
  "
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
  alt="Pulp Fiction (1994) movie poster"
  loading="lazy"
  decoding="async"
  width="400"
  height="600"
/>
```

### 2. Image Formats

Priority order:
1. **AVIF** (best compression)
2. **WebP** (good compatibility)
3. **JPEG** (fallback)

### 3. Aspect Ratios

- **Movie posters**: `aspect-ratio: 2 / 3`
- **Project thumbnails**: `aspect-ratio: 16 / 9`
- **Photo gallery**: `aspect-ratio: 4 / 3` or `1 / 1`

### 4. Lazy Loading

- Add `loading="lazy"` to all images below fold
- Use `decoding="async"` for non-critical images
- Provide LQIP (Low Quality Image Placeholder) with blur-up effect

```css
.image-container {
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  filter: blur(20px);
  transform: scale(1.1);
  transition: opacity var(--motion-long);
}

.image-loaded .image-placeholder {
  opacity: 0;
}
```

---

## SEO & Structured Data

### 1. Page Meta

Every page must have:

```html
<head>
  <title>Page Title | Dhanush Portfolio</title>
  <meta name="description" content="...">
  
  <!-- Open Graph -->
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="https://...">
  <meta property="og:url" content="https://...">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="...">
  <meta name="twitter:description" content="...">
  <meta name="twitter:image" content="https://...">
</head>
```

### 2. JSON-LD Structured Data

**Favorites (ItemList):**

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Dhanush's Favorite Movies",
  "description": "Curated collection of favorite films with personal notes",
  "numberOfItems": 12,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Movie",
        "name": "Pulp Fiction",
        "director": {
          "@type": "Person",
          "name": "Quentin Tarantino"
        },
        "datePublished": "1994",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "9.5",
          "bestRating": "10"
        }
      }
    }
  ]
}
```

**Person (Portfolio Owner):**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dhanush Ranga",
  "jobTitle": "Full-Stack Developer",
  "url": "https://dhanushranga.dev",
  "sameAs": [
    "https://github.com/Dhanushranga1",
    "https://linkedin.com/in/..."
  ]
}
```

### 3. Canonical URLs

```html
<link rel="canonical" href="https://dhanushranga.dev/favorites">
```

---

## Component API Specifications

### CardPrimitive Props

```typescript
interface CardPrimitiveProps {
  id?: string;
  title: string;
  subtitle?: string;
  media?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
  };
  description?: string;
  tags?: string[];
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }>;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
}
```

### TerminalNavbar (no props required)

```typescript
// Internal nav items
const NAV_ITEMS = [
  { path: '/', label: 'home', icon: Home },
  { path: '/projects', label: 'projects', icon: FolderGit2 },
  { path: '/favorites', label: 'favorites', icon: Heart },
  { path: '/blog', label: 'blog', icon: BookOpen },
  { path: '/contact', label: 'contact', icon: Mail },
];
```

### CommandPalette Props

```typescript
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  action: () => void;
  keywords?: string[];
}
```

---

## Performance Budgets

| Metric | Target | Max |
|--------|--------|-----|
| Bundle size (main) | < 150KB | 200KB |
| First Contentful Paint | < 1.2s | 1.5s |
| Time to Interactive | < 2.5s | 3.5s |
| Largest Contentful Paint | < 2.0s | 2.5s |
| Cumulative Layout Shift | < 0.1 | 0.25 |

### Code-Splitting Strategy

- **Lazy load**:
  - CommandPalette (on first `Cmd+K`)
  - FavoriteMovies widget (on scroll into view)
  - Trailer modal (on first open)
  - Blog post content (route-based)

---

## Testing Requirements

### Automated

1. **axe-core**: No critical/serious violations
2. **Lighthouse**: Score ≥ 90 in all categories
3. **Pa11y**: Zero errors

### Manual

1. **Keyboard navigation**: Tab through entire page
2. **Screen reader**: Test with VoiceOver/NVDA
3. **Zoom**: Test at 200% zoom
4. **Reduced motion**: Enable OS setting, verify no animations
5. **Color blindness**: Use simulators (Dalton filter)

---

## File Naming Conventions

```
components/
  CardPrimitive.tsx
  TerminalNavbar.tsx
  CommandPalette.tsx
  CommandHints.tsx
  AsciiProgress.tsx

pages/
  index.tsx (Home)
  projects.tsx
  favorites.tsx
  blog.tsx
  recruiter.tsx

research/
  favorite-movies/
    prototype/
      FavoriteMovies.tsx
    research-notes.md
    testing-report.md
```

---

## Commit Message Format

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- style: Visual/styling changes
- refactor: Code refactoring
- docs: Documentation
- test: Tests
- chore: Tooling/config

Examples:
feat(nav): add TerminalNavbar with keyboard navigation
fix(a11y): improve CommandPalette focus trap
style: update card hover states
docs: add DESIGN_SYSTEM.md
```

---

## Questions & Clarifications

**Q: Can I use a different color for X?**  
A: No. All colors must use design tokens. Request a token addition in PR if needed.

**Q: Can I add a third-party library?**  
A: Only if it's essential and <20KB gzipped. Document in PR.

**Q: What if mobile layout needs different spacing?**  
A: Use responsive utilities: `px-4 md:px-6 lg:px-8`. Document overrides.

---

**This design system is the single source of truth. Any deviation requires maintainer approval and PR documentation.**

---

**Last updated**: November 4, 2025  
**Maintained by**: HybridTerminal-UX-Agent
