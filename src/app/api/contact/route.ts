import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

    // ── Persist to DB so it shows in the admin Leads dashboard ───────────────
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

    // ── Send via Resend (email service) ──────────────────────────────────────
    // Requires RESEND_API_KEY in .env — if not set, log and return success
    const resendKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'info@digitaltriangle.in';

    if (resendKey) {
      const emailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        phone ? `Phone: ${phone}` : null,
        budget ? `Budget: ${budget}` : null,
        services?.length ? `Services: ${services.join(', ')}` : null,
        message ? `\nMessage:\n${message}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Digital Triangle Website <noreply@digitaltriangle.in>',
          to: contactEmail,
          reply_to: email,
          subject: `New contact from ${name}${company ? ` (${company})` : ''}`,
          text: emailBody,
        }),
      });
    } else {
      console.info('[contact] RESEND_API_KEY not set — form submission received but email not sent:', { name, email });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] POST error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
