/**
 * MOCK SERVICE - AI REMOVED
 * This service previously used Google Gemini but has been stripped down 
 * to function locally without an API key.
 */

/**
 * Simulates enhancing a prompt without external AI.
 */
export const enhancePrompt = async (roughDraft: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Return a template-based structure instead of real AI generation
  return `[SYSTEM GENERATED TEMPLATE]
  
Role: Expert in the field related to "${roughDraft}"
Task: ${roughDraft}

Instructions:
1. Analyze the input data carefully.
2. Provide a step-by-step breakdown.
3. Ensure tone is professional and concise.

Output Format: Markdown`;
};

/**
 * Performs a simple local text search on tags instead of semantic AI search.
 */
export const smartSearch = async (query: string, availableTags: string[]): Promise<string[]> => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  
  // Simple filter logic: return tags that partially match the query
  return availableTags
    .filter(tag => 
      tag.toLowerCase().includes(lowerQuery) || 
      lowerQuery.includes(tag.toLowerCase())
    )
    .slice(0, 3);
};