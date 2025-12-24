import { GeminiAIService } from "../../Infrastructure/GeminiAIService"
import { ChatMessage } from "../../Domain/Chat"

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
