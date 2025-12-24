import { GeminiAIService } from "../../Infrastructure/GeminiAIService";

export const getNetworkErrorMessage = async (
    ai: GeminiAIService,
    personality: string
): Promise<string> => {
    return await ai.ask("Provide a \"network error\" error message based on your personality ", personality);
}
