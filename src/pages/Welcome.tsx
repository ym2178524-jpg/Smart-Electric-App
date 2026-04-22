import { Zap, LogIn, UserPlus, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Welcome() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-900/20">
          <Zap className="w-10 h-10 text-blue-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 text-center">
          SmartDetector
        </h1>
        <p className="text-slate-400 text-center mb-12 uppercase tracking-widest text-xs font-bold">
          Workspace Access Required
        </p>

        <div className="w-full space-y-4">
          <Link 
            to="/login"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-900/20"
          >
            <LogIn className="w-4 h-4" />
            Sign In to Account
          </Link>
          
          <Link 
            to="/signup"
            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded flex items-center justify-center gap-3 transition-colors"
          >
            <UserPlus className="w-4 h-4 text-slate-400" />
            Create New Account
          </Link>
        </div>

        <div className="w-full flex items-center mt-8 mb-8">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="px-4 text-[10px] uppercase tracking-widest font-bold text-slate-600">Or continue without saving</span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        <Link 
          to="/app"
          className="w-full bg-transparent border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded flex items-center justify-center gap-3 transition-colors"
        >
          <UserCircle className="w-4 h-4" />
          Enter Guest Mode
        </Link>

        <p className="mt-12 text-center text-slate-600 text-[10px] uppercase tracking-widest">
          By proceeding, you agree to our <a href="#" className="underline hover:text-slate-400">Terms</a> & <a href="#" className="underline hover:text-slate-400">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
