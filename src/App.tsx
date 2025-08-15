import QuantumCat from './components/QuantumCat';
import DottedButton from './components/DottedButton';

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

      {/* Bottom-right dotted signature */}
      <div className="absolute bottom-4 right-4">
        <DottedButton
          text="( Done By Dyligent )"
          width={320}
          height={40}
          dotStep={4}
          font="bold 30px Arial"
          pointSize={1.4}
          maxStaggerMs={2200}
          approachFactor={0.06}
          fadeInFactor={0.025}
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

export default App;
