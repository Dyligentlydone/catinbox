import { useState } from 'react';

type CopySectionProps = {
  label?: string;
  value: string;
  className?: string;
};

export default function CopySection({ label, value, className = '' }: CopySectionProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } finally {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="w-full select-none">
        {label && (
          <div className="mb-1 text-xs text-white/60 tracking-wide text-center">
            {label}
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          onClick={copy}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copy(); }}
          className="w-full text-center font-mono text-[15px] leading-[40px] text-white/90 cursor-pointer hover:text-white transition outline-none focus:outline-none"
        >
          {value}
        </div>
        {copied && (
          <div className="text-[11px] text-white/50 mt-1 text-center">Copied</div>
        )}
      </div>
    </div>
  );
}
