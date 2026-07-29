import type { Metadata } from 'next';

import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read the terms and conditions for using the Acesta Analytics website and engaging with Acesta Analytics services.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="July 2026">
          <p>
            By accessing or using this website, you agree to these Terms and Conditions. If you do not agree with these terms, please do not use the website.
          </p>

          <p>
            Acesta Analytics provides digital and intelligence services including data visualization, dashboards, website development, SEO, and growth optimization. Specific project scope, timelines, pricing, deliverables, and responsibilities will be agreed separately through written communication, proposal, invoice, or contract.
          </p>

          <p>
            The content on this website is provided for general informational purposes. We aim to keep information accurate and updated, but we do not guarantee that all content will always be complete, current, or error-free.
          </p>

          <p>
            All website content, including text, design, layout, visual elements, branding, and graphics, belongs to Acesta Analytics unless otherwise stated. You may not copy, reproduce, modify, or use website content for commercial purposes without prior written permission.
          </p>

          <p>
            Ownership, usage rights, revisions, payment terms, and delivery timelines for client work will be defined separately for each project. Unless agreed otherwise, work begins only after project confirmation and any required advance payment or written approval.
          </p>

          <p>
            Clients are responsible for providing accurate information, required access, content, approvals, and feedback necessary for project delivery. Delays in providing required materials may affect project timelines.
          </p>

          <p>
            Some services may involve third-party tools, platforms, hosting providers, analytics tools, APIs, or plugins. Acesta Analytics is not responsible for interruptions, policy changes, pricing changes, data loss, or technical issues caused by third-party services.
          </p>

          <p>
            While we aim to deliver high-quality work, business outcomes such as rankings, traffic, sales, conversions, or revenue cannot be guaranteed unless explicitly stated in a written agreement.
          </p>

          <p>
            Acesta Analytics will not be liable for indirect, incidental, special, or consequential damages arising from the use of this website or our services.
          </p>

          <p>
            These Terms and Conditions may be updated occasionally to reflect changes in our website, services, or business operations.
          </p>
    </LegalPage>
  );
}
