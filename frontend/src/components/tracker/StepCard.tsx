import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { type TrackerStepStatus, STEP_STATUS } from '../../types/referral';

interface StepCardProps {
    status: TrackerStepStatus;
    children: ReactNode;
    additionalInfo?: string;
    actionLabel?: string;
    className?: string;
}

export function StepCard({
    status,
    children,
    additionalInfo,
    actionLabel,
    className,
}: StepCardProps) {
    const variantStyles: Record<string, string> = {
        [STEP_STATUS.COMPLETED]: 'bg-step-completed-bg text-white shadow-none border-none',
        [STEP_STATUS.CURRENT]: 'bg-step-pending-bg text-header-bg shadow-none border-none',
        [STEP_STATUS.UPCOMING]: 'bg-white/50 text-text-main/40 border border-dashed border-timeline-line',
    };

    return (
        <div
            className={cn(
                'rounded-card p-6 transition-all duration-300',
                variantStyles[status],
                className,
            )}
        >
            <div className="text-[clamp(14px,2.2vw,30px)] leading-[1.5] font-normal">
                {children}
            </div>

            {additionalInfo && (
                <div className={cn(
                    "mt-4 sm:mt-6 border-t pt-3 sm:pt-4 text-[clamp(13px,1.8vw,24px)]",
                    status === STEP_STATUS.COMPLETED ? "border-white/20" : "border-header-bg/10"
                )}>
                    {additionalInfo}
                </div>
            )}

            {actionLabel && status !== STEP_STATUS.UPCOMING && (
                <button className={cn(
                    "mt-4 sm:mt-6 rounded-button px-4 sm:px-8 py-2 sm:py-3 text-[clamp(13px,1.5vw,20px)] font-medium uppercase tracking-wider transition-opacity hover:opacity-90",
                    status === STEP_STATUS.COMPLETED ? "bg-white text-header-bg" : "bg-header-bg text-white"
                )}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
