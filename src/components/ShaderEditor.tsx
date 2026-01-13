import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, RefreshCw, Layers } from 'lucide-react';

const INITIAL_SHADER = `precision mediump float;
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 uv = vUv;
  vec3 color = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0,2,4));
  gl_FragColor = vec4(color, 1.0);
}`;

const ShaderEditor = () => {
    const [code, setCode] = useState(INITIAL_SHADER);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="grid lg:grid-cols-2 gap-8 h-[600px] glass rounded-[32px] overflow-hidden border border-white/10">
            {/* Editor Side */}
            <div className="flex flex-col bg-black/40 border-r border-white/10">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span>fragment_shader.glsl</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-white/5 rounded-md text-gray-500 hover:text-primary transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-transparent p-6 font-mono text-sm text-gray-300 outline-none resize-none leading-relaxed"
                    spellCheck={false}
                />
                <div className="p-4 bg-black/60 flex items-center justify-between">
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">Real-time Compiler Active</span>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold hover:bg-primary hover:text-black transition-all">
                        <Play className="w-3 h-3 fill-current" />
                        Compile
                    </button>
                </div>
            </div>

            {/* Preview Side */}
            <div className="relative flex items-center justify-center bg-[#050505] overflow-hidden group">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                </div>

                {/* Simplified Shader Simulation (Visual only for now since we can't compile raw GLSL in a simple React component easily without a helper library) */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 rounded-full blur-[60px]"
                    style={{
                        background: 'linear-gradient(45deg, #22c55e, #3b82f6, #a855f7)',
                    }}
                />

                <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-xs text-white font-bold">Neural Output</p>
                            <p className="text-[10px] text-gray-400">Vertex synchronization: 100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShaderEditor;
