import { Metadata } from 'next';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/book-consultation', {
    title: 'Book a Strategy Call — Digital Triangle',
    description: 'Book a free 30-minute strategy call with the Digital Triangle growth team. Walk away with a clear picture of your brand\'s biggest growth levers.',
  });
}

export default function BookConsultationPage() {
  return <ConsultationForm />;
}
