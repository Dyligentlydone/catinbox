import DottedButton from './DottedButton';

export default function SignaturePortal() {
  return (
    <div className="w-full flex justify-end pr-3 pb-4 md:pr-6 md:pb-6">
      {/* Mobile: smaller button */}
      <div className="md:hidden">
        <DottedButton
          text="[ Done By Dyligent ]"
          width={200}
          height={28}
          dotStep={3}
          font="bold 18px Arial"
          pointSize={0.9}
          maxStaggerMs={400}
          approachFactor={0.1}
          fadeInFactor={0.1}
          className="cursor-pointer"
          onClick={() => {
            const url = 'https://x.com/Dyllwill_';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        />
      </div>

      {/* Desktop: current size */}
      <div className="hidden md:block">
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
    </div>
  );
}
