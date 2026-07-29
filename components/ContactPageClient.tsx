'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * Restyled per §6.2. The form logic below is untouched from the Phase 0
 * audit — the state machine, every field `name`, the `serviceOptions` strings
 * and the fetch to /api/contact are byte-identical, because the API validates
 * those exact keys and those strings are emailed verbatim as lead data.
 *
 * Inputs are underlined, not boxed: a bottom hairline over a transparent
 * ground, with the focus rule wiping in from the left. Boxed inputs were the
 * single biggest remaining source of the "boxes everywhere" problem.
 */

const serviceOptions = [
  'Executive Data Intelligence',
  'Premium Web Experiences',
  'Search & Growth Architecture',
  'Not Sure Yet',
];

const whatsappLink =
  'https://wa.me/919869371603?text=Hello%20Acesta%20Analytics%2C%20I%20would%20like%20to%20discuss%20a%20project.';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialFormState: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="premium-container pt-40 md:pt-48">
      <div className="mx-auto max-w-[46rem]">
        <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
          Contact
        </p>

        <h1 className="mt-6 max-w-[14ch] text-display text-bone">
          Let&rsquo;s build something precise.
        </h1>

        <p className="mt-8 max-w-[52ch] text-lead font-extralight text-mist">
          Tell us what you are building, improving, or trying to understand.
        </p>

        <div className="mt-20 md:mt-24">
          {submitted ? (
            <SuccessMessage onReset={() => setSubmitted(false)} />
          ) : (
            <ContactForm onSuccess={() => setSubmitted(true)} />
          )}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Email could not be sent.');
      }

      setForm(initialFormState);
      setStatus('idle');
      onSuccess();
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-12 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={(value) => updateField('name', value)}
          required
        />

        <Field
          label="Company"
          name="company"
          value={form.company}
          onChange={(value) => updateField('company', value)}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(value) => updateField('email', value)}
          required
        />

        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(value) => updateField('phone', value)}
        />
      </div>

      <div className="mt-12">
        <CustomSelect
          label="Service needed"
          name="service"
          options={serviceOptions}
          value={form.service}
          isOpen={isOpen}
          onToggle={() => setIsOpen((current) => !current)}
          onChange={(value) => {
            updateField('service', value);
            setIsOpen(false);
          }}
        />
      </div>

      <div className="mt-12">
        <FieldLabel htmlFor="message">Message</FieldLabel>

        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            required
            className="peer mt-4 w-full resize-none border-0 border-b border-ash/60 bg-transparent pb-3 text-body text-bone outline-none focus:ring-0"
          />
          <FocusRule />
        </div>
      </div>

      {/* §6.2: states as typography on void. No alert box, no coloured panel. */}
      {status === 'error' && (
        <p role="alert" className="mt-10 text-body text-gold">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        data-hero-cta
        className="gold-pill mt-16 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending' : 'Send enquiry'}
      </button>

      <p className="mt-12 text-caption text-ash">
        Prefer WhatsApp?{' '}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ghost-link"
        >
          Message us directly
        </a>
      </p>
    </form>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div role="status">
      <h2 className="max-w-[16ch] text-heading text-bone">Enquiry received.</h2>

      <p className="mt-6 max-w-[46ch] text-body text-mist">
        Thank you for reaching out. We will come back to you shortly, usually
        within one working day.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="ghost-link mt-10 inline-block"
      >
        Send another enquiry
      </button>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-mono-label uppercase tracking-mono text-gold"
    >
      {children}
    </label>
  );
}

/** The §6.2 focus state — hairline wiping ash to gold, left to right, 200ms. */
function FocusRule() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-(--dur-micro) ease-out-expo peer-focus:scale-x-100"
    />
  );
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          className="peer mt-4 h-11 w-full border-0 border-b border-ash/60 bg-transparent text-body text-bone outline-none focus:ring-0"
        />
        <FocusRule />
      </div>
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
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <input type="hidden" name={name} value={value} required />

      <div className="relative">
        <button
          id={name}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="peer mt-4 flex h-11 w-full items-center justify-between border-0 border-b border-ash/60 bg-transparent text-left text-body outline-none"
        >
          <span className={value ? 'text-bone' : 'text-ash'}>
            {value || 'Select an option'}
          </span>

          <span
            aria-hidden
            className={cn(
              'font-mono text-caption text-gold transition-transform duration-(--dur-micro) ease-out-expo',
              isOpen && 'rotate-180'
            )}
          >
            ↓
          </span>
        </button>
        <FocusRule />
      </div>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+12px)] z-30 flex flex-col gap-1 bg-vitrine p-2"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => onChange(option)}
                className="block w-full px-3 py-3 text-left text-body text-mist transition-[color] duration-(--dur-micro) ease-out-expo hover:text-gold-bright"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
