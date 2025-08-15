import DottedButton from './DottedButton';

export default function SignaturePortal() {
  return (
    <div className="w-full flex justify-end pr-6 pb-6">
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
}
