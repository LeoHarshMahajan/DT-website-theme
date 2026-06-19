import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadNotification } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  budget: z.string().max(50).optional(),
  services: z.array(z.string().max(50)).max(10).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.safeParse(body);

    if (!data.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: data.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, company, phone, budget, services, message } = data.data;

    try {
      const { prisma } = await import('@/lib/db/prisma');
      await prisma.lead.create({
        data: {
          type: 'CONTACT',
          name,
          email,
          company,
          phone,
          budget,
          services: services?.length ? services.join(', ') : undefined,
          message,
          source: '/contact',
        },
      });
    } catch (dbErr) {
      console.warn('[contact] DB unavailable, lead not persisted:', dbErr);
    }

    sendLeadNotification({
      type: 'CONTACT',
      name,
      email,
      company,
      phone,
      budget,
      services: services?.join(', '),
      message,
      source: '/contact',
    }).catch((err) => console.error('[contact] notify email failed:', err));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] POST error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
