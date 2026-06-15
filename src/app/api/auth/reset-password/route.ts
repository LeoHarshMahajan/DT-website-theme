import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // TODO: Implement actual password reset
    // Steps would be:
    // 1. Verify the reset token is valid and not expired
    // 2. Check if it exists in database
    // 3. Hash the new password
    // 4. Update user's password in database
    // 5. Invalidate/delete the reset token
    // 6. Return success

    return NextResponse.json(
      {
        message: 'Password reset functionality coming soon',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
