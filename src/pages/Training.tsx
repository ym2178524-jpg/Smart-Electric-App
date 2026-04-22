import { useState } from 'react';
import { BookOpen, User, CheckCircle, XCircle, BrainCircuit, Loader2 } from 'lucide-react';
import { getGemini } from '../lib/gemini';
import { cn } from '../lib/utils';
import Markdown from 'react-markdown';

const CASES = [
  {
    id: 1,
    title: "VFD Overcurrent Fault during Deceleration",
    difficulty: "Advanced",
    description: "A 45kW motor driven by a Variable Frequency Drive (VFD) controls a high-inertia fan. The system runs perfectly during acceleration and steady-state operation. However, during normal stopping, the VFD frequently trips on 'Overcurrent (OC)' or 'Overvoltage (OV)' faults."
  },
  {
    id: 2,
    title: "Frequent Contactor Coil Burnout",
    difficulty: "Intermediate",
    description: "In an industrial control panel, the coil of a 230V AC contactor controlling a large pump motor burns out repeatedly every few weeks. The control voltage measures exactly 230V, and the contacts themselves appear to be in good condition, but the coil housing shows signs of severe overheating."
  }
];

export function Training() {
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedCase || !userAnswer.trim()) return;
    setLoading(true);
    setFeedback(null);

    try {
      const ai = getGemini();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `You are an expert electrical engineering mentor evaluating a student's answer to a case study.
        
        Case Study Title: ${selectedCase.title}
        Case Description: ${selectedCase.description}
        
        Student's Answer/Diagnosis: "${userAnswer}"
        
        Provide constructive, professional feedback. Re-state what they got right, correct any misconceptions, and explain the true root cause and solution clearly like a senior engineer. Use formatting (bullet points, bold text).`,
      });

      setFeedback(response.text || "No feedback received.");
    } catch (err: any) {
      setFeedback("Error generating feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="border-b border-slate-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Training & Case Studies</h1>
        <p className="text-slate-400 mt-2">Test your diagnostic skills with real-world electrical engineering scenarios.</p>
      </header>

      {!selectedCase ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASES.map((c) => (
            <div key={c.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl hover:border-blue-500/50 transition-colors cursor-pointer flex flex-col group" onClick={() => setSelectedCase(c)}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-blue-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className={cn(
                  "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border",
                  c.difficulty === 'Advanced' ? 'bg-purple-900/20 text-purple-400 border-purple-900/30' : 'bg-blue-900/20 text-blue-400 border-blue-900/30'
                )}>{c.difficulty}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{c.title}</h3>
              <p className="text-slate-400 text-sm flex-1 line-clamp-3 leading-relaxed">{c.description}</p>
              <button className="mt-6 text-blue-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                SOLVE CASE <span className="text-lg leading-none">›</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden animate-in fade-in">
          <div className="bg-slate-950 p-8 border-b border-slate-800 relative">
             <button onClick={() => { setSelectedCase(null); setFeedback(null); setUserAnswer(''); }} className="absolute text-slate-500 hover:text-white top-6 left-6 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
               <span className="text-lg leading-none mt-[-2px]">‹</span> BACK
             </button>
             <div className="max-w-3xl mx-auto mt-6">
               <span className="text-blue-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Case Study Protocol</span>
               <h2 className="text-2xl font-bold text-white mb-4">{selectedCase.title}</h2>
               <p className="text-slate-400 text-sm leading-relaxed">{selectedCase.description}</p>
             </div>
          </div>
          
          <div className="p-8 max-w-3xl mx-auto space-y-8">
            {!feedback ? (
              <div className="space-y-4">
                <label className="block text-slate-300 font-bold text-sm tracking-wide uppercase">Your Diagnostic Assessment</label>
                <p className="text-slate-500 text-xs">Outline the most likely root cause and your proposed field procedure to resolve it.</p>
                <textarea
                  className="w-full min-h-[200px] p-4 bg-slate-950 border border-slate-800 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors resize-none text-slate-300 placeholder-slate-600 outline-none text-sm"
                  placeholder="Initiate analysis..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={loading}
                />
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !userAnswer.trim()}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs tracking-widest uppercase py-3 px-8 rounded shadow-lg shadow-blue-900/20 transition-colors flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
                    {loading ? 'EVALUATING...' : 'SUBMIT DIRECTIVE'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center border border-blue-800/50">
                    <BrainCircuit className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase">AI Mentor Evaluation</h3>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed prose-headings:text-white prose-a:text-blue-400">
                  <Markdown>{feedback}</Markdown>
                </div>
                <div className="pt-8 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => { setSelectedCase(null); setFeedback(null); setUserAnswer(''); }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs tracking-widest uppercase py-3 px-8 rounded border border-slate-700 transition-colors"
                  >
                    NEXT CASE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
