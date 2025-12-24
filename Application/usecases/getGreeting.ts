import { GeminiAIService } from "../../Infrastructure/GeminiAIService";     

export const getGreeting = async (
    ai: GeminiAIService,
    personality: string
): Promise<string> => {
    return await ai.ask("Greet the user based on your personality.", personality);
};