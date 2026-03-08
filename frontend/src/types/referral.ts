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

export interface ReferralData {
    id: string;
    patientName: string;
    referralStatus: 'sent' | 'received' | 'reviewed' | 'waiting' | 'booked' | 'completed' | 'closed';
    referralDate: string;
    dob: string;
    clinic: string;
    notes?: string;
}
