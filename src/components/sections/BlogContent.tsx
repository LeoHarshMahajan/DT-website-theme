'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { BLOG_POSTS, type BlogPost } from '@/lib/blogPosts';

type Post = BlogPost & { externalUrl?: string };

const ITEMS_PER_PAGE = 9;

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

function mockTagsFromPosts(posts: BlogPost[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  // null = unknown, true = DB has posts, false = DB is empty → use static fallback
  const dbHasPosts = useRef<boolean | null>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const fetchPosts = useCallback(async (page: number, tag: string, search: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(ITEMS_PER_PAGE) });
      if (tag)    params.set('tag', tag);
      if (search) params.set('search', search);

      const res = await fetch(`/api/posts?${params}`, { cache: 'no-store' });
      if (!res.ok) throw new Error();
      const data = await res.json();

      const isFirstUnfiltered = page === 1 && !tag && !search;

      if (!data.posts || data.posts.length === 0) {
        // On first unfiltered load: record that DB is empty and use static fallback
        // On paginated/filtered loads: if DB has posts, just show empty (don't mix in static data)
        if (isFirstUnfiltered) dbHasPosts.current = false;

        if (dbHasPosts.current === false) {
          const mock = tag
            ? BLOG_POSTS.filter((p) => p.tags.includes(tag))
            : search
            ? BLOG_POSTS.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
              )
            : BLOG_POSTS;
          setPosts(mock.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
          setTotalPages(Math.ceil(mock.length / ITEMS_PER_PAGE));
        } else {
          // DB has posts but this page is empty (past last page) — show nothing
          setPosts([]);
          setTotalPages(data.pagination?.pages ?? 1);
        }
      } else {
        if (isFirstUnfiltered) dbHasPosts.current = true;
        setPosts(data.posts);
        setTotalPages(data.pagination?.pages ?? 1);
      }

      // Populate tag chips from API on first unfiltered load
      if (data.availableTags?.length) {
        setAvailableTags(data.availableTags);
      } else if (!availableTags.length) {
        setAvailableTags(mockTagsFromPosts(BLOG_POSTS));
      }
    } catch {
      // Network error fallback — use static data
      const mock = selectedTag
        ? BLOG_POSTS.filter((p) => p.tags.includes(selectedTag))
        : BLOG_POSTS;
      setPosts(mock.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
      setTotalPages(Math.ceil(mock.length / ITEMS_PER_PAGE));
      if (!availableTags.length) setAvailableTags(mockTagsFromPosts(BLOG_POSTS));
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPosts(currentPage, selectedTag, debouncedSearch);
  }, [currentPage, selectedTag, debouncedSearch, fetchPosts]);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? '' : tag));
    setCurrentPage(1);
    setSearchQuery('');
    setDebouncedSearch('');
  };

  const clearFilters = () => {
    setSelectedTag('');
    setSearchQuery('');
    setDebouncedSearch('');
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const isFiltered = !!selectedTag || !!debouncedSearch;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

      {/* ── Hero ── */}
      <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 112px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
        <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.18), transparent 65%)' }} />
        <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)' }} />
        <div className="grid-bg" />

        <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="down">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
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
                <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-3)', pointerEvents: 'none' }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); setSelectedTag(''); }}
                  placeholder="Search articles, topics, tags..."
                  style={{
                    width: '100%', padding: '14px 44px', borderRadius: '999px',
                    border: '1px solid var(--line-strong)',
                    backgroundColor: 'var(--bg-1)', color: 'var(--fg-0)',
                    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75,107,255,0.12)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }} aria-label="Clear search"
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Tag Filter Bar ── */}
      {availableTags.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell" style={{ padding: '16px 0', overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'nowrap', minWidth: 'max-content' }}>
              {/* All chip */}
              <button
                onClick={clearFilters}
                style={{
                  padding: '6px 16px', borderRadius: '999px', border: '1px solid',
                  fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
                  fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s',
                  borderColor: !selectedTag ? 'var(--brand-blue)' : 'var(--line)',
                  backgroundColor: !selectedTag ? 'var(--brand-blue)' : 'transparent',
                  color: !selectedTag ? '#fff' : 'var(--fg-2)',
                }}
              >
                All Posts
              </button>

              {availableTags.map((tag) => {
                const color = TAG_COLORS[tag] ?? 'var(--brand-blue)';
                const active = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    style={{
                      padding: '6px 14px', borderRadius: '999px', border: '1px solid',
                      fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
                      fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s',
                      borderColor: active ? color : 'var(--line)',
                      backgroundColor: active ? color + '18' : 'transparent',
                      color: active ? color : 'var(--fg-2)',
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Posts ── */}
      <section style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <div className="shell">

          {/* Active filter label */}
          {isFiltered && (
            <Reveal direction="up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {selectedTag && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '999px', backgroundColor: (TAG_COLORS[selectedTag] ?? '#4b6bff') + '15', border: `1px solid ${TAG_COLORS[selectedTag] ?? '#4b6bff'}30` }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '600', color: TAG_COLORS[selectedTag] ?? '#4b6bff' }}>
                      {selectedTag}
                    </span>
                    <button onClick={() => { setSelectedTag(''); setCurrentPage(1); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TAG_COLORS[selectedTag] ?? '#4b6bff', padding: '0 0 0 2px', display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      ×
                    </button>
                  </div>
                )}
                {debouncedSearch && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                    {posts.length} result{posts.length !== 1 ? 's' : ''} for &ldquo;{debouncedSearch}&rdquo;
                  </p>
                )}
                <button onClick={clearFilters} style={{ fontSize: '0.78rem', color: 'var(--fg-3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontFamily: 'inherit' }}>
                  Clear all
                </button>
              </div>
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

          {/* No results */}
          {!isLoading && posts.length === 0 && (
            <Reveal direction="up">
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>◎</div>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--fg-0)', marginBottom: '8px' }}>No articles found.</p>
                <p style={{ color: 'var(--fg-2)', fontSize: '0.9rem', marginBottom: '20px' }}>Try a different keyword or filter.</p>
                <button onClick={clearFilters} style={{ padding: '9px 20px', borderRadius: '999px', border: '1px solid var(--line)', background: 'none', color: 'var(--brand-blue)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600', fontFamily: 'inherit' }}>
                  Show all posts
                </button>
              </div>
            </Reveal>
          )}

          {/* Posts grid */}
          {!isLoading && posts.length > 0 && (
            <Reveal direction="up" delay={0.06}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="posts-grid">
                {posts.map((post, index) => {
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
                      <div style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)`, flexShrink: 0 }} />
                      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {post.tags.slice(0, 2).map((tag) => (
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
                          fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--fg-2)', marginBottom: '18px',
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
          {totalPages > 1 && !debouncedSearch && (
            <Reveal direction="up" delay={0.15}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px', flexWrap: 'wrap' }}>
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                  style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-1)', color: 'var(--fg-1)', fontSize: '0.85rem', cursor: 'pointer', opacity: currentPage === 1 ? 0.4 : 1, transition: 'all 0.15s', fontFamily: 'inherit' }}>
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button key={pg} onClick={() => setCurrentPage(pg)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '999px', border: '1px solid', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                      borderColor: currentPage === pg ? 'var(--brand-blue)' : 'var(--line)',
                      backgroundColor: currentPage === pg ? 'var(--brand-blue)' : 'var(--bg-1)',
                      color: currentPage === pg ? 'white' : 'var(--fg-1)',
                    }}>
                    {pg}
                  </button>
                ))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid var(--line)', backgroundColor: 'var(--bg-1)', color: 'var(--fg-1)', fontSize: '0.85rem', cursor: 'pointer', opacity: currentPage === totalPages ? 0.4 : 1, transition: 'all 0.15s', fontFamily: 'inherit' }}>
                  Next →
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .posts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .posts-grid { grid-template-columns: 1fr !important; } }
        .blog-card:hover { border-color: var(--line-strong) !important; transform: translateY(-2px); }
        .blog-card { transition: border-color 0.2s, transform 0.2s; }
      `}</style>
    </div>
  );
}
