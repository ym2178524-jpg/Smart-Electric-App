import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

export function getGemini() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}

export const diagnosticSchema = {
  type: Type.OBJECT,
  properties: {
    diagnosisTitle: {
      type: Type.STRING,
      description: "A short, professional industrial title for the diagnosis."
    },
    problemInterpretation: {
      type: Type.OBJECT,
      properties: {
        symptomsRestated: { type: Type.STRING, description: "Clear restatement of the symptoms" },
        criticalIndicators: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Most critical indicators (e.g., tripping, overheating, noise)" }
      }
    },
    rootCauseAnalysis: {
      type: Type.ARRAY,
      description: "Possible causes ranked by likelihood.",
      items: {
        type: Type.OBJECT,
        properties: {
          cause: { type: Type.STRING },
          likelihood: { type: Type.STRING, description: "High, Medium, or Low" },
          probabilityPercentage: { type: Type.INTEGER, description: "Estimated probability from 0-100" },
          reasoning: { type: Type.STRING, description: "Explanation of WHY each cause is possible based on electrical principles" }
        }
      }
    },
    engineeringReasoning: {
      type: Type.STRING,
      description: "Technical logic linking symptoms to causes using electrical engineering concepts (phase imbalance, overload current, etc.)"
    },
    diagnosticProcedure: {
      type: Type.OBJECT,
      properties: {
        measurements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Measurements to take" },
        toolsRequired: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tools required" },
        inspectionSteps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Order of inspection steps (critical first)" }
      }
    },
    recommendedSolutions: {
      type: Type.ARRAY,
      description: "Solutions in order of urgency and effectiveness.",
      items: {
        type: Type.OBJECT,
        properties: {
          solution: { type: Type.STRING },
          urgency: { type: Type.STRING, description: "Immediate, Scheduled, etc." },
          type: { type: Type.STRING, description: "Temporary, Permanent, Replacement, Rewinding" }
        }
      }
    },
    riskAssessment: {
      type: Type.OBJECT,
      properties: {
        level: { type: Type.STRING, description: "Low, Medium, High, or Critical" },
        riskExplanation: { type: Type.STRING, description: "Safety or equipment damage risks" }
      }
    },
    safetyPrecautions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "LOTO, zero voltage, PPE, and thermal hazards"
    }
  }
};

