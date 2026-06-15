import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const createPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(50),
  authorId: z.string(),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

// GET /api/posts - List all posts with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const published = searchParams.get('published') === 'true';

    // TODO: Implement with Prisma
    // const posts = await prisma.post.findMany({
    //   where: { published: published ? true : undefined },
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   include: { author: true, tags: true },
    //   orderBy: { createdAt: 'desc' },
    // });

    return NextResponse.json(
      {
        message: 'Blog listing functionality coming soon',
        pagination: {
          page,
          limit,
          total: 0,
        },
        posts: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, description, content, authorId, published, tags } =
      createPostSchema.parse(body);

    // TODO: Implement with Prisma
    // 1. Check if slug already exists
    // 2. Create post with author and tags
    // 3. Return created post with ID

    return NextResponse.json(
      {
        message: 'Post creation functionality coming soon',
        post: {
          id: 'temp-id',
          title,
          slug,
          description,
          published,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
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
