import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SectionTitleProps {
  title: string;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'space-y-1',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.37px] text-text-soft">
        {title}
      </h2>
      {subtitle ? (
        <div className="text-sm leading-relaxed text-text-main">{subtitle}</div>
      ) : null}
    </div>
  );
}

