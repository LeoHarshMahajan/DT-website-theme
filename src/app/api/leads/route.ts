import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { sendLeadNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  type: z.enum(['CONTACT', 'CONSULTATION', 'AUDIT']).default('CONTACT'),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  company: z.string().max(160).optional(),
  website: z.string().max(200).optional(),
  budget: z.string().max(80).optional(),
  services: z.union([z.string(), z.array(z.string())]).optional(),
  goals: z.union([z.string(), z.array(z.string())]).optional(),
  slot: z.string().max(80).optional(),
  message: z.string().max(4000).optional(),
  source: z.string().max(200).optional(),
});

function toStr(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v.join(', ') : v;
}

// POST /api/leads — public lead/form capture
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const d = parsed.data;

    await prisma.lead.create({
      data: {
        type: d.type,
        name: d.name,
        email: d.email,
        phone: d.phone,
        company: d.company,
        website: d.website,
        budget: d.budget,
        services: toStr(d.services),
        goals: toStr(d.goals),
        slot: d.slot,
        message: d.message,
        source: d.source,
      },
    });

    sendLeadNotification({
      type: d.type,
      name: d.name,
      email: d.email,
      phone: d.phone,
      company: d.company,
      website: d.website,
      budget: d.budget,
      services: toStr(d.services),
      goals: toStr(d.goals),
      slot: d.slot,
      message: d.message,
      source: d.source,
    }).catch((err) => console.error('[leads] notify email failed:', err));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[leads] POST error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
