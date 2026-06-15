'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { BLOG_POSTS, type BlogPost } from '@/lib/blogPosts';

type Post = BlogPost & { externalUrl?: string };

const ITEMS_PER_PAGE = 9;

export function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input by 350ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Search mode vs paginated mode
  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchSearch(debouncedSearch.trim());
    } else {
      fetchPosts(currentPage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentPage]);

  async function fetchPosts(page: number) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/posts?page=${page}&limit=${ITEMS_PER_PAGE}&published=true`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      if (!data.posts || data.posts.length === 0) {
        setPosts(generateMockPosts());
        setTotalPages(3);
      } else {
        setPosts(data.posts);
        setTotalPages(Math.ceil(data.pagination.total / ITEMS_PER_PAGE));
      }
    } catch {
      setPosts(generateMockPosts());
      setTotalPages(3);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSearch(query: string) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/posts?search=${encodeURIComponent(query)}&limit=100&published=true`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      const apiPosts: Post[] = data.posts || [];
      if (apiPosts.length > 0) {
        setPosts(apiPosts);
      } else {
        setPosts(searchMockPosts(query));
      }
    } catch {
      setPosts(searchMockPosts(query));
    } finally {
      setIsLoading(false);
      setTotalPages(0); // no pagination in search mode
    }
  }

  function searchMockPosts(query: string): Post[] {
    const q = query.toLowerCase();
    return BLOG_POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  function generateMockPosts(): Post[] {
    return BLOG_POSTS;
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // In search mode, `posts` already contains the filtered results from fetchSearch
  const filteredPosts = posts;

  const TAG_COLORS: Record<string, string> = {
    'AI Marketing': '#4b6bff', 'Emotional Branding': '#8b5cf6', 'Branding': '#8b5cf6',
    'D2C': '#c026d3', 'WhatsApp Commerce': '#c026d3', 'Growth Strategy': '#e11d8a',
    'SEO': '#4b6bff', 'Analytics': '#8b5cf6', 'Social Media': '#e11d8a',
    'Instagram': '#c026d3', 'Email Marketing': '#8b5cf6', 'Copywriting': '#f59e0b',
    'Paid Ads': '#8b5cf6', 'Google Ads': '#4b6bff', 'PPC': '#4b6bff',
    'Hospitality': '#8b5cf6', 'Brand Building': '#e11d8a', 'WhatsApp': '#c026d3',
    'Automation': '#4b6bff', 'Fintech': '#f59e0b', 'E-commerce': '#c026d3',
    'Strategy': '#8b5cf6', 'Brands': '#e11d8a', 'Education': '#4b6bff',
    'Tools': '#4b6bff', 'Google Tools': '#4b6bff', 'Content': '#c026d3',
    'Google': '#4b6bff', 'Startup': '#8b5cf6', 'Commerce': '#8b5cf6',
    'India': '#e11d8a', 'Templates': '#f59e0b', 'Coupons': '#e11d8a',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

      {/* ── Hero ── */}
      <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 112px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
        {/* Decorative bg */}
        <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.18), transparent 65%)' }} />
        <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)' }} />
        <div className="grid-bg" />

        <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="down">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)' }}>Growth Insights</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', marginBottom: '20px' }}>
                Ideas that{' '}
                <span className="grad-text">compound.</span>
              </h1>

              <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.75, color: 'var(--fg-1)', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}>
                AI marketing, D2C growth strategies, SEO playbooks, and case studies from the Digital Triangle team.
              </p>

              {/* Search */}
              <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto' }}>
                <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-3)', pointerEvents: 'none', flexShrink: 0 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); setTotalPages(0); }}
                  placeholder="Search articles, topics, tags..."
                  style={{
                    width: '100%', padding: '14px 44px', borderRadius: '999px',
                    border: '1px solid var(--line-strong)',
                    backgroundColor: 'var(--bg-1)', color: 'var(--fg-0)',
                    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75,107,255,0.12)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} aria-label="Clear search"
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                  </button>
                )}
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Posts ── */}
      <section style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <div className="shell">

          {/* Search result label */}
          {searchQuery && (
            <Reveal direction="up">
              <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>
                {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </Reveal>
          )}

          {/* Loading skeletons */}
          {isLoading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="posts-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse" style={{ borderRadius: '16px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-1)', padding: '28px', minHeight: '200px' }}>
                  <div style={{ height: '18px', borderRadius: '4px', backgroundColor: 'var(--bg-3)', marginBottom: '12px', width: '70%' }} />
                  <div style={{ height: '14px', borderRadius: '4px', backgroundColor: 'var(--bg-2)', marginBottom: '8px' }} />
                  <div style={{ height: '14px', borderRadius: '4px', backgroundColor: 'var(--bg-2)', width: '85%' }} />
                </div>
              ))}
            </div>
          )}

          {/* No search results */}
          {!isLoading && debouncedSearch && filteredPosts.length === 0 && (
            <Reveal direction="up">
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>◎</div>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--fg-0)', marginBottom: '8px' }}>No articles found.</p>
                <p style={{ color: 'var(--fg-2)', fontSize: '0.9rem' }}>
                  Try a different keyword or{' '}
                  <button onClick={() => setSearchQuery('')} style={{ color: 'var(--brand-blue)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>clear the search</button>.
                </p>
              </div>
            </Reveal>
          )}

          {/* Posts grid */}
          {!isLoading && filteredPosts.length > 0 && (
            <Reveal direction="up" delay={0.06}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="posts-grid">
                {filteredPosts.map((post, index) => {
                  const accentColor = TAG_COLORS[post.tags[0]] ?? 'var(--brand-blue)';
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="blog-card"
                      style={{
                        display: 'flex', flexDirection: 'column',
                        backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
                        borderRadius: '16px', overflow: 'hidden',
                        textDecoration: 'none',
                        animationDelay: `${index * 0.04}s`,
                      }}
                    >
                      {/* Top accent bar */}
                      <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)`, flexShrink: 0 }} />

                      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} style={{
                              padding: '3px 9px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: '600',
                              fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase',
                              backgroundColor: (TAG_COLORS[tag] ?? 'var(--brand-blue)') + '15',
                              border: `1px solid ${(TAG_COLORS[tag] ?? 'var(--brand-blue)')}30`,
                              color: TAG_COLORS[tag] ?? 'var(--brand-blue)',
                            }}>{tag}</span>
                          ))}
                        </div>

                        {/* Title */}
                        <h2 style={{
                          fontSize: '1rem', fontWeight: '700', lineHeight: 1.4,
                          color: 'var(--fg-0)', marginBottom: '10px', flex: 1,
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {post.title}
                        </h2>

                        {/* Description */}
                        <p style={{
                          fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--fg-2)',
                          marginBottom: '18px',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {post.description}
                        </p>

                        {/* Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                          <time style={{ fontSize: '0.75rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                            {formatDate(post.createdAt)}
                          </time>
                          <span style={{ fontSize: '0.75rem', color: accentColor, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                            Read →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* Pagination */}
          {totalPages > 1 && !searchQuery && (
            <Reveal direction="up" delay={0.15}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px', flexWrap: 'wrap' }}>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-1)', color: 'var(--fg-1)', fontSize: '0.85rem', cursor: 'pointer', opacity: currentPage === 1 ? 0.4 : 1, transition: 'all 0.15s', fontFamily: 'inherit' }}>
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '999px', border: '1px solid', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                      borderColor: currentPage === page ? 'var(--brand-blue)' : 'var(--line)',
                      backgroundColor: currentPage === page ? 'var(--brand-blue)' : 'var(--bg-1)',
                      color: currentPage === page ? 'white' : 'var(--fg-1)',
                    }}>
                    {page}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-1)', color: 'var(--fg-1)', fontSize: '0.85rem', cursor: 'pointer', opacity: currentPage === totalPages ? 0.4 : 1, transition: 'all 0.15s', fontFamily: 'inherit' }}>
                  Next →
                </button>
              </div>
            </Reveal>
          )}

          {/* Empty state */}
          {!isLoading && posts.length === 0 && !error && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--fg-1)' }}>No posts published yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Error toast */}
      {error && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: 'var(--bg-2)', border: '1px solid var(--line-strong)', borderRadius: '12px', padding: '12px 18px', fontSize: '0.82rem', color: 'var(--fg-1)', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          Showing sample posts — API not connected.
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) { .posts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .posts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
