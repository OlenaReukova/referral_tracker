import { cn } from '../../lib/cn';

export interface HeaderProps {
  patientName: string;
  dob: string;
  referralId: string;
  clinic: string;
  className?: string;
}

export function Header({
  patientName,
  dob,
  referralId,
  clinic,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'bg-header-bg px-4 sm:px-8 lg:px-16 pt-8 sm:pt-12 text-white',
        className,
      )}
    >
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


