import { useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { ReferralTracker } from '../components/tracker/ReferralTracker';
import { Button } from '../components/ui/Button';
import { fetchReferral } from '../api/referrals';
import { type ReferralData, type ReferralStep, type TrackerStepStatus, STEP_STATUS } from '../types/referral';

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

    let foundCurrent = false;

    return referral.timeline.map((item) => {
      let stepStatus: TrackerStepStatus = STEP_STATUS.UPCOMING;

      if (item.completed) {
        stepStatus = STEP_STATUS.COMPLETED;
      } else if (!foundCurrent) {
        stepStatus = STEP_STATUS.CURRENT;
        foundCurrent = true;
      }

      const isWaiting = item.status === 'WAITING_FOR_ASSESSMENT' || item.status === 'WAITING';

      return {
        id: item.status,
        title: item.title,
        description: item.description,
        date: item.date || undefined,
        status: stepStatus,
        additionalInfo: isWaiting && stepStatus !== STEP_STATUS.UPCOMING
          ? `Estimated waiting time: ${referral.estimatedWaitingTime}`
          : undefined,
        actionLabel: item.status === 'CLOSED' && stepStatus === STEP_STATUS.COMPLETED
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

  const patientName = referral?.patient ? `${referral.patient.firstName} ${referral.patient.lastName}` : '';
  const dob = referral?.patient?.dateOfBirth ?? '';
  const referralId = referral?.referralId ?? '';

  return (
    <PageContainer className="pt-0 pb-12">
      <Header
        patientName={patientName}
        dob={dob}
        referralId={referralId}
        className="rounded-none shadow-none"
      />

      <div className="mx-auto mt-8 sm:mt-12 px-4 sm:px-8 lg:px-16">
        <ReferralTracker steps={steps} />
      </div>
    </PageContainer>
  );
}
