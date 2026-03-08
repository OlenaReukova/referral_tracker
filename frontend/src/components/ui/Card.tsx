import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type CardVariant = 'completed' | 'pending';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  completed: 'bg-step-completed-bg text-white',
  pending: 'bg-step-pending-bg text-header-bg',
};

export function Card({ variant = 'pending', className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card p-6 shadow-card transition-colors duration-300',
        variantClasses[variant],
        className,
      )}
    >
      <div className="text-[30px] leading-[45px] font-normal">
        {children}
      </div>
    </div>
  );
}

