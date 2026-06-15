'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  tags: string[];
}

export default function AuthorArchivePage() {
  const params = useParams();
  const authorId = params.id as string;

  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch author and their posts
    // Mock data for demonstration
    const mockAuthor: Author = {
      id: authorId,
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      bio: 'Full-stack developer passionate about building scalable web applications and mentoring junior developers.',
    };

    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Getting Started with Next.js 14',
        description: 'Learn the fundamentals of Next.js 14 with App Router and Server Components.',
        slug: 'getting-started-nextjs-14',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Next.js', 'React', 'Tutorial'],
      },
      {
        id: '4',
        title: 'Advanced TypeScript Patterns',
        description: 'Explore advanced TypeScript patterns for building robust and maintainable applications.',
        slug: 'advanced-typescript-patterns',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['TypeScript', 'Advanced', 'Programming'],
      },
    ];

    setAuthor(mockAuthor);
    setPosts(mockPosts);
    setIsLoading(false);
  }, [authorId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-bg-0 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-line rounded w-1/3"></div>
            <div className="h-20 bg-line rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!author) {
    return (
      <main className="min-h-screen bg-bg-0 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Icon name="alert-circle" size="lg" className="mx-auto text-red-500 mb-4" />
          <h1 className="h-md mb-4">Author Not Found</h1>
          <Link href="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-0 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Link */}
        <Reveal direction="left">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue hover:underline mb-8">
            <Icon name="arrow-left" size="sm" />
            Back to Blog
          </Link>
        </Reveal>

        {/* Author Info */}
        <Reveal direction="down">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-12 p-6 bg-bg-1 rounded-lg border border-line">
            <div className="w-24 h-24 rounded-full bg-brand-blue text-white flex items-center justify-center text-3xl font-bold flex-shrink-0">
              {author.name.split(' ').map((n) => n.charAt(0)).join('')}
            </div>

            <div className="flex-1">
              <h1 className="h-md mb-2">{author.name}</h1>
              {author.bio && <p className="text-fg-1 mb-3">{author.bio}</p>}
              <p className="text-sm text-fg-2">{posts.length} posts published</p>
            </div>
          </div>
        </Reveal>

        {/* Articles */}
        <Reveal direction="up" delay={0.1}>
          <h2 className="h-md mb-6">Latest Articles</h2>
        </Reveal>

        {/* Posts Grid */}
        {posts.length > 0 && (
          <Reveal direction="up" delay={0.15}>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="border border-line rounded-lg p-6 hover:border-brand-blue transition-colors group cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="h-md group-hover:text-brand-blue transition-colors flex-1">
                        {post.title}
                      </h3>
                      <Icon
                        name="arrow-right"
                        size="md"
                        className="text-fg-2 group-hover:text-brand-blue transition-colors flex-shrink-0 mt-1"
                      />
                    </div>

                    <p className="text-fg-1 mb-4 line-clamp-2">{post.description}</p>

                    <div className="flex flex-wrap gap-2 items-center text-sm text-fg-2 mb-4">
                      <time>{formatDate(post.createdAt)}</time>
                      {post.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-bg-2 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs">+{post.tags.length - 2} more</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </Reveal>
        )}

        {/* No Posts State */}
        {posts.length === 0 && (
          <Reveal direction="up">
            <div className="text-center py-12">
              <Icon name="file-text" size="lg" className="mx-auto text-fg-2 mb-4" />
              <p className="text-fg-1 mb-4">{author.name} hasn't published any articles yet.</p>
              <Link href="/blog" className="btn btn-primary">
                View All Posts
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
