import { ReferralData } from '../types/referral';
import { MOCK_REFERRALS } from '../mock/referrals';

export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function fetchAllReferrals(): Promise<ReferralData[]> {
  // Not used right now, returning empty or throwing.
  return [];
}

export async function fetchReferral(
  reference: string,
): Promise<ReferralData> {
  const response = await fetch(`${API_URL}/api/referrals/${reference}`);

  if (!response.ok) {
    throw new Error('Failed to fetch referral');
  }

  return (await response.json()) as ReferralData;
}

export async function saveNotificationPreferences(
  referralId: string,
  preference: 'EMAIL' | 'SMS',
  contactValue: string,
): Promise<{ message: string; referralId: string }> {
  const response = await fetch(`${API_URL}/api/referrals/${referralId}/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ preference, contactValue }),
  });

  if (!response.ok) {
    throw new Error('Failed to save preferences');
  }

  return await response.json();
}

