import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';

const Projects = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col" style={{ background: '#0b080c', color: '#eae5ec' }}>
      <Navigation />
      <main className="flex-grow pt-20">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
