/**
 * Application Constants
 */

// Site Configuration
export const SITE_NAME = "Digital Triangle";
export const SITE_DESCRIPTION =
  "AI-powered growth infrastructure for modern brands";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// Pagination
// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
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

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You do not have permission to access this resource",
  NOT_FOUND: "Resource not found",
  INVALID_INPUT: "Invalid input provided",
  SERVER_ERROR: "An unexpected error occurred",
  AUTH_REQUIRED: "Authentication required",
  EMAIL_EXISTS: "An account with this email already exists",
} as const;

