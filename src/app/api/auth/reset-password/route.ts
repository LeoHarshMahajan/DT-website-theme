import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email, password } = resetPasswordSchema.parse(body);

    const { verifyToken, hashPassword } = await import('@/lib/auth/utils');
    const valid = await verifyToken(email, token);

    if (!valid) {
      return NextResponse.json({ message: 'Invalid or expired reset link. Please request a new one.' }, { status: 400 });
    }

    const { prisma } = await import('@/lib/db/prisma');
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });

    if (!user) {
      return NextResponse.json({ message: 'Account not found.' }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    await prisma.user.update({ where: { email }, data: { password: hashed } });

    return NextResponse.json({ message: 'Password updated successfully. You can now sign in.' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
