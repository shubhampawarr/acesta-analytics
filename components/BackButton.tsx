import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f1d99b] underline decoration-[#d8b25e]/45 underline-offset-4 transition hover:text-[#f8f4ea] hover:decoration-[#f1d99b]"
    >
      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
      Back to Main
    </Link>
  );
}