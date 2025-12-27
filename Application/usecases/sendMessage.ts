import { GeminiAIService } from "../../Infrastructure/GeminiAIService.js"
import { ChatMessage } from "../../Domain/Chat.js"

export const sendMessageUseCase = async (
    ai: GeminiAIService,
    userMessage: string,
    personality: string
): Promise<ChatMessage> => {
    const response = await ai.ask(userMessage, personality);
    return{
        id: Date.now().toString(),
        text: response,
        sender: 'system'
    }
  };
