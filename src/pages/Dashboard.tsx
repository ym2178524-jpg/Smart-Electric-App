import { Link } from 'react-router-dom';
import { ArrowRight, Activity, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome to Smart Electric Fault Detector</h1>
        <p className="text-slate-400 mt-2">AI-powered electrical fault diagnosis and engineering tools.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-12 h-12 bg-blue-900/40 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Activity className="text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Total Diagnoses</h2>
            <p className="text-3xl font-light text-slate-300">12</p>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-12 h-12 bg-orange-900/40 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="text-orange-400 w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Pending Maintenance</h2>
            <p className="text-3xl font-light text-slate-300">3</p>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-12 h-12 bg-green-900/40 border border-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="text-green-400 w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Resolved Issues</h2>
            <p className="text-3xl font-light text-slate-300">8</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-white">New Fault Diagnosis</h3>
            <p className="text-slate-400 mb-8 max-w-md">Use AI to analyze fault symptoms via text description or by uploading an image of the equipment.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/app/text-diagnosis" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 px-8 rounded shadow-lg shadow-blue-900/20 transition-colors inline-flex items-center">
                TEXT MODE
              </Link>
              <Link to="/app/image-diagnosis" className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold py-3 px-8 rounded border border-slate-700 transition-colors inline-flex items-center">
                IMAGE MODE
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">Recent Cases</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border-l-4 border-blue-500 group transition-colors">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Motor Overheating</h4>
                      <p className="text-[10px] text-slate-500">2 days ago • Diagnostic complete</p>
                    </div>
                  </div>
                  <Link to="/app/history" className="text-slate-500 group-hover:text-blue-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
