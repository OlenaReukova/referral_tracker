import { useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { ReferralTracker } from '../components/tracker/ReferralTracker';
import { NotificationPreferences } from '../components/tracker/NotificationPreferences';
import { Button } from '../components/ui/Button';
import { fetchReferral } from '../api/referrals';
import { type ReferralData, type ReferralStep, type TrackerStepStatus, STEP_STATUS } from '../types/referral';

function formatDate(dateString: string | null | undefined): string | undefined {
  if (!dateString) return undefined;
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  return dateString;
}

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

  const steps: ReferralStep[] = useMemo(() => {
    if (!referral || !referral.timeline) return [];

    const ALL_STEPS_TEMPLATE = [
      {
        id: 'SENT_BY_SCHOOL',
        title: 'Sent by school',
        description: 'The school or support service has submitted the referral to the healthcare clinic.',
      },
      {
        id: 'RECEIVED_BY_CLINIC',
        title: 'Received by clinic',
        description: 'The clinic has received the referral and registered it in the system.',
      },
      {
        id: 'REVIEWED_BY_SPECIALIST',
        title: 'Reviewed by specialist',
        description: 'A clinician reviews the referral to determine the next steps.',
      },
      {
        id: 'WAITING_FOR_ASSESSMENT',
        title: 'Waiting for assessment',
        description: 'The referral has been accepted and the child has been placed on the waiting list for an appointment.',
      },
      {
        id: 'ASSESSMENT_BOOKED',
        title: 'Assessment booked',
        description: 'An appointment date has been scheduled and shared with the parents.',
      },
      {
        id: 'ASSESSMENT_COMPLETED',
        title: 'Assessment completed',
        description: 'The appointment has taken place and the specialist has completed the initial assessment.',
      },
      {
        id: 'SUPPORT_PLAN',
        title: 'Support plan',
        description: 'After the assessment, the specialist prepares a support plan based on the findings.',
      },
      {
        id: 'CLOSED',
        title: 'Referral closed',
        description: 'The referral process is complete and the case has been closed.',
      },
    ];

    let foundCurrent = false;

    return ALL_STEPS_TEMPLATE.map((baseStep) => {
      // Try to find if the backend returned data for this step
      const apiStep = referral.timeline.find(t => t.status === baseStep.id);

      let stepStatus: TrackerStepStatus = STEP_STATUS.UPCOMING;

      if (apiStep?.completed) {
        stepStatus = STEP_STATUS.COMPLETED;
      } else if (!foundCurrent) {
        // If we haven't found the current step yet, and this step is not completed, this must be current
        stepStatus = STEP_STATUS.CURRENT;
        foundCurrent = true;
      } // else it remains UPCOMING

      const isWaiting = baseStep.id === 'WAITING_FOR_ASSESSMENT';

      return {
        id: baseStep.id,
        title: apiStep?.title || baseStep.title,
        description: apiStep?.description || baseStep.description,
        date: formatDate(apiStep?.date),
        status: stepStatus,
        additionalInfo: isWaiting && stepStatus !== STEP_STATUS.UPCOMING
          ? `Estimated waiting time: ${referral.estimatedWaitingTime}`
          : undefined,
        actionLabel: baseStep.id === 'CLOSED' && stepStatus === STEP_STATUS.COMPLETED
          ? 'Download PDF Report'
          : undefined,
      };
    });
  }, [referral]);

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

  const patientName = referral?.patient
    ? `${referral.patient.firstName} ${referral.patient.lastName}`
    : '';
  const dob = formatDate(referral?.patient?.dateOfBirth) ?? '';
  const referralId = referral?.referralId ?? '';

  return (
    <PageContainer className="pt-0 pb-12">
      <Header
        patientName={patientName}
        dob={dob}
        referralId={referralId}
        className="rounded-none shadow-none"
      />

      <div className="mx-auto mt-4 sm:mt-8 px-4 sm:px-8 lg:px-16 pb-12">
        <NotificationPreferences referralId={referralId} />
        <ReferralTracker steps={steps} />
      </div>
    </PageContainer>
  );
}
