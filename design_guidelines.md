# Vilkio Website Design Guidelines

## Design Approach
**System-Based with Brand Customization**: Following modern SaaS application patterns (Linear, Notion) with Vilkio's red gradient branding. Clean, professional, content-focused interface optimized for desktop use.

## Brand Identity
- **Primary Brand Color**: Red gradient (bright red #FF3B30 to darker red #CC0000)
- **Brand Application**: Use gradient for primary CTAs, logo, accent elements, and active states
- **Secondary Palette**: Neutral grays for content hierarchy, white backgrounds for clean presentation
- **Accent Usage**: Red gradient sparingly for emphasis - primary buttons, active navigation, notifications badge

## Typography System
- **Primary Font**: Inter or DM Sans via Google Fonts CDN
- **Headings**: 
  - H1: 2.5rem (40px), font-weight 700
  - H2: 2rem (32px), font-weight 600
  - H3: 1.5rem (24px), font-weight 600
  - H4: 1.25rem (20px), font-weight 500
- **Body**: 1rem (16px), font-weight 400, line-height 1.6
- **Small Text**: 0.875rem (14px) for metadata, captions, footer
- **Code/Keys**: Monospace font (JetBrains Mono) for keyboard shortcuts in Basics page

## Layout System
- **Spacing Scale**: Consistent Tailwind units of 2, 4, 6, 8, 12, 16, 24 (e.g., p-2, m-4, gap-6, py-8, px-12, mb-16, py-24)
- **Container**: max-w-7xl for main content areas, max-w-6xl for text-heavy pages
- **Grid System**: 12-column grid for flexible layouts
- **Responsive Breakpoints**: Mobile-first, optimize for desktop (lg: 1024px+)

## Page-Specific Layouts

### Landing Page (with Intro Video)
- Full-screen video overlay on first visit with Vilkio branding
- After video: Clean hero section with Vilkio logo, tagline, primary navigation
- Navigation bar: Logo left, main links center, notification bell + admin avatar right
- Footer: Centered ©2025 - Vilkio - J. B.

### Content Pages (Help, Basics, Privacy, Terms)
- Sidebar navigation (left, 280px width) with category hierarchy
- Main content area (flex-1) with generous padding (px-12 py-8)
- Topic cards on listing pages: Clean white cards with shadow-sm, hover:shadow-md
  - Card structure: Bold title (text-lg), short description (text-gray-600), subtle arrow icon
- Individual topic pages: Full-width prose styling, max-w-4xl centered
- "Is this Helpful?" section at bottom: Centered, two buttons (Yes/No) with red gradient on hover

### Websites Showcase
- Masonry grid layout (2-3 columns on desktop)
- Website cards: Thumbnail preview, title, description, external link indicator
- Hover effect: Lift (transform translate-y) + shadow increase

### Admin Control Panel (/control)
- Password gate: Centered modal with Vilkio branding
- Dashboard layout: Compact sidebar, main editing area
- Add buttons: Fixed bottom-right FAB (Floating Action Button) with red gradient + shadow
- Rich text editor: Toolbar at top, preview panel side-by-side
- Image management: Drag-and-drop zones, checkbox selection for deletion

## Component Library

### Navigation
- Top navbar: h-16, white bg, subtle shadow-sm, sticky top-0
- Nav links: text-gray-700, hover:text-red-600 transition
- Active state: text-red-600 with subtle bottom border (border-b-2 border-red-600)

### Buttons
- Primary: Red gradient bg, white text, rounded-lg, px-6 py-3, shadow-md
- Secondary: White bg, gray-700 text, border border-gray-300, rounded-lg, px-6 py-3
- Ghost: Transparent bg, gray-600 text, hover:bg-gray-100
- Icon buttons: Small (32px), rounded-full, centered icon

### Cards
- White bg, rounded-xl, shadow-sm, p-6
- Hover: shadow-md, subtle lift (transform -translate-y-1)
- Border: None or subtle border-gray-100

### Forms & Inputs
- Input fields: border border-gray-300, rounded-lg, px-4 py-2.5, focus:border-red-500 focus:ring-2 focus:ring-red-100
- Text areas: Same styling, min-h-32
- Labels: text-sm font-medium text-gray-700, mb-2

### Notifications
- Top-right fixed position (top-4 right-4)
- Bell icon with red dot badge for unread
- Dropdown panel: white bg, rounded-lg, shadow-xl, p-4, max-w-sm
- Notification items: Compact, border-b last:border-0, py-3

### Chat (Staff Only)
- Bottom-right fixed chat bubble (when collapsed)
- Expanded: 400px width panel, h-600px, white bg, shadow-2xl
- Messages: Alternating alignment (sent/received), bubble style
- Input: Sticky bottom, border-top

### Feedback Widget
- Centered section: "Was this helpful?" heading (text-lg font-medium)
- Two buttons side-by-side: Yes (green on hover), No (red on hover)
- Spacing: mt-16 pt-8 border-t border-gray-200

## Rich Text Editor Features
- Toolbar: Sticky, light gray bg, rounded-t-lg, flex gap-2, p-2
- Format buttons: Small icon buttons (bold, italic, strikethrough, etc.)
- Position controls: Left/Center/Right alignment icons
- Image upload: Dashed border drop zone, drag-and-drop indicator
- YouTube embed: Automatically convert URL to thumbnail preview card
- Link insertion: Modal with URL input, checkbox for "Make image clickable"
- Preview mode: Toggle button, side-by-side with live editing

## Keyboard Shortcuts Display (Basics Page)
- Shortcut tags: Inline-block, bg-gray-100, border border-gray-300, rounded px-2 py-1, font-mono text-sm, shadow-sm
- Example: "Ctrl" + "F" rendered as separate tags with + between

## Website Snippets (Websites Page)
- Card with website favicon (16px, inline with title)
- Title: font-semibold text-lg
- URL display: text-sm text-gray-500 truncate
- External link icon: top-right corner of card
- Click behavior: Direct redirect (no detail page)

## Animations
- Minimal, purposeful only
- Transitions: 200ms ease for hovers
- Page transitions: Fade-in content (300ms)
- No scroll-triggered animations
- Loading states: Simple spinner (red gradient)

## Images
- **Hero Section**: Not applicable (video intro takes precedence)
- **Content Images**: User-uploaded via admin panel, inline within prose content
- **Website Thumbnails**: Screenshot previews in Websites showcase grid
- **Favicon**: Vilkio logo (16x16, 32x32) in header and browser tab

This design creates a professional, modern SaaS aesthetic with Vilkio's distinctive red branding, optimized for the content management and staff communication workflows.