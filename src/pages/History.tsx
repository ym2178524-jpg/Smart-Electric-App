import { History as HistoryIcon, Clock, ArrowRight, Zap, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data representing local history
const mockHistory = [
  {
    id: 1,
    title: "Motor Heating Up",
    type: "text",
    date: "2026-04-20",
    status: "Resolved"
  },
  {
    id: 2,
    title: "Burned Contactor Panel",
    type: "image",
    date: "2026-04-18",
    status: "Pending Action"
  },
  {
    id: 3,
    title: "VFD Overcurrent OC",
    type: "text",
    date: "2026-04-15",
    status: "Resolved"
  }
];

export function History() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Fault History</h1>
          <p className="text-slate-400 mt-2">Review your previous AI diagnoses and their status.</p>
        </div>
      </header>

      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="divide-y divide-slate-800">
          {mockHistory.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded border border-slate-700 bg-slate-950 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">
                  {item.type === 'text' ? (
                    <Zap className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 uppercase tracking-widest font-bold">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.date}</span>
                    <span>•</span>
                    <span>{item.type} Analysis</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-widest
                  ${item.status === 'Resolved' ? 'bg-green-950/40 text-green-400 border-green-900/30' : 'bg-orange-950/40 text-orange-400 border-orange-900/30'}`}>
                  {item.status}
                </span>
                <span className="text-slate-500 hover:text-blue-400 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
