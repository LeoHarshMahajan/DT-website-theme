# 🚀 Quick Start Guide - Digital Triangle CMS

## Welcome! Here's What Was Just Built For You

A **production-ready Next.js + CMS foundation** for the Digital Triangle website with:
- ✅ Complete database schema (Prisma ORM)
- ✅ Authentication system with role-based access control
- ✅ Blog/content management infrastructure
- ✅ Design system with Tailwind CSS
- ✅ Global styling & responsive components
- ✅ All configuration ready to go

---

## 🏃 Get Started in 2 Minutes

### Step 1: Start the Development Server

```bash
cd "/d/Claude Code apps/digital-triangle"
npm run dev
```

Visit: **http://localhost:3000**

You'll see a basic homepage structure ready for customization.

### Step 2: Explore Your Database

```bash
npm run db:studio
```

Opens **Prisma Studio** - a visual database editor. Here you can:
- Create test users
- Add blog posts
- Manage tags and categories
- View all data in real-time

### Step 3: Create Your First Admin User

In Prisma Studio:
1. Click on the `User` table
2. Click "Add record"
3. Fill in:
   - `email`: your@email.com
   - `password`: Run this in Node to hash: `require('bcryptjs').hashSync('your-password', 10)`
   - `name`: Your Name
   - `role`: SUPER_ADMIN
4. Save

---

## 📁 Project Structure at a Glance

```
digital-triangle/
├── src/
│   ├── app/                 # Pages and routes
│   │   ├── page.tsx         # Home (you are here!)
│   │   ├── layout.tsx       # Global layout
│   │   └── api/auth/        # Authentication
│   ├── components/          # UI Components (empty - ready for your components)
│   ├── lib/
│   │   ├── auth/            # Authentication utilities
│   │   ├── db/              # Database helpers
│   │   └── constants.ts     # App configuration
│   └── styles/
│       └── globals.css      # Design system & styling
├── prisma/
│   └── schema.prisma        # Database structure
├── public/                  # Static assets
├── .env                     # Environment variables
└── package.json             # Dependencies

📚 Key Documentation:
├── IMPLEMENTATION_GUIDE.md  # Complete implementation roadmap
├── PROJECT_STATUS.md        # Phase-by-phase progress
└── QUICK_START.md          # This file!
```

---

## 🎯 What You Can Do Right Now

### 1. View the Database Structure
```bash
npm run db:studio
```
See all 15 database models: Users, Posts, Comments, Tags, Pages, Media, etc.

### 2. Run in Development Mode
```bash
npm run dev
```
Make changes and they reload automatically.

### 3. Type-Check Your Code
```bash
npm run type-check
```
Ensure TypeScript is happy with your changes.

### 4. Build for Production
```bash
npm run build
npm start
```
Test your production build locally.

---

## 📖 What's Already Configured

### Authentication ✅
- NextAuth.js v5 ready to use
- 4 user roles: SUPER_ADMIN, ADMIN, EDITOR, VIEWER
- Permission checking: `checkPermission("posts:create")`
- Password hashing: bcryptjs
- Protected routes middleware
- Example: `await requirePermission("admin:*")`

### Database ✅
- Prisma ORM configured
- SQLite for development
- Ready to switch to PostgreSQL for production
- 15 pre-built models
- Query utilities ready to use

### Styling ✅
- Tailwind CSS with custom design system
- Dark/light theme support
- Component utilities (.btn, .card, .badge, etc.)
- Responsive by default
- Accessibility built-in

### Performance ✅
- Image optimization
- Code splitting
- Security headers
- Caching strategies
- SEO-friendly setup

---

## 🛠️ Key Utility Functions Already Available

### Authentication
```typescript
import { getCurrentUser, requireAuth, requirePermission, hasPermission } from '@/lib/auth/utils';

// Get current logged-in user
const user = await getCurrentUser();

// Require authentication
const user = await requireAuth();

// Check specific permission
const canPublish = await checkPermission("posts:publish");

// Hash and compare passwords
const hashed = await hashPassword("password");
const matches = await comparePassword("password", hashed);
```

### Database Queries
```typescript
import { 
  getPublishedPosts, 
  getPostBySlug, 
  getAllTags,
  getSubscriber
} from '@/lib/db/queries';

// Get blog posts with pagination
const { posts, total, pages } = await getPublishedPosts(1, 10);

// Get single post
const post = await getPostBySlug('my-article');

// Get all tags
const tags = await getAllTags();
```

### Constants
```typescript
import { USER_ROLES, POST_STATUS, ROUTES, API_ROUTES } from '@/lib/constants';

// Use predefined values
console.log(USER_ROLES.ADMIN);  // "ADMIN"
console.log(ROUTES.BLOG);        // "/blog"
```

---

## 🎨 Design System

### Colors (CSS Variables)
Access via CSS or Tailwind:
```css
/* Dark theme */
--bg-0: #07070a;        /* Background */
--brand-blue: #4b6bff;  /* Primary color */
--brand-magenta: #c026d3; /* Accent */
--fg-0: #f6f6f8;        /* Text */
```

### Component Classes
```html
<!-- Buttons -->
<button class="btn btn-primary">Click me</button>
<button class="btn btn-secondary">Ghost button</button>

<!-- Cards -->
<div class="card">Card content</div>
<div class="card card-featured">Featured card</div>

<!-- Typography -->
<h1 class="h-display">Large heading</h1>
<p class="lead">Lead paragraph</p>
<span class="mono">Monospace text</span>

<!-- Badges -->
<span class="badge">Default</span>
<span class="badge badge-success">Success</span>
```

---

## 📋 Your Next Steps

### Phase 2: Build the UI (Week 2)

#### 1. Migrate Design Components
Files to convert are in: `C:\Users\Lenovo\Downloads\DT_Website_extracted\`

```typescript
// Example: hero.jsx → components/sections/Hero.tsx
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="py-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="h-display">Your heading</h1>
        <p className="lead">Your description</p>
      </motion.div>
    </section>
  );
}
```

#### 2. Create Blog Pages
- `src/app/blog/page.tsx` - Blog listing
- `src/app/blog/[slug]/page.tsx` - Individual post

#### 3. Build Admin Screens
- `src/app/auth/login/page.tsx` - Login form
- `src/app/auth/register/page.tsx` - Sign up
- `src/app/admin/posts/page.tsx` - Manage posts

### Phase 3: Build the Backend (Week 3)
- POST `/api/posts` - Create post
- GET `/api/posts` - List posts
- PATCH `/api/posts/[id]` - Update post
- DELETE `/api/posts/[id]` - Delete post

### Phase 4+: Polish & Deploy (Week 4-6)
- Add admin dashboard
- Performance optimization
- Testing
- Deployment

---

## 🔑 Important Environment Variables

Edit `.env` file:

```bash
# Critical - Change these!
AUTH_SECRET="generate-with: openssl rand -base64 32"
CONTACT_EMAIL="your-email@example.com"

# Database
DATABASE_URL="file:./dev.db"

# Google OAuth (optional)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Email service (optional)
RESEND_API_KEY=""

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 🚨 Common Mistakes to Avoid

1. **Forget to hash passwords** - Always use `hashPassword()` function
2. **Skip permission checks** - Use `requirePermission()` in admin endpoints
3. **Hardcode config** - Use `ROUTES` and `API_ROUTES` constants
4. **Forget Prisma generate** - Run `npm run db:generate` after schema changes
5. **Use bare strings for roles** - Use `USER_ROLES` constants instead

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| **QUICK_START.md** | This file - Get running in 2 min |
| **IMPLEMENTATION_GUIDE.md** | Detailed roadmap for all phases |
| **PROJECT_STATUS.md** | Current progress and metrics |
| **CLAUDE.md** | Notes for next session |

---

## 💡 Pro Tips

1. **Use Prisma Studio during dev**: `npm run db:studio`
2. **Check types constantly**: `npm run type-check`
3. **Read util functions**: `src/lib/auth/utils.ts` has everything you need
4. **Follow the design system**: Use existing Tailwind classes
5. **Test auth flow**: Login/logout before deploying

---

## 🆘 Need Help?

### Common Questions

**Q: How do I add a new database table?**
A: Edit `prisma/schema.prisma` → `npm run db:migrate` → `npm run db:generate`

**Q: How do I create a protected page?**
A: Use middleware in `src/app/api/auth/[...nextauth]/route.ts` or check role in component

**Q: How do I add Google OAuth?**
A: Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env` → Uncomment in auth config

**Q: How do I deploy to production?**
A: See "Deployment" section in `IMPLEMENTATION_GUIDE.md`

---

## ✨ You're All Set!

Everything is configured and ready. Your next step is to:

1. **Run the dev server**: `npm run dev`
2. **Open Prisma Studio**: `npm run db:studio`
3. **Start building**: Follow Phase 2 in `IMPLEMENTATION_GUIDE.md`

Happy coding! 🎉

---

**Questions?** Check `IMPLEMENTATION_GUIDE.md` for detailed answers.  
**Ready to build?** Start with the component migration from the design files.  
**Need to deploy?** Follow the checklist in `PROJECT_STATUS.md`.

---

**Project Start**: May 21, 2026  
**Next Milestone**: Phase 2 Complete (June 4, 2026)
