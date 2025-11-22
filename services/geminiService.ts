import { GoogleGenAI, Type } from "@google/genai";
import { ShootPlan } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateCreativeConcept = async (
  eventType: string,
  userNotes: string
): Promise<ShootPlan> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY.");
  }

  const modelId = 'gemini-2.5-flash';
  
  const prompt = `
    Act as a Creative Director for "Studio Routes", a high-end photography company.
    Create a brief, cinematic shoot concept based on this request:
    Event/Type: ${eventType}
    Notes: ${userNotes}

    Provide a Concept Name, a Mood description (max 20 words), a Color Palette (3-5 hex codes or color names), 
    3-5 specific Shot Ideas that tell a story, and 1-2 Location Vibe suggestions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conceptName: { type: Type.STRING },
            mood: { type: Type.STRING },
            colorPalette: { 
              type: Type.ARRAY,
              items: { type: Type.STRING } 
            },
            suggestedShots: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            locationIdeas: { type: Type.STRING }
          },
          required: ["conceptName", "mood", "colorPalette", "suggestedShots", "locationIdeas"]
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from AI");
    }
    return JSON.parse(text) as ShootPlan;

  } catch (error) {
    console.error("Error generating concept:", error);
    throw error;
  }
};