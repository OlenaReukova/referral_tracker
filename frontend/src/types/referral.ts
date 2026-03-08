export const STEP_STATUS = {
    COMPLETED: 'completed',
    CURRENT: 'current',
    UPCOMING: 'upcoming',
} as const;

export type TrackerStepStatus = typeof STEP_STATUS[keyof typeof STEP_STATUS];


export interface ReferralStep {
    id: string;
    title: string;
    description: string;
    date?: string;
    status: TrackerStepStatus;
    additionalInfo?: string;
    actionLabel?: string;
}
export interface ApiTimelineItem {
    status: string;
    title: string;
    description: string;
    date: string | null;
    completed: boolean;
}

export interface ReferralData {
    referralId: string;
    patient: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
    };
    estimatedWaitingTime: string;
    timeline: ApiTimelineItem[];
}
