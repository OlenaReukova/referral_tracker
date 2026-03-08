import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReferral } from '../api/referrals';
import { Logo } from '../components/ui/Logo';

export function Home() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFetchReferral = async (reference: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReferral(reference);
      navigate(`/tracker/${reference}`, { state: { referral: data } });
    } catch {
      setError('We could not find a referral with that reference. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please enter a referral reference.');
      return;
    }
    handleFetchReferral(trimmed);
  };

  return (
    <div className="flex min-h-screen flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top section — dark teal */}
      <div
        className="flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-16"
        style={{ backgroundColor: '#446063', minHeight: '40vh' }}
      >
        {/* Logo */}
        <div className="mb-4 sm:mb-6">
          <Logo />
        </div>

        {/* Main heading */}
        <h1
          className="text-center uppercase"
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 200,
            lineHeight: 1.25,
            letterSpacing: '1.923px',
            color: '#ffffff',
          }}
        >
          Track your referral
        </h1>

        {/* Subheading */}
        <p
          className="mt-6 sm:mt-10 max-w-[600px] text-center px-4"
          style={{
            fontSize: 'clamp(14px, 2vw, 20px)',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.449px',
            color: '#ffffff',
          }}
        >
          Enter your referral reference number to see the progress of your
          child&apos;s appointment.
        </p>
      </div>

      {/* Bottom section — light bg */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-20"
        style={{ backgroundColor: '#e8f2f3' }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[512px] flex-col items-center gap-6 sm:gap-8"
        >
          {/* Input */}
          <input
            id="referral-id"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="REF-123456"
            className="w-full outline-none text-center placeholder-[#b0c4c5] transition-colors"
            style={{
              height: 'clamp(52px, 8vw, 72px)',
              backgroundColor: '#f8f8f8',
              border: '3px solid #bac4c5',
              borderRadius: '10px',
              fontSize: 'clamp(20px, 4vw, 36px)',
              fontWeight: 400,
              color: '#3b4345',
              padding: '0 16px',
              letterSpacing: '2px',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#446063')}
            onBlur={(e) => (e.target.style.borderColor = '#bac4c5')}
          />

          {/* Error */}
          {error && (
            <p className="text-[14px] sm:text-[16px] text-center" style={{ color: '#c0392b' }}>
              {error}
            </p>
          )}

          {/* Demo Hint */}
          <div className="text-center w-full mt-[-10px] mb-[-10px] text-[14px]">
            <p className="text-[#3b4345]/60 inline-block font-medium">For demo: use codes <span className="font-mono bg-[#3b4345]/5 px-1 rounded text-[13px]">REF-111111</span> to <span className="font-mono bg-[#3b4345]/5 px-1 rounded text-[13px]">REF-888888</span></p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{
              height: 'clamp(52px, 8vw, 72px)',
              backgroundColor: '#446063',
              color: '#ffffff',
              fontSize: 'clamp(16px, 2.5vw, 24px)',
              fontWeight: 500,
              borderRadius: '10px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Checking…' : 'Check status'}
          </button>
        </form>
      </div>
    </div>
  );
}
