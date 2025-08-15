import QuantumCat from './components/QuantumCat';
import DottedButton from './components/DottedButton';
import SignaturePortal from './components/SignaturePortal';

function App() {
  return (
    <div className="min-h-screen text-quantum-yellow relative">
      {/* Header dotted button */}
      <div className="w-full flex justify-center pt-6">
        <DottedButton
          text="DEX Screener"
          width={320}
          height={55}
          dotStep={5}
          font="bold 40px Arial"
          pointSize={1.6}
          className="cursor-pointer"
          maxStaggerMs={2200}
          approachFactor={0.06}
          fadeInFactor={0.025}
          onClick={() => {
            const url = 'https://dexscreener.com/solana/FJv6JHHiQmVPpauia3VLxNBTNBL3S2uKtDB8u6X1SpUq';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        />
      </div>

      {/* Quantum Cat Animation - Full Screen */}
      <QuantumCat />

      {/* Under-animation bar: responsive variants */}
      {/* Mobile (fits within viewport) */}
      <div className="w-[94vw] max-w-[640px] mx-auto -mt-32 sm:hidden flex items-center justify-center gap-10">
        <DottedButton
          text="Join Community!"
          width={300}
          height={70}
          dotStep={3}
          font="bold 48px Arial, Helvetica, sans-serif"
          pointSize={1.9}
          className="cursor-pointer"
          onClick={() => {
            const url = 'https://x.com/i/communities/1956338802244595784/';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
          maxStaggerMs={1200}
          approachFactor={0.08}
          fadeInFactor={0.05}
        />
        <DottedButton
          text="X"
          width={56}
          height={70}
          dotStep={2}
          font="900 54px 'Arial Black', Arial, Helvetica, sans-serif"
          pointSize={2.0}
          className="cursor-pointer"
          onClick={() => {
            const url = 'https://x.com/i/communities/1956338802244595784/';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
          maxStaggerMs={500}
          approachFactor={0.1}
          fadeInFactor={0.06}
        />
      </div>

      {/* Desktop/tablet */}
      <div className="w-[90vw] max-w-[700px] md:max-w-[900px] mx-auto -mt-48 hidden sm:flex items-center justify-start gap-16">
        <DottedButton
          text="Join Community!"
          width={600}
          height={140}
          dotStep={3}
          font="bold 100px Arial, Helvetica, sans-serif"
          pointSize={2.6}
          className="cursor-pointer"
          onClick={() => {
            const url = 'https://x.com/i/communities/1956338802244595784/';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
          maxStaggerMs={1400}
          approachFactor={0.07}
          fadeInFactor={0.03}
        />
        <DottedButton
          text="X"
          width={120}
          height={140}
          dotStep={2}
          font="900 120px 'Arial Black', Arial, Helvetica, sans-serif"
          pointSize={2.6}
          className="cursor-pointer"
          onClick={() => {
            const url = 'https://x.com/i/communities/1956338802244595784/';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
          maxStaggerMs={600}
          approachFactor={0.08}
          fadeInFactor={0.04}
        />
      </div>

      <div className="flex-grow min-h-[20vh]"></div>
      <SignaturePortal />
    </div>
  );
}

export default App;
