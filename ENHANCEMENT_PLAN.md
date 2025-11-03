# Hybrid Terminal UI Enhancement Plan

## Overview
This plan implements a "Hybrid Terminal" UI upgrade that combines a professional, content-first multi-page portfolio with terminal aesthetics and modern interactive features. The goal is to create a unique, accessible, and polished developer portfolio.

## Prioritized Work Items

### Task A0: Planning ✅
**Status:** Complete
**Deliverable:** This document

---

### Task A1: Theming & Tailwind Configuration
**Priority:** HIGH
**Estimated Steps:** 2-3 commits

**Acceptance Criteria:**
- [ ] Curated "Hybrid Terminal" palette added to `tailwind.config.ts`
- [ ] Semantic color tokens defined (bg-primary, text-primary, accent-info, accent-action, accent-warn)
- [ ] Dark mode strategy consistent across site
- [ ] All colors meet WCAG AA contrast standards

**Implementation Steps:**
1. Update `tailwind.config.ts` with custom color palette:
   - bg-primary: `#121619` (near-black blue/grey)
   - text-primary: `#d1e8e5` (off-white with green/blue tint)
   - text-secondary: `#4f4f4f` (dark grey for metadata)
   - accent-info: `#7fd0bd` (mint teal for links/prompts)
   - accent-action: `#ea5c2a` (rust orange for CTAs)
   - accent-warn: `#fb3f58` (rose red for warnings)
2. Update `index.css` with CSS variables for dynamic theming
3. Test contrast ratios for accessibility

---

### Task A2: Typography System
**Priority:** HIGH
**Estimated Steps:** 2 commits

**Acceptance Criteria:**
- [ ] Monospace font system installed (Geist Mono for body, Commit Mono for headers, JetBrains Mono fallback)
- [ ] Fonts preloaded with `font-display: swap`
- [ ] Tailwind `fontFamily` configuration updated
- [ ] Typography applied consistently across all pages

**Implementation Steps:**
1. Add font files or CDN links to `index.html`
2. Update `tailwind.config.ts` with font families
3. Apply fonts in global CSS and test rendering

---

### Task A3: Command Palette
**Priority:** HIGH
**Estimated Steps:** 2-3 commits

**Acceptance Criteria:**
- [ ] Global command palette component implemented using shadcn/ui cmdk
- [ ] Keyboard bindings: `Cmd/Ctrl+K` and `/`
- [ ] Actions: Navigate (Home, Projects, Blog, Photos, Contact), Download CV, Toggle Theme, Open GitHub, Open LinkedIn
- [ ] Proper ARIA semantics (`aria-modal`, `aria-expanded`, `aria-controls`)
- [ ] Accessible keyboard navigation
- [ ] Visual indicator in nav for keyboard shortcut

**Implementation Steps:**
1. Install/verify cmdk dependency
2. Create `CommandPalette.tsx` component with shadcn/ui Command
3. Implement global keyboard listener in App.tsx
4. Add command actions for navigation and external links
5. Style to match terminal theme

---

### Task A4: Boot Sequence
**Priority:** MEDIUM
**Estimated Steps:** 2 commits

**Acceptance Criteria:**
- [ ] ASCII boot sequence on first page load
- [ ] CSS-only typewriter animation
- [ ] Screen reader accessible (`aria-hidden="true"` on decorative element)
- [ ] `role="status"` announcement for SR users
- [ ] Respects `prefers-reduced-motion` (shows instant/skips animation)
- [ ] Optional skip button

**Implementation Steps:**
1. Create `BootSequence.tsx` component
2. Generate ASCII art for "dhanush ranga gopisetty" or logo
3. Implement CSS typewriter effect with `steps()` timing function
4. Add blinking cursor with `::after` pseudo-element
5. Add accessibility features and reduced-motion fallback
6. Use localStorage to show only on first visit

---

### Task A5: Micro-interactions & Component Polish
**Priority:** MEDIUM
**Estimated Steps:** 3-4 commits

**Acceptance Criteria:**
- [ ] Link hover effects: passing underline or bracket style
- [ ] Active nav items have `>` prompt prefix
- [ ] List items show `>` prefix on hover
- [ ] ASCII progress bars for skills (animated on scroll reveal)
- [ ] Blinking caret in inputs (~1s interval)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Transitions: 150-200ms duration, no scale/rotate

**Implementation Steps:**
1. Update `Navigation.tsx` with prompt prefixes and hover effects
2. Create link hover styles (underline slide-in animation)
3. Update `TechStack.tsx` with ASCII progress bars
4. Add scroll-reveal animation with Intersection Observer
5. Add blinking caret to input fields
6. Test all interactions with reduced motion enabled

---

### Task A6: Projects "ls --impact" Format
**Priority:** MEDIUM
**Estimated Steps:** 2 commits

**Acceptance Criteria:**
- [ ] Projects displayed in terminal-style list format
- [ ] Status indicators: `[OK]`, `[WIP]`, `[ARCHIVED]`
- [ ] High-impact bullet points as comments `//`
- [ ] Action links with arrows: `→ [live]` `→ [source]`
- [ ] Semantic HTML maintained (`<ul>`, `<li>`, proper headings)
- [ ] Responsive layout

**Implementation Steps:**
1. Update `ProjectCard.tsx` with terminal-style layout
2. Add status badge component
3. Update `Projects.tsx` page layout
4. Ensure keyboard navigation and focus states

---

### Task A7: Accessibility Testing & Fixes
**Priority:** HIGH
**Estimated Steps:** 2-3 commits

**Acceptance Criteria:**
- [ ] Lighthouse accessibility score: 95+ on all pages
- [ ] No high-severity axe violations
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Focus-visible states on all interactive elements
- [ ] Skip link to main content
- [ ] Proper heading hierarchy
- [ ] ARIA attributes correct
- [ ] Keyboard navigation fully functional

**Implementation Steps:**
1. Run Lighthouse audit on all pages (before state)
2. Fix color contrast issues
3. Add skip link component
4. Ensure focus-visible styles on all interactive elements
5. Verify heading hierarchy
6. Test with keyboard-only navigation
7. Run final Lighthouse audit (after state)

---

### Task A8: Documentation & PR
**Priority:** LOW
**Estimated Steps:** 1 commit

**Acceptance Criteria:**
- [ ] README updated with design upgrades section
- [ ] CHANGELOG.md entry created
- [ ] PR opened with complete description
- [ ] Screenshots included (desktop + mobile)
- [ ] Accessibility summary (before/after scores)
- [ ] Manual testing steps documented
- [ ] Follow-up issues created

**Implementation Steps:**
1. Update README.md
2. Create CHANGELOG.md entry
3. Take screenshots of key features
4. Document accessibility improvements
5. Open PR with comprehensive description

---

## Design Decisions

### Font Choice
Using **JetBrains Mono** as primary monospace font (fallback strategy):
- Widely available and excellent readability
- Professional and recognizable in developer community
- If Geist Mono/Commit Mono become available via CDN, can upgrade in future

### Accent Color Strategy
Primary accent: **Mint Teal** (`#7fd0bd`)
- Provides "cool" factor without being garish
- Excellent contrast on dark background
- Subtle enough for professional context
- Secondary accent (rust orange) for CTAs provides visual hierarchy

### Animation Philosophy
- Maximum duration: 200ms for transitions
- Only animate: opacity, width, transform: translateX/Y, text-shadow
- NO scale, rotate, or complex transforms
- All animations disabled in `prefers-reduced-motion`
- Blinking cursor is accessibility-friendly (1s interval, not distracting)

---

## Commit Strategy

Each task will have focused, atomic commits:
- `chore(plan): add hybrid-terminal enhancement plan`
- `feat(theme): add curated hybrid-terminal color palette`
- `feat(typography): configure monospace font system`
- `feat(command): implement global command palette`
- `feat(boot): add accessible boot sequence animation`
- `feat(ui): add terminal-style link interactions`
- `feat(skills): implement ascii progress bars`
- `feat(projects): add ls --impact terminal format`
- `test(a11y): audit and fix accessibility issues`
- `docs(readme): document hybrid terminal features`

---

## Success Metrics

1. **Uniqueness:** Site feels distinctive compared to typical dev portfolios
2. **Performance:** Lighthouse performance score 90+
3. **Accessibility:** Lighthouse accessibility score 95+, zero high-severity issues
4. **Usability:** Command palette adoption (track usage if analytics added)
5. **Professional:** Maintains credibility for recruitment/client work
