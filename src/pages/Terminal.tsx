import React, { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useAchievements } from '@/context/AchievementContext';
import { useSound } from '@/context/SoundContext';
import { Terminal as TermIcon } from 'lucide-react';

interface CommandOutput {
  id: string;
  text: React.ReactNode;
  isError?: boolean;
}

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { id: 'init-1', text: 'NEXUS OS v9.4.2 [Kernel Build 2026.08]' },
    { id: 'init-2', text: 'Type "help" for a list of available commands.' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { unlockAchievement } = useAchievements();
  const { playClick, playHover } = useSound();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick();
    const cmd = input.trim();
    const newHistory = [...history, { id: Date.now().toString() + '-cmd', text: `root@nexus:~$ ${cmd}` }];

    const lowerCmd = cmd.toLowerCase();
    
    if (lowerCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let output: React.ReactNode = '';
    let isError = false;

    if (lowerCmd === 'help') {
      output = (
        <div className="text-white/70">
          Available commands:<br/>
          - <span className="text-[#c2a4ff]">whoami</span>: Identify current user<br/>
          - <span className="text-[#c2a4ff]">ls</span>: List directory contents<br/>
          - <span className="text-[#c2a4ff]">cat [file]</span>: Read file contents<br/>
          - <span className="text-[#c2a4ff]">clear</span>: Clear terminal screen
        </div>
      );
    } else if (lowerCmd === 'whoami') {
      output = 'guest_user_992';
    } else if (lowerCmd === 'ls') {
      output = (
        <div className="flex gap-4">
          <span className="text-[#3b82f6]">skills.txt</span>
          <span className="text-[#10b981]">contact.sh</span>
          <span className="text-[#ef4444]">classified.dat</span>
        </div>
      );
    } else if (lowerCmd.startsWith('cat ')) {
      const file = lowerCmd.replace('cat ', '').trim();
      if (file === 'skills.txt') {
        output = 'C/C++, Rust, React, WebGL, Node.js, Reverse Engineering, Kernel Drivers';
      } else if (file === 'contact.sh') {
        output = 'echo "Discord: darknova001.hd"';
      } else if (file === 'classified.dat') {
        output = 'ACCESS DENIED. Missing root privileges.';
        isError = true;
      } else {
        output = `cat: ${file}: No such file or directory`;
        isError = true;
      }
    } else if (lowerCmd === 'sudo rm -rf /') {
      output = (
        <div className="text-[#ef4444] font-bold">
          [CRITICAL ERROR] SYSTEM INTEGRITY COMPROMISED.<br/>
          KERNEL PANIC... JUST KIDDING.<br/>
          Achievement Unlocked: Root Access
        </div>
      );
      isError = true;
      unlockAchievement('Root Access');
    } else {
      output = `command not found: ${cmd}`;
      isError = true;
    }

    newHistory.push({ id: Date.now().toString() + '-out', text: output, isError });
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col bg-[#0b080c] font-mono text-sm selection:bg-[#c2a4ff]/30">
      <Navigation />
      <main className="flex-grow pt-24 px-6 md:px-12 max-w-4xl w-full mx-auto pb-12 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4 opacity-50">
          <TermIcon className="w-5 h-5" />
          <span className="uppercase tracking-widest text-xs">Terminal Interface</span>
        </div>
        
        <div 
          className="flex-grow border border-white/10 rounded-xl bg-[#050406] p-4 shadow-[0_0_40px_rgba(194,164,255,0.03)] overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line) => (
            <div key={line.id} className={`mb-2 leading-relaxed ${line.isError ? 'text-[#ef4444]' : 'text-white/80'}`}>
              {line.text}
            </div>
          ))}
          
          <form onSubmit={handleCommand} className="flex items-center mt-2">
            <span className="text-[#10b981] mr-2">root@nexus:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent outline-none text-white/90 font-mono caret-[#c2a4ff]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </main>
    </div>
  );
};

export default Terminal;
