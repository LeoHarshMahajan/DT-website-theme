/**
 * Authentication Utility Functions
 * Helpers for auth operations, password hashing, role checks, etc.
 */

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "@/lib/constants";

// ============================================================
// PASSWORD UTILITIES
// ============================================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
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

// ============================================================
// PERMISSION CHECKS
// ============================================================

// ============================================================
// USER REGISTRATION & ACCOUNT CREATION
// ============================================================

// ============================================================
// ROLE UTILITIES
// ============================================================

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
