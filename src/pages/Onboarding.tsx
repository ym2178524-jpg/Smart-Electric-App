import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquareText, ImageIcon, Calculator } from 'lucide-react';
import { cn } from '../lib/utils';

const ONBOARDING_STEPS = [
  {
    icon: MessageSquareText,
    title: "AI Text Diagnosis",
    description: "Describe electrical fault symptoms in plain engineering terms. Our AI engine analyzes the input to pinpoint likely root causes instantly.",
    color: "text-blue-400",
    bg: "bg-blue-600",
    glow: "shadow-blue-900/20"
  },
  {
    icon: ImageIcon,
    title: "Intelligent Vision",
    description: "Upload photos of damaged components, panels, or wiring. The vision model detects physical burns, misconfigurations, and anomalies.",
    color: "text-orange-400",
    bg: "bg-orange-600",
    glow: "shadow-orange-900/20"
  },
  {
    icon: Calculator,
    title: "Engineering Calculators",
    description: "Access essential electrical calculators for voltage drop, cable sizing, and load estimations right from your workspace.",
    color: "text-green-400",
    bg: "bg-green-600",
    glow: "shadow-green-900/20"
  }
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/welcome');
    }
  };

  const handleSkip = () => {
    navigate('/welcome');
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div 
        className={cn(
          "absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000",
          currentStep === 0 ? "bg-blue-600" : currentStep === 1 ? "bg-orange-600" : "bg-green-600"
        )}
      />

      <div className="max-w-md w-full mx-auto relative z-10 flex flex-col min-h-screen md:min-h-[auto]">
        {/* Header/Skip */}
        <div className="flex justify-end pt-4 pb-12 md:pb-8">
          <button 
            onClick={handleSkip}
            className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            Skip System Intro
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="animate-in slide-in-from-right-8 fade-in duration-500" key={currentStep}>
            <div className={cn(
              "w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-2xl border",
              currentStep === 0 ? "bg-blue-900/40 border-blue-500/30" : 
              currentStep === 1 ? "bg-orange-900/40 border-orange-500/30" : 
              "bg-green-900/40 border-green-500/30",
              step.glow
            )}>
              <step.icon className={cn("w-10 h-10", step.color)} />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{step.title}</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 h-24">
              {step.description}
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto pb-8 md:pb-0">
          <div className="flex items-center justify-between">
            {/* Indicators */}
            <div className="flex gap-2">
              {ONBOARDING_STEPS.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentStep ? "w-8 bg-blue-500" : "w-2 bg-slate-800"
                  )}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-white text-slate-900 hover:bg-slate-200 text-xs font-bold uppercase tracking-widest py-3 px-8 rounded flex items-center gap-2 transition-colors"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'GET STARTED' : 'NEXT'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
