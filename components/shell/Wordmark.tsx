import Image from 'next/image';

import logo from '@/public/logos/acesta-logo-icon-dark.png';

/**
 * The nav lockup. The mark is decorative (`alt=""`) because the adjacent text
 * already names the link — that is the fix for the `label-content-name-mismatch`
 * the Phase 0 audit found, where an `aria-label` of "Acesta Analytics home"
 * overrode visible text reading "Acesta Analytics" (Decision H).
 */
export function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src={logo}
        alt=""
        height={40}
        width={49}
        priority
        sizes="49px"
        className="h-10 w-auto shrink-0"
      />

      <span className="leading-none">
        <span className="block text-[1.25rem] tracking-[-0.045em] text-bone">
          Acesta
        </span>
        <span className="mt-1 block font-mono text-[0.5rem] uppercase tracking-mono text-gold">
          Analytics
        </span>
      </span>
    </span>
  );
}
