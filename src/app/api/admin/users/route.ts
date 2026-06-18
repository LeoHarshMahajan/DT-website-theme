import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/utils';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// GET /api/admin/users — list all users
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ users });
}

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']),
});

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#';
  return Array.from(crypto.randomBytes(12))
    .map((b) => chars[b % chars.length])
    .join('');
}

async function sendInviteEmail(to: string, name: string, role: string, tempPassword: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thedigitaltriangle.com'}/auth/login`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#07070a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07070a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Logo -->
        <tr><td style="padding-bottom:32px;text-align:center;">
          <div style="display:inline-block;background:linear-gradient(135deg,#4b6bff,#8b5cf6);border-radius:10px;padding:10px 18px;">
            <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:-0.5px;">DT</span>
          </div>
          <p style="color:#525260;font-size:11px;margin:6px 0 0;text-transform:uppercase;letter-spacing:0.1em;">Digital Triangle</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#0d0d12;border-radius:16px;border:1px solid rgba(255,255,255,0.07);padding:40px;">

          <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">You're invited! 🎉</h1>
          <p style="color:#8a8a9a;font-size:15px;line-height:1.6;margin:0 0 28px;">
            Hi <strong style="color:#c8c8d4;">${name}</strong>, you've been added to the Digital Triangle admin panel as <strong style="color:#8b5cf6;">${role}</strong>.
          </p>

          <!-- Credentials box -->
          <div style="background:#131318;border-radius:10px;border:1px solid rgba(255,255,255,0.07);padding:20px;margin-bottom:28px;">
            <p style="color:#525260;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;font-weight:700;">Your Login Credentials</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#525260;font-size:13px;padding:6px 0;">Email</td>
                <td style="color:#c8c8d4;font-size:13px;font-weight:600;text-align:right;">${to}</td>
              </tr>
              <tr>
                <td style="color:#525260;font-size:13px;padding:6px 0;">Temporary Password</td>
                <td style="text-align:right;">
                  <code style="background:#1a1a22;color:#4b6bff;font-size:13px;font-weight:700;padding:3px 8px;border-radius:5px;border:1px solid rgba(75,107,255,0.25);">${tempPassword}</code>
                </td>
              </tr>
            </table>
          </div>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:28px;">
            <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#4b6bff,#8b5cf6);color:#fff;font-weight:600;font-size:15px;padding:14px 32px;border-radius:10px;text-decoration:none;">
              Login to Admin Panel →
            </a>
          </div>

          <p style="color:#525260;font-size:12px;line-height:1.6;margin:0;text-align:center;">
            Please change your password after logging in for the first time.<br>
            If you have any issues, contact <a href="mailto:team@digitaltriangle.in" style="color:#4b6bff;">team@digitaltriangle.in</a>
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:24px;text-align:center;">
          <p style="color:#525260;font-size:11px;margin:0;">🇮🇳 Made in Bharat · Digital Triangle © ${new Date().getFullYear()}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: 'Digital Triangle <noreply@thedigitaltriangle.com>',
      to,
      subject: `You've been invited to Digital Triangle Admin`,
      html,
    }),
  });
}

// POST /api/admin/users — invite a user
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { email, role } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'A user with that email already exists' }, { status: 409 });
  }

  const tempPassword = generateTempPassword();
  const hashedPassword = await hashPassword(tempPassword);
  const name = email.split('@')[0];

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
      isActive: true,
    },
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
  });

  await sendInviteEmail(email, name, role, tempPassword).catch((err) =>
    console.error('[invite] email failed:', err)
  );

  return NextResponse.json({ user }, { status: 201 });
}
