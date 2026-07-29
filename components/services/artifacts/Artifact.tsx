import type { ReactNode } from 'react';

import { CAPTION } from '@/components/services/data/scenario';
import { cn } from '@/lib/cn';

/**
 * The §5 vitrine wrapper plus the caption the build spec requires beneath
 * every artifact. The caption is not decoration — it is the line that stops
 * invented figures from reading as a client claim.
 */
export type ArtifactComposition = {
  className?: string;
  surfaceClassName?: string;
  captionClassName?: string;
};

export function Artifact({
  children,
  className,
  surfaceClassName,
  captionClassName,
  label,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Lets a call site break the surface out of its box — dropping the radius
   * and border on an edge that runs off the viewport. Without this every
   * exhibit is the same rounded rectangle, which is the four-boxes failure.
   */
  surfaceClassName?: string;
  captionClassName?: string;
  /** Names the exhibit for screen readers, which see no chart. */
  label: string;
}) {
  return (
    <figure className={cn('m-0', className)}>
      <div
        className={cn('vitrine p-(--space-24) md:p-vitrine', surfaceClassName)}
        role="group"
        aria-label={label}
      >
        {children}
      </div>

      <figcaption
        className={cn(
          'mt-5 font-mono text-mono-label uppercase tracking-mono text-ash',
          captionClassName
        )}
      >
        {CAPTION}
      </figcaption>
    </figure>
  );
}

/** Mono section label inside an artifact. */
export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
      {children}
    </p>
  );
}
