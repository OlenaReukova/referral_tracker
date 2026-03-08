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

export interface NotificationPreferencesData {
  email?: string;
  phone?: string;
}

export async function saveNotificationPreferences(
  reference: string,
  preferences: NotificationPreferencesData
): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // In a real app we would do:
  // const response = await fetch(`${API_URL}/api/referrals/${reference}/notifications`, ...);
  // if (!response.ok) throw new Error(...);

  console.log(`Mock saved preferences for ${reference}:`, preferences);
}
