import { useState } from 'react';
import { Button } from '../ui/Button';

export function NotificationPreferences() {
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [saved, setSaved] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            setIsOpen(false);
        }, 2000);
    };

    if (!isOpen) {
        return (
            <div className="mb-8 mt-2 flex items-center justify-between bg-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:border-header-bg/50 transition-colors" onClick={() => setIsOpen(true)}>
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-header-bg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                    </svg>
                    <span className="text-text-main font-medium text-[14px] sm:text-[15px]">Get notified about updates to this referral</span>
                </div>
                <button className="text-header-bg text-[14px] font-semibold uppercase tracking-wide">Set Up</button>
            </div>
        );
    }

    return (
        <div className="mb-8 mt-2 bg-white rounded-lg shadow-sm border border-header-bg/20 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-header-bg uppercase tracking-wide text-[14px] sm:text-[15px] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                    </svg>
                    Notification Preferences
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={emailEnabled} onChange={(e) => setEmailEnabled(e.target.checked)} className="w-[18px] h-[18px] accent-header-bg cursor-pointer" />
                            <span className="text-[14px] text-text-main font-medium">Email notifications</span>
                        </label>
                        {emailEnabled && (
                            <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 text-[14px] border border-[#bac4c5] bg-[#f8f8f8] rounded outline-none focus:border-header-bg" />
                        )}
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={smsEnabled} onChange={(e) => setSmsEnabled(e.target.checked)} className="w-[18px] h-[18px] accent-header-bg cursor-pointer" />
                            <span className="text-[14px] text-text-main font-medium">SMS updates</span>
                        </label>
                        {smsEnabled && (
                            <input type="tel" placeholder="Mobile number" required value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 text-[14px] border border-[#bac4c5] bg-[#f8f8f8] rounded outline-none focus:border-header-bg" />
                        )}
                    </div>
                </div>

                <div className="mt-2 flex items-center justify-end gap-3">
                    {saved && <span className="text-header-bg text-[14px] font-medium animate-in fade-in">Saved!</span>}
                    <button type="submit" disabled={!emailEnabled && !smsEnabled} className="bg-header-bg text-white px-4 py-2 rounded text-[13px] font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
