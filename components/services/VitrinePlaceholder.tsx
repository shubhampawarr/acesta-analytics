import { cn } from '@/lib/cn';

/**
 * Sized stand-in for a Phase 5b proof artifact.
 *
 * It carries the real §5 vitrine surface and the real aspect ratio, so the
 * page rhythm reviewed in 5a is the rhythm 5b inherits — the artifact drops
 * in, nothing around it moves. Deliberately does NOT carry the "Illustrative
 * sample" caption: there is nothing yet for that line to be true about.
 */
export function VitrinePlaceholder({
  label,
  aspect,
  className,
}: {
  label: string;
  /** Tailwind aspect utility — set to the artifact's real proportions. */
  aspect: string;
  className?: string;
}) {
  return (
    <div className={cn('vitrine flex items-center justify-center', aspect, className)}>
      <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
        {label}
      </p>
    </div>
  );
}
