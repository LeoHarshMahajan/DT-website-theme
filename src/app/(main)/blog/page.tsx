import { Metadata } from 'next';
import { BlogContent } from '@/components/sections/BlogContent';
import { Footer } from '@/components/Footer';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/blog', {
    title: 'Blog',
    description: 'Growth insights, AI marketing strategies, and case studies from the Digital Triangle team.',
  });
}

export default function BlogPage() {
  return (
    <>
      <BlogContent />
      <Footer />
    </>
  );
}
