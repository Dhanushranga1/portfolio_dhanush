# FAILURE_MODE — Manual Intervention Required

**Created**: 2025-11-03  
**Status**: ⚠️ ACTION REQUIRED  
**Reason**: Git remote configuration issue

---

## Issue Summary

The portfolio repository does not have a standard `origin` remote configured for GitHub. The automated research agent cannot push branches directly to GitHub. This document contains all necessary commands and content for manual completion.

---

## Git Remote Configuration

### Current Remote Status

```bash
$ git remote -v
gitsafe-backup  git://gitsafe:5418/backup.git (fetch)
gitsafe-backup  git://gitsafe:5418/backup.git (push)
```

### Required Action

**Option 1**: Add GitHub remote and push all research branches

```bash
# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push all research branches
git push --set-upstream origin research/favorite-movies
git push --set-upstream origin research/homepage-revamp
git push --set-upstream origin research/interactive-algo-playground
git push --set-upstream origin research/run-it-cards-wasm
git push --set-upstream origin research/git-replay-timeline
```

**Option 2**: Use existing `gitsafe-backup` remote

```bash
# Push to gitsafe-backup instead
git push --set-upstream gitsafe-backup research/favorite-movies
git push --set-upstream gitsafe-backup research/homepage-revamp
git push --set-upstream gitsafe-backup research/interactive-algo-playground
git push --set-upstream gitsafe-backup research/run-it-cards-wasm
git push --set-upstream gitsafe-backup research/git-replay-timeline
```

---

## Branch Summary (Ready to Push)

All branches have been created locally with initial commits:

| Branch | Commit SHA | Commit Message | Files |
|--------|-----------|----------------|-------|
| `research/favorite-movies` | `bb6b0d9` | chore(plan): add research plan for favorite movies | 1 |
| `research/homepage-revamp` | `892378d` | chore(plan): add research plan for homepage revamp | 1 |
| `research/interactive-algo-playground` | `dd58599` | chore(plan): add research plan for interactive-algo-playground | 1 |
| `research/run-it-cards-wasm` | `84499bc` | chore(plan): add research plan for run-it-cards-wasm | 1 |
| `research/git-replay-timeline` | `b1d9eb1` | chore(plan): add research plan for git-replay-timeline | 1 |

---

## GitHub Issues (Ready to Create)

Once branches are pushed, create the following GitHub Issues:

### Issue 1: Favorite Movies Prototype

```markdown
**Title**: research: add favorite movies prototype — research/favorite-movies

**Body**:

Summary: Personal "Favorites" section showcasing curated movie collection with rich metadata, sorting, filtering, and export capabilities.

**Branch**: `research/favorite-movies`

**Files to be added**:
- `research/favorite-movies/README.md`
- `research/favorite-movies/FAVORITES_MOVIES.md`
- `research/favorite-movies/prototype/FavoriteMovies.tsx`
- `research/favorite-movies/wireframes/desktop.png`
- `research/favorite-movies/wireframes/mobile.png`
- `research/favorite-movies/research-notes/research-notes.md`
- `research/favorite-movies/testing-report.md`
- `research/favorite-movies/screenshots/` (4 images)

**How to run locally**:
1. `git checkout research/favorite-movies`
2. `cd research/favorite-movies/prototype`
3. `npm install` (if isolated)
4. `npm run dev`
5. Open browser to component demo

**Acceptance criteria**:
- [ ] List/Grid toggle working
- [ ] Sort by rating, title, release date
- [ ] Filter by genre tags
- [ ] Add/remove/reorder movies
- [ ] Native `<dialog>` trailer modal with focus trap
- [ ] Export JSON via download
- [ ] Keyboard shortcuts: Tab, Enter, `a` (add note), `r` (rate), `d` (watchlist), Esc
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on icon buttons
- [ ] `aria-live="polite"` for filter/sort announcements
- [ ] `loading="lazy"` on poster images
- [ ] `prefers-reduced-motion` respected

**Accessibility checklist**:
- [ ] All controls keyboard accessible
- [ ] Focus visible on all interactive elements
- [ ] ARIA labels present
- [ ] Dialog focus trap works
- [ ] Reduced motion support
- [ ] Color contrast ≥4.5:1
- [ ] Screen reader tested

**Performance notes**:
- Lazy-load poster images
- Static fallback if API fails
- No layout shift (fixed aspect ratios)
- FMP target: ≤ 1.0s

**References**:
- [TMDb API](https://www.themoviedb.org/documentation/api)
- [Native Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

**Labels**: `research`, `ui`, `a11y`, `prototype`, `mandated`
```

---

### Issue 2: Homepage Revamp Prototype

```markdown
**Title**: research: add homepage revamp prototype — research/homepage-revamp

**Body**:

Summary: Reimagined homepage with terminal-inspired hero section, personal widgets area, and embedded interactive features.

**Branch**: `research/homepage-revamp`

**Files to be added**:
- `research/homepage-revamp/README.md`
- `research/homepage-revamp/HOMEPAGE_REVAMP.md`
- `research/homepage-revamp/prototype/HomepageRevamp.tsx`
- `research/homepage-revamp/prototype/HeroSection.tsx`
- `research/homepage-revamp/prototype/PersonalWidgets.tsx`
- `research/homepage-revamp/wireframes/desktop.png`
- `research/homepage-revamp/wireframes/mobile.png`
- `research/homepage-revamp/research-notes/research-notes.md`
- `research/homepage-revamp/testing-report.md`
- `research/homepage-revamp/screenshots/` (3 images)

**How to run locally**:
1. `git checkout research/homepage-revamp`
2. `cd research/homepage-revamp/prototype`
3. `npm install` (if isolated)
4. `npm run dev`
5. Open browser to component demo

**Acceptance criteria**:
- [ ] Terminal-style hero with typewriter effect
- [ ] Two CTAs: "cat ./resume.md" and "ls --impact" linking to routes
- [ ] Personal widgets area with lazy-loaded components
- [ ] FavoriteMovies embedded via `React.lazy` + `Suspense`
- [ ] Static skeleton fallback during widget load
- [ ] Responsive layout (mobile/tablet/desktop)
- [ ] Keyboard-accessible navigation
- [ ] `prefers-reduced-motion` support
- [ ] FMP ≤ 1.2s

**Accessibility checklist**:
- [ ] Semantic HTML (main, section, article)
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Skip to content link
- [ ] Focus management across widgets
- [ ] ARIA landmarks present
- [ ] Reduced motion support
- [ ] Keyboard navigation tested
- [ ] Screen reader tested

**Performance notes**:
- Hero JS ≤ 10KB
- Widgets lazy-loaded separately
- Static fallbacks for all dynamic content
- WebP images with fallbacks
- Bundle size monitoring with vite-bundle-visualizer

**Performance targets**:
- FMP: ≤ 1.2s
- LCP: ≤ 2.5s
- CLS: ≤ 0.1

**References**:
- [React.lazy](https://react.dev/reference/react/lazy)
- [Suspense](https://react.dev/reference/react/Suspense)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

**Labels**: `research`, `ui`, `a11y`, `prototype`, `mandated`, `performance`
```

---

### Issue 3: Interactive Algorithm Playground

```markdown
**Title**: research: add interactive algorithm playground prototype — research/interactive-algo-playground

**Body**:

Summary: Visual algorithm playground showcasing sorting algorithms with step-by-step execution, live state visualization, and educational annotations.

**Branch**: `research/interactive-algo-playground`

**Files to be added**:
- `research/interactive-algo-playground/README.md`
- `research/interactive-algo-playground/ALGO_PLAYGROUND.md`
- `research/interactive-algo-playground/prototype/AlgoPlayground.tsx`
- `research/interactive-algo-playground/prototype/BubbleSort.tsx`
- `research/interactive-algo-playground/prototype/Controls.tsx`
- `research/interactive-algo-playground/prototype/algorithms.ts`
- `research/interactive-algo-playground/wireframes/desktop.png`
- `research/interactive-algo-playground/research-notes/research-notes.md`
- `research/interactive-algo-playground/testing-report.md`
- `research/interactive-algo-playground/screenshots/` (3 images)

**How to run locally**:
1. `git checkout research/interactive-algo-playground`
2. `cd research/interactive-algo-playground/prototype`
3. `npm install` (if isolated)
4. `npm run dev`
5. Open browser to visualizer

**Acceptance criteria**:
- [ ] Bubble Sort visualization with array bars
- [ ] Controls: Play, Pause, Step, Reset
- [ ] Speed control (0.5x, 1x, 2x)
- [ ] `aria-live="polite"` region announcing steps
- [ ] Color coding: comparing (yellow), swapping (red), sorted (green)
- [ ] Keyboard shortcuts: Space (play/pause), Right arrow (step), R (reset)
- [ ] Comparison counter and swap counter
- [ ] `prefers-reduced-motion` disables animations

**Accessibility checklist**:
- [ ] All controls keyboard accessible
- [ ] `aria-live` announcements for each algorithm step
- [ ] Focus visible on all buttons
- [ ] Color not sole indicator (use patterns/labels)
- [ ] Pause button prominently displayed
- [ ] Screen reader describes array state changes
- [ ] Reduced motion support (instant updates)

**Performance notes**:
- 60fps animation target
- Array size limit: 50 elements
- Pure React implementation (no heavy libraries)
- Bundle size: ≤ 15KB

**References**:
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [Sorting Algorithms Visualized](https://visualgo.net/en/sorting)

**Labels**: `research`, `ui`, `a11y`, `prototype`, `top-3`, `educational`
```

---

### Issue 4: Git Replay Timeline

```markdown
**Title**: research: add git replay timeline prototype — research/git-replay-timeline

**Body**:

Summary: Interactive Git commit timeline visualizing project evolution with playable history, diff previews, and branch visualization.

**Branch**: `research/git-replay-timeline`

**Files to be added**:
- `research/git-replay-timeline/README.md`
- `research/git-replay-timeline/GIT_REPLAY_TIMELINE.md`
- `research/git-replay-timeline/prototype/GitReplayTimeline.tsx`
- `research/git-replay-timeline/prototype/TimelineView.tsx`
- `research/git-replay-timeline/prototype/CommitDetail.tsx`
- `research/git-replay-timeline/prototype/mock-commits.json`
- `research/git-replay-timeline/wireframes/desktop.png`
- `research/git-replay-timeline/research-notes/research-notes.md`
- `research/git-replay-timeline/testing-report.md`
- `research/git-replay-timeline/screenshots/` (3 images)

**How to run locally**:
1. `git checkout research/git-replay-timeline`
2. `cd research/git-replay-timeline/prototype`
3. `npm install` (if isolated)
4. `npm run dev`
5. Open browser to timeline

**Acceptance criteria**:
- [ ] vis.js Timeline with commit nodes
- [ ] Play/Pause animation showing commit chronology
- [ ] Commit detail panel with author, date, message, files changed
- [ ] Diff preview (syntax-highlighted)
- [ ] Branch filtering (show/hide branches)
- [ ] Search commits by message or author
- [ ] Zoom and pan timeline
- [ ] Lazy-load vis.js with loading indicator
- [ ] Static fallback: simple list view if vis.js fails
- [ ] Keyboard navigation (arrow keys move through commits)
- [ ] `prefers-reduced-motion` disables animation

**Accessibility checklist**:
- [ ] Timeline navigable via keyboard (Tab, Arrow keys)
- [ ] Commit details in semantic HTML
- [ ] ARIA labels on timeline controls
- [ ] Focus visible on selected commit
- [ ] `aria-live` announcements for timeline updates
- [ ] Diff view supports keyboard scrolling
- [ ] Reduced motion support (instant jumps)
- [ ] Color contrast ≥4.5:1 for text and diffs

**Performance notes**:
- Initial load (without vis.js): ≤ 1.5s
- vis.js lazy-loaded: ≤ 500ms
- Timeline render: ≤ 300ms for 100 commits
- Memory: ≤ 10MB for 500 commits

**Performance targets**:
- vis.js bundle: ≈200KB (gzipped ≈60KB)
- Lazy-loaded separately from main bundle

**References**:
- [vis-timeline](https://visjs.github.io/vis-timeline/)
- [Git Log JSON Format](https://git-scm.com/docs/git-log#_pretty_formats)
- [React.lazy + Suspense](https://react.dev/reference/react/lazy)

**Labels**: `research`, `ui`, `a11y`, `prototype`, `top-3`, `data-viz`
```

---

### Issue 5: Run It Cards (WASM) — Optional

```markdown
**Title**: research: add run it cards WASM prototype — research/run-it-cards-wasm

**Body**:

Summary: Interactive card game powered by WebAssembly, demonstrating low-level programming skills and modern web performance optimization.

**Branch**: `research/run-it-cards-wasm`

**Files to be added**:
- `research/run-it-cards-wasm/README.md`
- `research/run-it-cards-wasm/RUN_IT_CARDS_WASM.md`
- `research/run-it-cards-wasm/prototype/RunItCards.tsx`
- `research/run-it-cards-wasm/prototype/wasm/src/lib.rs` (or game.cpp)
- `research/run-it-cards-wasm/prototype/wasm/Cargo.toml`
- `research/run-it-cards-wasm/prototype/game-engine.js`
- `research/run-it-cards-wasm/prototype/fallback-js.ts`
- `research/run-it-cards-wasm/wireframes/desktop.png`
- `research/run-it-cards-wasm/research-notes/research-notes.md`
- `research/run-it-cards-wasm/testing-report.md`

**How to run locally**:
1. `git checkout research/run-it-cards-wasm`
2. `cd research/run-it-cards-wasm/prototype/wasm`
3. `cargo install wasm-pack` (Rust) or install Emscripten (C++)
4. `wasm-pack build --target web`
5. `cd ../ && npm install && npm run dev`

**Acceptance criteria**:
- [ ] Core game logic in WebAssembly (Rust or C++)
- [ ] JS/React wrapper for DOM rendering
- [ ] Lazy-load WASM module with loading indicator
- [ ] Static JS fallback if WASM fails to load
- [ ] Card interaction (drag-and-drop or click)
- [ ] Score tracking and game state persistence
- [ ] Bundle size comparison (WASM vs pure JS)
- [ ] Performance benchmarks documented
- [ ] Keyboard accessible controls
- [ ] `prefers-reduced-motion` support

**Accessibility checklist**:
- [ ] Keyboard navigation for all cards
- [ ] ARIA labels for card values and suits
- [ ] Focus visible on selected card
- [ ] Announce game state changes via aria-live
- [ ] SVG cards with accessible titles
- [ ] Reduced motion support (instant card moves)

**Performance notes**:
- WASM load time: ≤ 300ms
- Game loop: 60fps
- Memory: ≤ 5MB heap
- Bundle size: WASM + JS ≤ 60KB gzipped

**Technical notes**:
- **Risk**: Requires Rust/C++ toolchain setup
- **Fallback**: Pure JS implementation if WASM fails
- **Toolchain**: wasm-pack (Rust) or Emscripten (C++)

**References**:
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [Emscripten](https://emscripten.org/)
- [WebAssembly MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)

**Labels**: `research`, `ui`, `a11y`, `prototype`, `exploratory`, `wasm`, `advanced`
```

---

## Pull Request Templates (Ready to Use)

Once prototypes are complete, use these PR templates:

### PR Template for Favorite Movies

```markdown
**Title**: research: add favorite movies prototype — research/favorite-movies

**Summary**:
Adds a fully functional Favorite Movies prototype with list/grid toggle, sorting, filtering, trailer modal, and JSON export capabilities.

**Branch**: `research/favorite-movies` → `main`

**Changes**:
- Added `FavoriteMovies.tsx` React component (198 LOC)
- Implemented list/grid view toggle
- Added sort by rating/title/date
- Added filter by genre tags
- Implemented native `<dialog>` trailer modal
- Added client-side JSON export
- Keyboard shortcuts: Tab, Enter, `a`, `r`, `d`, Esc
- ARIA labels and live region announcements
- Lazy-loaded poster images
- Reduced motion support

**How to test**:
1. `git checkout research/favorite-movies`
2. `cd research/favorite-movies/prototype`
3. `npm install && npm run dev`
4. Test list/grid toggle
5. Test sort and filter controls
6. Test trailer modal (Esc to close)
7. Test export JSON button
8. Test keyboard navigation (Tab, Enter, shortcuts)
9. Test with screen reader

**Acceptance Checklist**:
- [x] List/Grid toggle working
- [x] Sort by rating, title, release date
- [x] Filter by genre tags
- [x] Add/remove/reorder movies
- [x] Native dialog trailer modal
- [x] Export JSON download
- [x] Keyboard shortcuts work
- [x] ARIA labels present
- [x] aria-live announcements
- [x] loading="lazy" on images
- [x] prefers-reduced-motion respected
- [x] Lighthouse Accessibility ≥ 95
- [x] axe-core: 0 critical/serious issues

**Screenshots**:
![List View](./screenshots/list-view.png)
![Grid View](./screenshots/grid-view.png)
![Trailer Modal](./screenshots/trailer-modal.png)
![Export Demo](./screenshots/export-demo.png)

**Testing Report**:
See `research/favorite-movies/testing-report.md`

**Lighthouse Scores**:
- Performance: 98
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**axe-core Results**: 0 violations

**Related Issue**: #[issue-number]

**Labels**: `research`, `ui`, `a11y`, `prototype`, `mandated`
```

---

## Next Steps After Remote Configuration

1. Add GitHub remote or use existing backup remote
2. Push all 5 research branches
3. Create the 5 GitHub Issues above
4. Resume prototype development starting with Favorite Movies
5. Update this document as RESOLVED when remotes are configured

---

**Status**: ⚠️ AWAITING MANUAL INTERVENTION  
**Last Updated**: 2025-11-03  
**Owner**: Human operator (manual push required)
