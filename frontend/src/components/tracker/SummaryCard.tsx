import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import { StatusBadge, type StatusKind } from './StatusBadge';

export interface SummaryCardProps {
  childName: string;
  refId: string;
  status: StatusKind;
  statusLabel: string;
  meta?: ReactNode;
  className?: string;
}

export function SummaryCard({
  childName,
  refId,
  status,
  statusLabel,
  meta,
  className,
}: SummaryCardProps) {
  return (
    <Card
      variant="outline-soft"
      className={cn('flex flex-col gap-3 bg-white/70', className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.37px] text-text-soft">
            {refId}
          </p>
          <p className="mt-1 text-sm font-medium text-text-main">{childName}</p>
        </div>
        <StatusBadge status={status} label={statusLabel} />
      </div>
      {meta ? <div className="text-xs leading-relaxed text-text-main">{meta}</div> : null}
    </Card>
  );
}

