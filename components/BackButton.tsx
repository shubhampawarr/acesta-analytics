import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright underline decoration-gold/45 underline-offset-4 transition hover:text-bone hover:decoration-gold-bright"
    >
      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
      Back to Main
    </Link>
  );
}