
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Star } from 'lucide-react';

interface MissionItem {
    id: string;
    year: string;
    title: string;
    role: string;
    description: string;
    type: 'work' | 'education' | 'achievement';
}

const missions: MissionItem[] = [
    {
        id: "m1",
        year: "2024",
        title: "Senior Visual Dev",
        role: "Creative Tech Lead",
        description: "Leading the development of immersive 3D web experiences for major clients.",
        type: 'work'
    },
    {
        id: "m2",
        year: "2023",
        title: "Full Stack Journey",
        role: "Frontend Specialist",
        description: "Mastered the React ecosystem and began experimenting with WebGL.",
        type: 'work'
    },
    {
        id: "m3",
        year: "2022",
        title: "CS Degree",
        role: "University Graduate",
        description: "Specialized in Computer Graphics and Human-Computer Interaction.",
        type: 'education'
    },
    {
        id: "m4",
        year: "2021",
        title: "Hackathon Win",
        role: "Team Lead",
        description: "First place in National AI Hackathon for a predictive visualizer.",
        type: 'achievement'
    }
];

const MissionLog = () => {
    return (
        <div className="relative py-12">
            {/* Central Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-12">
                {missions.map((mission, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`relative flex items-center md:justify-between ${isLeft ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Empty Half for spacing */}
                            <div className="hidden md:block w-1/2" />

                            {/* The Node on the Line */}
                            <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                            </div>

                            {/* The Content Card */}
                            <div className={`ml-20 md:ml-0 w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                                <div className="glass-premium p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 relative group">
                                    <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                                        {mission.type === 'work' && <Briefcase className="w-8 h-8" />}
                                        {mission.type === 'education' && <GraduationCap className="w-8 h-8" />}
                                        {mission.type === 'achievement' && <Trophy className="w-8 h-8" />}
                                    </div>

                                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2 block">
                                        Mission Time: {mission.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-1">
                                        {mission.title}
                                    </h3>
                                    <h4 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
                                        {mission.role}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        {mission.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default MissionLog;
