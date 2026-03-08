import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';

export type StepState = 'completed' | 'current' | 'upcoming';

export interface TimelineStepProps {
  title: string;
  date?: string;
  state: StepState;
  isFirst?: boolean;
  isLast?: boolean;
  children: ReactNode;
}

export function TimelineStep({
  title,
  date,
  state,
  isFirst,
  isLast,
  children,
}: TimelineStepProps) {
  const isCompleted = state === 'completed';
  const isCurrent = state === 'current';

  const cardVariant = isCompleted || isCurrent ? 'completed' : 'pending';

  return (
    <div className="flex gap-16">
      <div className="relative flex w-10 flex-col items-center">
        {!isLast && (
          <div
            className={cn(
              'absolute left-1/2 top-4 bottom-0 w-[2px] -translate-x-1/2 bg-timeline-line',
            )}
          />
        )}
        {!isFirst && (
          <div
            className={cn(
              'absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-timeline-line',
            )}
          />
        )}
        <div
          className={cn(
            'relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border-2 border-timeline-dot-inactive bg-white',
            isCompleted && 'border-step-completed-bg bg-step-completed-bg text-white',
            isCurrent && 'border-step-completed-bg bg-white',
          )}
        >
          {isCompleted ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : isCurrent ? (
            <div className="h-4 w-4 rounded-full bg-step-completed-bg" />
          ) : null}
        </div>
      </div>
      <div className="flex-1 space-y-6 pb-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-[36px] font-medium uppercase leading-tight text-text-main">
            {title}
          </h2>
          {date ? (
            <p className="text-[24px] font-normal text-text-main opacity-60">
              {date}
            </p>
          ) : null}
        </div>
        <Card variant={cardVariant}>{children}</Card>
      </div>
    </div>
  );
}

