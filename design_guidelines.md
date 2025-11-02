# Design Guidelines: Dhanush Ranga Gopisetty Portfolio

## Design Approach

**Reference-Based Approach**: Inspired by refact0r.dev, Rasmus Andersson's blog, and terminal-based developer portfolios. The design embraces a minimalist code/terminal aesthetic with monospace typography, very dark backgrounds, and text-based interfaces reminiscent of command-line environments.

**Core Principles**:
1. **Terminal Aesthetic**: Text-based interfaces, minimal visual decoration
2. **Monospace Everything**: Consistent typeface across all content
3. **Information Density**: Efficient use of space, list-based layouts
4. **Subtle Interactions**: Underlines, brackets, cursor indicators instead of animations

## Typography System

**Fonts via Google Fonts**:
- Primary: "JetBrains Mono" or "Fira Code" (all text content)
- Fallback: "Courier New", monospace

**Hierarchy** (achieved through size and weight only):
- Page Headers: text-4xl to text-5xl, font-weight-700
- Section Headers: text-2xl to text-3xl, font-weight-600
- Content Headers: text-xl, font-weight-600
- Body Text: text-base, font-weight-400
- Metadata: text-sm, font-weight-400
- All text uses increased letter-spacing (tracking-wide)

## Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Grid Structure**:
- Container: max-w-4xl centered (narrower for terminal feel)
- Consistent left padding: pl-4 or pl-6 (terminal prompt simulation)
- Section spacing: space-y-12 to space-y-16
- Line spacing: leading-relaxed (1.75) for readability

**Terminal Decorations**:
- Prompt indicators: ">" or "$" prefix for sections
- Separators: ASCII lines (─────) or simple borders
- Brackets: [text] for metadata, tags
- Cursor: Blinking underscore or block for active states

## Page Layouts

### Homepage
**Terminal Boot Sequence**: Opening animation showing ASCII art name or simple text fade-in of "dhanush@portfolio:~$"
**Header Section**: Name as h1 (text-4xl), tagline below (text-lg), simple navigation links as text list
**About Block**: Paragraph-style bio, max-w-3xl, no decorative elements
**Projects List**: Simple ordered/unordered list format:
```
Projects
--------
[01] Project Name - Brief description (tech, tech, tech) → Link
[02] Project Name - Brief description (tech, tech, tech) → Link
```
**Recent Posts**: Same list format with dates in [YYYY-MM-DD] format
**Contact/Links**: Simple text links with arrows (→) as separators

### Projects Page
**List Layout**: Single column, full-width container
**Project Entries**:
- Header: [##] Project Name
- Metadata: [date] | [category] | [tech stack]
- Description: Paragraph text
- Links: → Live Demo | → Source Code
- Separator: Horizontal line between entries
**Filter Navigation**: Text-based links at top: "all | web | mobile | design"

### Blog Page
**Article List**: Chronological, no thumbnails
**Entry Format**:
```
[2024-01-15] Article Title
    Category: Development | Read Time: 5 min
    Excerpt text here...
    → Read More
```
**Article Detail**: 
- Full-width text (max-w-3xl)
- Inline code blocks with subtle background
- Blockquotes with left border indicator
- Headings with "##" or "###" prefixes

### Photo Gallery
**Grid Layout**: Simple 2-column (md) to 3-column (lg) grid
**Image Presentation**: Aspect-ratio boxes, minimal borders
**Caption Format**: [filename.jpg] below each image
**Lightbox**: Full-screen overlay, simple prev/next text navigation

### Message Board
**Terminal Chat Interface**: Messages displayed like console output
**Entry Format**:
```
[anon-user-id] @ [timestamp]
> Message content here
```
**Input**: Simple textarea with "> " prefix, submit as text link
**Layout**: Reverse chronological, max-w-3xl

### About Page
**Single Column**: Comprehensive bio sections
**Skills Section**: List format with proficiency indicators
```
Languages & Tools
-----------------
JavaScript/TypeScript  [████████░░] 80%
React/Next.js          [█████████░] 90%
```
**Timeline**: Simple date-aligned list of experiences

## Component Library

### Navigation
**Header**: Fixed top bar with text links, no background initially, border-bottom on scroll
**Link Format**: Underline on hover only, current page has "> " prefix
**Mobile**: Stacked text menu, full-screen overlay with dark background

### Buttons & Links
**Primary Links**: Underlined text with "→" suffix
**Active States**: Brackets around text [link] or inverse background
**External Links**: "↗" suffix indicator
**No button components**: All interactions are text-based links

### Lists & Data Display
**Project/Post Cards**: No cards - simple list entries with metadata
**Tags**: [tag] format, space-separated
**Dates**: [YYYY-MM-DD] or relative format in brackets
**Status Indicators**: [active] [archived] [wip] in brackets

### Forms
**Inputs**: Single-line bottom border, no rounded corners
**Textareas**: Minimal border, monospace font
**Labels**: Text above input, no special styling
**Validation**: Inline text messages, ✓ or ✗ symbols

### Code Blocks
**Inline Code**: Subtle background, same monospace font
**Code Blocks**: Slightly different background, line numbers optional
**Syntax Highlighting**: Minimal, 2-3 accent colors maximum

## Interactions & Animations

**Minimal Motion**: 
- Cursor blink on active inputs
- Simple fade transitions (200ms)
- No hover transforms, scales, or rotations
- Text underline on link hover only

**Page Transitions**: Quick fade (150ms) between routes

**Scroll Behavior**: Smooth scroll for anchor links, no parallax effects

## Images

**No Hero Images**: Homepage is text-only

**Project Screenshots**: Include as necessary in project detail views, full-width or inline, simple border treatment

**Photo Gallery**: Only page with heavy image use, minimal presentation

**About Page**: Optional small avatar/headshot (128x128px, square)

**All images**: Sharp edges (no border-radius), thin border if needed

## Accessibility

- High contrast text (light on very dark background)
- Focus indicators: Visible outline or inverse background
- Touch targets: Minimum 44px height for links
- Keyboard navigation: Full support with focus states
- Screen reader: Semantic HTML, proper heading hierarchy
- Skip links: "Skip to content" at top

## Technical Specifications

- Framework: Next.js with App Router
- Styling: Tailwind CSS with monospace font configuration
- Icons: Minimal use - prefer text symbols (→ ↗ ✓ ✗)
- State: Local state or lightweight CMS
- Database: Message board persistence
- Performance: No heavy animations, optimized images only where used