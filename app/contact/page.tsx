import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Acesta Analytics for data visualization, premium website development, SEO, and growth architecture enquiries.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030303]">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" />

      <Navbar />
      <ContactPageClient />
      <Footer />
    </main>
  );
}