export class GeminiAIService {
    private apiKey = 'AIzaSyAPilB4_HAdOtzkc9Q2Fl3zeHDYjsQOnXg';

    async ask(prompt :string, personality: string) : Promise<string> {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: personality }] },
            contents: [{ parts: [{ text: prompt }] }],
        }),
    }
    );
    const data = await response.json();
    if (data.error)     return `System Error: ${data.error.message}`;
    if (data.candidates && data.candidates.length > 0)  return data.candidates[0].content.parts[0].text;
    return 'No response from AI.';
        
    }

}