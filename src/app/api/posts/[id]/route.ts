import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  content: z.string().min(50).optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET /api/posts/[id] - Get a single post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // TODO: Implement with Prisma
    // const post = await prisma.post.findUnique({
    //   where: { id },
    //   include: { author: true, tags: true },
    // });
    //
    // if (!post) {
    //   return NextResponse.json(
    //     { message: 'Post not found' },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json(
      {
        message: 'Post retrieval functionality coming soon',
        post: null,
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

// PATCH /api/posts/[id] - Update a post
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = updatePostSchema.parse(body);

    // TODO: Implement with Prisma
    // 1. Check post exists
    // 2. Check authorization (author or admin)
    // 3. Update post with new data
    // 4. Return updated post

    return NextResponse.json(
      {
        message: 'Post update functionality coming soon',
        post: null,
      },
      { status: 200 }
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

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    // TODO: Implement with Prisma
    // 1. Check post exists
    // 2. Check authorization (author or admin)
    // 3. Delete post
    // 4. Return success

    return NextResponse.json(
      {
        message: 'Post deletion functionality coming soon',
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
