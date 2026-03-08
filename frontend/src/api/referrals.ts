import { ReferralData } from '../types/referral';
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function fetchReferral(
  reference: string,
): Promise<ReferralData> {
  const response = await fetch(`${API_URL}/api/referrals/${reference}`);

  if (!response.ok) {
    throw new Error('Failed to fetch referral');
  }

  return (await response.json()) as ReferralData;
}

export async function updateNotificationPreferences(
  referralId: string,
  preferences: { 
    emailEnabled: boolean;
    email?: string;
    smsEnabled: boolean;
    sms?: string;
  },
): Promise<{ status: string; message: string }> {
  const response = await fetch(
    `${API_URL}/api/referrals/${referralId}/notification-preferences`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to update notification preferences');
  }

  return (await response.json()) as { status: string; message: string };
}

