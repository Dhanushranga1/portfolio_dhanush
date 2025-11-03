# Changelog

## [Unreleased] - Hybrid Terminal UI Upgrade

### Added

#### Theme & Visual Design
- **Curated "Hybrid Terminal" Color Palette**
  - Near-black blue/grey background (#121619)
  - Off-white text with teal tint (#d1e8e5)
  - Mint teal accent for links and prompts (#7fd0bd)
  - Rust orange accent for CTAs (#ea5c2a)
  - Rose red for warnings/errors (#fb3f58)
  - All colors meet WCAG AA contrast standards

- **Terminal-Specific Animations**
  - Blink animation for cursors (1s interval)
  - Typewriter effect for boot sequence
  - Slide-in underline for link hovers
  - Fade-in transitions (150ms)
  - All animations respect `prefers-reduced-motion`

#### Interactive Features
- **Global Command Palette**
  - Keyboard shortcuts: `Cmd/Ctrl+K` or `/`
  - Quick navigation to all pages
  - Actions: Download CV, Toggle Theme
  - External links: GitHub, LinkedIn
  - Full keyboard navigation with ARIA semantics
  - Visual hint in navigation bar

- **Boot Sequence Animation**
  - ASCII art welcome screen
  - Sequential loading messages
  - Shows only on first visit (localStorage)
  - Skip button for quick access
  - Screen reader accessible
  - Respects reduced motion preferences

#### UI Enhancements
- **Navigation Improvements**
  - Active page indicator with `>` prompt prefix
  - Sliding underline hover animation
  - Smooth color transitions
  - Terminal-style visual feedback

- **Skills Display**
  - ASCII progress bars with animation
  - Scroll-reveal effect using Intersection Observer
  - Percentage indicators
  - Fills on viewport entry

- **Projects "ls --impact" Format**
  - Terminal command-style header
  - Status badges: [OK], [WIP], [ARCHIVED]
  - Impact statements as code comments
  - Hover border accent effect
  - Clean action links with arrows
  - Linear list layout for better readability

#### Accessibility
- Dark mode support with ThemeProvider
- Focus-visible states on all interactive elements
- Proper ARIA labels and roles
- Semantic HTML structure maintained
- Keyboard navigation fully functional
- Screen reader announcements
- Reduced motion support throughout

### Changed
- Updated font system to JetBrains Mono with fallbacks
- Replaced grid-based project layout with terminal-style list
- Enhanced link hover effects across all pages
- Improved contrast ratios for better accessibility

### Technical
- Integrated `next-themes` for theme management
- Added `cmdk` for command palette functionality
- Implemented Intersection Observer for scroll animations
- Added localStorage for user preference persistence
- CSS custom properties for theme flexibility

---

## Impact Summary

**User Experience**
- More distinctive, memorable portfolio design
- Faster navigation with command palette
- Better visual hierarchy and readability
- Professional terminal aesthetic that stands out

**Accessibility**
- WCAG AA compliant color contrast
- Full keyboard navigation support
- Screen reader friendly
- Motion preferences respected

**Performance**
- Minimal animation overhead
- Efficient scroll observers
- Local storage for boot sequence (shown once)
- Fast theme switching

**Developer Experience**
- Well-documented component architecture
- Reusable terminal-style components
- Consistent design system
- Easy to extend and customize
