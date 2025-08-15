import QuantumCat from './components/QuantumCat';

function App() {
  return (
    <div className="min-h-screen bg-quantum-blue text-quantum-yellow">
      {/* Quantum Cat Animation - Full Screen */}
      <QuantumCat />
      
      {/* Small label in the corner */}
      <div className="absolute bottom-4 right-4 text-quantum-yellow text-sm bg-quantum-blue/50 px-2 py-1 rounded">
        Quantum Cat Animation
      </div>
    </div>
  );
}

export default App;
