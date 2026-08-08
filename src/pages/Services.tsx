import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';

const Services = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col" style={{ background: '#0b080c', color: '#eae5ec' }}>
      <Navigation />
      <main className="flex-grow pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
