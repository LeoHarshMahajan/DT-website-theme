import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rateLimit';

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
  const limited = rateLimit('contact', request.headers, 5, 10 * 60_000);
  if (limited) return limited;
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

    const lead = {
      type: 'CONTACT',
      name,
      email,
      company,
      phone,
      budget,
      services: services?.length ? services.join(', ') : undefined,
      message,
      source: '/contact',
    };

    let saved = true;
    try {
      const { prisma } = await import('@/lib/db/prisma');
      await prisma.lead.create({ data: lead });
    } catch (dbErr) {
      saved = false;
      console.error('[contact] DB write failed:', dbErr);
    }

    if (saved) {
      sendLeadNotification(lead).catch((err) => console.error('[contact] notify email failed:', err));
    } else {
      // Not in the DB, so the email is now the only copy. If that can't go out
      // either, tell the visitor instead of showing success for a lost lead.
      const emailed = await sendLeadNotification(lead).catch((err) => {
        console.error('[contact] notify email failed:', err);
        return false;
      });
      if (!emailed) {
        return NextResponse.json(
          { error: "We couldn't send that just now. Please try again, or WhatsApp us on +91 80770 42525." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] POST error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
