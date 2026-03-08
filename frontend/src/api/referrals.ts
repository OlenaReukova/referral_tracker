import { ReferralData } from '../types/referral';
import { MOCK_REFERRALS } from '../mock/referrals';

export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function fetchAllReferrals(): Promise<ReferralData[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_REFERRALS;
}

export async function fetchReferral(
  reference: string,
): Promise<ReferralData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const referral = MOCK_REFERRALS.find((r) => r.id === reference);

  if (!referral) {
    throw new Error('Failed to fetch referral');
  }

  return referral;

  /* 
  // Real implementation (when backend is ready):
  const response = await fetch(`${API_URL}/api/referrals/${reference}`);

  if (!response.ok) {
    throw new Error('Failed to fetch referral');
  }

  return (await response.json()) as ReferralData;
  */
}

