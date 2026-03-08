import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface PageContainerProps {
  className?: string;
  children: ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <div className="flex min-h-screen flex-col bg-page-bg">
      <main
        className={cn(
          'mx-auto w-full max-w-[1245px] flex-1 px-8 pb-12 pt-0',
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}

