# Vilkio Website - Official Documentation

## Overview

Vilkio is a SaaS-style website platform built with React and Express that provides help documentation, website instructions, privacy policies, and a portfolio showcase. The application features a clean, modern interface with red gradient branding, an admin control panel for content management, and real-time feedback collection.

The system uses a file-based JSON storage approach (instead of a traditional database) for content management, allowing the site to be updated dynamically through an admin interface without requiring database provisioning.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight React router)
- **State Management:** TanStack Query (React Query) for server state
- **UI Components:** Radix UI primitives with shadcn/ui styling system
- **Styling:** Tailwind CSS with custom design tokens
- **Build Tool:** Vite

**Design System:**
- **Brand Colors:** Red gradient (#FF3B30 to #CC0000) for primary actions and accents
- **Typography:** Inter/DM Sans for UI, JetBrains Mono for code/keyboard shortcuts
- **Component Library:** shadcn/ui with "new-york" style preset
- **Spacing:** Consistent Tailwind scale (2, 4, 6, 8, 12, 16, 24)
- **Layout:** Mobile-first responsive design with max-width containers

**Key Features:**
- Intro video overlay on first visit (stored in sessionStorage)
- Feedback widget on content pages ("Is this Helpful?" with Yes/No buttons)
- Real-time notifications panel with unread count
- Chat widget for admin communication
- Keyboard shortcut rendering for Basics pages

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express
- **Language:** TypeScript with ES modules
- **Session Management:** express-session with connect-pg-simple
- **Validation:** Zod schemas with Drizzle-Zod integration

**Storage Strategy:**
- **Primary Storage:** File-based JSON storage in `/data` directory
- **Data Files:** Separate JSON files for help topics, basics instructions, websites, feedback, notifications, and chat messages
- **Database Schema:** PostgreSQL schema defined (using Drizzle ORM) but not actively used - storage interface can switch between JSON files and database
- **Rationale:** Avoids database dependency for simple content management, easy to version control, simple deployment

**Authentication:**
- Password-based admin authentication with SHA-256 hashing
- Rate limiting on login attempts (5 attempts max, 15-minute lockout)
- Session-based authentication for admin routes
- IP-based rate limiting tracking

**API Structure:**
- RESTful endpoints under `/api` prefix
- Separate routes for each content type (help-topics, basics, websites, feedback, notifications, chat-messages)
- Admin-only routes for content CRUD operations
- WebSocket server for real-time updates (notifications, chat)

### Content Management

**Admin Control Panel (`/control`):**
- Hidden route (no public navigation link)
- Password-protected access
- CRUD operations for all content types
- Rich text editor features:
  - YouTube URL auto-embedding
  - Image upload and drag-to-position
  - Text formatting (bold, italic, strikethrough, alignment)
  - Link creation with optional image replacement
  - Preview before publishing

**Content Types:**
1. **Help Topics:** Title, description, HTML content
2. **Basics Instructions:** Website URL with favicon, title, description, content with keyboard shortcuts
3. **Websites:** Portfolio items with URL, title, description, thumbnail
4. **Feedback:** Page-specific helpfulness ratings
5. **Notifications:** Admin alerts with read/unread status
6. **Chat Messages:** Admin-user communication

**Automatic Features:**
- YouTube URLs converted to clickable thumbnails
- Keyboard commands (e.g., "Ctrl+F") automatically styled as keyboard shortcuts
- Feedback automatically creates notifications for admin

### External Dependencies

**NPM Packages:**
- **UI Framework:** @radix-ui/* components (20+ packages for dialogs, dropdowns, etc.)
- **State Management:** @tanstack/react-query for data fetching and caching
- **Validation:** Zod for schema validation, drizzle-zod for type-safe schemas
- **Database ORM:** Drizzle ORM with @neondatabase/serverless driver (PostgreSQL compatible)
- **Styling:** Tailwind CSS, class-variance-authority, clsx for conditional classes
- **Forms:** react-hook-form with @hookform/resolvers for validation
- **Session:** express-session with connect-pg-simple store
- **WebSockets:** ws library for real-time communication
- **Date Handling:** date-fns for date formatting
- **Carousel:** embla-carousel-react for image galleries
- **Development:** tsx for TypeScript execution, Replit-specific plugins

**Font CDN:**
- Google Fonts: Inter, DM Sans, Architects Daughter, Fira Code, Geist Mono

**Static Assets:**
- Logo: `attached_assets/20251115_185356_1763271286249.png`
- Intro video: `attached_assets/lv_0_20251116151021_1763277420946.mp4`

**Environment Variables:**
- `DATABASE_URL`: PostgreSQL connection string (optional, falls back to JSON storage)
- `ADMIN_PASSWORD_HASH`: SHA-256 hash of admin password (defaults to "BusinessDawg2025SyncHQ💎")
- `NODE_ENV`: Development or production mode

**Third-Party Services:**
- None required for core functionality (self-hosted)
- Optional: Neon Database for PostgreSQL hosting
- Optional: Replit deployment platform features