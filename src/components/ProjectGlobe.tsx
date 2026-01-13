import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink, MapPin, Globe as GlobeIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSound } from '@/context/SoundContext';
import { useMobile } from '@/hooks/useMobile';

const projectLocations = [
    {
        id: 1,
        city: 'Mumbai',
        country: 'India',
        lat: 19.0760,
        lng: 72.8777,
        project: 'E-commerce Platform',
        client: 'Local Retailer',
        color: '#22c55e',
        size: 0.15
    },
    {
        id: 2,
        city: 'New York',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        project: 'Fintech Dashboard',
        client: 'Investment Firm',
        color: '#3b82f6',
        size: 0.15
    },
    {
        id: 3,
        city: 'London',
        country: 'UK',
        lat: 51.5074,
        lng: -0.1278,
        project: 'SaaS Architecture',
        client: 'Tech Startup',
        color: '#eab308',
        size: 0.15
    },
    {
        id: 4,
        city: 'Berlin',
        country: 'Germany',
        lat: 52.5200,
        lng: 13.4050,
        project: 'Portfolio Website',
        client: 'Creative Agency',
        color: '#ec4899',
        size: 0.15
    },
    {
        id: 5,
        city: 'Singapore',
        country: 'Singapore',
        lat: 1.3521,
        lng: 103.8198,
        project: 'Logistics System',
        client: 'Global Shipping',
        color: '#8b5cf6',
        size: 0.15
    },
    {
        id: 6,
        city: 'Dubai',
        country: 'UAE',
        lat: 25.2048,
        lng: 55.2708,
        project: 'Real Estate Portal',
        client: 'Luxury Group',
        color: '#f97316',
        size: 0.15
    }
];

const ProjectGlobe = () => {
    const globeRef = useRef<any>(null);
    const { t } = useTranslation();
    const isMobile = useMobile();
    const { playHover, playClick } = useSound();
    const [selectedPoint, setSelectedPoint] = useState<any>(null);

    useEffect(() => {
        if (globeRef.current) {
            // Auto-rotation
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.5;

            // Initial positioning
            globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
        }
    }, []);

    const ringsData = useMemo(() => projectLocations.map(p => ({
        lat: p.lat,
        lng: p.lng,
        maxR: 5,
        propagationSpeed: 1,
        repeatPeriod: 1500
    })), []);

    return (
        <div className={`relative w-full ${isMobile ? 'h-[400px]' : 'h-[600px]'} flex items-center justify-center bg-black/20 rounded-3xl overflow-hidden border border-white/5 shadow-2xl`}>
            <div className={`absolute ${isMobile ? 'top-4 left-4' : 'top-8 left-8'} z-10`}>
                <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white flex items-center gap-2`}>
                    <GlobeIcon className="w-6 h-6 text-primary" />
                    {t('globe.title', 'Global Footprint')}
                </h3>
                <p className={`text-gray-400 ${isMobile ? 'text-[10px]' : 'text-sm'} mt-1`}>
                    {t('globe.subtitle', 'Delivering cinematic solutions worldwide')}
                </p>
            </div>

            <Globe
                ref={globeRef}
                height={isMobile ? 400 : 600}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                pointsData={projectLocations}
                pointLat="lat"
                pointLng="lng"
                pointColor="color"
                pointRadius="size"
                pointAltitude={0.05}
                pointsMerge={true}
                onPointClick={(point: any) => {
                    playClick();
                    setSelectedPoint(point);
                    globeRef.current.pointOfView({
                        lat: point.lat,
                        lng: point.lng,
                        altitude: 1.5
                    }, 800);
                }}

                ringsData={ringsData}
                ringColor={() => '#22c55e'}
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"

                labelsData={projectLocations}
                labelLat="lat"
                labelLng="lng"
                labelText="city"
                labelSize={0.5}
                labelDotRadius={0.2}
                labelColor={() => 'rgba(255, 255, 255, 0.7)'}
                labelResolution={2}
            />

            <AnimatePresence>
                {selectedPoint && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`absolute ${isMobile ? 'bottom-4 right-4 left-4 w-auto z-30' : 'bottom-8 right-8 z-20 w-80'}`}
                    >
                        <Card className="glass-dark border-primary/30 p-6 shadow-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full animate-pulse"
                                        style={{ backgroundColor: selectedPoint.color }}
                                    />
                                    <h4 className="font-bold text-white text-lg">{selectedPoint.city}</h4>
                                </div>
                                <button
                                    onClick={() => setSelectedPoint(null)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-primary uppercase tracking-widest font-mono">{t('globe.project')}</p>
                                    <p className="text-white font-medium">{selectedPoint.project}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-primary uppercase tracking-widest font-mono">{t('globe.client')}</p>
                                    <p className="text-white font-medium">{selectedPoint.client}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                    {selectedPoint.country}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                className="w-full mt-6 border border-white/10 hover:bg-primary/20 hover:text-white"
                                onClick={() => playClick()}
                            >
                                {t('globe.view_case_study')} <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-8 left-8 flex gap-4">
                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-[10px] text-gray-300 font-mono uppercase">{t('globe.status_completed')}</span>
                </div>
                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-[10px] text-gray-300 font-mono uppercase">{t('globe.status_progress')}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectGlobe;
