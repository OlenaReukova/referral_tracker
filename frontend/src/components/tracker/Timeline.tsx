import type { ReactNode } from 'react';

export interface TimelineProps {
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return <div className="mt-10">{children}</div>;
}

