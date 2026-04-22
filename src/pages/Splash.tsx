import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/40 border border-blue-500/50 relative">
          <div className="absolute inset-0 bg-blue-400 blur-md opacity-50 rounded-2xl animate-pulse"></div>
          <Zap className="w-12 h-12 text-white relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">SmartDetector</h1>
        <p className="text-blue-400 uppercase tracking-[0.3em] text-xs font-bold">AI-Powered Electrical Engineering</p>
      </div>
      
      <div className="absolute bottom-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
        <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-[progress_2.5s_ease-in-out_forwards]"></div>
        </div>
        <p className="text-slate-500 text-[10px] mt-4 uppercase tracking-widest">Initializing Diagnostic Engine...</p>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
