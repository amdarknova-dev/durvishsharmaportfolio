import React from 'react';

interface MarqueeStripProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
  separator?: string;
  accent?: boolean;
}

const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  items,
  reverse = false,
  speed = 30,
  separator = '✦',
  accent = false,
}) => {
  // Duplicate for seamless loop
  const all = [...items, ...items];

  return (
    <div
      className="overflow-hidden w-full"
      style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ animationDuration: `${speed}s` }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            className="flex items-center shrink-0"
            style={{ gap: '1.5rem', marginRight: '1.5rem' }}
          >
            <span
              className={`font-mono text-xs uppercase tracking-[0.3em] whitespace-nowrap transition-colors duration-300 hover:text-[#c2a4ff] ${
                accent
                  ? 'text-[rgba(234,229,236,0.3)]'
                  : 'text-[rgba(234,229,236,0.25)]'
              }`}
            >
              {item}
            </span>
            <span
              className="text-[#c2a4ff] opacity-40 text-[8px]"
              aria-hidden
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
