import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    // TODO: Implement actual user registration
    // Steps would be:
    // 1. Check if user exists with Prisma
    // 2. Hash password with bcryptjs
    // 3. Create user in database
    // 4. Send verification email
    // 5. Return success or error

    return NextResponse.json(
      {
        message: 'Registration functionality coming soon',
        user: { name, email },
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
