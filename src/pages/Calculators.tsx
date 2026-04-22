import { useState } from 'react';
import { Calculator, Zap, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function Calculators() {
  const [activeCalc, setActiveCalc] = useState<string | null>('voltage-drop');

  const calculators = [
    { id: 'voltage-drop', name: 'Voltage Drop' },
    { id: 'cable-size', name: 'Cable Size Selection' },
    { id: 'electrical-load', name: 'Electrical Load' },
    { id: 'breaker-selection', name: 'Circuit Breaker' },
    { id: 'power-factor', name: 'Power Factor' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <header className="border-b border-slate-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Electrical Calculators</h1>
        <p className="text-slate-400 mt-2">Essential engineering formulas and estimation tools.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-xl flex flex-col shrink-0 overflow-y-auto">
          <h2 className="text-xs font-bold text-slate-500 mb-4 tracking-widest uppercase">Select Tool</h2>
          <nav className="space-y-2">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalc(calc.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors flex items-center justify-between group border",
                  activeCalc === calc.id 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20" 
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                )}
              >
                {calc.name}
                <ArrowRight className={cn("w-4 h-4 transition-transform", activeCalc === calc.id ? "text-white" : "text-transparent group-hover:text-slate-500")} />
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl overflow-y-auto">
          {activeCalc === 'voltage-drop' && <VoltageDropCalculator />}
          {activeCalc !== 'voltage-drop' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Calculator className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Calculator Under Construction</h3>
              <p className="text-slate-400 max-w-sm">This calculator is currently being formulated by our engineering team and will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VoltageDropCalculator() {
  const [voltage, setVoltage] = useState('400');
  const [current, setCurrent] = useState('100');
  const [length, setLength] = useState('50');
  const [cableCore, setCableCore] = useState('Cu');
  const [crossSection, setCrossSection] = useState('35');
  const [phases, setPhases] = useState('3');

  // Simple estimation formula for demo
  // Vd = (sqrt(3) * I * L * (R cos fi + X sin fi)) / 1000  (approx simplified for Cu)
  // Let's use a standard simplified: Vd = (mV/A/m * I * L) / 1000
  // Here we'll just mock a resistivity calculation for UI purposes
  
  const calculateDrop = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const l = parseFloat(length);
    const a = parseFloat(crossSection);
    if (!v || !i || !l || !a) return null;

    const rho = cableCore === 'Cu' ? 0.0175 : 0.028; // roughly
    const is3Phase = phases === '3';
    
    const r = (rho * l) / a;
    let vDrop = is3Phase ? (Math.sqrt(3) * i * r) : (2 * i * r);
    const percentage = (vDrop / v) * 100;

    return { drop: vDrop.toFixed(2), percentage: percentage.toFixed(2) };
  };

  const result = calculateDrop();

  return (
    <div className="max-w-2xl animate-in fade-in duration-300">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
        <Zap className="w-5 h-5 text-blue-500" />
        Voltage Drop Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Voltage (V)</label>
          <input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phases</label>
          <select value={phases} onChange={(e) => setPhases(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white">
            <option value="1">1-Phase (230V)</option>
            <option value="3">3-Phase (400V)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Load Current (A)</label>
          <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cable Length (m)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conductor</label>
          <select value={cableCore} onChange={(e) => setCableCore(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white">
            <option value="Cu">Copper (Cu)</option>
            <option value="Al">Aluminum (Al)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cross Section (mm²)</label>
          <input type="number" value={crossSection} onChange={(e) => setCrossSection(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white" />
        </div>
      </div>

      {result && (
        <div className={cn(
          "p-6 rounded-lg border",
          parseFloat(result.percentage) > 5 ? "bg-red-950/20 border-red-900/50" : "bg-blue-950/20 border-blue-900/50"
        )}>
          <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">Calculation Results</h3>
          <div className="flex flex-wrap items-end gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Voltage Drop</p>
              <p className={cn("text-4xl font-light", parseFloat(result.percentage) > 5 ? "text-red-400" : "text-blue-400")}>
                {result.drop} <span className="text-2xl">V</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Percentage</p>
              <p className={cn("text-4xl font-light", parseFloat(result.percentage) > 5 ? "text-red-400" : "text-blue-400")}>
                {result.percentage}<span className="text-2xl">%</span>
              </p>
            </div>
          </div>
          {parseFloat(result.percentage) > 5 && (
            <div className="mt-6 p-3 bg-red-900/20 border border-red-900/30 rounded flex items-start gap-3">
              <Calculator className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" /> 
              <p className="text-red-400 text-sm">Warning: Voltage drop exceeds 5% limit. Increase cable cross-section to comply with standards.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
