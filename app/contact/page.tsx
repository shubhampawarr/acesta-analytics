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
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" />

      <Navbar />

      <section className="relative z-10 px-0 pb-8 pt-24 md:pb-20 md:pt-32">
        <div className="premium-container">
          <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-[#d8b25e]/12 bg-[#050403]/70 p-4 shadow-2xl shadow-black/30 md:rounded-[2.25rem] md:p-8 lg:p-10">
            <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1fr] lg:gap-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
                  Contact
                </p>

                <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold leading-[0.9] tracking-[-0.055em] text-[#f8f4ea] md:mt-4 md:text-7xl">
                  Let’s build something precise.
                </h1>

                <p className="mt-4 max-w-lg text-xs leading-6 text-[#b8b0a3] md:mt-5 md:text-base md:leading-8">
                  Tell us what you are building, improving, or trying to
                  understand. We will help shape the right data, web, or growth
                  system around it.
                </p>

                <div className="mt-5 max-w-md rounded-[1.25rem] border border-[#d8b25e]/14 bg-black/25 p-4 md:mt-8 md:rounded-[1.35rem] md:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32] md:text-xs">
                    Direct enquiry
                  </p>

                  <p className="mt-3 text-sm font-semibold text-[#f1d99b]">
                    acestaanalytics@gmail.com
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#7d7568] md:mt-3 md:text-sm md:leading-6">
                    For project enquiries, collaborations, and business
                    conversations.
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-xl">
                {submitted ? (
                  <SuccessMessage onReset={() => setSubmitted(false)} />
                ) : (
                  <ContactForm onSubmit={handleSubmit} />
                )}
              </div>
            </div>
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
      className="rounded-[1.35rem] border border-[#d8b25e]/14 bg-[#080705]/85 p-4 md:rounded-[1.75rem] md:p-5"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />

        <Field label="Company" name="company" placeholder="Company name" />

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

      <div className="mt-3">
        <label
          htmlFor="message"
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32]"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us what you are trying to build, improve, or understand."
          required
          className="min-h-[95px] w-full resize-none rounded-2xl border border-[#d8b25e]/14 bg-black/35 px-4 py-3 text-sm text-[#f8f4ea] outline-none transition placeholder:text-[#7d7568] focus:border-[#f1d99b]/45 md:min-h-[105px]"
        />
      </div>

      <button
        type="submit"
        className="gold-button group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition md:mt-5"
      >
        Submit Enquiry
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-[1.35rem] border border-[#d8b25e]/14 bg-[#080705]/85 p-5 text-center md:rounded-[1.75rem] md:p-6">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#d8b25e]/20 bg-[#d8b25e]/10 text-[#f1d99b]">
        <CheckCircle2 className="h-5 w-5" />
      </div>

      <h2 className="font-display mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#f8f4ea]">
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
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-2xl border border-[#d8b25e]/14 bg-black/35 px-4 text-sm text-[#f8f4ea] outline-none transition placeholder:text-[#7d7568] focus:border-[#f1d99b]/45 md:h-11"
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
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32]"
      >
        {label}
      </label>

      <input type="hidden" name={name} value={value} required />

      <button
        id={name}
        type="button"
        onClick={onToggle}
        className="flex h-10 w-full items-center justify-between rounded-2xl border border-[#d8b25e]/14 bg-black/35 px-4 text-left text-sm text-[#f8f4ea] outline-none transition hover:border-[#f1d99b]/35 focus:border-[#f1d99b]/45 md:h-11"
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