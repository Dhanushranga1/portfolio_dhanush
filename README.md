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
- **Global Command Palette** - Press `Cmd/Ctrl+K` or `/` for quick navigation
- **ASCII Boot Sequence** - Welcome animation on first visit
- **Terminal-Style UI** - Monospace typography, minimal design, ASCII elements
- **Dark Mode** - Built-in theme switching
- **Responsive Design** - Mobile-first approach

### 🎭 Interactive Elements
- **Animated Skill Bars** - ASCII progress indicators with scroll-reveal
- **Hover Effects** - Sliding underlines, prompt prefixes, smooth transitions
- **Project Listings** - Terminal `ls --impact` format with status badges
- **Keyboard Navigation** - Full keyboard accessibility

### ♿ Accessibility
- WCAG AA contrast ratios
- Screen reader support with proper ARIA labels
- Focus-visible states on all interactive elements
- `prefers-reduced-motion` support
- Semantic HTML throughout

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

### Color Palette
```
Terminal Background: #121619 (near-black blue/grey)
Primary Text:        #d1e8e5 (off-white with teal tint)
Muted Text:          #4f4f4f (dark grey)
Accent Info:         #7fd0bd (mint teal) - links, prompts
Accent Action:       #ea5c2a (rust orange) - CTAs
Accent Warn:         #fb3f58 (rose red) - warnings
```

### Typography
- **Primary Font:** JetBrains Mono
- **Fallbacks:** Fira Code, Courier New, monospace
- All text uses monospace for consistent terminal aesthetic

### Animation Guidelines
- Maximum duration: 200ms for transitions
- Animations: opacity, width, transform (translateX/Y only)
- No scale, rotate, or complex transforms
- All animations respect `prefers-reduced-motion`

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

## 🌟 Design Upgrades

This portfolio recently underwent a major UI upgrade to implement the "Hybrid Terminal" design system:

- ✅ Curated color palette with semantic tokens
- ✅ Global command palette for quick navigation
- ✅ ASCII boot sequence with accessibility
- ✅ Terminal-style micro-interactions
- ✅ Animated skill progress bars
- ✅ Projects in `ls --impact` format
- ✅ Full keyboard navigation support
- ✅ WCAG AA accessibility compliance

See [CHANGELOG.md](./CHANGELOG.md) and [ENHANCEMENT_PLAN.md](./ENHANCEMENT_PLAN.md) for details.

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Dhanush Ranga Gopisetty**
- GitHub: [@dhanushranga1](https://github.com/dhanushranga1)
- LinkedIn: [dhanush-ranga](https://linkedin.com/in/dhanush-ranga)
- Email: dhanushrangag@gmail.com

---

Built with ❤️ using React, TypeScript, and terminal aesthetics
