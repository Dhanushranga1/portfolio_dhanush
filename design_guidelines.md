# Design Guidelines: Dhanush Ranga Gopisetty Portfolio

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern portfolio sites like Awwwards winners, Bruno Simon's portfolio, and the minimalist aesthetic of Linear combined with the playfulness of uiverse.io components. The design emphasizes bold typography, generous whitespace, and carefully placed micro-interactions.

## Core Design Principles

1. **Bold Minimalism**: Large typography, generous spacing, purposeful negative space
2. **Micro-Interactions**: Subtle animations inspired by 60fps.design - hover states, reveal effects, smooth transitions
3. **Modern Brutalism**: Strong typography hierarchy with unexpected UI elements from uiverse.io
4. **Content-First**: Let work and writing breathe with minimal chrome

## Typography System

**Fonts via Google Fonts/Fontshare**:
- Display/Headings: "Clash Display" or "Cabinet Grotesk" (bold, modern, geometric)
- Body: "General Sans" or "Satoshi" (clean, highly legible)
- Mono/Code: "JetBrains Mono" for technical content

**Hierarchy**:
- Hero Name: 4xl to 8xl (responsive), font-weight 700-800, tight letter-spacing
- Section Headings: 3xl to 5xl, font-weight 700
- Subsection Headings: xl to 2xl, font-weight 600
- Body Text: base to lg, font-weight 400-500, increased line-height (1.7-1.8)
- Captions/Meta: sm to base, font-weight 400

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm

**Grid Structure**:
- Container: max-w-7xl centered with px-6 to px-12
- Section Padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component Spacing: gap-6 to gap-12 between major elements

**Responsive Breakpoints**:
- Mobile-first approach
- Grid columns: 1 (mobile) → 2 (md) → 3 (lg) for galleries
- Stack to side-by-side at md breakpoint for content sections

## Page Layouts

### Homepage
- **Hero Section** (min-h-screen): Full-screen introduction with large animated typography displaying "Dhanush Ranga Gopisetty" with staggered fade-in. Tagline below (text-xl). Minimal scroll indicator. No background image - pure typography focus with gradient mesh effect.
- **Featured Work Grid**: 2-3 large project cards with hover-triggered reveal effects
- **Quick Bio**: Single column, max-w-3xl, large readable text
- **Recent Posts**: Horizontal scroll cards for latest blog entries
- **CTA Section**: Prominent message board invitation

### Projects Gallery
- **Masonry Grid Layout**: Responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Project Cards**: Image with overlay, title, tech stack tags, animated border on hover
- **Filter Bar**: Pill-style category filters with active state indicators
- **Detail Modal**: Full-screen overlay with project images, description, tech stack, links

### Blog (CMS)
- **Article Grid**: 2-column layout (lg) with featured post spanning full width
- **Article Cards**: Thumbnail, title, excerpt, read time, date, category tags
- **Article Page**: Single column max-w-3xl, generous line-height, pull quotes, code blocks with syntax highlighting
- **CMS Editor**: Clean interface with rich text toolbar, category selector, image upload

### Photo Gallery (CMS)
- **Masonry Grid**: Pinterest-style layout with varying image heights
- **Lightbox**: Full-screen image viewer with prev/next navigation, close button
- **Upload Interface**: Drag-and-drop zone with progress indicators
- **Album Organization**: Tabs or filter system for different photo categories

### Message Board
- **Message Wall**: Stacked message cards, newest first, max-w-4xl centered
- **Anonymous Post Form**: Simple textarea with character counter, floating submit button
- **Message Cards**: Timestamp, content, subtle animated entry (slide up + fade)
- **Moderation Tools**: Hidden admin controls for managing messages

### About
- **Split Layout**: Text content (60%) + Skills/Tools visualization (40%)
- **Tech Stack**: Icon grid with labels, hover effects showing proficiency
- **Timeline**: Optional career/education milestones with connecting lines

## Component Library

### Navigation
- **Fixed Header**: Backdrop blur, subtle shadow on scroll, logo left, nav links right
- **Mobile Menu**: Full-screen overlay with staggered link animations
- **Active State**: Underline indicator with smooth transition

### Buttons & CTAs
- **Primary Button**: Rounded corners (rounded-lg), padding px-8 py-4, subtle hover lift (translate-y-1)
- **Secondary Button**: Outline style with hover fill animation
- **Icon Buttons**: Rounded-full, hover scale effect
- **Floating Action Button**: Fixed position for message board/scroll-to-top

### Cards
- **Project Cards**: Aspect ratio 16:9 or 4:3, rounded-2xl, overflow-hidden, image with gradient overlay
- **Blog Cards**: Vertical layout, rounded-xl, hover shadow increase
- **Message Cards**: Soft rounded corners (rounded-xl), border accent on left edge, padding p-6

### Interactive Elements (Inspired by uiverse.io)
- **Animated Loaders**: Minimal spinner or skeleton screens during CMS operations
- **Hover Cards**: 3D tilt effect on project/blog cards (subtle, 2-3deg max)
- **Gradient Borders**: Animated gradient borders on featured elements
- **Glowing Effects**: Subtle glow on active inputs and focused elements
- **Morphing Icons**: Menu hamburger → X transition, expand/collapse arrows

### Forms
- **Input Fields**: Minimal borders, bottom-border-only style, focus state with border thickness increase
- **Text Areas**: Rounded-lg border, focus ring, auto-expand for message board
- **Upload Zones**: Dashed border, hover state with background shift, drag-over animation
- **Validation**: Inline error messages, success checkmarks

### Data Display
- **Tags/Pills**: Rounded-full, small text, padding px-3 py-1, hover brightness
- **Timestamps**: Relative time format ("2 hours ago"), muted styling
- **Stats Counter**: Large numbers with animated count-up on scroll into view

## Animations & Transitions

**Timing**: Fast interactions (150-200ms), content reveals (300-500ms), page transitions (400-600ms)

**Effects**:
- Fade + Slide Up: For content reveals on scroll
- Scale + Opacity: For card hovers
- Stagger: For list/grid item animations
- Smooth Scroll: For anchor link navigation
- Page Transitions: Fade between routes (Next.js page transitions)

**Performance**: Use CSS transforms (translate, scale) and opacity only. No layout-triggering animations.

## Images

**Hero Section**: No large hero image - typography-focused with animated gradient mesh background

**Project Cards**: Featured project images at 16:9 aspect ratio, optimized WebP format

**Blog Thumbnails**: 3:2 aspect ratio, consistent sizing across grid

**Photo Gallery**: Variable aspect ratios for authentic portfolio feel, lazy loading

**About Section**: Professional headshot (1:1 ratio, rounded), optional tech stack icons

## Accessibility

- Minimum touch target: 44x44px
- Keyboard navigation: Visible focus states, logical tab order
- ARIA labels: For icon-only buttons, modal dialogs
- Color contrast: Ensure text meets WCAG AA standards
- Skip links: For keyboard users to bypass navigation
- Alt text: Descriptive for all images, empty for decorative

## Technical Specifications

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS with custom configuration
- **Icons**: Heroicons for UI elements
- **CMS**: Local state management or lightweight headless CMS integration
- **Database**: For message board and CMS content persistence
- **Animation**: Framer Motion for complex animations, CSS transitions for simple effects