import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: ReactNode;
}

export function Input({ leadingIcon, className, ...props }: InputProps) {
  return (
    <div
      className={cn(
        'flex h-11 items-center gap-2 rounded-button border border-border-muted bg-white/70 px-3 text-sm text-text-main shadow-card',
        className,
      )}
    >
      {leadingIcon ? (
        <span className="inline-flex shrink-0 text-text-soft">{leadingIcon}</span>
      ) : null}
      <input
        className="h-full w-full border-none bg-transparent text-sm outline-none placeholder:text-text-soft"
        {...props}
      />
    </div>
  );
}

