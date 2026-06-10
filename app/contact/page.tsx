'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const serviceOptions = [
  'Executive Data Intelligence',
  'Premium Web Experiences',
  'Search & Growth Architecture',
  'Not Sure Yet',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />

      <Navbar />

      <section className="relative z-10 px-0 pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="premium-container">
          <div className="mx-auto grid max-w-7xl items-start gap-8 md:gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-32">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
                Contact
              </p>

              <h1 className="font-display mt-4 max-w-3xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] text-[#f8f4ea] md:mt-5 md:text-8xl">
                Let’s build something precise.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#b8b0a3] md:mt-8 md:text-lg md:leading-8">
                Tell us what you are building, improving, or trying to
                understand. We will help shape the right data, web, or growth
                system around it.
              </p>

              <div className="mt-6 rounded-[1.35rem] border border-[#d8b25e]/14 bg-[#080705]/70 p-4 md:mt-10 md:rounded-[1.5rem] md:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32] md:text-xs">
                  Direct enquiry
                </p>

                <a
                  href="mailto:acestaanalytics@gmail.com"
                  className="mt-3 block text-sm font-semibold text-[#f1d99b] underline decoration-[#d8b25e]/45 underline-offset-4 transition hover:text-[#f8f4ea]"
                >
                  acestaanalytics@gmail.com
                </a>

                <p className="mt-3 text-xs leading-5 text-[#7d7568] md:mt-4 md:text-sm md:leading-6">
                  For project enquiries, collaborations, and business
                  conversations.
                </p>
              </div>
            </div>

            {submitted ? (
              <SuccessMessage onReset={() => setSubmitted(false)} />
            ) : (
              <ContactForm onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactForm({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [selectedService, setSelectedService] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.6rem] border border-[#d8b25e]/14 bg-[#080705]/80 p-4 md:rounded-[2rem] md:p-8"
    >
      <div className="grid gap-3.5 md:grid-cols-2 md:gap-4">
        <Field label="Name" name="name" placeholder="Your name" required />

        <Field
          label="Company"
          name="company"
          placeholder="Business or company name"
        />

        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
        />

        <div className="md:col-span-2">
          <CustomSelect
            label="Service Needed"
            name="service"
            options={serviceOptions}
            value={selectedService}
            isOpen={isOpen}
            onToggle={() => setIsOpen((current) => !current)}
            onChange={(value) => {
              setSelectedService(value);
              setIsOpen(false);
            }}
          />
        </div>
      </div>

      <div className="mt-3.5 md:mt-4">
        <label
          htmlFor="message"
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32] md:text-xs"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us what you are trying to build, improve, or understand."
          required
          className="min-h-[120px] w-full resize-none rounded-2xl border border-[#d8b25e]/14 bg-black/35 px-4 py-3 text-sm text-[#f8f4ea] outline-none transition placeholder:text-[#7d7568] focus:border-[#f1d99b]/45 md:min-h-[140px]"
        />
      </div>

      <button
        type="submit"
        className="gold-button group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition md:mt-6 md:w-auto md:py-3.5"
      >
        Submit Enquiry
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-[1.6rem] border border-[#d8b25e]/14 bg-[#080705]/80 p-6 text-center md:rounded-[2rem] md:p-8">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#d8b25e]/20 bg-[#d8b25e]/10 text-[#f1d99b] md:h-12 md:w-12">
        <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
      </div>

      <h2 className="font-display mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#f8f4ea] md:mt-6 md:text-4xl">
        Enquiry received.
      </h2>

      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#a7a197]">
        Thank you for reaching out. This form is ready visually. Next, we will
        connect it to email delivery so enquiries land directly in your inbox.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-sm font-semibold text-[#f1d99b] underline decoration-[#d8b25e]/45 underline-offset-4 transition hover:text-[#f8f4ea]"
      >
        Send another enquiry
      </button>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32] md:text-xs"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-2xl border border-[#d8b25e]/14 bg-black/35 px-4 text-sm text-[#f8f4ea] outline-none transition placeholder:text-[#7d7568] focus:border-[#f1d99b]/45 md:h-12"
      />
    </div>
  );
}

function CustomSelect({
  label,
  name,
  options,
  value,
  isOpen,
  onToggle,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32] md:text-xs"
      >
        {label}
      </label>

      <input type="hidden" name={name} value={value} required />

      <button
        id={name}
        type="button"
        onClick={onToggle}
        className="flex h-11 w-full items-center justify-between rounded-2xl border border-[#d8b25e]/14 bg-black/35 px-4 text-left text-sm text-[#f8f4ea] outline-none transition hover:border-[#f1d99b]/35 focus:border-[#f1d99b]/45 md:h-12"
      >
        <span className={value ? 'text-[#f8f4ea]' : 'text-[#7d7568]'}>
          {value || 'Select an option'}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-[#d8b25e] transition ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#d8b25e]/16 bg-[#080705] p-1 shadow-2xl shadow-black/50">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-[#b8b0a3] transition hover:bg-[#d8b25e]/12 hover:text-[#f1d99b]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}