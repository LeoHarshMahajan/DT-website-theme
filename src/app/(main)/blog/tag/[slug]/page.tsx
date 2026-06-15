'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  author: {
    name: string;
  };
  createdAt: string;
  tags: string[];
}

export default function TagArchivePage() {
  const params = useParams();
  const tag = decodeURIComponent(params.slug as string);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch posts filtered by tag
    // Mock data for demonstration
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Getting Started with Next.js 14',
        description: 'Learn the fundamentals of Next.js 14 with App Router and Server Components.',
        slug: 'getting-started-nextjs-14',
        author: { name: 'Sarah Chen' },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Next.js', 'React', 'Tutorial'],
      },
    ];

    setPosts(mockPosts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())));
    setIsLoading(false);
  }, [tag]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-bg-0 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <Reveal direction="down">
          <div className="flex items-center gap-3 mb-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue hover:underline">
              <Icon name="arrow-left" size="sm" />
              Back
            </Link>
            <span className="text-fg-2">/</span>
            <h1 className="h-lg">
              Posts tagged with <span className="text-brand-blue">{tag}</span>
            </h1>
          </div>
        </Reveal>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-line rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-line rounded w-full mb-2"></div>
                <div className="h-4 bg-line rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && posts.length > 0 && (
          <Reveal direction="up" delay={0.1}>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="border border-line rounded-lg p-6 hover:border-brand-blue transition-colors group cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h2 className="h-md group-hover:text-brand-blue transition-colors flex-1">
                        {post.title}
                      </h2>
                      <Icon
                        name="arrow-right"
                        size="md"
                        className="text-fg-2 group-hover:text-brand-blue transition-colors flex-shrink-0 mt-1"
                      />
                    </div>

                    <p className="text-fg-1 mb-4 line-clamp-2">{post.description}</p>

                    <div className="flex flex-wrap gap-2 items-center text-sm text-fg-2">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <time>{formatDate(post.createdAt)}</time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </Reveal>
        )}

        {/* No Posts State */}
        {!isLoading && posts.length === 0 && (
          <Reveal direction="up">
            <div className="text-center py-12">
              <Icon name="file-text" size="lg" className="mx-auto text-fg-2 mb-4" />
              <p className="text-fg-1 mb-4">No posts found with the tag "{tag}".</p>
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
