import { Zap, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Signup() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
            <Zap className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm">Register to save your diagnostic history</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
          <form className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2 block">Full Name</label>
              <input 
                type="text" 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white text-sm"
                placeholder="e.g., Target Engineer"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2 block">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white text-sm"
                placeholder="engineer@company.com"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2 block">Password</label>
              <input 
                type="password" 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white text-sm"
                placeholder="••••••••"
              />
            </div>
            
            <Link 
              to="/app" 
              className="w-full block text-center mt-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest uppercase py-4 px-8 rounded shadow-lg shadow-blue-900/20 transition-colors"
            >
              REGISTER CREDENTIALS
            </Link>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <p className="text-slate-500 text-xs">
              ALREADY REGISTERED? <Link to="/login" className="font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest ml-2">ACCESS SESSION</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
