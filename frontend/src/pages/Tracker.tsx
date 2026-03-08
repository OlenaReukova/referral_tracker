import { useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { ReferralTracker } from '../components/tracker/ReferralTracker';
import { Button } from '../components/ui/Button';
import { fetchReferral } from '../api/referrals';
import { type ReferralData, type ReferralStep, type TrackerStepStatus, STEP_STATUS } from '../types/referral';

const STATUS_ORDER: ReferralData['referralStatus'][] = [
  'sent',
  'received',
  'reviewed',
  'waiting',
  'booked',
  'completed',
  'closed',
];

export function Tracker() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [referral, setReferral] = useState<ReferralData | null>(
    (location.state as { referral?: ReferralData } | null)?.referral ??
    null,
  );

  useEffect(() => {
    if (referral || !id) return;

    const loadReferral = async () => {
      setLoading(true);
      try {
        const data = await fetchReferral(id);
        setReferral(data);
      } catch (error) {
        console.error('Failed to load referral:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReferral();
  }, [id, referral]);

  const currentStatusIndex = useMemo(() => {
    if (!referral) return -1;
    return STATUS_ORDER.indexOf(referral.referralStatus);
  }, [referral]);

  const getStepStatus = (status: ReferralData['referralStatus']): TrackerStepStatus => {
    const stepIndex = STATUS_ORDER.indexOf(status);
    if (stepIndex < currentStatusIndex) return STEP_STATUS.COMPLETED;
    if (stepIndex === currentStatusIndex) return STEP_STATUS.CURRENT;
    return STEP_STATUS.UPCOMING;
  };

  const steps: ReferralStep[] = useMemo(() => {
    if (!referral) return [];

    const baseSteps: ReferralStep[] = [
      {
        id: 'sent',
        title: 'Sent by school',
        description: 'The school or support service has submitted the referral to the healthcare clinic.',
        date: referral.referralDate,
        status: getStepStatus('sent'),
      },
      {
        id: 'received',
        title: 'Received by clinic',
        description: 'The clinic has received the referral and registered it in the system.',
        status: getStepStatus('received'),
      },
      {
        id: 'reviewed',
        title: 'Reviewed by specialist',
        description: 'A clinician reviews the referral to determine the appropriate next steps.',
        status: getStepStatus('reviewed'),
      },
      {
        id: 'waiting',
        title: 'Waiting for assessment',
        description: 'The referral has been accepted and the child has been placed on the waiting list for an appointment.',
        status: getStepStatus('waiting'),
        additionalInfo: getStepStatus('waiting') !== STEP_STATUS.UPCOMING ? 'Estimated waiting time: 8–12 weeks' : undefined,
      },
      {
        id: 'booked',
        title: 'Assessment booked',
        description: 'An appointment date has been scheduled and shared with the parents.',
        status: getStepStatus('booked'),
      },
      {
        id: 'completed',
        title: 'Assessment completed',
        description: 'The appointment has taken place and the specialist has completed the initial assessment.',
        status: getStepStatus('completed'),
      },
      {
        id: 'plan',
        title: 'Support plan',
        description: 'After the assessment, the specialist prepares a support plan based on the findings.',
        status: getStepStatus('closed'),
        actionLabel: referral.referralStatus === 'closed' ? 'Download PDF Report' : undefined,
      },
      {
        id: 'closed',
        title: 'Referral closed',
        description: 'The referral process is complete and the case has been closed.',
        status: getStepStatus('closed') === STEP_STATUS.COMPLETED ? STEP_STATUS.COMPLETED : STEP_STATUS.UPCOMING,
      },
    ];

    return baseSteps.map((step) => ({
      ...step,
      // If the step is the current one and it doesn't have a date yet, we show the referralDate
      // (in a real app, this would be `referral.lastUpdatedDate` from the backend)
      date: step.date || (step.status === STEP_STATUS.CURRENT ? referral.referralDate : undefined),
    }));
  }, [referral, currentStatusIndex]);

  if (loading) {
    return (
      <PageContainer className="flex items-center justify-center pt-20">
        <p className="text-xl text-header-bg">Loading referral details...</p>
      </PageContainer>
    );
  }

  if (!referral && !loading && id) {
    return (
      <PageContainer className="pt-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Referral not found</h2>
        <p className="mt-4">We could not find any information for reference {id}.</p>
        <Button
          variant="primary"
          className="mt-8"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </PageContainer>
    );
  }

  const patientName = referral?.patientName ?? '';
  const dob = referral?.dob ?? '';
  const referralId = referral?.id ?? '';
  const clinic = referral?.clinic ?? '';

  return (
    <PageContainer className="pt-0 pb-12">
      <Header
        patientName={patientName}
        dob={dob}
        referralId={referralId}
        clinic={clinic}
        className="rounded-none shadow-none"
      />

      <div className="mx-auto mt-8 sm:mt-12 px-4 sm:px-8 lg:px-16">
        <ReferralTracker steps={steps} />
      </div>
    </PageContainer>
  );
}
