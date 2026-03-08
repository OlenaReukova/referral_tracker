import { cn } from '../../lib/cn';
import { type TrackerStepStatus, STEP_STATUS } from '../../types/referral';

interface StepIndicatorProps {
    status: TrackerStepStatus;
    isFirst: boolean;
    isLast: boolean;
    className?: string;
}

export function StepIndicator({
    status,
    isFirst,
    isLast,
    className,
}: StepIndicatorProps) {
    // A dot's status determines the color of its circle AND the line ABOVE it.
    // Exception: the very first step doesn't have a line above.
    const isActiveLine = status === STEP_STATUS.COMPLETED || status === STEP_STATUS.CURRENT;
    const isCompletedLine = status === STEP_STATUS.COMPLETED;

    return (
        <div className={cn('relative flex w-10 flex-col items-center shrink-0', className)}>
            {/* Line Above */}
            {!isFirst && (
                <div
                    className={cn(
                        'absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2',
                        isActiveLine ? 'bg-header-bg' : 'bg-timeline-line'
                    )}
                />
            )}

            {/* Line Below */}
            {!isLast && (
                <div
                    className={cn(
                        'absolute left-1/2 top-4 bottom-0 w-[2px] -translate-x-1/2',
                        isCompletedLine ? 'bg-header-bg' : 'bg-timeline-line'
                    )}
                />
            )}

            {/* Circle Icon */}
            <div
                style={
                    status === STEP_STATUS.COMPLETED
                        ? { backgroundColor: '#446063', borderColor: '#446063', color: '#ffffff' }
                        : status === STEP_STATUS.CURRENT
                            ? { borderColor: '#446063' }
                            : {}
                }
                className={cn(
                    'relative z-[1] mt-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white transition-colors duration-300',
                    status === STEP_STATUS.CURRENT && 'shadow-[0_0_0_4px_rgba(68,96,99,0.1)]',
                    status === STEP_STATUS.UPCOMING && 'border-timeline-line'
                )}
            >
                {status === STEP_STATUS.COMPLETED && (
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
                {status === STEP_STATUS.CURRENT && (
                    <div className="h-4 w-4 rounded-full animate-pulse" style={{ backgroundColor: '#446063' }} />
                )}
            </div>
        </div>
    );
}
