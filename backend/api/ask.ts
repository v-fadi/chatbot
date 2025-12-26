import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { prompt, personality } = req.body;

        if (!prompt ) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = client.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: personality || "",
        });
        const result = await model.generateContent(prompt);

        res.status(200).json({ response: result.response.text() });
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}