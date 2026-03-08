import { ReferralData } from '../types/referral';

export const MOCK_REFERRALS: ReferralData[] = [
    {
        id: 'REF-123456',
        patientName: 'Adam Brown',
        referralStatus: 'received',
        referralDate: '03.03.2026',
        dob: '12.05.2015',
        clinic: "Northwest Children's Clinic",
        notes: "Initial consultation completed. Waiting for further assessment details from school."
    },
    {
        id: 'REF-789012',
        patientName: 'Emma Watson',
        referralStatus: 'sent',
        referralDate: '01.03.2026',
        dob: '22.08.2012',
        clinic: "St. Jude Specialist Center",
        notes: "The referral was sent via electronic system."
    },
    {
        id: 'REF-345678',
        patientName: 'Leo Messi',
        referralStatus: 'reviewed',
        referralDate: '15.02.2026',
        dob: '24.06.1987',
        clinic: "Central Health Hub",
        notes: "Specialist has reviewed the case and recommended a physical assessment."
    },
    {
        id: 'REF-901234',
        patientName: 'Serena Williams',
        referralStatus: 'waiting',
        referralDate: '10.01.2026',
        dob: '26.09.1981',
        clinic: "Eastside Pediatric Group",
        notes: "Patient is currently on the waiting list. Expected wait time: 8-12 weeks."
    },
    {
        id: 'REF-567890',
        patientName: 'Roger Federer',
        referralStatus: 'booked',
        referralDate: '05.12.2025',
        dob: '08.08.1981',
        clinic: "Wellness Kids Center",
        notes: "Assessment is booked for 25th March 2026."
    },
    {
        id: 'REF-112233',
        patientName: 'Diana Prince',
        referralStatus: 'completed',
        referralDate: '20.12.2025',
        dob: '01.01.1900',
        clinic: "City Children's Hospital",
        notes: "Assessment completed. Report is being drafted."
    },
    {
        id: 'REF-445566',
        patientName: 'Bruce Wayne',
        referralStatus: 'closed',
        referralDate: '01.11.2025',
        dob: '19.02.1972',
        clinic: "Gotham Health Institute",
        notes: "Case closed after successful implementation of support plan."
    },
    {
        id: 'REF-778899',
        patientName: 'Peter Parker',
        referralStatus: 'received',
        referralDate: '06.03.2026',
        dob: '10.08.2001',
        clinic: "Queens Medical Center",
        notes: "Referral received and acknowledged by the administration team."
    },
    {
        id: 'REF-990011',
        patientName: 'Tony Stark',
        referralStatus: 'reviewed',
        referralDate: '12.02.2026',
        dob: '29.05.1970',
        clinic: "Stark Medical Labs",
        notes: "Technical review performed. Next step is clinical triage."
    },
    {
        id: 'REF-223344',
        patientName: 'Clark Kent',
        referralStatus: 'waiting',
        referralDate: '15.01.2026',
        dob: '18.06.1977',
        clinic: "Metropolis Children's Care",
        notes: "Waiting for specialist availability. Currently at position #5 on the list."
    }
];
