import { cn } from '../../lib/cn';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  patientName: string;
  dob: string;
  referralId: string;
  className?: string;
}

export function Header({
  patientName,
  dob,
  referralId,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'bg-header-bg px-4 sm:px-8 lg:px-16 pt-6 sm:pt-8 text-white',
        className,
      )}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm sm:text-[15px] font-medium"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to search
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
        <h1 className="text-[clamp(28px,5vw,60px)] font-medium leading-tight uppercase tracking-[0.26px]">
          {patientName}
        </h1>
        <p className="text-[clamp(14px,2vw,24px)] font-normal uppercase tracking-[0.39px] whitespace-nowrap">
          Date of birth: {dob}
        </p>
      </div>
      <div className="mt-4 sm:mt-6 flex flex-col gap-1 pb-6 sm:pb-10">

        <p className="text-[clamp(13px,1.8vw,24px)] font-normal leading-[1.6] tracking-[0.39px] text-text-subtle-on-header">
          Follow the progress of your referral:{' '}
          <span className="font-bold text-white">{referralId}</span>
        </p>
      </div>
    </header>
  );
}


