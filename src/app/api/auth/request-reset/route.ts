import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestResetSchema = z.object({
  email: z.string().email(),
});

const GENERIC_OK = { message: 'If an account with that email exists, you will receive a password reset link shortly.' };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = requestResetSchema.parse(body);

    try {
      const { prisma } = await import('@/lib/db/prisma');
      const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });

      if (user) {
        const { randomBytes } = await import('crypto');
        const token = randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Atomic: delete old tokens + create new one
        await prisma.$transaction([
          prisma.verificationToken.deleteMany({ where: { identifier: email } }),
          prisma.verificationToken.create({ data: { identifier: email, token, expires } }),
        ]);

        const { sendPasswordResetEmail } = await import('@/lib/email');
        await sendPasswordResetEmail(email, token);
      }
    } catch (err) {
      console.error('[request-reset] error:', err);
    }

    // Always return the same response — never reveal if email exists
    return NextResponse.json(GENERIC_OK, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
