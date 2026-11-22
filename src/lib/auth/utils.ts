/**
 * Authentication Utility Functions
 * Helpers for auth operations, password hashing, role checks, etc.
 */

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { ROLE_PERMISSIONS, USER_ROLES } from "@/lib/constants";

// ============================================================
// PASSWORD UTILITIES
// ============================================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ============================================================
// SESSION & AUTHENTICATION
// ============================================================

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireRole(...roles: string[]) {
  const user = await requireAuth();
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
  return user;
}

// ============================================================
// PERMISSION CHECKS
// ============================================================

export function hasPermission(
  role: string,
  permission: string
): boolean {
  const rolePerms = (ROLE_PERMISSIONS as any)[role] || [];

  if (rolePerms.includes("*")) return true; // Super admin
  if (rolePerms.includes(permission)) return true;

  // Check wildcard patterns (e.g., "posts:*" matches "posts:create")
  const [resource, action] = permission.split(":");
  if (rolePerms.includes(`${resource}:*`)) return true;

  return false;
}

export async function checkPermission(
  permission: string
): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  return hasPermission(user.role, permission);
}

export async function requirePermission(...permissions: string[]) {
  const user = await requireAuth();

  const hasAnyPermission = permissions.some((perm) =>
    hasPermission(user.role, perm)
  );

  if (!hasAnyPermission) {
    throw new Error("Forbidden");
  }

  return user;
}

// ============================================================
// USER REGISTRATION & ACCOUNT CREATION
// ============================================================

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: USER_ROLES.VIEWER, // Default role for new users
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
}

// ============================================================
// ROLE UTILITIES
// ============================================================

export function isAdmin(role: string): boolean {
  const adminRoles: string[] = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN];
  return adminRoles.includes(role);
}

export function isEditor(role: string): boolean {
  const editorRoles: string[] = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.EDITOR];
  return editorRoles.includes(role);
}

export function isSuperAdmin(role: string): boolean {
  return role === USER_ROLES.SUPER_ADMIN;
}

// Higher number = more power. A non-super-admin can only act on users
// strictly below them, and can only hand out roles strictly below their own.
export const ROLE_RANK: Record<string, number> = {
  VIEWER: 0,
  EDITOR: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

export function canManage(actorRole: string, targetRole: string): boolean {
  if (actorRole === USER_ROLES.SUPER_ADMIN) return true;
  return (ROLE_RANK[actorRole] ?? -1) > (ROLE_RANK[targetRole] ?? 99);
}

/**
 * Route guard that reads role + isActive from the DB (not the JWT, which can
 * be up to a session old). Returns the user, or a ready-to-return response.
 */
export async function guardRoles(...roles: string[]) {
  const user = await getCurrentUser();
  if (!user || !user.isActive) {
    return { user: null, deny: Response.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  if (!roles.includes(user.role)) {
    return { user: null, deny: Response.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return { user, deny: null };
}

// ============================================================
// TOKEN GENERATION (for password reset, email verification, etc.)
// ============================================================

export async function generateToken(
  identifier: string,
  expiresIn: number = 24 * 60 * 60 * 1000 // 24 hours
): Promise<string> {
  const { randomBytes } = await import('crypto');
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + expiresIn);

  // Store in database
  await prisma.verificationToken.create({
    data: {
      identifier,
      token: token,
      expires,
    },
  });

  return token;
}

export async function verifyToken(
  identifier: string,
  token: string
): Promise<boolean> {
  const record = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!record) return false;

  if (record.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });
    return false;
  }

  // Delete used token
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  return true;
}
