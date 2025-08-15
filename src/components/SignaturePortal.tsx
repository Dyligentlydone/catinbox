import { createPortal } from 'react-dom';
import DottedButton from './DottedButton';

export default function SignaturePortal() {
  const node = (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 2147483647,
        pointerEvents: 'auto',
      }}
    >
      <DottedButton
        text="[ Done By Dyligent ]"
        width={300}
        height={34}
        dotStep={3}
        font="bold 24px Arial"
        pointSize={1.0}
        maxStaggerMs={500}
        approachFactor={0.1}
        fadeInFactor={0.1}
        className="cursor-pointer"
        onClick={() => {
          const url = 'https://x.com/Dyllwill_';
          window.open(url, '_blank', 'noopener,noreferrer');
        }}
      />
    </div>
  );

  return createPortal(node, document.body);
}
