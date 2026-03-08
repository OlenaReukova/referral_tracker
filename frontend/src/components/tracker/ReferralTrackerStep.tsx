import { type ReferralStep as StepType, STEP_STATUS } from '../../types/referral';
import { StepCard } from './StepCard';
import { StepIndicator } from './StepIndicator';
import { cn } from '../../lib/cn';

interface ReferralTrackerStepProps {
    step: StepType;
    isFirst?: boolean;
    isLast?: boolean;
}

export function ReferralTrackerStep({
    step,
    isFirst = false,
    isLast = false,
}: ReferralTrackerStepProps) {
    return (
        <div className="flex gap-4 sm:gap-8 lg:gap-16">
            <StepIndicator
                status={step.status}
                isFirst={isFirst}
                isLast={isLast}
                className="mt-6"
            />

            <div className="flex-1 pb-8 sm:pb-12 lg:pb-16">
                <div className="flex flex-col gap-2 mb-6">
                    {/* Title and date row */}
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <h2 className={cn(
                            "text-[clamp(18px,3vw,36px)] font-medium uppercase leading-tight tracking-[0.26px]",
                            step.status === STEP_STATUS.UPCOMING ? "text-text-main opacity-40" : "text-text-main"
                        )}>
                            {step.title}
                        </h2>
                        {step.date && (
                            <span className={cn(
                                "text-[clamp(14px,2vw,24px)] font-normal whitespace-nowrap text-right",
                                step.status === STEP_STATUS.UPCOMING
                                    ? "text-text-main opacity-40"
                                    : "text-text-main opacity-60"
                            )}>
                                {step.date}
                            </span>
                        )}
                    </div>
                </div>

                <StepCard
                    status={step.status}
                    additionalInfo={step.additionalInfo}
                    actionLabel={step.actionLabel}
                >
                    {step.description}
                </StepCard>
            </div>
        </div>
    );
}
