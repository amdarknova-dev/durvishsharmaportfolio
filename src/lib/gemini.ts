import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || 'INVALID_KEY');

const SYSTEM_PROMPT = `
You are Nexus, the AI assistant for Durvish Sharma's portfolio website. 
Your goal is to be helpful, professional, and slightly futuristic/cinematic in tone.
Keep answers concise (under 3 sentences usually).

Here is the context about Durvish:
- **Role**: Full Stack Web Developer & Game Developer.
- **Skills**: React, TypeScript, Tailwind CSS, Three.js, Framer Motion, Node.js, Supabase, Unity, C#.
- **Projects**: NexusAI (Landing Page), Horizon (Dashboard), Aura (E-commerce), Solaris (3D Experience).
- **Contact**: Email: durvishsharma01@gmail.com, LinkedIn: linkedin.com/in/durvish-sharma, GitHub: github.com/durvishsharma.
- **Location**: Haryana, India (Open to remote/relocation).
- **Tone**: Innovative, tech-savvy, polite, enthusiastic about 3D web and game dev.

If someone asks about something unrelated to Durvish or web/game development, politely steer them back to Durvish's work.
`;

export const chatWithGemini = async (userMessage: string) => {
    if (!apiKey) {
        return "I'm offline right now (Missing API Key). Please tell Durvish to check his configuration!";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // We send the system prompt + user message combined for specific context in this single-turn helper.
        // For distinct system instructions, newer models support systemInstruction, but this prompt engineering works for basic "gemini-pro".
        const prompt = `${SYSTEM_PROMPT}\n\nUser: ${userMessage}\nNexus:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I seem to be having trouble processing that request via the quantum network. Please try again later.";
    }
};

export const askNeuralBrain = chatWithGemini;
