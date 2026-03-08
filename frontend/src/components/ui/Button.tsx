import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ButtonVariant = 'primary' | 'ghost' | 'soft';
type ButtonSize = 'sm' | 'md';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-header-bg border-none text-white hover:opacity-90',
  soft:
    'bg-step-pending-bg border-none text-header-bg hover:opacity-90',
  ghost:
    'bg-transparent border-none text-header-bg hover:bg-white/40',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'h-14 px-8 text-base leading-none',
  sm: 'h-10 px-4 text-sm leading-none',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-button font-medium uppercase tracking-[0.07px] transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

