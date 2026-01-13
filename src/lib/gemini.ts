/**
 * AI SERVICE: Neural Brain Integration
 * This module handles communication with Google Gemini to provide 
 * context-aware answers about the portfolio and its creator.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// System Prompt: Gives the AI your "Personality" and "Knowledge"
const SYSTEM_PROMPT = `
You are the "Neural Brain" of Durvish Sharma's cinematic portfolio. 
Your goal is to answer questions about Durvish, his projects, and his skills in a professional, slightly futuristic, and helpful tone.

KNOWLEDGE BASE:
- NAME: Durvish Sharma
- ROLE: Full Stack Developer / Creative Technologist / UI/UX Designer
- LOCATION: Haryana, India
- TOP PROJECTS:
    1. Interactive 3D Project Globe (Three.js/React)
    2. Neural Management System (Next.js/Supabase)
    3. Cinematic Landing Pages (Framer Motion/GSAP)
- SKILLS: React, Three.js, TypeScript, Next.js, Framer Motion, GSAP, WebGL, Node.js, Python.
- CORE PHILOSOPHY: Building "Cinematic Web Experiences" that combine high performance with stunning visuals.
- CONTACT: Through the site's "Contact" page or Discord.

INSTRUCTIONS:
1. Be concise. Keep answers under 3 sentences.
2. Use "we" or "I" when referring to the portfolio/Durvish.
3. If asked about something not in your knowledge base, politely direct them to the contact section.
4. Do not mention that you are an AI unless explicitly asked.
`;

export const askNeuralBrain = async (userQuery: string) => {
    if (!GEMINI_API_KEY) {
        return "System Brain Offline: No API Key detected. Please configure VITE_GEMINI_API_KEY.";
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${SYSTEM_PROMPT}\n\nUSER QUESTION: ${userQuery}` }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Neural Sync Error:", error);
        return "Communications Interrupted: Unable to connect to the Neural Brain at this time.";
    }
};
