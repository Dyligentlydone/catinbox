import { createPortal } from 'react-dom';
import { useCallback, useState } from 'react';

type AddressPortalProps = {
  address: string;
};

export default function AddressPortal({ address }: AddressPortalProps) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      const t = document.createElement('textarea');
      t.value = address;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [address]);

  const node = (
    <div
      style={{
        position: 'fixed',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2147483647,
        pointerEvents: 'auto',
        color: 'rgb(255, 222, 0)', // match quantum yellow
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 14,
        lineHeight: 1,
        userSelect: 'none',
        letterSpacing: '1px',
      }}
      title="Click to copy"
    >
      <div style={{ position: 'relative' }}>
        {/* Tooltip to the right, vertically centered */}
        {copied && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 28,
              transform: 'translateY(-50%)',
              color: 'rgb(255, 222, 0)',
              fontSize: 12,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Copied!
          </div>
        )}
        <div
          onClick={copy}
          style={{
            writingMode: 'vertical-rl' as any,
            textOrientation: 'mixed' as any,
            cursor: 'pointer',
          }}
        >
          {address}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
