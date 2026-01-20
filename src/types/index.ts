export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    tech: string[];
    category: string;
    featured: boolean;
    year: string;
    caseStudyId?: string;
    links?: {
        demo?: string;
        github?: string;
    };
}

export interface Skill {
    name: string;
    category: string;
    color: string;
    proficiency?: number;
}

export interface MissionItem {
    id: string;
    year: string;
    title: string;
    role: string;
    description: string;
    type: 'work' | 'education' | 'achievement';
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    tags: string[];
    encryptionLevel?: string;
}

export interface GuestEntry {
    id: string;
    name: string;
    message: string;
    date: string;
    location: string;
    avatar_color: string;
}
