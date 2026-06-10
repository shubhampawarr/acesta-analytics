import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />

      <Navbar />

      <section className="relative z-10 px-0 pb-24 pt-36">
        <div className="premium-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#d8b25e]">
              Legal
            </p>

            <h1 className="font-display mt-5 text-6xl font-semibold leading-[0.9] tracking-[-0.055em] text-[#f8f4ea] md:text-8xl">
              Privacy Policy
            </h1>

            <p className="mt-6 text-sm leading-7 text-[#7d7568]">
              Last updated: {new Date().getFullYear()}
            </p>

            <div className="mt-10 space-y-6 text-base leading-8 text-[#b8b0a3]">
              <p>
                Acesta Analytics respects your privacy. This website is designed
                to be simple, professional, and transparent. We only collect
                information that is necessary to respond to enquiries, understand
                project requirements, and improve our services.
              </p>

              <p>
                If you contact us through a form, email, or direct message, we
                may receive details such as your name, email address, phone
                number, company name, project requirements, and any information
                you choose to share with us.
              </p>

              <p>
                We may also receive basic technical information such as browser
                type, device data, pages visited, and general website usage
                information through standard analytics or server logs. This helps
                us understand how visitors use the website and improve the user
                experience.
              </p>

              <p>
                We use your information to respond to enquiries, prepare project
                discussions, deliver services, improve our website, and
                communicate with you about current or potential work. We do not
                sell your personal information.
              </p>

              <p>
                Some parts of the website may use third-party tools, analytics
                services, hosting platforms, embedded content, or external links.
                These third-party services may collect information according to
                their own privacy policies.
              </p>

              <p>
                We take reasonable steps to protect the information you share
                with us. However, no method of online transmission or electronic
                storage is completely secure, and we cannot guarantee absolute
                security.
              </p>

              <p>
                You may contact us to request access, correction, or deletion of
                personal information you have shared with us. We will respond to
                reasonable requests in accordance with applicable laws.
              </p>

              <p>
                This Privacy Policy may be updated occasionally to reflect
                changes in our website, services, or legal requirements.
              </p>
            </div>

            <div className="mt-12">
              <BackButton />
            </div>

            <p className="mt-2 text-xs leading-6 text-[#7d7568]">
              This page is provided as a general website privacy policy template
              and should not be considered legal advice.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}