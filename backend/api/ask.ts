import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Disable default body parser to handle large Base64 payloads manually
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const withRetries = async <T>(fn: () => Promise<T>, retries = 3, baseDelay = 500): Promise<T> => {
        let lastErr: any;
        for (let i = 0; i <= retries; i++) {
            try {
                return await fn();
            } catch (err: any) {
                lastErr = err;
                const isQuota = err?.status === 429 || /quota|limit|429/i.test(err?.message || '');
                const isServerError = err?.status >= 500 || /internal server error|5\d\d/i.test(err?.message || '');
                if (i === retries || (!isQuota && !isServerError)) break;
                const delay = Math.pow(2, i) * baseDelay;
                console.warn(`Retry ${i + 1}/${retries} after ${delay}ms due to:`, err?.message || err);
                await new Promise((r) => setTimeout(r, delay));
            }
        }
        throw lastErr;
    };

    try {
        // 1. Manually parse the request body
        const buffers: Uint8Array[] = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const raw = Buffer.concat(buffers).toString('utf8');
        
        // Handle empty body cases safely
        const body = raw ? JSON.parse(raw) : {};

        console.log('Parsed body length:', raw.length);

        const { prompt, personality, image } = body;

        // Validation: We need at least a prompt OR an image
        if ((!prompt || typeof prompt !== 'string') && !image) {
            return res.status(400).json({ error: 'Prompt or Image is required.' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY not set in environment');
            return res.status(500).json({ error: 'AI API key not configured on server.' });
        }

        const client = new GoogleGenerativeAI(apiKey);
        // Use a model that supports vision (Gemini 1.5 Flash or 2.0 Flash)
        const model = client.getGenerativeModel({
            model: 'gemini-2.5-flash', 
            systemInstruction: personality || '',
        });

        // 2. Construct Multimodal Parts
        // Gemini expects an array of parts: [{ text: "..." }, { inlineData: { ... } }]
        const parts: any[] = [];

        if (prompt) {
            parts.push({ text: prompt });
        }

        if (image && image.base64 && image.mimeType) {
            parts.push({
                inlineData: {
                    data: image.base64,
                    mimeType: image.mimeType,
                },
            });
        }

        // 3. Generate Content
        // Note: We pass the 'parts' array, not just the string
        const result = await withRetries(() => model.generateContent(parts), 3, 500);
        console.log('Gemini result success');

        const text = result?.response?.text?.() ?? (result?.response ?? '')?.toString?.() ?? '';
        return res.status(200).json({ response: text });

    } catch (error: any) {
        const isQuota = error?.status === 429 || /quota|limit|429/i.test(error?.message || '');
        console.error('Error in /api/ask:', error?.message || error);
        
        if (isQuota) {
            return res.status(503).json({ error: 'AI service quota exceeded. Please try again later.' });
        }
        return res.status(500).json({ error: error?.message ?? 'Internal server error' });
    }
}