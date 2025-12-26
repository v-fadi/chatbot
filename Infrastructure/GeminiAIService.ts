import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiAIService {
    private client = new GoogleGenerativeAI('AIzaSyDwDSmRaao4-qnEctNN9EA5v5fC4RL8c48');

    async ask(prompt :string, personality: string) : Promise<string> {
        try {
            const response = await fetch ("https://vercel.com/v-fadis-projects/chatbot/BHdogc6WaKQVitjiPGzUQKreYb2A", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ prompt, personality, }),
            });

            const data = await response.json();
            return data.response || "No response from AI.";
        } catch (error:any) {
            return `system error: ${error.message || 'Unknown error occurred.'}`;

    }     
    }

}