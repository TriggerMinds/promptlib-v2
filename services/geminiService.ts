import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to enhance a user's rough prompt idea into a professional prompt.
 */
export const enhancePrompt = async (roughDraft: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert prompt engineer. Transform the following rough idea into a highly effective, professional system prompt for an LLM.
      
      Rough Idea: "${roughDraft}"
      
      Rules:
      1. Add persona/role assignment (e.g., "Act as a...").
      2. Clarify the task and context.
      3. Add constraints or output format requirements.
      4. Keep it concise but powerful.
      
      Return ONLY the improved prompt text.`,
    });

    return response.text || "Could not generate prompt.";
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    // Fallback if API call fails
    return `Act as an expert in the field relevant to: "${roughDraft}". \n\nTask: [Detailed explanation of ${roughDraft}]. \n\nConstraints: Be professional, concise, and accurate.`;
  }
};

/**
 * Uses Gemini to perform a "Smart Search" - mapping a natural language query to tags.
 */
export const smartSearch = async (query: string, availableTags: string[]): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Search Query: "${query}"
      Available Tags: ${JSON.stringify(availableTags)}
      
      Task: Identify up to 3 tags from the 'Available Tags' list that are most relevant to the User Search Query.
      
      Return a JSON array of strings. Example: ["Tag1", "Tag2"].`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error in smart search:", error);
    return [];
  }
};