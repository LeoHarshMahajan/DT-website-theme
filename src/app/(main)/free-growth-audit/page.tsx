import { Metadata } from 'next';
import { AuditRequestForm } from '@/components/forms/AuditRequestForm';

export const metadata: Metadata = {
  title: 'Free Growth Audit — Digital Triangle',
  description: 'Get a free audit of your paid media, SEO, conversion funnel, analytics, and lifecycle systems. Full report + 90-day roadmap delivered in 48 hours.',
};

export default function FreeGrowthAuditPage() {
  return <AuditRequestForm />;
}
