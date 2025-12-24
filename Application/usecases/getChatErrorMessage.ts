import { GeminiAIService } from "../../Infrastructure/GeminiAIService";

export const getChatErrorMessage = async (
    ai: GeminiAIService, 
    personality: string
): Promise<string> => {
    return await ai.ask("Provide a \"didnt get that\" error message based on your personality ", personality);
}