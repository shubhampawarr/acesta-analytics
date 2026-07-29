import type { Metadata } from 'next';

import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the privacy policy for Acesta Analytics, including how enquiry and website usage information may be handled.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
          <p>
            Acesta Analytics respects your privacy. This website is designed to be simple, professional, and transparent. We only collect information that is necessary to respond to enquiries, understand project requirements, and improve our services.
          </p>

          <p>
            If you contact us through a form, email, or direct message, we may receive details such as your name, email address, phone number, company name, project requirements, and any information you choose to share with us.
          </p>

          <p>
            We may also receive basic technical information such as browser type, device data, pages visited, and general website usage information through standard analytics or server logs. This helps us understand how visitors use the website and improve the user experience.
          </p>

          <p>
            We use your information to respond to enquiries, prepare project discussions, deliver services, improve our website, and communicate with you about current or potential work. We do not sell your personal information.
          </p>

          <p>
            Some parts of the website may use third-party tools, analytics services, hosting platforms, embedded content, or external links. These third-party services may collect information according to their own privacy policies.
          </p>

          <p>
            We take reasonable steps to protect the information you share with us. However, no method of online transmission or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>

          <p>
            You may contact us to request access, correction, or deletion of personal information you have shared with us. We will respond to reasonable requests in accordance with applicable laws.
          </p>

          <p>
            This Privacy Policy may be updated occasionally to reflect changes in our website, services, or legal requirements.
          </p>
    </LegalPage>
  );
}
