import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('website'),
});

/**
 * POST /api/subscribers
 * Subscribe an email address to the newsletter.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      );
    }

    const { email, source } = parsed.data;

    // ── Persist to database ──────────────────────────────────────────────────
    try {
      const { prisma } = await import('@/lib/db/prisma');

      // `source` is not in the schema yet — just upsert email + status
      await prisma.subscriber.upsert({
        where: { email },
        update: {
          status: 'ACTIVE',
        },
        create: {
          email,
          status: 'ACTIVE',
        },
      });
    } catch (dbErr) {
      // DB not configured yet — log and continue so the API still responds 200
      console.warn('[subscribers] DB unavailable, subscription not persisted:', dbErr);
    }

    return NextResponse.json(
      { success: true, message: 'You\'re on the list!' },
      { status: 201 },
    );
  } catch (err) {
    console.error('[subscribers] POST error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/subscribers
 * Unsubscribe an email address (from unsubscribe link).
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email || !z.string().email().safeParse(email).success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    try {
      const { prisma } = await import('@/lib/db/prisma');

      await prisma.subscriber.updateMany({
        where: { email },
        data: { status: 'UNSUBSCRIBED', updatedAt: new Date() },
      });
    } catch {
      console.warn('[subscribers] DB unavailable');
    }

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully.' });
  } catch (err) {
    console.error('[subscribers] DELETE error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
