import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // TODO: Implement actual NextAuth signin
    // This is a placeholder that demonstrates the endpoint structure

    return NextResponse.json(
      {
        message: 'Login functionality coming soon. Please use mock credentials.',
        email,
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
