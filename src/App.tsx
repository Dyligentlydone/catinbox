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

      {/* Under-animation bar: left 'Join Community', right 'X' */}
      <div className="w-[90vw] max-w-[600px] mx-auto -mt-3 flex items-center justify-start gap-10">
        <DottedButton
          text="Join Community!"
          width={480}
          height={108}
          dotStep={5}
          font="bold 80px Arial"
          pointSize={2.4}
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
          text="𝕏"
          width={80}
          height={108}
          dotStep={4}
          font="bold 84px Arial"
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

      <SignaturePortal />
    </div>
  );
}

export default App;
