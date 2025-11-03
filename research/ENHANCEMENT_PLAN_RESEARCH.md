# ENHANCEMENT_PLAN_RESEARCH — Master Action Plan

**Project**: Portfolio Research & Prototyping Initiative  
**Owner**: Portfolio-Research-CodeAgent  
**Created**: 2025-11-03  
**Status**: 🔄 IN-PROGRESS

---

## Executive Summary

This document tracks the research, design, and prototyping phase for portfolio enhancements. Five research branches have been created to explore innovative features that demonstrate technical versatility, design thinking, and user-centric development.

---

## Research Branches Overview

| Branch | Status | Priority | Commits | Files | Last Updated |
|--------|--------|----------|---------|-------|--------------|
| `research/favorite-movies` | 🔄 IN-PROGRESS | **MANDATED** | 1/9 | 1 | 2025-11-03 |
| `research/homepage-revamp` | 🔄 IN-PROGRESS | **MANDATED** | 1/8 | 1 | 2025-11-03 |
| `research/interactive-algo-playground` | 🔄 IN-PROGRESS | **TOP-3** | 1/8 | 1 | 2025-11-03 |
| `research/run-it-cards-wasm` | 🔄 IN-PROGRESS | EXPLORATORY | 1/8 | 1 | 2025-11-03 |
| `research/git-replay-timeline` | 🔄 IN-PROGRESS | **TOP-3** | 1/9 | 1 | 2025-11-03 |

**Legend**: 🔄 In Progress | ✅ Complete | ⏸️ Blocked | ⏭️ Queued

---

## Phase 1: Initial Setup ✅

### Completed

- [x] Create 5 research branches with naming convention `research/<slug>`
- [x] Set up directory structure (`prototype/`, `wireframes/`, `research-notes/`)
- [x] Create ENHANCEMENT_PLAN_RESEARCH.md for each branch
- [x] Initial commits with conventional commit format

### Branch Creation Log

```bash
# Favorite Movies
git checkout -b research/favorite-movies
Commit: bb6b0d9 - "chore(plan): add research plan for favorite movies"

# Homepage Revamp
git checkout -b research/homepage-revamp
Commit: 892378d - "chore(plan): add research plan for homepage revamp"

# Interactive Algorithm Playground
git checkout -b research/interactive-algo-playground
Commit: dd58599 - "chore(plan): add research plan for interactive-algo-playground"

# Run It Cards (WASM)
git checkout -b research/run-it-cards-wasm
Commit: 84499bc - "chore(plan): add research plan for run-it-cards-wasm"

# Git Replay Timeline
git checkout -b research/git-replay-timeline
Commit: b1d9eb1 - "chore(plan): add research plan for git-replay-timeline"
```

---

## Phase 2: Reconnaissance & Inspiration ⏭️

### Tasks

- [ ] Collect 30+ example links from web research
- [ ] Gather 12+ inspirational images
- [ ] Create `research/inspiration/sources.json` with annotated references
- [ ] Save images as `inspiration_01.png` through `inspiration_12.png`
- [ ] Document 2-line captions explaining relevance

### Target Completion

End of Day 1 (2025-11-03)

---

## Phase 3: Candidate Ideas & Scoring ⏭️

### Tasks

- [ ] Generate `research/CANDIDATE_IDEAS.md` with 8-12 ideas
- [ ] Score each idea: Impact (1-10), Uniqueness (1-10), Feasibility (1-10)
- [ ] Calculate priority = Impact × Uniqueness × Feasibility
- [ ] Assign LOE (S/M/L) to each idea
- [ ] Select Top-3 beyond mandated features
- [ ] Write rationale paragraphs for Top-3 selections

### Scoring Methodology

```
Priority Score = Impact × Uniqueness × Feasibility
LOE: S (< 8 hours), M (8-20 hours), L (> 20 hours)
```

### Target Completion

End of Day 1 (2025-11-03)

---

## Phase 4: Mandated Features (CRITICAL PATH) ⏭️

### A. Favorite Movies (`research/favorite-movies`)

**Status**: Planning ⏭️  
**Priority**: MANDATED — Must implement  
**Target Completion**: Day 2-3

#### Commits Checklist

- [x] `chore(plan): add research plan for favorite movies` ✅ bb6b0d9
- [ ] `feat(prototype): add FavoriteMovies component with mock data`
- [ ] `feat(prototype): implement list/grid toggle, sort & filter`
- [ ] `feat(prototype): add native dialog trailer modal`
- [ ] `feat(prototype): add export JSON`
- [ ] `feat(prototype): add keyboard navigation and ARIA labels`
- [ ] `docs(readme): add README and research-notes`
- [ ] `docs(wireframes): add desktop and mobile wireframes`
- [ ] `test(a11y): add testing report with Lighthouse and axe-core`

#### Files to Deliver

- `README.md`, `FAVORITES_MOVIES.md`
- `prototype/FavoriteMovies.tsx` (≤200 LOC)
- `wireframes/desktop.png`, `wireframes/mobile.png`
- `research-notes/research-notes.md`
- `testing-report.md`
- `screenshots/` (4 images)

#### Acceptance Criteria

- List/Grid toggle working
- Sort by rating, filter by tag
- Export JSON via download
- Native `<dialog>` trailer modal with focus trap
- Keyboard shortcuts: Tab, Enter, `a`, `r`, `d`, Esc
- ARIA labels and role="status" announcements
- `loading="lazy"` on poster images
- `prefers-reduced-motion` support

---

### B. Homepage Revamp (`research/homepage-revamp`)

**Status**: Planning ⏭️  
**Priority**: MANDATED — Must implement  
**Target Completion**: Day 3-4

#### Commits Checklist

- [x] `chore(plan): add research plan for homepage revamp` ✅ 892378d
- [ ] `feat(prototype): add terminal hero with CTAs`
- [ ] `feat(prototype): add personal widgets area with lazy loading`
- [ ] `feat(prototype): embed FavoriteMovies via React.lazy`
- [ ] `feat(prototype): add responsive layout and keyboard nav`
- [ ] `docs(readme): add README and research-notes`
- [ ] `docs(wireframes): add desktop and mobile wireframes`
- [ ] `test(a11y): add testing report with performance metrics`

#### Files to Deliver

- `README.md`, `HOMEPAGE_REVAMP.md`
- `prototype/HomepageRevamp.tsx` (≤400 LOC)
- `prototype/HeroSection.tsx`, `prototype/PersonalWidgets.tsx`
- `wireframes/desktop.png`, `wireframes/mobile.png`
- `research-notes/research-notes.md`
- `testing-report.md`
- `screenshots/` (3 images)

#### Acceptance Criteria

- Terminal-style hero with typewriter effect
- Two CTAs: "cat ./resume.md" and "ls --impact"
- Personal widgets area with `React.lazy` + `Suspense`
- FavoriteMovies embedded with skeleton fallback
- Responsive layout (mobile/tablet/desktop)
- FMP ≤ 1.2s
- Keyboard accessible
- `prefers-reduced-motion` support

---

## Phase 5: Top-3 Prioritized Prototypes ⏭️

### C. Interactive Algorithm Playground

**Branch**: `research/interactive-algo-playground`  
**Status**: Planning ⏭️  
**Priority**: TOP-3  
**Target Completion**: Day 4-5

#### Commits Checklist

- [x] `chore(plan): add research plan for interactive-algo-playground` ✅ dd58599
- [ ] `feat(prototype): add bubble sort visualizer with mock data`
- [ ] `feat(prototype): add step/play/reset controls`
- [ ] `feat(prototype): add aria-live announcements`
- [ ] `feat(prototype): add speed control and algorithm selection`
- [ ] `docs(readme): add README and research-notes`
- [ ] `docs(wireframes): add desktop wireframe`
- [ ] `test(a11y): add testing report`

#### Minimal Viable Prototype

- Bubble Sort visualizer (SVG bars)
- Play / Pause / Step / Reset controls
- `aria-live="polite"` region for step announcements
- Speed control (0.5x, 1x, 2x)
- Keyboard shortcuts: Space, Right arrow, R

---

### D. Run It Cards (WebAssembly) — EXPLORATORY

**Branch**: `research/run-it-cards-wasm`  
**Status**: Planning ⏭️  
**Priority**: EXPLORATORY (requires WASM toolchain)  
**Target Completion**: Day 6-7 (if feasible)

#### Commits Checklist

- [x] `chore(plan): add research plan for run-it-cards-wasm` ✅ 84499bc
- [ ] `feat(prototype): add WASM module skeleton (Rust/C++)`
- [ ] `feat(prototype): add JS wrapper and game logic`
- [ ] `feat(prototype): add card rendering and animations`
- [ ] `feat(prototype): add lazy-load WASM with fallback`
- [ ] `docs(readme): add README with build instructions`
- [ ] `docs(wireframes): add desktop wireframe`
- [ ] `test(perf): add performance benchmarks`

#### Technical Notes

- **Risk**: Requires Rust/C++ toolchain (wasm-pack or Emscripten)
- **Fallback**: Pure JS implementation if WASM setup fails
- **Bundle Size**: WASM ≤ 50KB gzipped

---

### E. Git Replay Timeline

**Branch**: `research/git-replay-timeline`  
**Status**: Planning ⏭️  
**Priority**: TOP-3  
**Target Completion**: Day 5-6

#### Commits Checklist

- [x] `chore(plan): add research plan for git-replay-timeline` ✅ b1d9eb1
- [ ] `feat(prototype): add vis.js timeline with mock commits`
- [ ] `feat(prototype): add commit detail panel with diff preview`
- [ ] `feat(prototype): add play/pause timeline animation`
- [ ] `feat(prototype): add branch visualization and filtering`
- [ ] `feat(prototype): lazy-load vis.js with static fallback`
- [ ] `docs(readme): add README and research-notes`
- [ ] `docs(wireframes): add desktop wireframe`
- [ ] `test(a11y): add testing report`

#### Minimal Viable Prototype

- vis.js timeline with mock commits JSON
- Play/Pause animation
- Commit detail panel with diff preview
- Lazy-loaded vis.js (≈200KB) with static list fallback
- Branch filtering

---

## Phase 6: Issues & PRs ⏭️

### Tasks Per Feature

For each completed prototype:

1. [ ] Create GitHub Issue with template body
2. [ ] Include acceptance criteria checklist
3. [ ] Add accessibility checklist
4. [ ] Document "How to run locally" steps
5. [ ] Create PR from `research/<slug>` → `main`
6. [ ] Attach screenshots to PR
7. [ ] Complete PR checklist

### Issue Template (Reusable)

```markdown
Title: research: add <feature> prototype — research/<slug>

Summary: [Short description]
Branch: research/<slug>
Files added: [list]
How to run locally:
  1. cd research/<slug>/prototype
  2. npm install
  3. npm run dev
Acceptance criteria:
  - [ ] ...
Accessibility checklist:
  - [ ] ...
Performance notes:
  - lazy-load heavy libs, static fallback
References:
  - [link 1]
Labels: research, ui, a11y, prototype
```

---

## Phase 7: Testing & Validation ⏭️

### Per-Prototype Testing

For each feature:

- [ ] Run Lighthouse audit (record FMP, Accessibility score)
- [ ] Run axe-core automated checks
- [ ] Fix critical/serious accessibility issues
- [ ] Test `prefers-reduced-motion` behavior
- [ ] Create `testing-report.md` with:
  - Lighthouse summary screenshot
  - axe-core findings and fixes
  - Reduced-motion evidence (screenshots or steps)

### Commit Message

```
test(a11y): add testing report for <slug>
```

---

## Phase 8: Final Deliverables ⏭️

### Executive Summary

- [ ] Create `research/EXECUTIVE_SUMMARY.md` (1 page)
- [ ] Summarize decisions, branch names, commit list
- [ ] Link to all prototypes
- [ ] Recommend next production tasks

### Per-Branch CHANGELOG

- [ ] Update `research/<slug>/CHANGELOG.md` with commit summary
- [ ] Attach before/after screenshots

### Master Commit List

```bash
# Generate final commit log
git log --oneline --all --graph --decorate \
  research/favorite-movies \
  research/homepage-revamp \
  research/interactive-algo-playground \
  research/run-it-cards-wasm \
  research/git-replay-timeline
```

---

## Risk Management & Failure Modes

### Remote Push Issues ⚠️

**Current Status**: No `origin` remote configured  
**Impact**: Cannot push branches to GitHub  
**Mitigation**: Document in `research/FAILURE_MODE.md`

### WASM Toolchain Dependency

**Risk**: Run It Cards prototype requires Rust/C++ setup  
**Fallback**: Pure JS implementation + documentation

### External Library Licensing

**Risk**: vis.js, heavy dependencies  
**Mitigation**: Verify MIT/permissive licenses, document bundle sizes

---

## Progress Tracking

### Overall Completion

- **Phase 1 (Setup)**: 100% ✅
- **Phase 2 (Reconnaissance)**: 0% ⏭️
- **Phase 3 (Scoring)**: 0% ⏭️
- **Phase 4 (Mandated)**: 5% (plans created)
- **Phase 5 (Top-3)**: 5% (plans created)
- **Phase 6 (Issues/PRs)**: 0% ⏭️
- **Phase 7 (Testing)**: 0% ⏭️
- **Phase 8 (Deliverables)**: 0% ⏭️

### Daily Targets

- **Day 1 (Nov 3)**: Reconnaissance + Scoring + Start Favorites
- **Day 2-3**: Complete Favorites + Start Homepage
- **Day 4**: Complete Homepage + Start Algo Playground
- **Day 5**: Complete Algo Playground + Start Git Timeline
- **Day 6**: Complete Git Timeline + Testing
- **Day 7**: Final deliverables + PRs

---

## Resources & References

### Design System

- **Palette**: `#121619` (bg), `#d1e8e5` (text), `#7fd0bd` (info), `#ea5c2a` (action), `#fb3f58` (warn)
- **Fonts**: JetBrains Mono, Fira Code, Courier New
- **Animations**: `blink` (1s), `typewriter` (2s), `slide-in-underline` (0.2s)

### Tech Stack

- React 18.3.1, TypeScript, Tailwind CSS
- Vite, wouter (routing), next-themes
- shadcn/ui, Radix UI

### External Dependencies (Proposed)

- vis-timeline 7.x (Git Timeline)
- TMDb API (Favorite Movies, optional)
- wasm-pack (Run It Cards, optional)

---

## Contact & Escalation

**Owner**: Portfolio-Research-CodeAgent  
**Escalation Path**: See `research/FAILURE_MODE.md` for manual intervention steps

---

**Last Updated**: 2025-11-03 15:30 UTC  
**Next Update**: After Phase 2 completion
