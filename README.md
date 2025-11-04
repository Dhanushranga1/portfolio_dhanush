# Portfolio - Dhanush Ranga Gopisetty

A modern, terminal-inspired developer portfolio built with React, TypeScript, and the "Hybrid Terminal" design system.

## 🎨 Design Philosophy

This portfolio implements a "Hybrid Terminal" approach that combines:
- **Professional multi-page structure** for accessibility and SEO
- **Terminal aesthetics** for a unique, memorable experience
- **Modern interactions** via command palette and micro-animations
- **Accessibility-first** design with WCAG AA compliance

## ✨ Features

### 🎯 Core Features
- **Global Command Palette** - Press `Cmd/Ctrl+K` or `/` for quick navigation with fuzzy search
- **Terminal Navbar** - Bottom-centered navigation with keyboard support (Arrow keys + Enter)
- **Page Transitions** - Smooth 150ms vertical slide+fade animations with Framer Motion
- **ASCII Boot Sequence** - Welcome animation on first visit (skippable with Esc)
- **Terminal-Style UI** - Monospace typography (JetBrains Mono), minimal design, ASCII elements
- **Dark Mode** - Built-in theme switching
- **Responsive Design** - Mobile-first with 200% zoom support

### 🎭 Interactive Elements
- **Animated Skill Bars** - ASCII progress indicators with scroll-reveal
- **Hover Effects** - Sliding underlines, glow rings, smooth transitions
- **Project Listings** - Terminal `ls --impact` format with keyboard navigation (j/k, 1-9, Enter)
- **Favorites Movies** - Grid/list toggle (V key), search, sort, export JSON (Ctrl/Cmd+E)
- **Command Hints** - Dismissible keyboard shortcuts tooltip (persists in localStorage)

### ⌨️ Keyboard Shortcuts

#### Global
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl+K` | Open command palette |
| `/` | Open command palette (search mode) |
| `Esc` | Close modals / Skip boot sequence |
| `Tab` | Navigate through interactive elements |
| `Enter` | Activate focused element |

#### Navigation (TerminalNavbar)
| Shortcut | Action |
|----------|--------|
| `ArrowLeft` | Move focus to previous nav item |
| `ArrowRight` | Move focus to next nav item |
| `Enter` | Navigate to focused page |

#### Projects Page
| Shortcut | Action |
|----------|--------|
| `j` | Navigate to next project (vim-style) |
| `k` | Navigate to previous project (vim-style) |
| `1-9` | Jump directly to project by number |
| `Enter` | Open focused project's primary link |

#### Favorites Page
| Shortcut | Action |
|----------|--------|
| `V` | Toggle between grid and list view |
| `Ctrl/Cmd+E` | Export favorites as JSON |
| `Esc` | Close trailer modal |

### ♿ Accessibility

#### WCAG 2 AA Compliance
- ✅ **Color Contrast**: All text meets ≥4.5:1 ratio (≥3:1 for UI elements)
- ✅ **Keyboard Navigation**: 100% keyboard accessible, no mouse required
- ✅ **Screen Reader Support**: Proper ARIA labels, roles, and live regions
- ✅ **Focus Management**: Visible focus rings on all interactive elements
- ✅ **Semantic HTML**: Proper heading hierarchy, landmark regions
- ✅ **Zoom Support**: Fully functional at 200% zoom
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` media query

#### Testing Results
- **axe-core**: 0 violations (automated accessibility testing)
- **Lighthouse Accessibility**: 96/100
- **Lighthouse Best Practices**: 96/100
- **Lighthouse SEO**: 91/100

#### Accessibility Features
- Motion system with 0.01ms CSS reset (prevents Framer Motion flash bug)
- PageTransition component with automatic focus management
- Command palette with proper combobox ARIA semantics
- All images with descriptive alt text and lazy loading
- Meta viewport without zoom restrictions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Wouter** - Routing
- **shadcn/ui** - UI components
- **cmdk** - Command palette
- **next-themes** - Theme management

### Backend
- **Express** - Server framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Vite** - Build tool

## 🎨 Design System

### Color Palette (Hybrid Terminal v2.0)
```
Surface Layers:
  --surface: #0f1112          (deepest black-blue)
  --surface-2: #121619        (elevated surfaces)
  --surface-contrast: #202426 (borders)

Text Colors:
  --text-primary: #d1e8e5     (off-white with teal tint)
  --text-muted: #9e9e9e       (accessible grey, 4.52:1 contrast)

Accent Colors:
  --accent-info: #36e0c7      (vivid mint - primary)
  --accent-info-muted: #7fd0bd (softer mint - fallback)
  --accent-action: #ea5c2a    (rust orange - CTAs)
  --accent-warn: #fb3f58      (rose red - errors)

Functional:
  --glass: rgba(255,255,255,0.02)
  --focus-ring: rgba(54,224,199,0.14)
```

### Typography
- **Primary Font:** JetBrains Mono (designed for readability with increased x-height)
- **Fallbacks:** Fira Code, Courier New, monospace
- **Type Scale:** Display (3.0rem), Headline (2.0rem), Body (1.0rem), Label (0.875-0.75rem)
- All text uses monospace for consistent terminal aesthetic

### Motion System
```
Durations:
  --motion-fast: 120ms
  --motion-medium: 150ms
  --motion-long: 200ms

Easing:
  --motion-ease: cubic-bezier(.2, .9, .25, 1)

Translate Values:
  --motion-translate-desktop: 10px
  --motion-translate-mobile: 6px
```

### Animation Guidelines
- **Page Transitions**: 150ms vertical slide+fade with Framer Motion
- **Allowed Properties**: opacity, transform (translateX/Y only)
- **Performance**: Glow effects use pseudo-element opacity (not box-shadow animation)
- **Accessibility**: All animations respect `prefers-reduced-motion` via 0.01ms CSS reset
- **Focus Management**: PageTransition auto-focuses main content after animation

## 📁 Project Structure

```
client/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── CommandPalette.tsx
│   │   ├── BootSequence.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   └── lib/            # Utilities
server/
├── index.ts            # Express server
├── routes.ts           # API routes
└── storage.ts          # Database utilities
shared/
└── schema.ts           # Database schema
```

## 🎯 Key Components

### CommandPalette
Global command palette accessible via `Cmd/Ctrl+K` or `/`
- Navigation to all pages
- Quick actions (Download CV, Toggle Theme)
- External links (GitHub, LinkedIn)

### BootSequence
ASCII art welcome screen shown on first visit
- CSS-only animations
- Respects reduced motion
- Skippable by user

### ProjectCard
Terminal-style project listings
- Status indicators: [OK], [WIP], [ARCHIVED]
- Impact statements as code comments
- Action links with visual indicators

## 🔧 Configuration

### Tailwind Config
Custom color tokens available in `tailwind.config.ts`:
```typescript
terminal: {
  bg: "#121619",
  text: "#d1e8e5",
  muted: "#4f4f4f",
  accent: "#7fd0bd",
  action: "#ea5c2a",
  warn: "#fb3f58",
}
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run check    # TypeScript type checking
npm run db:push  # Push database schema changes
```

## 🌟 Recent Enhancements (Branch: enhance/hybrid-terminal-unification)

This portfolio recently completed an 8-milestone UI upgrade implementing the "Hybrid Terminal v2.0" design system:

### ✅ Completed Milestones

**M1: Core Navigation** (Commit: `2ee1824`)
- Terminal Navbar with keyboard navigation (ArrowLeft/Right/Enter)
- Command Hints component with localStorage persistence

**M2: Command Palette** (Commit: `f1b6289`)
- Global command palette (Cmd/Ctrl+K, /) with fuzzy search
- Command parser supporting filters like `ls --tech react`

**M3: Hero & Recruiter** (Commit: `006e9b8`)
- Boot sequence animation with typing effect and blinking caret
- Recruiter Snapshot page (SSR/SSG ready, printable)

**M4: Favorites Enhancement** (Commit: `577c47f`)
- Grid/list toggle (V key), search, sort, filter by tags
- Export JSON functionality (Ctrl/Cmd+E)
- JSON-LD structured data for SEO

**M5: Projects Enhancement** (Commit: `5c504a2`)
- Terminal `ls --impact` layout
- Keyboard navigation (j/k vim-style, 1-9 direct access, Enter to open)
- Status filters and badges ([OK], [WIP], [ARCHIVED])

**M6: Component Unification** (Commit: `9cdd7de`)
- CardPrimitive component for consistent design
- AsciiProgress component for terminal-style indicators
- Refactored BlogCard, ProjectCard, MessageCard

**M7: Testing & Polish** (Commits: `40a11e3`, `3c064d5`)
- Framer Motion page transitions (150ms vertical slide+fade)
- Motion system with design tokens and reduced-motion support
- Fixed all accessibility violations (axe-core: 0 violations)
- Lighthouse scores: Accessibility 96/100, Best Practices 96/100, SEO 91/100
- WCAG 2 AA compliant color contrast (4.5:1 for text)

**M8: Documentation** (In Progress)
- Comprehensive README updates with keyboard shortcuts
- Implementation status tracking
- Milestone reports with metrics

### 📊 Performance & Quality

**Bundle Size** (Production Build):
- JavaScript: 457.39 KB (138.55 KB gzipped)
- CSS: 98.07 KB (15.75 KB gzipped)
- HTML: 2.24 KB (0.90 KB gzipped)
- **Total**: ~155 KB gzipped

**Lighthouse Scores** (Dev Environment):
- 🟢 Accessibility: 96/100
- 🟢 Best Practices: 96/100
- 🟢 SEO: 91/100
- 🟡 Performance: 52/100 (dev server overhead - expected 90+ in production)

**Accessibility**:
- ✅ axe-core: 0 violations across all major routes
- ✅ WCAG 2 AA compliant
- ✅ Keyboard-only navigation functional
- ✅ Screen reader tested
- ✅ 200% zoom support verified

See [docs/IMPLEMENTATION_STATUS.md](./docs/IMPLEMENTATION_STATUS.md) and [docs/Enhancing Hybrid Terminal UI_UX.md](./docs/Enhancing%20Hybrid%20Terminal%20UI_UX.md) for detailed technical specifications.

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Dhanush Ranga Gopisetty**
- GitHub: [@dhanushranga1](https://github.com/dhanushranga1)
- LinkedIn: [dhanush-ranga](https://linkedin.com/in/dhanush-ranga)
- Email: dhanushrangag@gmail.com

---

Built with ❤️ using React, TypeScript, and terminal aesthetics
