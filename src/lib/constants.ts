/**
 * Application Constants
 */

// Site Configuration
export const SITE_NAME = "Digital Triangle";
export const SITE_DESCRIPTION =
  "AI-powered growth infrastructure for modern brands";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "info@digitaltriangle.in";

// Pagination
export const POSTS_PER_PAGE = 10;
export const SEARCH_DEBOUNCE_MS = 300;

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
} as const;

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ["*"], // All permissions
  ADMIN: [
    "users:read",
    "users:create",
    "users:update",
    "users:delete",
    "posts:*",
    "pages:*",
    "comments:*",
    "media:*",
    "settings:*",
  ],
  EDITOR: [
    "posts:read",
    "posts:create",
    "posts:update",
    "posts:publish",
    "comments:read",
    "comments:moderate",
    "media:read",
    "media:upload",
  ],
  VIEWER: ["posts:read", "comments:read", "media:read"],
} as const;

// Blog categories — one primary category per post (used for filtering,
// related-article matching, and the on-card / on-page highlight).
export const BLOG_CATEGORIES = [
  { slug: "d2c-strategy",       label: "D2C Strategy",         color: "#c026d3", icon: "◎" },
  { slug: "ai-marketing",       label: "AI Marketing",         color: "#4b6bff", icon: "✦" },
  { slug: "seo-organic",        label: "SEO & Organic",        color: "#8b5cf6", icon: "≋" },
  { slug: "email-lifecycle",    label: "Email & Lifecycle",    color: "#e11d8a", icon: "✉" },
  { slug: "analytics-cro",      label: "Analytics & CRO",      color: "#4b6bff", icon: "⬡" },
  { slug: "social-content",     label: "Social & Content",     color: "#c026d3", icon: "◈" },
  { slug: "whatsapp-retention", label: "WhatsApp & Retention", color: "#8b5cf6", icon: "💬" },
  { slug: "paid-advertising",   label: "Paid Advertising",     color: "#e11d8a", icon: "⊕" },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]["slug"];

export const CATEGORY_BY_SLUG: Record<string, (typeof BLOG_CATEGORIES)[number]> =
  Object.fromEntries(BLOG_CATEGORIES.map((c) => [c.slug, c]));

export const CATEGORY_BY_LABEL: Record<string, (typeof BLOG_CATEGORIES)[number]> =
  Object.fromEntries(BLOG_CATEGORIES.map((c) => [c.label.toLowerCase(), c]));

// Post Status
export const POST_STATUS = {
  DRAFT: "DRAFT",
  SCHEDULED: "SCHEDULED",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

// Comment Status
export const COMMENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  SPAM: "SPAM",
  DELETED: "DELETED",
} as const;

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  UNSUBSCRIBED: "UNSUBSCRIBED",
  BOUNCED: "BOUNCED",
} as const;

// Analytics Events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  SIGNUP: "signup",
  POST_PUBLISHED: "post_published",
  COMMENT_ADDED: "comment_added",
  FORM_SUBMITTED: "form_submitted",
  LINK_CLICKED: "link_clicked",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  RESET_PASSWORD: "/auth/reset-password",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_POSTS: "/admin/posts",
  ADMIN_USERS: "/admin/users",
  ADMIN_SETTINGS: "/admin/settings",
} as const;

// API Routes
export const API_ROUTES = {
  POSTS: "/api/posts",
  COMMENTS: "/api/comments",
  TAGS: "/api/tags",
  SUBSCRIBERS: "/api/subscribers",
  USERS: "/api/users",
  AUTH: "/api/auth",
  UPLOAD: "/api/upload",
  SEARCH: "/api/search",
  ANALYTICS: "/api/analytics",
} as const;

// Cache Configuration
export const CACHE_TTL = {
  LONG: 60 * 60 * 24 * 7, // 1 week
  MEDIUM: 60 * 60 * 24, // 1 day
  SHORT: 60 * 60, // 1 hour
  MINIMAL: 60, // 1 minute
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You do not have permission to access this resource",
  NOT_FOUND: "Resource not found",
  INVALID_INPUT: "Invalid input provided",
  SERVER_ERROR: "An unexpected error occurred",
  AUTH_REQUIRED: "Authentication required",
  EMAIL_EXISTS: "An account with this email already exists",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: "Created successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",
  PUBLISHED: "Published successfully",
  SENT: "Sent successfully",
} as const;

// Theme Colors (matching design system)
export const THEME_COLORS = {
  primary: "var(--brand-blue)",
  secondary: "var(--brand-violet)",
  accent: "var(--brand-magenta)",
  success: "#34d399",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
