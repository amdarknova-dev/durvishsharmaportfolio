import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Random glitch effect interval
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-20 text-center max-w-2xl border border-green-900/50 bg-black/80 backdrop-blur-sm p-12 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] relative"
      >
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500" />

        <div className="flex justify-center mb-6">
          <AlertTriangle className={`w-24 h-24 text-red-500 ${glitch ? 'animate-pulse translate-x-1' : ''}`} />
        </div>

        <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-2 ${glitch ? 'text-red-500 blur-[1px]' : 'text-white'}`}>
          404
        </h1>

        <h2 className="text-2xl md:text-3xl text-green-400 font-bold tracking-widest uppercase mb-6 border-b border-green-900/50 pb-4">
          Signal Lost
        </h2>

        <p className="text-gray-400 mb-8 text-lg">
          Attention Pilot: The coordinates <span className="text-red-400 font-bold">{location.pathname}</span> do not map to any known sector in this quadrant.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full md:w-auto bg-green-900/20 hover:bg-green-500 hover:text-black border border-green-500/50 text-green-500 transition-all duration-300 uppercase tracking-widest">
              <Home className="mr-2 w-4 h-4" /> Return to Base
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full md:w-auto border-gray-700 text-gray-400 hover:text-white hover:border-white uppercase tracking-widest bg-transparent"
          >
            <RotateCcw className="mr-2 w-4 h-4" /> Recalibrate
          </Button>
        </div>

        <div className="mt-12 text-xs text-green-900 uppercase tracking-[0.5em]">
          System ID: {Math.random().toString(36).substring(7).toUpperCase()} // ERROR_LOG_CREATED
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
