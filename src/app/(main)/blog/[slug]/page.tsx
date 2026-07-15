import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { POST_BY_SLUG, BLOG_POSTS, type BlogPost } from '@/lib/blogPosts';
import { BLOG_CONTENT } from '@/lib/blogContent';
import { getPostBySlug, getRelatedPosts } from '@/lib/db/queries';
import { CATEGORY_BY_SLUG } from '@/lib/constants';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/Reveal';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thedigitaltriangle.com';

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

// Normalised shape used by the renderer — works for both DB and static posts
interface RenderPost {
  title: string;
  description: string;
  slug: string;
  liveUrl: string;
  author: { name: string };
  createdAt: string;
  tags: string[];
  category: string;      // category slug, '' if none
  coverImage: string;    // '' if none
  content: string;       // HTML body
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try DB first
  try {
    const dbPost = await getPostBySlug(slug);
    if (dbPost && dbPost.status === 'PUBLISHED') {
      const ogImg = dbPost.ogImage ?? dbPost.coverImage ?? null;
      return {
        title: `${dbPost.metaTitle ?? dbPost.title} — Digital Triangle`,
        description: dbPost.metaDescription ?? dbPost.excerpt ?? `Read ${dbPost.title} on the Digital Triangle blog.`,
        ...(ogImg ? {
          openGraph: {
            type: 'article' as const,
            images: [{ url: ogImg }],
            url: `${SITE_URL}/blog/${dbPost.slug}`,
            siteName: 'Digital Triangle',
            title: dbPost.metaTitle ?? dbPost.title,
            description: dbPost.metaDescription ?? dbPost.excerpt ?? '',
          },
        } : {}),
        ...(dbPost.canonical ? { alternates: { canonical: dbPost.canonical } } : {}),
        robots: {
          index: !dbPost.noindex,
          follow: !dbPost.nofollow,
        },
      };
    }
  } catch { /* DB unavailable — fall through to static */ }

  // Fallback to static
  const post = POST_BY_SLUG[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — Digital Triangle`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post: RenderPost | null = null;
  let relatedPosts: (BlogPost & { category?: string })[] = [];

  // 1. Try DB
  try {
    const dbPost = await getPostBySlug(slug);
    if (dbPost && dbPost.status === 'PUBLISHED') {
      post = {
        title: dbPost.title,
        description: dbPost.excerpt ?? '',
        slug: dbPost.slug,
        liveUrl: `${SITE_URL}/blog/${dbPost.slug}`,
        author: { name: dbPost.author?.name ?? 'Digital Triangle' },
        createdAt: (dbPost.publishedAt ?? dbPost.createdAt).toISOString(),
        tags: dbPost.tags.map((t: { name: string }) => t.name),
        category: dbPost.category ?? '',
        coverImage: dbPost.coverImage ?? dbPost.ogImage ?? '',
        content: dbPost.content ?? '',
      };

      // Related posts from DB
      const dbRelated = await getRelatedPosts(dbPost.id, 3);
      relatedPosts = dbRelated.map((r: any) => ({
        id: r.id,
        title: r.title,
        description: r.excerpt ?? '',
        slug: r.slug,
        liveUrl: `${SITE_URL}/blog/${r.slug}`,
        author: { name: r.author?.name ?? 'Digital Triangle', email: '' },
        createdAt: (r.publishedAt ?? r.createdAt).toISOString(),
        tags: (r.tags ?? []).map((t: { name: string }) => t.name),
        category: r.category ?? '',
      }));
    }
  } catch { /* DB unavailable */ }

  // 2. Fallback to static data
  if (!post) {
    const staticPost = POST_BY_SLUG[slug];
    if (!staticPost) notFound();

    post = {
      title: staticPost.title,
      description: staticPost.description,
      slug: staticPost.slug,
      liveUrl: staticPost.liveUrl,
      author: staticPost.author,
      createdAt: staticPost.createdAt,
      tags: staticPost.tags,
      category: '',
      coverImage: (staticPost as { ogImage?: string }).ogImage ?? '',
      content: BLOG_CONTENT[slug] ?? '',
    };

    relatedPosts = BLOG_POSTS
      .filter(p => p.slug !== slug && p.tags.some(t => staticPost.tags.includes(t)))
      .slice(0, 3);
  }

  const cat = post.category ? CATEGORY_BY_SLUG[post.category] : undefined;
  const accentColor = cat?.color ?? TAG_COLORS[post.tags[0]] ?? 'var(--brand-blue)';

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* ── Hero ── */}
        <section
          className="page-hero"
          style={{
            padding: 'clamp(56px, 9vw, 100px) 0 clamp(40px, 6vw, 64px)',
            borderBottom: '1px solid var(--line)',
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}10, transparent)`,
          }}
        >
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <Link
                href="/blog"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.82rem', color: 'var(--fg-2)', textDecoration: 'none',
                  marginBottom: '28px', fontFamily: 'var(--font-mono)',
                  transition: 'color 0.15s',
                }}
              >
                ← Back to Blog
              </Link>
            </Reveal>

            {/* Category (highlighted) + tags — all clickable */}
            <Reveal direction="up" delay={0.06}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
                {cat && (
                  <Link
                    href={`/blog?category=${cat.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '5px 14px', borderRadius: '999px',
                      fontSize: '0.72rem', fontWeight: '800',
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
                      backgroundColor: cat.color, color: '#fff', textDecoration: 'none',
                    }}
                  >
                    <span aria-hidden>{cat.icon}</span> {cat.label}
                  </Link>
                )}
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    style={{
                      padding: '4px 12px', borderRadius: '999px',
                      fontSize: '0.7rem', fontWeight: '700',
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
                      backgroundColor: (TAG_COLORS[tag] ?? accentColor) + '18',
                      border: `1px solid ${(TAG_COLORS[tag] ?? accentColor)}35`,
                      color: TAG_COLORS[tag] ?? accentColor, textDecoration: 'none',
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </Reveal>

            {/* Title */}
            <Reveal direction="up" delay={0.08}>
              <h1
                style={{
                  fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', fontWeight: 800,
                  lineHeight: 1.15, letterSpacing: '-0.03em',
                  color: 'var(--fg-0)', maxWidth: '820px', marginBottom: '20px',
                }}
              >
                {post.title}
              </h1>
            </Reveal>

            {/* Meta row */}
            <Reveal direction="up" delay={0.10}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                    }}
                  >
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg-0)', lineHeight: 1.2 }}>
                      {post.author.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                      Digital Triangle
                    </p>
                  </div>
                </div>
                <span style={{ width: '1px', height: '28px', backgroundColor: 'var(--line)' }} />
                <time style={{ fontSize: '0.8rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Cover image ── */}
        {post.coverImage && (
          <div className="shell" style={{ marginTop: 'clamp(-28px, -3vw, -40px)', position: 'relative', zIndex: 2 }}>
            <Reveal direction="up" delay={0.04}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                style={{
                  width: '100%', maxHeight: '440px', objectFit: 'cover',
                  borderRadius: '18px', border: '1px solid var(--line)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.28)', display: 'block',
                }}
              />
            </Reveal>
          </div>
        )}

        {/* ── Body ── */}
        <section style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className="shell">
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '64px', alignItems: 'start' }}
              className="post-layout"
            >

              {/* Main column */}
              <div>
                {/* Article body */}
                {post.content ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="article-prose"
                  />
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--fg-2)', padding: '40px 0' }}>
                    Content coming soon.
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <div style={{ position: 'sticky', top: '88px' }}>
                <Reveal direction="up" delay={0.12}>

                  {/* Tags */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
                      borderRadius: '16px', padding: '24px', marginBottom: '20px',
                    }}
                  >
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: '14px', fontFamily: 'var(--font-mono)' }}>
                      Topics
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          style={{
                            padding: '5px 12px', borderRadius: '999px',
                            fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none',
                            backgroundColor: (TAG_COLORS[tag] ?? accentColor) + '15',
                            border: `1px solid ${(TAG_COLORS[tag] ?? accentColor)}30`,
                            color: TAG_COLORS[tag] ?? accentColor,
                          }}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
                      borderRadius: '16px', padding: '24px', marginBottom: '20px',
                    }}
                  >
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: '14px', fontFamily: 'var(--font-mono)' }}>
                      Share
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.liveUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', textDecoration: 'none', color: 'var(--fg-1)', fontSize: '0.85rem', transition: 'border-color 0.15s' }}
                      >
                        <span style={{ fontSize: '1rem' }}>𝕏</span> Share on X
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.liveUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--line)', textDecoration: 'none', color: 'var(--fg-1)', fontSize: '0.85rem', transition: 'border-color 0.15s' }}
                      >
                        <span style={{ fontSize: '1rem', fontWeight: 700 }}>in</span> Share on LinkedIn
                      </a>
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    style={{
                      borderRadius: '16px', padding: '24px',
                      background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)`,
                      border: `1px solid ${accentColor}25`,
                    }}
                  >
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: accentColor, marginBottom: '10px', fontFamily: 'var(--font-mono)' }}>
                      Free Strategy Call
                    </p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--fg-0)', marginBottom: '8px', lineHeight: 1.4 }}>
                      Want us to apply this to your brand?
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: '16px' }}>
                      Book a free 30-min call with our team and get a custom growth plan.
                    </p>
                    <Link
                      href="/book-consultation"
                      style={{
                        display: 'block', textAlign: 'center',
                        padding: '11px 20px', borderRadius: '999px',
                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
                        color: '#fff', textDecoration: 'none',
                        fontSize: '0.85rem', fontWeight: 700,
                      }}
                    >
                      Book Free Call →
                    </Link>
                  </div>

                </Reveal>
              </div>
            </div>

            {/* ── Related posts ── */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: 'clamp(48px, 7vw, 80px)', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
                <Reveal direction="up">
                  <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '28px' }}>
                    Related articles
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="related-grid">
                    {relatedPosts.map(r => {
                      const rCat = r.category ? CATEGORY_BY_SLUG[r.category] : undefined;
                      const rc = rCat?.color ?? TAG_COLORS[r.tags[0]] ?? 'var(--brand-blue)';
                      return (
                        <Link
                          key={r.id}
                          href={`/blog/${r.slug}`}
                          style={{
                            display: 'flex', flexDirection: 'column',
                            backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
                            borderRadius: '14px', overflow: 'hidden', textDecoration: 'none',
                            transition: 'border-color 0.2s, transform 0.2s',
                          }}
                          className="blog-card"
                        >
                          <div style={{ height: '3px', background: `linear-gradient(90deg, ${rc}, transparent)` }} />
                          <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                              {rCat ? (
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff', backgroundColor: rCat.color, padding: '2px 8px', borderRadius: '999px' }}>{rCat.label}</span>
                              ) : (
                                r.tags.slice(0, 2).map(t => (
                                  <span key={t} style={{ fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: TAG_COLORS[t] ?? rc, backgroundColor: (TAG_COLORS[t] ?? rc) + '15', padding: '2px 8px', borderRadius: '999px' }}>{t}</span>
                                ))
                              )}
                            </div>
                            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--fg-0)', lineHeight: 1.4, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {r.title}
                            </h3>
                            <p style={{ fontSize: '0.78rem', color: 'var(--fg-2)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {r.description}
                            </p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', marginTop: '12px' }}>
                              {new Date(r.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) { .post-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .related-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) { .related-grid { grid-template-columns: repeat(2,1fr) !important; } }
        .article-prose h2 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem; color: var(--fg-0); line-height: 1.3; }
        .article-prose h3 { font-size: 1.2rem; font-weight: 600; margin: 1.75rem 0 0.75rem; color: var(--fg-0); line-height: 1.35; }
        .article-prose h4 { font-size: 1.05rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: var(--fg-0); }
        .article-prose p { margin: 0 0 1rem; line-height: 1.8; color: var(--fg-1); }
        .article-prose ul, .article-prose ol { margin: 0 0 1rem 1.5rem; color: var(--fg-1); }
        .article-prose li { margin-bottom: 0.5rem; line-height: 1.75; }
        .article-prose li > ul, .article-prose li > ol { margin-top: 0.4rem; margin-bottom: 0; }
        .article-prose strong { font-weight: 700; color: var(--fg-0); }
        .article-prose em { font-style: italic; }
        .article-prose a { color: var(--brand-violet); text-decoration: underline; text-underline-offset: 3px; }
        .article-prose a:hover { color: var(--brand-magenta); }
        .article-prose blockquote { border-left: 4px solid var(--brand-blue); padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: var(--bg-2); color: var(--fg-1); border-radius: 0 8px 8px 0; }
        .article-prose img { max-width: 100%; height: auto; border-radius: 10px; margin: 1.5rem 0; display: block; }
        .article-prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
        .article-prose th, .article-prose td { padding: 0.65rem 1rem; border: 1px solid var(--line-strong); text-align: left; }
        .article-prose th { background: var(--bg-2); font-weight: 600; color: var(--fg-0); }
        .article-prose td { color: var(--fg-1); }
      `}</style>
    </>
  );
}
