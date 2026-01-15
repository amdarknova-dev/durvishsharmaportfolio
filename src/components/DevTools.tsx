import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileJson, Binary, Palette, Type, Hash, QrCode,
    FileText, Code2, Shuffle, Copy, Check, RefreshCw,
    Download, Upload, Trash2, Printer, Monitor, Globe, Wifi, Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/context/SoundContext';

// JSON Formatter Tool
export const JsonFormatter = () => {
    const [input, setInput] = useState('{"name": "Durvish", "role": "Developer", "skills": ["React", "TypeScript", "Three.js"]}');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const { playClick } = useSound();

    const formatJson = () => {
        playClick();
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (e: any) {
            setError(e.message);
            setOutput('');
        }
    };

    const minifyJson = () => {
        playClick();
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError('');
        } catch (e: any) {
            setError(e.message);
            setOutput('');
        }
    };

    return (
        <div className="space-y-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Paste JSON here..."
            />
            <div className="flex gap-2">
                <Button onClick={formatJson} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                    Format
                </Button>
                <Button onClick={minifyJson} size="sm" variant="outline" className="border-white/10">
                    Minify
                </Button>
            </div>
            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
            {output && (
                <pre className="p-4 bg-black/50 border border-white/10 rounded-xl text-green-400 font-mono text-xs overflow-auto max-h-48">
                    {output}
                </pre>
            )}
        </div>
    );
};

// Base64 Encoder/Decoder
export const Base64Tool = () => {
    const [input, setInput] = useState('Hello, World!');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const { playClick } = useSound();

    const process = () => {
        playClick();
        try {
            if (mode === 'encode') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch {
            setOutput('Error: Invalid input');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-4">
                <Button
                    onClick={() => setMode('encode')}
                    size="sm"
                    className={mode === 'encode' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}
                >
                    Encode
                </Button>
                <Button
                    onClick={() => setMode('decode')}
                    size="sm"
                    className={mode === 'decode' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}
                >
                    Decode
                </Button>
            </div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder={mode === 'encode' ? 'Text to encode...' : 'Base64 to decode...'}
            />
            <Button onClick={process} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>
            {output && (
                <div className="p-4 bg-black/50 border border-white/10 rounded-xl text-green-400 font-mono text-sm break-all">
                    {output}
                </div>
            )}
        </div>
    );
};

// Color Converter
export const ColorConverter = () => {
    const [hex, setHex] = useState('#22c55e');
    const [rgb, setRgb] = useState({ r: 34, g: 197, b: 94 });
    const [copied, setCopied] = useState(false);
    const { playClick } = useSound();

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join('');
    };

    const handleHexChange = (value: string) => {
        setHex(value);
        const rgbVal = hexToRgb(value);
        if (rgbVal) setRgb(rgbVal);
    };

    const copyColor = () => {
        playClick();
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <input
                    type="color"
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-16 h-16 rounded-xl cursor-pointer border-0"
                />
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs w-12">HEX:</span>
                        <input
                            type="text"
                            value={hex}
                            onChange={(e) => handleHexChange(e.target.value)}
                            className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm"
                        />
                        <Button onClick={copyColor} size="sm" variant="ghost">
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs w-12">RGB:</span>
                        <span className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm flex-1">
                            rgb({rgb.r}, {rgb.g}, {rgb.b})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Lorem Ipsum Generator
export const LoremGenerator = () => {
    const [paragraphs, setParagraphs] = useState(1);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const { playClick } = useSound();

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

    const generate = () => {
        playClick();
        setOutput(Array(paragraphs).fill(lorem).join('\n\n'));
    };

    const copy = () => {
        playClick();
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Paragraphs:</span>
                <input
                    type="number"
                    value={paragraphs}
                    onChange={(e) => setParagraphs(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="w-20 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-center"
                    min="1"
                    max="10"
                />
                <Button onClick={generate} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                    Generate
                </Button>
            </div>
            {output && (
                <div className="relative">
                    <Button onClick={copy} size="sm" variant="ghost" className="absolute top-2 right-2">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <pre className="p-4 bg-black/50 border border-white/10 rounded-xl text-gray-300 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
};

// Hash Generator
export const HashGenerator = () => {
    const [input, setInput] = useState('Hello, World!');
    const [hashes, setHashes] = useState<{ [key: string]: string }>({});
    const { playClick } = useSound();

    const generateHashes = async () => {
        playClick();
        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        const hashTypes = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        const results: { [key: string]: string } = {};

        for (const type of hashTypes) {
            try {
                const hashBuffer = await crypto.subtle.digest(type, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                results[type] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            } catch {
                results[type] = 'Error';
            }
        }

        setHashes(results);
    };

    return (
        <div className="space-y-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-20 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Enter text to hash..."
            />
            <Button onClick={generateHashes} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                Generate Hashes
            </Button>
            {Object.keys(hashes).length > 0 && (
                <div className="space-y-2">
                    {Object.entries(hashes).map(([type, hash]) => (
                        <div key={type} className="p-3 bg-black/50 border border-white/10 rounded-lg">
                            <span className="text-primary text-xs font-mono">{type}:</span>
                            <p className="text-gray-400 font-mono text-[10px] break-all mt-1">{hash}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Password Generator
export const PasswordGenerator = () => {
    const [length, setLength] = useState(16);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const { playClick } = useSound();

    const generate = () => {
        playClick();
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(result);
    };

    const copy = () => {
        playClick();
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Length:</span>
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Math.max(4, Math.min(64, parseInt(e.target.value) || 16)))}
                        className="w-16 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-center"
                        min="4"
                        max="64"
                    />
                </div>
                <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                    <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="accent-primary" />
                    Numbers
                </label>
                <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                    <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="accent-primary" />
                    Symbols
                </label>
            </div>
            <Button onClick={generate} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                <Shuffle className="w-4 h-4 mr-2" /> Generate
            </Button>
            {password && (
                <div className="flex items-center gap-2 p-4 bg-black/50 border border-white/10 rounded-xl">
                    <span className="flex-1 text-green-400 font-mono text-sm break-all">{password}</span>
                    <Button onClick={copy} size="sm" variant="ghost">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            )}
        </div>
    );
};

// UUID Generator
export const UuidGenerator = () => {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(5);
    const [copied, setCopied] = useState<number | null>(null);
    const { playClick } = useSound();

    const generateUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generate = () => {
        playClick();
        const newUuids = Array(count).fill(null).map(() => generateUuid());
        setUuids(newUuids);
    };

    const copy = (index: number) => {
        playClick();
        navigator.clipboard.writeText(uuids[index]);
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Count:</span>
                <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                    className="w-20 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-center"
                    min="1"
                    max="20"
                />
                <Button onClick={generate} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                    Generate UUIDs
                </Button>
            </div>
            {uuids.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-auto">
                    {uuids.map((uuid, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-black/50 border border-white/10 rounded-lg">
                            <span className="flex-1 text-gray-400 font-mono text-xs">{uuid}</span>
                            <Button onClick={() => copy(i)} size="sm" variant="ghost" className="p-1 h-auto">
                                {copied === i ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Regex Tester
export const RegexTester = () => {
    const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
    const [flags, setFlags] = useState('gi');
    const [testString, setTestString] = useState('Contact us at hello@example.com or support@test.org');
    const [matches, setMatches] = useState<string[]>([]);
    const [error, setError] = useState('');
    const { playClick } = useSound();

    const testRegex = () => {
        playClick();
        try {
            const regex = new RegExp(pattern, flags);
            const found = testString.match(regex) || [];
            setMatches(found);
            setError('');
        } catch (e: any) {
            setError(e.message);
            setMatches([]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="flex-1 px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm"
                    placeholder="Regex pattern..."
                />
                <input
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    className="w-20 px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm text-center"
                    placeholder="Flags"
                />
            </div>
            <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="w-full h-24 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none"
                placeholder="Test string..."
            />
            <Button onClick={testRegex} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                Test Regex
            </Button>
            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
            {matches.length > 0 && (
                <div className="p-4 bg-black/50 border border-white/10 rounded-xl">
                    <p className="text-green-400 text-xs mb-2">Found {matches.length} match(es):</p>
                    <div className="flex flex-wrap gap-2">
                        {matches.map((m, i) => (
                            <span key={i} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-mono">{m}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// URL Encoder/Decoder
export const UrlEncoder = () => {
    const [input, setInput] = useState('Hello World! How are you?');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const { playClick } = useSound();

    const process = () => {
        playClick();
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch {
            setOutput('Error: Invalid input');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-4">
                <Button
                    onClick={() => setMode('encode')}
                    size="sm"
                    className={mode === 'encode' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}
                >
                    Encode
                </Button>
                <Button
                    onClick={() => setMode('decode')}
                    size="sm"
                    className={mode === 'decode' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}
                >
                    Decode
                </Button>
            </div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-20 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none"
                placeholder={mode === 'encode' ? 'URL to encode...' : 'URL to decode...'}
            />
            <Button onClick={process} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
            </Button>
            {output && (
                <div className="p-4 bg-black/50 border border-white/10 rounded-xl text-green-400 font-mono text-sm break-all">
                    {output}
                </div>
            )}
        </div>
    );
};

// Text Case Converter
export const TextCaseConverter = () => {
    const [input, setInput] = useState('Hello World');
    const [output, setOutput] = useState('');
    const { playClick } = useSound();

    const convert = (type: string) => {
        playClick();
        switch (type) {
            case 'upper': setOutput(input.toUpperCase()); break;
            case 'lower': setOutput(input.toLowerCase()); break;
            case 'title': setOutput(input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())); break;
            case 'sentence': setOutput(input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()); break;
            case 'camel': setOutput(input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())); break;
            case 'snake': setOutput(input.toLowerCase().replace(/\s+/g, '_')); break;
            case 'kebab': setOutput(input.toLowerCase().replace(/\s+/g, '-')); break;
            case 'reverse': setOutput(input.split('').reverse().join('')); break;
        }
    };

    return (
        <div className="space-y-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-20 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none"
                placeholder="Enter text..."
            />
            <div className="flex flex-wrap gap-2">
                <Button onClick={() => convert('upper')} size="sm" variant="outline" className="border-white/10 text-xs">UPPER</Button>
                <Button onClick={() => convert('lower')} size="sm" variant="outline" className="border-white/10 text-xs">lower</Button>
                <Button onClick={() => convert('title')} size="sm" variant="outline" className="border-white/10 text-xs">Title</Button>
                <Button onClick={() => convert('camel')} size="sm" variant="outline" className="border-white/10 text-xs">camelCase</Button>
                <Button onClick={() => convert('snake')} size="sm" variant="outline" className="border-white/10 text-xs">snake_case</Button>
                <Button onClick={() => convert('kebab')} size="sm" variant="outline" className="border-white/10 text-xs">kebab-case</Button>
                <Button onClick={() => convert('reverse')} size="sm" variant="outline" className="border-white/10 text-xs">esreveR</Button>
            </div>
            {output && (
                <div className="p-4 bg-black/50 border border-white/10 rounded-xl text-green-400 font-mono text-sm">
                    {output}
                </div>
            )}
        </div>
    );
};

// Word & Character Counter
export const WordCounter = () => {
    const [input, setInput] = useState('Type or paste your text here to count words, characters, and more.');
    const { playClick } = useSound();

    const stats = {
        characters: input.length,
        charactersNoSpace: input.replace(/\s/g, '').length,
        words: input.trim() ? input.trim().split(/\s+/).length : 0,
        sentences: input.split(/[.!?]+/).filter(s => s.trim()).length,
        paragraphs: input.split(/\n\n+/).filter(p => p.trim()).length,
        lines: input.split('\n').length,
    };

    return (
        <div className="space-y-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none"
                placeholder="Type or paste text here..."
            />
            <div className="grid grid-cols-3 gap-3">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="p-3 bg-black/50 border border-white/10 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{value}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Unix Timestamp Converter
export const TimestampConverter = () => {
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
    const [dateString, setDateString] = useState('');
    const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');
    const { playClick } = useSound();

    const convert = () => {
        playClick();
        if (mode === 'toDate') {
            const date = new Date(parseInt(timestamp) * 1000);
            setDateString(date.toLocaleString() + '\n' + date.toISOString());
        } else {
            const date = new Date(dateString);
            setTimestamp(Math.floor(date.getTime() / 1000).toString());
        }
    };

    const now = () => {
        playClick();
        setTimestamp(Math.floor(Date.now() / 1000).toString());
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-4">
                <Button
                    onClick={() => setMode('toDate')}
                    size="sm"
                    className={mode === 'toDate' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}
                >
                    Timestamp → Date
                </Button>
                <Button
                    onClick={() => setMode('toTimestamp')}
                    size="sm"
                    className={mode === 'toTimestamp' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}
                >
                    Date → Timestamp
                </Button>
            </div>
            {mode === 'toDate' ? (
                <div className="flex gap-2">
                    <input
                        value={timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        className="flex-1 px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm"
                        placeholder="Unix timestamp..."
                    />
                    <Button onClick={now} size="sm" variant="outline" className="border-white/10">Now</Button>
                </div>
            ) : (
                <input
                    type="datetime-local"
                    value={dateString}
                    onChange={(e) => setDateString(e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm"
                />
            )}
            <Button onClick={convert} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                Convert
            </Button>
            {mode === 'toDate' && dateString && (
                <pre className="p-4 bg-black/50 border border-white/10 rounded-xl text-green-400 font-mono text-sm whitespace-pre-wrap">
                    {dateString}
                </pre>
            )}
            {mode === 'toTimestamp' && timestamp && (
                <div className="p-4 bg-black/50 border border-white/10 rounded-xl text-green-400 font-mono text-sm">
                    {timestamp}
                </div>
            )}
        </div>
    );
};

// Diff Checker
export const DiffChecker = () => {
    const [text1, setText1] = useState('Hello World\nThis is line 2\nLine 3 here');
    const [text2, setText2] = useState('Hello World\nThis is modified line 2\nLine 3 here\nNew line 4');
    const [diff, setDiff] = useState<{ type: string, value: string }[]>([]);
    const { playClick } = useSound();

    const compare = () => {
        playClick();
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const result: { type: string, value: string }[] = [];

        const maxLen = Math.max(lines1.length, lines2.length);
        for (let i = 0; i < maxLen; i++) {
            if (lines1[i] === lines2[i]) {
                result.push({ type: 'same', value: lines1[i] || '' });
            } else if (!lines1[i]) {
                result.push({ type: 'added', value: lines2[i] });
            } else if (!lines2[i]) {
                result.push({ type: 'removed', value: lines1[i] });
            } else {
                result.push({ type: 'removed', value: lines1[i] });
                result.push({ type: 'added', value: lines2[i] });
            }
        }
        setDiff(result);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Original</label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        className="w-full h-32 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Modified</label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        className="w-full h-32 p-4 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-sm resize-none"
                    />
                </div>
            </div>
            <Button onClick={compare} size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
                Compare
            </Button>
            {diff.length > 0 && (
                <div className="p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-sm space-y-1">
                    {diff.map((line, i) => (
                        <div key={i} className={`px-2 py-0.5 rounded ${line.type === 'added' ? 'bg-green-500/20 text-green-400' :
                            line.type === 'removed' ? 'bg-red-500/20 text-red-400' :
                                'text-gray-400'
                            }`}>
                            {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// QR Code Generator
export const QrCodeGenerator = () => {
    const [text, setText] = useState('https://example.com');
    const { playClick } = useSound();

    return (
        <div className="space-y-4">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-sm"
                placeholder="Enter URL or text..."
            />
            {text && (
                <div className="flex justify-center p-4 bg-white rounded-xl w-fit mx-auto">
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`}
                        alt="QR Code"
                        className="w-[150px] h-[150px]"
                    />
                </div>
            )}
        </div>
    );
};

// Device Information
export const DeviceInfo = () => {
    const { playClick } = useSound();
    const info = {
        browser: navigator.userAgent,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        cores: navigator.hardwareConcurrency || 'N/A',
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs">
                        <Monitor className="w-3 h-3" /> Screen
                    </div>
                    <p className="text-white font-mono text-sm">{info.screen}</p>
                </div>
                <div className="p-3 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs">
                        <Globe className="w-3 h-3" /> Language
                    </div>
                    <p className="text-white font-mono text-sm uppercase">{info.language}</p>
                </div>
                <div className="p-3 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs">
                        <Cpu className="w-3 h-3" /> Cores
                    </div>
                    <p className="text-white font-mono text-sm">{info.cores}</p>
                </div>
                <div className="p-3 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs">
                        <Wifi className="w-3 h-3" /> Online
                    </div>
                    <p className={`font-mono text-sm ${navigator.onLine ? 'text-green-400' : 'text-red-400'}`}>
                        {navigator.onLine ? 'Online' : 'Offline'}
                    </p>
                </div>
            </div>
            <div className="p-3 bg-black/50 border border-white/10 rounded-lg">
                <div className="text-gray-500 text-xs mb-1">User Agent</div>
                <p className="text-gray-400 font-mono text-[10px] break-all leading-tight max-h-20 overflow-auto">{info.browser}</p>
            </div>
        </div>
    );
};

// PDF Tools
export const PdfTool = () => {
    const { playClick } = useSound();

    const printToPdf = () => {
        playClick();
        window.print();
    };

    return (
        <div className="space-y-4">
            <p className="text-gray-400 text-sm">Save the current page as PDF using your browser's native printer.</p>
            <div className="p-4 bg-black/50 border border-white/10 rounded-xl mb-4">
                <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                    <li>Select "Save as PDF" in destination</li>
                    <li>Choose specific pages if needed</li>
                    <li>Enable "Background graphics" for full styling</li>
                </ul>
            </div>
            <Button onClick={printToPdf} className="w-full bg-primary/20 hover:bg-primary/30 text-primary">
                <Printer className="w-4 h-4 mr-2" /> Print / Save as PDF
            </Button>
        </div>
    );
};

// Tool Card Wrapper
export const ToolCard = ({
    title,
    description,
    icon: Icon,
    children,
    color = 'primary'
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    children: React.ReactNode;
    color?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { playClick, playHover } = useSound();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium border border-white/10 rounded-2xl overflow-hidden"
        >
            <button
                onClick={() => { playClick(); setIsOpen(!isOpen); }}
                onMouseEnter={() => playHover()}
                className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-white font-bold">{title}</h3>
                        <p className="text-gray-500 text-sm">{description}</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-gray-500"
                >
                    ▼
                </motion.div>
            </button>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 border-t border-white/5"
                >
                    <div className="pt-6">
                        {children}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
