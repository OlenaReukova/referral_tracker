import { type ReferralStep } from '../../types/referral';
import { ReferralTrackerStep } from './ReferralTrackerStep';

interface ReferralTrackerProps {
    steps: ReferralStep[];
    className?: string;
}

export function ReferralTracker({ steps, className }: ReferralTrackerProps) {
    return (
        <div className={className}>
            {steps.map((step, index) => (
                <ReferralTrackerStep
                    key={step.id}
                    step={step}
                    isFirst={index === 0}
                    isLast={index === steps.length - 1}
                />
            ))}
        </div>
    );
}
