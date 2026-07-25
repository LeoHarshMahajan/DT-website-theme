import { google } from 'googleapis';
import { prisma } from '@/lib/db/prisma';

// Slot rules (spec-locked): 30-min calls, Mon-Fri, IST business hours, small buffer.
const SLOT_MINUTES = 30;
const BUFFER_MINUTES = 15;
const BUSINESS_START_HOUR_IST = 10;
const BUSINESS_END_HOUR_IST = 18;
const LOOKAHEAD_DAYS = 7;
const IST_OFFSET_MINUTES = 5.5 * 60;

type ServiceAccount = { client_email: string; private_key: string; subject: string };

// ponytail: credentials live in the DB, not the hosting env panel — Hostinger's
// panel could not hold a multi-line PEM (kept serving a stale/corrupt value
// through edits, .env imports and full redeploys). The DB is already a trusted
// store on the same connection prod uses, and is writable from a dev machine,
// so it's one less broken moving part. Env vars still win if set.
let cached: ServiceAccount | null = null;

async function loadServiceAccount(): Promise<ServiceAccount | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const subject = process.env.GOOGLE_CALENDAR_IMPERSONATE;
  if (email && key && subject) return { client_email: email, private_key: key, subject };

  if (cached) return cached;
  try {
    const row = await prisma.appSecret.findUnique({ where: { key: 'google_calendar' } });
    if (!row) return null;
    cached = JSON.parse(row.value) as ServiceAccount;
    return cached;
  } catch {
    return null;
  }
}

// Returns the client plus the calendar it acts on — the impersonated mailbox
// IS the target calendar, so they always travel together.
async function getClient() {
  const sa = await loadServiceAccount();
  if (!sa) return null;
  const auth = new google.auth.JWT({
    email: sa.client_email,
    key: sa.private_key,
    subject: sa.subject,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return { calendar: google.calendar({ version: 'v3', auth }), calendarId: sa.subject };
}

function toIstParts(utcMs: number) {
  const istMs = utcMs + IST_OFFSET_MINUTES * 60 * 1000;
  const d = new Date(istMs);
  return { hour: d.getUTCHours(), minute: d.getUTCMinutes(), day: d.getUTCDay(), dateUtc: d };
}

function istWallTimeToUtc(year: number, month: number, date: number, hour: number, minute: number) {
  // Construct as if IST were UTC, then subtract the offset to get real UTC.
  const asUtc = Date.UTC(year, month, date, hour, minute);
  return new Date(asUtc - IST_OFFSET_MINUTES * 60 * 1000);
}

export type Slot = { start: string; end: string; label: string };

export async function getAvailability(): Promise<Slot[] | { error: string }> {
  const client = await getClient();
  if (!client) return { error: 'Calendar is not connected yet.' };
  const { calendar, calendarId } = client;

  const now = new Date();
  const rangeEnd = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);

  const fb = await calendar.freebusy.query({
    requestBody: {
      timeMin: now.toISOString(),
      timeMax: rangeEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  });
  const busy = (fb.data.calendars?.[calendarId]?.busy ?? []).map((b) => ({
    start: new Date(b.start!).getTime(),
    end: new Date(b.end!).getTime(),
  }));

  const slots: Slot[] = [];
  for (let d = 0; d < LOOKAHEAD_DAYS && slots.length < 6; d++) {
    const dayIst = toIstParts(now.getTime() + d * 24 * 60 * 60 * 1000);
    if (dayIst.day === 0 || dayIst.day === 6) continue; // weekends

    for (let hour = BUSINESS_START_HOUR_IST; hour < BUSINESS_END_HOUR_IST; hour++) {
      for (const minute of [0, 30]) {
        const start = istWallTimeToUtc(
          dayIst.dateUtc.getUTCFullYear(),
          dayIst.dateUtc.getUTCMonth(),
          dayIst.dateUtc.getUTCDate(),
          hour,
          minute
        );
        if (start.getTime() < now.getTime() + 60 * 60 * 1000) continue; // at least 1hr notice
        const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);

        const conflicts = busy.some(
          (b) => start.getTime() < b.end + BUFFER_MINUTES * 60 * 1000 && end.getTime() > b.start - BUFFER_MINUTES * 60 * 1000
        );
        if (!conflicts) {
          slots.push({
            start: start.toISOString(),
            end: end.toISOString(),
            label: start.toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
          });
        }
        if (slots.length >= 6) break;
      }
      if (slots.length >= 6) break;
    }
  }
  return slots;
}

export async function bookCall(input: { name: string; email: string; start: string; context: string }) {
  const client = await getClient();
  if (!client) return { error: 'Calendar is not connected yet.' };
  const { calendar, calendarId } = client;

  const start = new Date(input.start);
  if (Number.isNaN(start.getTime())) return { error: 'Invalid slot — ask the visitor to pick one of the offered times.' };
  const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId,
    sendUpdates: 'all',
    requestBody: {
      summary: `Discovery call — ${input.name}`,
      description: input.context,
      start: { dateTime: start.toISOString(), timeZone: 'Asia/Kolkata' },
      end: { dateTime: end.toISOString(), timeZone: 'Asia/Kolkata' },
      attendees: [{ email: input.email }],
    },
  });
  return { booked: true, eventId: event.data.id, htmlLink: event.data.htmlLink };
}
