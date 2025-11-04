# ENHANCEMENT_PLAN_RESEARCH: Favorite Movies

Branch: `research/favorite-movies`  
Status: 🔄 IN-PROGRESS  
Owner: Portfolio-Research-CodeAgent

---

## Overview

Personal "Favorites" section showcasing curated movie collection with rich metadata, sorting, filtering, and export capabilities. Demonstrates content curation and data presentation skills.

---

## Commit Checklist

- [ ] `chore(plan): add research plan for favorite movies`
- [ ] `feat(prototype): add FavoriteMovies component with mock data`
- [ ] `feat(prototype): implement list/grid toggle, sort & filter`
- [ ] `feat(prototype): add native dialog trailer modal`
- [ ] `feat(prototype): add export JSON`
- [ ] `feat(prototype): add keyboard navigation and ARIA labels`
- [ ] `docs(readme): add README and research-notes`
- [ ] `docs(wireframes): add desktop and mobile wireframes`
- [ ] `test(a11y): add testing report with Lighthouse and axe-core`

---

## Files to Create

```
research/favorite-movies/
├── README.md                     # Summary & tech decisions
├── FAVORITES_MOVIES.md           # Full specification
├── ENHANCEMENT_PLAN_RESEARCH.md  # This file
├── testing-report.md             # Lighthouse + axe-core results
├── prototype/
│   ├── FavoriteMovies.tsx        # Main React component (≤200 LOC)
│   ├── package.json              # Dependencies (if isolated)
│   └── mock-data.json            # Sample movie data
├── wireframes/
│   ├── desktop.png
│   └── mobile.png
├── research-notes/
│   └── research-notes.md         # References, integration notes, a11y checklist
└── screenshots/
    ├── list-view.png
    ├── grid-view.png
    ├── trailer-modal.png
    └── export-demo.png
```

---

## Features (Acceptance Criteria)

- [x] List/Grid toggle with visual mode indicator
- [x] Sort by: rating, title, release date
- [x] Filter by: genre tags
- [x] Add/remove/reorder movies (client-side state)
- [x] Native `<dialog>` trailer modal with focus trap
- [x] Export JSON via `data:application/json,` download
- [x] Keyboard shortcuts:
  - `Tab` navigation
  - `Enter` opens movie details
  - `a` add note
  - `r` rate movie
  - `d` toggle watchlist
  - `Esc` closes modal
- [x] ARIA labels and `role="status"` announcements
- [x] `loading="lazy"` on poster images
- [x] `prefers-reduced-motion` respected

---

## Technical Decisions

- **UI Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS with Hybrid Terminal palette
- **Data Source**: TMDb API (recommended) or static JSON mock
- **Modal**: Native `<dialog>` element (no heavy dependencies)
- **State Management**: React hooks (useState, useReducer)
- **Bundle Size**: No additional libraries beyond existing stack

---

## Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all controls
- [ ] ARIA labels on icon buttons
- [ ] `aria-live="polite"` for filter/sort announcements
- [ ] Dialog focus trap and Esc handler
- [ ] Reduced motion support
- [ ] Color contrast ≥4.5:1
- [ ] Screen reader tested

---

## Performance Targets

- First Meaningful Paint (FMP): ≤ 1.0s
- Lazy-load poster images
- Static fallback if API fails
- No layout shift (fixed aspect ratios)

---

## Next Steps

1. ✅ Create branch and directory structure
2. ⏭️ Generate mock movie data JSON
3. ⏭️ Build FavoriteMovies.tsx prototype
4. ⏭️ Create wireframes
5. ⏭️ Write README and research notes
6. ⏭️ Run Lighthouse and axe-core tests
7. ⏭️ Create GitHub Issue and PR

---

**Last Updated**: 2025-11-03  
**Commits**: 0 / 9 planned
