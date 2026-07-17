import { Metadata } from 'next';
import { AuditRequestForm } from '@/components/forms/AuditRequestForm';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/free-growth-audit', {
    title: 'Free Growth Audit — Digital Triangle',
    description: 'Get a free audit of your paid media, SEO, conversion funnel, analytics, and lifecycle systems. Full report + 90-day roadmap delivered in 48 hours.',
  });
}

export default function FreeGrowthAuditPage() {
  return <AuditRequestForm />;
}
