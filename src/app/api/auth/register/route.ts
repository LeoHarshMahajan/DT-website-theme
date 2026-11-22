import { NextResponse } from 'next/server';

// Admin accounts are invite-only (Admin -> Users -> Invite). This used to
// return 200 "coming soon", so the form told visitors they'd signed up when
// nothing was created.
export async function POST() {
  return NextResponse.json(
    { message: 'Accounts are invite-only. Ask a Digital Triangle admin to send you an invite.' },
    { status: 403 }
  );
}
