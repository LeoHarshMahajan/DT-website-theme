import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

function slugify(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type PostWithRelations = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  category: string | null;
  coverImage: string | null;
  metaTitle: string | null;
  ogImage: string | null;
  canonical: string | null;
  noindex: boolean;
  nofollow: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: { name: string | null } | null;
  tags: { name: string }[];
};

function shape(p: PostWithRelations) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.excerpt ?? '',
    content: p.content,
    category: p.category ?? '',
    coverImage: p.coverImage ?? '',
    metaTitle: p.metaTitle ?? '',
    ogImage: p.ogImage ?? '',
    canonical: p.canonical ?? '',
    noindex: p.noindex ?? false,
    nofollow: p.nofollow ?? false,
    tags: p.tags.map((t) => t.name),        // always an array
    tagsString: p.tags.map((t) => t.name).join(', '), // for admin form inputs
    published: p.status === 'PUBLISHED',
    status: p.status,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    author: { name: p.author?.name ?? 'Unknown' },
  };
}

// GET /api/posts — authenticated: all posts; public: published only
export async function GET(request: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(request.url);

  const page   = Math.max(1, parseInt(searchParams.get('page')  ?? '1', 10));
  const maxLim = session?.user ? 1000 : 100;
  const limit  = Math.min(maxLim, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)));
  const search   = searchParams.get('search')?.trim() ?? '';
  const tag      = searchParams.get('tag')?.trim() ?? '';
  const category = searchParams.get('category')?.trim() ?? '';
  const skip     = (page - 1) * limit;

  const base: Record<string, any> = session?.user ? {} : { status: 'PUBLISHED' };
  const where: Record<string, any> = { ...base };

  if (search) {
    where.OR = [
      { title:   { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (tag) {
    where.tags = { some: { name: { equals: tag, mode: 'insensitive' } } };
  }
  if (category) {
    where.category = { equals: category, mode: 'insensitive' };
  }

  const firstUnfiltered = !tag && !search && !category;

  const [posts, total, allTags, catGroups] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: { select: { name: true } }, tags: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
    // Return distinct tag names used in published posts (for filter chips)
    firstUnfiltered
      ? prisma.tag.findMany({
          where: { posts: { some: base } },
          select: { name: true },
          orderBy: { name: 'asc' },
        })
      : Promise.resolve(null),
    // Distinct categories in scope, with counts (for category filter chips)
    firstUnfiltered
      ? prisma.post.groupBy({
          by: ['category'],
          where: { ...base, category: { not: null } },
          _count: { category: true },
        })
      : Promise.resolve(null),
  ]);

  return NextResponse.json({
    posts: posts.map(shape),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    ...(allTags ? { availableTags: allTags.map((t) => t.name) } : {}),
    ...(catGroups
      ? { availableCategories: catGroups.map((g) => ({ slug: g.category as string, count: g._count.category })) }
      : {}),
  });
}

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().default(''),
  content: z.string().optional().default(''),
  published: z.boolean().optional().default(false),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  noindex: z.boolean().optional().default(false),
  nofollow: z.boolean().optional().default(false),
});

function parseTags(tags: string | string[] | undefined): string[] {
  if (!tags) return [];
  const arr = Array.isArray(tags) ? tags : tags.split(',');
  return arr.map((t) => t.trim()).filter(Boolean);
}

// POST /api/posts — create a post
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
  }

  const { title, description, content, published } = parsed.data;
  const slug = slugify(parsed.data.slug || title);

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: 'A post with that slug already exists' }, { status: 409 });
  }

  const tagNames = parseTags(parsed.data.tags);
  const tagConnect = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({ where: { slug: slugify(name) }, update: {}, create: { slug: slugify(name), name } })
    )
  );

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: description,
      content,
      status: published ? 'PUBLISHED' : 'DRAFT',
      publishedAt: published ? new Date() : null,
      authorId: (session.user as { id: string }).id,
      tags: { connect: tagConnect.map((t) => ({ id: t.id })) },
      category: parsed.data.category || null,
      coverImage: parsed.data.coverImage || null,
      metaTitle: parsed.data.metaTitle || null,
      ogImage: parsed.data.ogImage || null,
      canonical: parsed.data.canonical || null,
      noindex: parsed.data.noindex ?? false,
      nofollow: parsed.data.nofollow ?? false,
    },
    include: { author: { select: { name: true } }, tags: { select: { name: true } } },
  });

  return NextResponse.json({ post: shape(post) }, { status: 201 });
}
