
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const data = [
    { subject: 'Logic', A: 90, fullMark: 100 },
    { subject: 'Creativity', A: 85, fullMark: 100 },
    { subject: 'Speed', A: 70, fullMark: 100 },
    { subject: 'Accuracy', A: 95, fullMark: 100 },
    { subject: 'Innovation', A: 80, fullMark: 100 },
    { subject: 'Leadership', A: 65, fullMark: 100 },
];

const MindsetRadar = () => {
    return (
        <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fill="#22c55e"
                        fillOpacity={0.2}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Decorative Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-primary/10 rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-primary/20 rounded-full" />
            </div>
        </div>
    );
};

export default MindsetRadar;
