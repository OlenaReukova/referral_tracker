import { ReferralData, ApiTimelineItem } from '../types/referral';

const basePatient = {
    firstName: 'Adam',
    lastName: 'Brown',
    dateOfBirth: '2015-01-13',
};

const createMockTimeline = (stepIndex: number): ApiTimelineItem[] => {
    const stepsData = [
        { status: 'SENT_BY_SCHOOL', title: 'Sent by school', date: '2026-03-01' },
        { status: 'RECEIVED_BY_CLINIC', title: 'Received by clinic', date: '2026-03-03' },
        { status: 'REVIEWED_BY_SPECIALIST', title: 'Reviewed by specialist', date: '2026-03-05' },
        { status: 'WAITING_FOR_ASSESSMENT', title: 'Waiting for assessment', date: '2026-03-06' },
        { status: 'ASSESSMENT_BOOKED', title: 'Assessment booked', date: '2026-03-10' },
        { status: 'ASSESSMENT_COMPLETED', title: 'Assessment completed', date: '2026-03-15' },
        { status: 'SUPPORT_PLAN', title: 'Support plan', date: '2026-03-18' },
        { status: 'CLOSED', title: 'Referral closed', date: '2026-03-20' },
    ];

    return stepsData.slice(0, stepIndex + 1).map((step, idx) => ({
        ...step,
        description: '',
        completed: idx < stepIndex || stepIndex === 7, // if it's the last step (index 7 - CLOSED), it's completed
    }));
};

export const MOCK_REFERRALS: ReferralData[] = [
    { referralId: 'REF-111111', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(0) },
    { referralId: 'REF-222222', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(1) },
    { referralId: 'REF-333333', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(2) },
    { referralId: 'REF-444444', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(3) },
    { referralId: 'REF-555555', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(4) },
    { referralId: 'REF-666666', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(5) },
    { referralId: 'REF-777777', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(6) },
    { referralId: 'REF-888888', patient: basePatient, estimatedWaitingTime: '8-12 weeks', timeline: createMockTimeline(7) },
];
