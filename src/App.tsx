import QuantumCat from './components/QuantumCat';
import DottedButton from './components/DottedButton';
import SignaturePortal from './components/SignaturePortal';
import AddressPortal from './components/AddressPortal';

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

      {/* Left-side vertical address */}
      <AddressPortal address="FJv6JHHiQmVPpauia3VLxNBTNBL3S2uKtDB8u6X1SpUq" />

      <SignaturePortal />
    </div>
  );
}

export default App;
