import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const BUCKET = 'blog-images';
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

// POST /api/admin/upload — uploads an image to Supabase Storage, returns public URL
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Image storage is not configured. Paste an image URL instead.' },
      { status: 500 }
    );
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 400 });
  }

  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      apikey: supabaseKey,
      'Content-Type': file.type,
      'x-upsert': 'true',
    },
    body: bytes,
  });

  if (!uploadRes.ok) {
    const detail = await uploadRes.text().catch(() => '');
    return NextResponse.json(
      { error: 'Upload failed. Paste an image URL instead.', detail: detail.slice(0, 200) },
      { status: 502 }
    );
  }

  const url = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`;
  return NextResponse.json({ url });
}
