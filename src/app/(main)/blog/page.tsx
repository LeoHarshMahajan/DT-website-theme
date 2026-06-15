import { Metadata } from 'next';
import { BlogContent } from '@/components/sections/BlogContent';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Growth insights, AI marketing strategies, and case studies from the Digital Triangle team.',
};

export default function BlogPage() {
  return (
    <>
      <BlogContent />
      <Footer />
    </>
  );
}
