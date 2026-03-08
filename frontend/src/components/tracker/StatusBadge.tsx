import { cn } from '../../lib/cn';

export type StatusKind =
  | 'completed'
  | 'in-progress'
  | 'waiting'
  | 'upcoming';

export interface StatusBadgeProps {
  status: StatusKind;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const base =
    'inline-flex items-center rounded-pill px-3 py-1 text-[10px] font-medium uppercase tracking-[0.4px]';

  const styles: Record<StatusKind, string> = {
    completed: 'bg-primary text-white',
    'in-progress': 'bg-primary-soft text-header-bg',
    waiting: 'bg-white/40 text-text-soft',
    upcoming: 'bg-transparent text-text-soft border border-border-muted',
  };

  return (
    <span className={cn(base, styles[status], className)}>{label}</span>
  );
}

