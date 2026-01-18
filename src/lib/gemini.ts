// Local Knowledge Base for "Manual Mode"
const LOCAL_BRAIN = [
    {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'hola'],
        answer: "Greetings! I am Nexus, Durvish's virtual assistant. I can tell you about his skills, projects, or how to contact him. What would you like to know?"
    },
    {
        keywords: ['who', 'your name', 'identity', 'are you'],
        answer: "I am Nexus, a quantum-simulated assistant designed to showcase Durvish Sharma's portfolio. I run locally on this browser!"
    },
    {
        keywords: ['skill', 'stack', 'technologies', 'react', 'code', 'language'],
        answer: "Durvish is a Full Stack & Game Developer. His arsenal includes:\n• **Web**: React, TypeScript, Tailwind, Next.js, Node.js, Supabase.\n• **3D/Game**: Three.js, R3F, Unity (C#), Blender.\n• **Design**: Framer Motion, GSAP, UI/UX Principles."
    },
    {
        keywords: ['project', 'work', 'experienced', 'built', 'portfolio'],
        answer: "He has built several high-performance projects:\n1. **Cinematic Portfolio** (This site!)\n2. **NexusAI** (Landing Page)\n3. **Solaris** (3D Web Experience)\n4. **various Game Prototypes** in Unity.\n\nAsk me about a specific one!"
    },
    {
        keywords: ['contact', 'email', 'hire', 'reach', 'social'],
        answer: "You can reach Durvish via:\n• **Email**: durvishsharma01@gmail.com\n• **LinkedIn**: linkedin.com/in/durvish-sharma\n• **GitHub**: github.com/durvishsharma\n\nHe is currently open to new opportunities!"
    },
    {
        keywords: ['game', 'unity', 'c#', '3d'],
        answer: "Durvish is passionate about Game Dev! He uses Unity and C# to create immersive interactive experiences. This portfolio itself uses 3D web technologies (Three.js) to bridge the gap between web and gaming."
    },
    {
        keywords: ['location', 'where', 'based'],
        answer: "Durvish is based in Haryana, India, but operates globally via the digital realm (Open to Remote)."
    },
    {
        keywords: ['resume', 'cv', 'download'],
        answer: "You can view his experience in the 'About' section, or request a full CV via email."
    }
];

export const chatWithGemini = async (userMessage: string) => {
    // Artificial delay to simulate "thinking"
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerMsg = userMessage.toLowerCase();

    // Find best match
    const match = LOCAL_BRAIN.find(entry =>
        entry.keywords.some(keyword => lowerMsg.includes(keyword))
    );

    if (match) {
        return match.answer;
    }

    // Default Fallback
    return "My quantum databank doesn't have an answer for that yet. 🌌\n\nI can tell you about Durvish's **Skills**, **Projects**, **Experience**, or how to **Contact** him. Try one of those!";
};

export const askNeuralBrain = chatWithGemini;
