# Agent Prompt — “Hybrid Terminal” UI Upgrade (drop-in for your code agent)

Use this entire prompt as the instruction for the code agent that has direct access to the project repository (read/write), can run the project locally, and can open branches / create PRs.

---

You are an implementation agent. Your job: read the attached design guides, generate a short, prioritized action plan, then *implement* the plan in the repository — creating a feature branch, making small, focused commits, and opening a PR with screenshots, a changelog, and a short accessibility report.

Important references you must follow precisely while designing and implementing:

* “The Hybrid Terminal” blueprint and implementation suggestions. 
* Enhanced UI & Visual Design (color, micro-interactions, font guidance). 
* Dark Theme & Accent Colors (palette guidance + accessibility & motion constraints). 

## Controls & constraints (non-negotiable)

1. Preserve existing content-first, multi-page site structure. Do **not** convert to a single-page “terminal-only” app. (Actionable guidance is in the Hybrid Terminal blueprint.) 
2. Accessibility first: every animation must respect `prefers-reduced-motion`; keyboard nav and screen-reader semantics must be correct (skip links, `role="log"`, appropriate headings, `aria-*` on command palette). 
3. Keep motion subtle (150–200ms fades, blink cursor ~1s) and avoid scale/rotate animations. 
4. Use a single primary accent color site-wide (mint/teal or coral/orange variants from docs). Update Tailwind config with the curated palette.

---

## Phase A — Immediate action plan (generate then implement)

**Task A0 — Auto-generate an implementation plan (your first commit must be this plan):**

* Create branch: `enhance/hybrid-terminal` from `main` (or the repo’s default branch).
* Create a short plan file at `/ENHANCEMENT_PLAN.md` listing prioritized work items, per-item acceptance criteria, and estimated dev steps (each item 1–3 sub-steps). Commit this as `chore(plan): add hybrid-terminal enhancement plan`.

**Task A1 — Theming & Tailwind**

* Add the curated “Hybrid Terminal” palette to `tailwind.config.js` (bg-primary `#121619`, text-primary `#d1e8e5`, accent-info `#7fd0bd`, accent-action `#ea5c2a`, warn `#fb3f58` — or the equivalent chosen from docs). Ensure semantic names (e.g., `--color-accent`, `text-accent`) and Tailwind tokens.
* Ensure dark-mode strategy (class-based) is consistent across site. Commit message: `feat(theme): add curated hybrid-terminal color palette & dark mode`.

**Task A2 — Fonts**

* Add and preload chosen monospace fonts (recommend Geist Mono for body + Commit Mono for headers; fall back to JetBrains Mono if unavailable). Implement `font-display: swap`, self-host or CDN as allowed by repo. Update `globals.css` (or equivalent) and Tailwind `fontFamily`.
* Commit: `feat(typography): install & preload monospace font system`.

**Task A3 — Command Palette (interaction)**

* Implement a global Command Palette using `shadcn/ui` (cmdk-based) or a lightweight command palette component:

  * Bind to `Cmd/Ctrl+K` and `/` as triggers.
  * Actions: navigate to Home, Projects, Blog; Download CV; Toggle Theme; Open GitHub; Open LinkedIn.
  * Accessible roles: dialog + combobox semantics; `aria-modal="true"`; input has `aria-expanded` and `aria-controls`. 
* Provide keyboard-first fallback (a visually-hidden link for devices without key support).
* Commit: `feat(command): add global command palette (cmdk/shadcn)`.

**Task A4 — Presentation: Boot Sequence (purely presentational)**

* Add a short boot/ASCII intro visible on first load only (or until “skip” is clicked). Implementation notes:

  * Use `<pre aria-hidden="true">` with CSS-only typewriter effect for visuals and a *static* `Loading portfolio...` element with `role="status"` for SR users.
  * Wrap animation code in `@media (prefers-reduced-motion: reduce)` with fallback to static content.
* Commit: `feat(boot): add accessible boot sequence (prefers-reduced-motion aware)`.

**Task A5 — Micro-interactions & component polish**

* Implement:

  * Passing-underline / bracket-on-hover link style for nav and inline links. 
  * Prompt-style prefixes for active nav items (e.g., `> projects`) and hover prefix `>` for list items.
  * ASCII progress bars for skills with an on-scroll reveal (animate width from 0 to value; disable in reduced-motion). 
  * Blinking caret in inputs/command prompt (~1s), disabled in reduced-motion. 
* Commit per component: `feat(ui): add link hover & prompt prefix`, `feat(skills): ascii progress bars`, etc.

**Task A6 — Content format: projects as `ls --impact`**

* Replace or add a Projects listing view that displays each project as terminal-like output:

  * Status tag `[OK] name`, comment line `// High-impact bullet`, and action links `→ [live] [source]`.
  * Maintain semantic HTML (use `<ul>`/`<li>` and proper headings) for accessibility. 
* Commit: `feat(content): add ls --impact projects format`.

**Task A7 — Accessibility & testing**

* Run Lighthouse (or axe) and record issues. Fix: color contrast, focus-visible states, ARIA attributes, and skip-links.
* Add automated checks (CI): run a11y (axe-core) against main pages, and run unit tests/snapshots for critical components (command palette existence, theme toggling).
* Commit: `test(a11y): run and fix initial lighthouse/axe issues`.

**Task A8 — Docs & PR**

* Update `README.md` with a short “Design upgrades” section.
* Open a Pull Request from `enhance/hybrid-terminal` -> default branch with:

  * Title: `feat: hybrid-terminal UI & accessibility upgrade`
  * PR body: short summary, list of changed files, screenshots (desktop + mobile), accessibility summary (Lighthouse score before/after, major fixes), testing steps, and a link to `/ENHANCEMENT_PLAN.md`.
* Create tags in the PR body to reviewers: “ui”, “accessibility”, “frontend”.
* Create at least one follow-up Issue for remaining polish items (e.g., animations refinement, perf budgets, deeper visual QA).

---

## Acceptance criteria (must pass before PR is ready)

1. A working Command Palette bound to `Cmd/Ctrl+K` and `/`, with the required actions and proper ARIA semantics. (Manual test steps in PR). 
2. Theme palette updated in `tailwind.config.js` and used across header/footer/links/CTAs. All text meets WCAG AA contrast on default pages.
3. Boot sequence present, visually interesting, hidden from screen readers (`aria-hidden="true"`), and replaced by a polite SR-friendly message. `prefers-reduced-motion` disables the animation.
4. Link hover/active/focus styles implemented (passing underline or bracket style) and focus-visible is obvious. 
5. Projects page contains at least one `ls --impact` formatted item with proper semantic HTML and links. 
6. Automated accessibility check (axe or Lighthouse) shows no high-severity accessibility violations on Home & Projects pages. Include before/after screenshots and scores in PR.
7. Branch has clean, focused commits (one feature per commit) and a clear PR description + checklist.

---

## Implementation & engineering guidelines (style + commit examples)

* Create small commits. Commit message style: `<type>(scope): short description` where `<type>` in {feat, fix, chore, docs, test, refactor}. Example: `feat(command): add global cmd palette and basic actions`.
* If adding libraries, prefer lightweight and actively maintained packages (e.g., `cmdk` / `shadcn/ui` for command palette). Avoid huge UI frameworks that change layout semantics. 
* Respect existing coding conventions and linting. Run `npm test`, `npm run build` (or repo’s equivalents) before committing.
* Add unit tests or component snapshots for new components (command palette, BootSequence, ProjectList). Use existing test runner (Jest/Playwright) if present.

---

## Deliverables (what to attach to the PR)

1. `/ENHANCEMENT_PLAN.md` (first commit) — the generated plan and priorities.
2. Branch: `enhance/hybrid-terminal` with commits per feature.
3. PR with:

   * 3–5 annotated screenshots (desktop & mobile) showing: theme, command palette open, boot sequence, projects `ls --impact`.
   * Accessibility summary: Lighthouse or axe scores before/after; list of fixed high-severity issues.
   * How to test locally (commands), keyboard shortcuts, and a short list of manual acceptance steps.
4. A single-file changelog entry (e.g., `CHANGELOG.md` entry) summarizing user-facing changes.

---

## If you encounter unknown decisions, act like this (do not block):

* If font licensing or hosting is ambiguous — use JetBrains Mono as fallback and document the choice in `/ENHANCEMENT_PLAN.md`. 
* If an existing component conflicts heavily with the new palette, prefer a minimal override (Tailwind variables) rather than replacing the entire component library. Document any trade-offs in the plan.

---

## Final note to the agent (tone & ownership)

You are the implementer: generate the plan, commit it, then implement the prioritized items one-by-one with clean commits. Open the PR when all acceptance criteria above are satisfied. In the PR description include manual test steps, screenshots, and the accessibility audit. Treat accessibility and content-first readability as equal priorities to “cool” visuals. The attached design guides should be treated as the source of truth for visual and accessibility decisions.

---

Would you like me to convert this prompt into a single-file `AGENT_INSTRUCTION.md` ready for pasting into your code agent, or should I generate the initial `/ENHANCEMENT_PLAN.md` now and show a suggested branch/commit sequence?
