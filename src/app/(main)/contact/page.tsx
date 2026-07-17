import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/contact', {
    title: 'Contact',
    description: 'Get in touch with Digital Triangle. Tell us about your brand and we\'ll show you exactly how to grow it.',
  });
}

export default function ContactPage() {
  return <ContactForm />;
}
