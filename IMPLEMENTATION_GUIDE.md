# Digital Triangle Next.js + CMS Implementation Guide

## 📋 Project Overview

This is a comprehensive Next.js + CMS system for Digital Triangle - an AI-powered growth marketing platform. The project includes:

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Prisma ORM** for database management
- **NextAuth.js v5** for authentication with RBAC
- **SQLite** for local development (PostgreSQL for production)
- **Tiptap** for rich text editing

---

## 🏗️ Architecture & Project Structure

```
digital-triangle/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── page.tsx                  # Homepage (TO BE CREATED)
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/   # NextAuth API route
│   │   │   ├── posts/                # Blog API (TO BE CREATED)
│   │   │   ├── comments/             # Comments API (TO BE CREATED)
│   │   │   └── ...                   # Other APIs
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing (TO BE CREATED)
│   │   │   └── [slug]/               # Blog post detail (TO BE CREATED)
│   │   ├── auth/
│   │   │   ├── login/                # Login page (TO BE CREATED)
│   │   │   ├── register/             # Register page (TO BE CREATED)
│   │   │   └── reset-password/       # Password reset (TO BE CREATED)
│   │   └── admin/                    # Admin dashboard (TO BE CREATED)
│   │
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   ├── sections/                 # Page sections (Hero, Features, etc.)
│   │   └── admin/                    # Admin components
│   │
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── auth.config.ts        # NextAuth configuration ✅
│   │   │   └── utils.ts              # Auth utilities ✅
│   │   ├── db/
│   │   │   ├── prisma.ts             # Prisma singleton ✅
│   │   │   └── queries.ts            # Database queries ✅
│   │   ├── constants.ts              # App constants ✅
│   │   └── ...                       # Other utilities
│   │
│   └── styles/
│       └── globals.css               # Global styles ✅
│
├── prisma/
│   ├── schema.prisma                 # Database schema ✅
│   └── migrations/                   # Database migrations
│
├── public/                           # Static assets
├── .env                              # Environment variables
├── .env.local                        # Local env overrides
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind config
├── next.config.ts                    # Next.js config ✅
└── package.json                      # Dependencies ✅

```

---

## ✅ Completed Setup (Phase 1)

### 1. **Database Layer**
- ✅ Prisma schema with 15+ models (User, Post, Tag, Comment, Page, Media, etc.)
- ✅ Database migration applied (`npm run db:migrate`)
- ✅ Query utilities for common operations
- ✅ Prisma client singleton

### 2. **Authentication System**
- ✅ NextAuth.js v5 configuration with JWT
- ✅ Credentials provider (email/password)
- ✅ Role-based access control (SUPER_ADMIN, ADMIN, EDITOR, VIEWER)
- ✅ Password hashing with bcryptjs
- ✅ Permission checking utilities
- ✅ Auth middleware for protected routes

### 3. **Application Configuration**
- ✅ Next.js configuration with performance optimizations
- ✅ Tailwind CSS setup
- ✅ TypeScript configuration
- ✅ Global styles with design system (colors, typography, components)
- ✅ App constants and configuration
- ✅ Root layout with metadata

### 4. **Styling & Design System**
- ✅ Design tokens (colors, spacing, shadows)
- ✅ Dark/Light theme support
- ✅ Tailwind component utilities (.btn, .card, .badge, etc.)
- ✅ Responsive utilities and fluid typography
- ✅ Accessibility features (focus states, skip links, reduced motion)

---

## 🚀 Next Steps to Complete the Project

### **Phase 2: Core Pages & Components** (Week 2)

#### Homepage Migration
- [ ] Create `src/app/page.tsx` (migrate Hero, Navbar, Footer sections from design files)
- [ ] Convert React components from `/public/downloads/DT_Website_extracted/`
- [ ] Integrate with Framer Motion for animations

#### Blog System
- [ ] Create blog listing page: `src/app/blog/page.tsx`
- [ ] Create blog post detail: `src/app/blog/[slug]/page.tsx`
- [ ] Tag pages: `src/app/blog/tag/[slug]/page.tsx`
- [ ] Author pages: `src/app/blog/author/[authorId]/page.tsx`
- [ ] Search functionality

#### UI Components Library
- [ ] Create reusable components: Button, Card, Input, Modal, etc.
- [ ] Navigation component with mobile menu
- [ ] Footer component
- [ ] Newsletter signup form
- [ ] Contact form with validation

### **Phase 3: Authentication Pages** (Week 2-3)

- [ ] `src/app/auth/login/page.tsx` - Login form
- [ ] `src/app/auth/register/page.tsx` - Registration form
- [ ] `src/app/auth/reset-password/page.tsx` - Password reset
- [ ] `src/app/auth/error/page.tsx` - Auth error page
- [ ] Auth middleware for protected routes

### **Phase 4: CMS Blog System & Admin Dashboard** (Week 3)

#### Blog API Routes
- [ ] `POST /api/posts` - Create post
- [ ] `GET /api/posts` - List posts (with pagination, filtering)
- [ ] `GET /api/posts/[id]` - Get single post
- [ ] `PATCH /api/posts/[id]` - Update post
- [ ] `DELETE /api/posts/[id]` - Delete post
- [ ] `POST /api/posts/[id]/publish` - Publish post
- [ ] `GET /api/posts/search` - Search posts

#### Admin Dashboard
- [ ] `src/app/admin/layout.tsx` - Admin layout
- [ ] `src/app/admin/page.tsx` - Dashboard overview
- [ ] `src/app/admin/posts/` - Post management
  - [ ] List posts
  - [ ] Create/edit post with Tiptap editor
  - [ ] Bulk actions
- [ ] `src/app/admin/users/` - User management (ADMIN only)
- [ ] `src/app/admin/comments/` - Comment moderation
- [ ] `src/app/admin/media/` - Media library
- [ ] `src/app/admin/settings/` - Site settings

#### Rich Text Editor
- [ ] Setup Tiptap with extensions
- [ ] Create `EditorComponent` with toolbar
- [ ] Support for headings, bold, italic, lists, links, images, code blocks

### **Phase 5: Performance & SEO Optimizations** (Week 4)

#### SEO Features
- [ ] Dynamic meta tags per post/page
- [ ] Open Graph and Twitter card generation
- [ ] JSON-LD structured data (Article, Organization, BreadcrumbList)
- [ ] Sitemap.xml generation
- [ ] robots.txt configuration
- [ ] Canonical URLs

#### Performance
- [ ] Image optimization (Next.js Image component)
- [ ] Bundle analyzer integration
- [ ] ISR (Incremental Static Regeneration) for blog posts
- [ ] CSS inlining for critical above-fold styles
- [ ] Font optimization and subsetting
- [ ] Service Worker setup with Workbox

#### Analytics
- [ ] Core Web Vitals tracking
- [ ] Event tracking abstraction
- [ ] Page view analytics
- [ ] Sentry error monitoring integration

### **Phase 6: Testing & Deployment** (Week 5)

- [ ] Unit tests (Jest + React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Performance testing
- [ ] Security audit (OWASP Top 10)
- [ ] Deploy to Vercel or AWS
- [ ] Set up CI/CD pipeline

---

## 📦 Environment Variables

Create `.env` and `.env.local` with:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
AUTH_SECRET="generate-with: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"

# Optional: Google OAuth
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Email
RESEND_API_KEY=""  # From resend.com
CONTACT_EMAIL="hello@digitaltriangle.in"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Database
npm run db:migrate      # Create/apply migrations
npm run db:generate     # Regenerate Prisma client
npm run db:studio       # Open Prisma Studio (GUI)

# Build & Deployment
npm run build          # Build for production
npm start              # Start production server

# Linting & Types
npm run lint           # Run ESLint
npm run type-check     # Type check with TypeScript
```

---

## 🗄️ Database Schema Overview

### Models
- **User** - Users with roles (SUPER_ADMIN, ADMIN, EDITOR, VIEWER)
- **Post** - Blog posts with rich text content, status, SEO fields
- **Tag** - Post tags for categorization
- **Comment** - Comments on posts with moderation status
- **Page** - Static pages (/about, /contact, etc.)
- **Media** - Uploaded images and files
- **Subscriber** - Newsletter subscribers
- **PageView** - Analytics (page views)
- **SiteSettings** - Global site configuration

See `prisma/schema.prisma` for full schema definition.

---

## 🔐 Authentication & Roles

### User Roles
1. **SUPER_ADMIN** - Full access to everything
2. **ADMIN** - Manage users, posts, comments, settings
3. **EDITOR** - Create/edit posts, moderate comments
4. **VIEWER** - Read-only access

### Protected Routes
- `/admin/*` - Requires ADMIN or SUPER_ADMIN role
- `/api/admin/*` - Requires ADMIN role

### Creating First Admin User

After setting up, create a super admin user via database:

```bash
npm run db:studio
# Navigate to User table
# Add user with:
# - email: your@email.com
# - password: hashed using bcryptjs (use auth utility)
# - role: SUPER_ADMIN
```

Or use a registration endpoint (create `POST /api/auth/register`).

---

## 🎨 Design System

### Colors (CSS Variables)
- `--brand-blue`: Primary color
- `--brand-violet`: Secondary
- `--brand-magenta`: Accent
- `--fg-0` to `--fg-4`: Text colors
- `--bg-0` to `--bg-3`: Background colors
- `--line`, `--line-strong`: Borders

### Component Classes
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- `.card`, `.card-featured`
- `.badge`
- `.input`, `.textarea`, `.select`
- `.shell` - Max-width container with padding
- `.grad-text` - Gradient text effect

See `src/styles/globals.css` for all utilities.

---

## 📚 Component Development

### Example: Button Component

```tsx
// src/components/ui/Button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  ...props
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Loading...' : props.children}
    </button>
  );
}
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Set up production database (PostgreSQL)
- [ ] Generate secure AUTH_SECRET
- [ ] Configure environment variables on hosting
- [ ] Enable HTTPS
- [ ] Set up monitoring/analytics
- [ ] Configure backups
- [ ] Test authentication flow
- [ ] Test blog post creation/publishing
- [ ] Run Lighthouse audit
- [ ] Security audit (OWASP)
- [ ] Load testing
- [ ] Set up CI/CD pipeline

---

## 📖 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth.js**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com
- **Tiptap**: https://tiptap.dev
- **TypeScript**: https://www.typescriptlang.org

---

## 💡 Tips for Development

1. **Database**: Use `npm run db:studio` to visualize data
2. **Types**: Leverage TypeScript for type safety
3. **Components**: Create reusable components in `src/components/ui/`
4. **API Routes**: Keep business logic in `src/lib/` files
5. **Styling**: Use Tailwind utility classes + custom CSS variables
6. **Auth**: Always check permissions with `requireAuth()` or `requirePermission()`
7. **Images**: Use Next.js `<Image>` component for optimization

---

## 🤝 Contributing

When adding new features:

1. Create API routes in `src/app/api/`
2. Add database queries to `src/lib/db/queries.ts`
3. Create components in `src/components/`
4. Add tests for critical functions
5. Update this guide if adding new features

---

**Last Updated**: May 21, 2026
**Project Version**: 0.1.0 (Foundation Phase)
