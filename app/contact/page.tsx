import type { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Acesta Analytics for data visualization, premium website development, SEO, and growth architecture enquiries.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-void">

      <ContactPageClient />
    </main>
  );
}