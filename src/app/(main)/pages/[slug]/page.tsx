import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';
import { Footer } from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return { title: 'Page Not Found' };
  return {
    title: `${page.metaTitle ?? page.title} — Digital Triangle`,
    description: page.metaDescription ?? '',
  };
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });

  if (!page || !page.isPublished) notFound();

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0 clamp(40px, 6vw, 64px)', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
              {page.title}
            </h1>
          </div>
        </section>

        <section style={{ padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <div className="shell" style={{ maxWidth: '780px' }}>
            <div
              dangerouslySetInnerHTML={{ __html: page.content }}
              className="article-prose"
            />
          </div>
        </section>
      </div>

      <Footer />

      <style>{`
        .article-prose h2 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem; color: var(--fg-0); line-height: 1.3; }
        .article-prose h3 { font-size: 1.2rem; font-weight: 600; margin: 1.75rem 0 0.75rem; color: var(--fg-0); }
        .article-prose p { margin: 0 0 1rem; line-height: 1.8; color: var(--fg-1); }
        .article-prose ul, .article-prose ol { margin: 0 0 1rem 1.5rem; color: var(--fg-1); }
        .article-prose li { margin-bottom: 0.5rem; line-height: 1.75; }
        .article-prose strong { font-weight: 700; color: var(--fg-0); }
        .article-prose a { color: var(--brand-violet); text-decoration: underline; text-underline-offset: 3px; }
        .article-prose blockquote { border-left: 4px solid var(--brand-blue); padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: var(--bg-2); color: var(--fg-1); border-radius: 0 8px 8px 0; }
      `}</style>
    </>
  );
}
