import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SmartDetector</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to access your diagnostic engine</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <form className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2 block">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-white text-sm"
                placeholder="engineer@company.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold block">Password</label>
                <a href="#" className="text-[10px] uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors font-bold">FORGOT?</a>
              </div>
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
              INITIALIZE SESSION
            </Link>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <p className="text-slate-500 text-xs">
              NO ACCOUNT? <Link to="/signup" className="font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest ml-2">REQUEST ACCESS</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
