import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestResetSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = requestResetSchema.parse(body);

    // TODO: Implement actual password reset flow
    // Steps would be:
    // 1. Check if user exists with this email
    // 2. Generate a reset token (JWT or random)
    // 3. Store token in database with expiration (24 hours)
    // 4. Send email with reset link containing token
    // 5. Return success message

    return NextResponse.json(
      {
        message:
          'If an account with that email exists, you will receive a password reset link shortly.',
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
