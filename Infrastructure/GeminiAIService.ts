export class GeminiAIService {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || 'https://chatbot-two-ruby.vercel.app';
    }

    // Update signature to accept image data
    async ask(
        prompt: string, 
        personality: string, 
        imageData?: { base64: string; mimeType: string }
    ): Promise<string> {
        try {
            const resp = await fetch(`${this.baseUrl}/api/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Include image data in the JSON body
                body: JSON.stringify({ 
                    prompt, 
                    personality,
                    image: imageData
                }),
            });

            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(`Backend error: ${resp.status} ${text}`);
            }

            const data = await resp.json();
            return data.response ?? 'No response from AI.';
        } catch (err: any) {
            return `system error: ${err?.message ?? 'Unknown error occurred.'}`;
        }
    }
}