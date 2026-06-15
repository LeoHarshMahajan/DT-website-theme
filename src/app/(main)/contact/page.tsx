import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Digital Triangle. Tell us about your brand and we\'ll show you exactly how to grow it.',
};

export default function ContactPage() {
  return <ContactForm />;
}
