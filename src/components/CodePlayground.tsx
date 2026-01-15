import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Maximize2, Minimize2, Code, Palette, Zap, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/context/SoundContext';

const CodePlayground = () => {
    const [html, setHtml] = useState(`<div class="container">
  <h1>Hello World! 👋</h1>
  <p>Edit the code and click Run!</p>
  <button id="btn">Click Me</button>
</div>`);

    const [css, setCss] = useState(`.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', sans-serif;
  color: white;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  background: white;
  color: #764ba2;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}`);

    const [js, setJs] = useState(`// JavaScript goes here
document.getElementById('btn').addEventListener('click', function() {
  alert('Hello from the Playground! 🚀');
  this.textContent = 'Clicked!';
  this.style.background = '#22c55e';
  this.style.color = 'white';
});`);

    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [srcDoc, setSrcDoc] = useState('');
    const { playClick, playHover } = useSound();

    const generateSrcDoc = () => {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>
                    try {
                        ${js}
                    } catch(e) {
                        console.error('JS Error:', e);
                    }
                </script>
            </body>
            </html>
        `;
    };

    const runCode = () => {
        playClick();
        setSrcDoc(generateSrcDoc());
    };

    const resetCode = () => {
        playClick();
        setHtml(`<div class="container">
  <h1>Hello World! 👋</h1>
  <p>Edit the code and click Run!</p>
  <button id="btn">Click Me</button>
</div>`);
        setCss(`.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', sans-serif;
  color: white;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  background: white;
  color: #764ba2;
  cursor: pointer;
}`);
        setJs(`document.getElementById('btn').addEventListener('click', function() {
  alert('Hello from the Playground! 🚀');
});`);
    };

    const copyCode = () => {
        const fullCode = `<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`;
        navigator.clipboard.writeText(fullCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        // Auto-run on initial load
        setSrcDoc(generateSrcDoc());
    }, []);

    const tabs = [
        { id: 'html', label: 'HTML', icon: Code, color: 'text-orange-400' },
        { id: 'css', label: 'CSS', icon: Palette, color: 'text-blue-400' },
        { id: 'js', label: 'JS', icon: Zap, color: 'text-yellow-400' },
    ];

    const getCurrentCode = () => {
        switch (activeTab) {
            case 'html': return html;
            case 'css': return css;
            case 'js': return js;
        }
    };

    const setCurrentCode = (value: string) => {
        switch (activeTab) {
            case 'html': setHtml(value); break;
            case 'css': setCss(value); break;
            case 'js': setJs(value); break;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-background' : 'relative'}`}
        >
            <div className={`glass-premium border border-white/10 rounded-[2rem] overflow-hidden ${isFullscreen ? 'h-full' : ''}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <h3 className="text-white font-bold uppercase tracking-wider text-sm">Code Playground</h3>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">HTML • CSS • JS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyCode}
                            onMouseEnter={() => playHover()}
                            className="text-gray-400 hover:text-white"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetCode}
                            onMouseEnter={() => playHover()}
                            className="text-gray-400 hover:text-white"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { playClick(); setIsFullscreen(!isFullscreen); }}
                            onMouseEnter={() => playHover()}
                            className="text-gray-400 hover:text-white"
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>

                <div className={`grid ${isFullscreen ? 'grid-cols-2 h-[calc(100%-60px)]' : 'md:grid-cols-2'}`}>
                    {/* Code Editor Panel */}
                    <div className="border-r border-white/10 flex flex-col">
                        {/* Tabs */}
                        <div className="flex border-b border-white/10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { playClick(); setActiveTab(tab.id as 'html' | 'css' | 'js'); }}
                                    onMouseEnter={() => playHover()}
                                    className={`flex items-center gap-2 px-6 py-3 text-sm font-mono uppercase tracking-wider transition-all ${activeTab === tab.id
                                        ? `${tab.color} bg-white/5 border-b-2 border-current`
                                        : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Code Editor */}
                        <div className="flex-1 relative">
                            <textarea
                                value={getCurrentCode()}
                                onChange={(e) => setCurrentCode(e.target.value)}
                                className={`w-full ${isFullscreen ? 'h-full' : 'h-[400px]'} p-6 bg-[#0d0d0d] text-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-0 border-none`}
                                placeholder={`Enter ${activeTab.toUpperCase()} code here...`}
                                spellCheck={false}
                            />
                            {/* Line numbers effect */}
                            <div className="absolute left-0 top-0 p-6 pointer-events-none">
                                <div className="text-gray-700 font-mono text-sm select-none">
                                    {getCurrentCode().split('\n').map((_, i) => (
                                        <div key={i} className="leading-[1.5]">{i + 1}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Run Button */}
                        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                            <Button
                                onClick={runCode}
                                onMouseEnter={() => playHover()}
                                className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Run Code
                            </Button>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Live Preview</span>
                        </div>
                        <div className={`flex-1 bg-white ${isFullscreen ? '' : 'min-h-[400px]'}`}>
                            <iframe
                                srcDoc={srcDoc}
                                title="Code Preview"
                                className="w-full h-full border-none"
                                sandbox="allow-scripts allow-modals"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CodePlayground;
