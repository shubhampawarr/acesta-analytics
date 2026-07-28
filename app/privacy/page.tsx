import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the privacy policy for Acesta Analytics, including how enquiry and website usage information may be handled.',
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">


      <section className="relative z-10 px-0 pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="premium-container">
          <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-gold/12 bg-vitrine/70 p-5 shadow-2xl shadow-black/30 md:rounded-[2.25rem] md:p-8 lg:p-10">
            <div className="mx-auto max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
                Legal
              </p>

              <h1 className="font-display mt-4 text-5xl font-normal leading-[0.9] tracking-[-0.055em] text-bone md:text-7xl">
                Privacy Policy
              </h1>

              <p className="mt-5 text-xs leading-6 text-ash">
                Last updated: {new Date().getFullYear()}
              </p>

              <div className="mt-8 h-px w-full gold-line opacity-60" />

              <div className="mt-8 space-y-5 text-sm leading-7 text-mist md:text-base md:leading-8">
                <p>
                  Acesta Analytics respects your privacy. This website is
                  designed to be simple, professional, and transparent. We only
                  collect information that is necessary to respond to enquiries,
                  understand project requirements, and improve our services.
                </p>

                <p>
                  If you contact us through a form, email, or direct message, we
                  may receive details such as your name, email address, phone
                  number, company name, project requirements, and any
                  information you choose to share with us.
                </p>

                <p>
                  We may also receive basic technical information such as browser
                  type, device data, pages visited, and general website usage
                  information through standard analytics or server logs. This
                  helps us understand how visitors use the website and improve
                  the user experience.
                </p>

                <p>
                  We use your information to respond to enquiries, prepare
                  project discussions, deliver services, improve our website,
                  and communicate with you about current or potential work. We
                  do not sell your personal information.
                </p>

                <p>
                  Some parts of the website may use third-party tools, analytics
                  services, hosting platforms, embedded content, or external
                  links. These third-party services may collect information
                  according to their own privacy policies.
                </p>

                <p>
                  We take reasonable steps to protect the information you share
                  with us. However, no method of online transmission or
                  electronic storage is completely secure, and we cannot
                  guarantee absolute security.
                </p>

                <p>
                  You may contact us to request access, correction, or deletion
                  of personal information you have shared with us. We will
                  respond to reasonable requests in accordance with applicable
                  laws.
                </p>

                <p>
                  This Privacy Policy may be updated occasionally to reflect
                  changes in our website, services, or legal requirements.
                </p>
              </div>

              {/* <div className="mt-10 rounded-[1.35rem] border border-gold/14 bg-black/25 p-5">
                <p className="text-xs leading-6 text-ash">
                  This page is provided as a general website privacy policy
                  template and should not be considered legal advice.
                </p>
              </div> */}

              <div className="mt-10">
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}