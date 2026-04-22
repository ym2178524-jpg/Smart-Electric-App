import { useState, useRef } from 'react';
import { getGemini, diagnosticSchema } from '../lib/gemini';
import { Loader2, UploadCloud, ShieldAlert, CheckCircle, Wrench, AlertCircle, Image as ImageIcon, Activity, Layers, PenTool as Tool, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

type DiagnosticResult = {
  diagnosisTitle: string;
  problemInterpretation: {
    symptomsRestated: string;
    criticalIndicators: string[];
  };
  rootCauseAnalysis: {
    cause: string;
    likelihood: string;
    probabilityPercentage: number;
    reasoning: string;
  }[];
  engineeringReasoning: string;
  diagnosticProcedure: {
    measurements: string[];
    toolsRequired: string[];
    inspectionSteps: string[];
  };
  recommendedSolutions: {
    solution: string;
    urgency: string;
    type: string;
  }[];
  riskAssessment: {
    level: string;
    riskExplanation: string;
  };
  safetyPrecautions: string[];
};

export function ImageDiagnosis() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setResult(null);
    setError(null);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setMimeType(file.type);

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = (event.target?.result as string).split(',')[1];
      setImageBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDiagnose = async () => {
    if (!imageBase64 || !mimeType) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = getGemini();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [
            {
              inlineData: {
                data: imageBase64,
                mimeType: mimeType
              }
            },
            {
              text: `You are a bilingual (English and Arabic) Senior Industrial Electrical Maintenance Engineer. Analyze the uploaded image of the electrical fault/equipment. Based on visual indicators and the provided context, provide a diagnosis strictly using the required JSON schema. 
              
Language Requirements:
1. Identify the language of the provided context automatically. If no context is provided, default to English.
2. Respond strictly in the SAME language as the context (English or Modern Standard Arabic).
3. If responding in Arabic, use highly professional technical terminology (e.g., "phase loss" = "فقدان فازة", "voltage drop" = "هبوط الجهد").
4. Maintain the same structure, tone, and depth of technical analysis in both languages.

Style Requirements:
* Professional industrial engineering tone
* Clear, structured, and concise
* No vague or generic statements
* Must reflect real-world electrical maintenance practice
* Assume industrial/commercial scale equipment unless specified otherwise

Context / Symptoms: "${description}"`
            }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: diagnosticSchema,
        }
      });

      const jsonStr = response.text?.trim() || "";
      const parsedResult = JSON.parse(jsonStr) as DiagnosticResult;
      setResult(parsedResult);
    } catch (err: any) {
      setError(err.message || "An error occurred during vision diagnosis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Vision-Based Diagnosis</h1>
        <p className="text-slate-400 mt-2">Upload a photo of the damaged component and add optional context in English or Arabic.</p>
      </header>

      {/* Input Area */}
      <div className="bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-800">
        <label className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-3 block">
          AI Vision Engine Input
        </label>
        
        <div 
          className={cn(
            "border-2 border-dashed rounded-xl transition-colors min-h-[250px] flex flex-col items-center justify-center p-6 relative overflow-hidden",
            imagePreview ? "border-blue-500/50 bg-blue-950/10" : "border-slate-800 bg-slate-950 hover:border-blue-500/30 hover:bg-slate-900/50 cursor-pointer"
          )}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
          />
          
          {imagePreview ? (
            <div className="w-full flex flex-col">
              <div className="relative w-full max-w-lg aspect-video rounded-lg overflow-hidden border border-slate-800 mb-6 shadow-xl object-contain bg-black mx-auto">
                <img src={imagePreview} alt="Fault uploaded" className="w-full h-full object-contain" />
              </div>
              
              <div className="w-full mt-4 mb-6">
                <label htmlFor="image-desc" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3 block">
                  Optional Context (Auto-detects language)
                </label>
                <textarea
                  id="image-desc"
                  dir="auto"
                  className="w-full min-h-[100px] p-4 bg-slate-950 border border-slate-800 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors resize-none text-slate-300 placeholder-slate-600 outline-none font-mono text-sm"
                  placeholder="e.g., 'This panel was exposed to water...' or 'لوحة الكهرباء تعرضت للماء...'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                    setImageBase64(null);
                    setResult(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  disabled={loading}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-bold py-3 px-6 rounded transition-colors uppercase tracking-widest border border-slate-700"
                >
                  CLEAR
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDiagnose();
                  }}
                  disabled={loading || !imageBase64}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-3 px-8 rounded shadow-lg shadow-blue-900/20 transition-colors flex items-center gap-2 uppercase tracking-widest"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {loading ? 'ANALYZING IMAGE...' : 'ANALYZE IMAGE'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                <UploadCloud className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-slate-300 font-bold mb-1">Click to Upload Image</p>
              <p className="text-slate-500 text-sm">JPG, PNG, WebP highly detailed photos preferred</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-900/30 text-red-400 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
          
          {/* Header & Risk Assessment */}
          <div className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 p-8 h-full bg-blue-600"></div>
            <div className="pl-6 w-full">
              <h2 className="text-2xl font-bold text-white tracking-tight" dir="auto">{result.diagnosisTitle}</h2>
              <div className="mt-2 text-slate-400 text-sm" dir="auto">
                <span className="font-bold uppercase tracking-widest text-xs text-slate-500" dir="ltr">Visual Evidence:</span> {result.problemInterpretation.symptomsRestated}
              </div>
            </div>
            
            <div className={cn(
              "px-6 py-4 rounded-lg border text-center shrink-0 min-w-[200px]",
              result.riskAssessment.level === 'Critical' ? "bg-red-950/30 border-red-900 text-red-400" :
              result.riskAssessment.level === 'High' ? "bg-orange-950/30 border-orange-900 text-orange-400" :
              result.riskAssessment.level === 'Medium' ? "bg-yellow-950/30 border-yellow-900 text-yellow-500" :
              "bg-green-950/30 border-green-900 text-green-400"
            )}>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1 opacity-80">Risk Level</div>
              <div className="text-xl font-black uppercase tracking-wider">{result.riskAssessment.level}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Root Cause Analysis */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-4">
                  <Activity className="w-4 h-4 text-blue-500" /> Root Cause Analysis
                </h3>
                <div className="space-y-4">
                  {result.rootCauseAnalysis.map((cause, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <h4 className="text-sm font-bold text-slate-200" dir="auto">{cause.cause}</h4>
                        <span className={cn(
                          "text-[10px] px-2 py-1 rounded font-bold tracking-wider uppercase border whitespace-nowrap",
                          cause.likelihood === 'High' ? "bg-red-950/30 text-red-400 border-red-900/50" :
                          cause.likelihood === 'Medium' ? "bg-orange-950/30 text-orange-400 border-orange-900/50" :
                          "bg-slate-800 text-slate-400 border-slate-700"
                        )}>
                          {cause.probabilityPercentage}% Likelihood
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mt-3 border-l-2 border-transparent rtl:border-r-2 rtl:border-l-transparent rtl:pr-3 ltr:border-l-slate-800 ltr:pl-3" dir="auto" style={{ borderInlineStartContext: '2px solid #1e293b', paddingInlineStart: '0.75rem' }}>
                        {cause.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Reasoning */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-4">
                  <Layers className="w-4 h-4 text-purple-500" /> Engineering Logic
                </h3>
                <div className="text-slate-300 text-sm leading-relaxed" dir="auto">
                  <p>{result.engineeringReasoning}</p>
                </div>
              </div>

              {/* Step-by-step Procedure */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-4">
                  <Wrench className="w-4 h-4 text-cyan-500" /> Diagnostic Procedure
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Required Tools</div>
                    <ul className="space-y-1">
                      {result.diagnosticProcedure.toolsRequired.map((tool, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center gap-2" dir="auto">
                          <Tool className="w-3 h-3 text-cyan-600 shrink-0" /> <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Key Measurements</div>
                    <ul className="space-y-1">
                      {result.diagnosticProcedure.measurements.map((measure, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center gap-2" dir="auto">
                          <Activity className="w-3 h-3 text-cyan-600 shrink-0" /> <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  {result.diagnosticProcedure.inspectionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-950 rounded transition-colors group">
                      <div className="w-6 h-6 rounded bg-slate-800 text-slate-400 text-xs font-mono flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500 group-hover:text-blue-400 transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-300 mt-0.5" dir="auto">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Actions & Safety */}
            <div className="space-y-6">
              
              {/* Safety Protocol */}
              <div className="bg-orange-950/20 p-6 rounded-xl border border-orange-900/30 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none">
                  <ShieldAlert className="w-40 h-40 text-orange-500" />
                </div>
                <h3 className="text-xs font-bold text-orange-500 mb-6 flex items-center gap-2 uppercase tracking-wider relative z-10 border-b border-orange-900/30 pb-4">
                  <ShieldAlert className="w-4 h-4" /> Safety Protocol
                </h3>
                <ul className="space-y-4 relative z-10">
                  {result.safetyPrecautions.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-orange-200 text-sm bg-orange-950/40 p-3 rounded border border-orange-900/20" dir="auto">
                      <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Solutions */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
                 <h3 className="text-xs font-bold text-emerald-500 mb-6 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-4">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Action Plan
                </h3>
                <div className="space-y-4">
                  {result.recommendedSolutions.map((sol, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg relative overflow-hidden group hover:border-emerald-900/50 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-emerald-600 transition-colors ltr:left-0 rtl:right-0"></div>
                      <div className="flex items-center gap-2 mb-2 px-2">
                        <span className={cn(
                          "text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded",
                          sol.urgency === 'Immediate' ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                        )}>
                          {sol.urgency}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">
                          {sol.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 px-2 leading-relaxed" dir="auto">
                        {sol.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
