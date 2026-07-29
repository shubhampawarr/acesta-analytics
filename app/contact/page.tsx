import type { Metadata } from 'next';

import ContactPageClient from '@/components/ContactPageClient';
import { ResolveWaypoint } from '@/components/resolve/Resolve';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation with Acesta Analytics about data intelligence, web development, search visibility or growth systems.',
};

export default function ContactPage() {
  return (
    <main data-page="contact" className="relative overflow-x-clip">
      {/* §6.2: the one page where the field may run unresolved — ambient
          texture rather than a formation, and dimmed so the form stays the
          only thing asking for attention. */}
      <ResolveWaypoint formation="chaos">
        <ContactPageClient />
      </ResolveWaypoint>
    </main>
  );
}
