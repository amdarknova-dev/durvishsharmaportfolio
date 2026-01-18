import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import AboutMe from "./pages/AboutMe";
import BeyondWork from "./pages/BeyondWork";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TheLab from "./pages/TheLab";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import TheArsenal from "./pages/TheArsenal";
import MissionBrief from "./pages/MissionBrief";
import TheHub from "./pages/TheHub";
import CaseStudy from "./pages/CaseStudy";

import CustomCursor from "./components/CustomCursor";
import DeveloperConsole from "./components/DeveloperConsole";
import KonamiCode from "./components/KonamiCode";
import WarpTransition from "./components/WarpTransition";
import AIChatbot from "./components/AIChatbot";
import WeatherEffects from "./components/WeatherEffects";
import CommandCenter from "./components/CommandCenter";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import SmoothScroll from "./components/SmoothScroll";
import CinematicOverlay from "./components/CinematicOverlay";
import Preloader from "./components/Preloader";
import TransitionWrapper from "./components/TransitionWrapper";
import AmbientSound from "./components/AmbientSound";

import { SoundProvider } from "./context/SoundContext";
import { AchievementProvider } from "./context/AchievementContext";
import { HackProvider } from "./context/HackContext";
import { WeatherProvider } from "./context/WeatherContext";
import { AuthProvider } from "./context/AuthContext";
import { trackPageView } from "./lib/analytics";

const queryClient = new QueryClient();

const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TransitionWrapper><Index /></TransitionWrapper>} />
        <Route path="/about-me" element={<TransitionWrapper><AboutMe /></TransitionWrapper>} />
        <Route path="/beyond-work" element={<TransitionWrapper><BeyondWork /></TransitionWrapper>} />
        <Route path="/lab" element={<TransitionWrapper><TheLab /></TransitionWrapper>} />
        <Route path="/contact" element={<TransitionWrapper><Contact /></TransitionWrapper>} />
        <Route path="/login" element={<TransitionWrapper><LoginPage /></TransitionWrapper>} />
        <Route path="/dashboard" element={<TransitionWrapper><AdminDashboard /></TransitionWrapper>} />
        <Route path="/blog" element={<TransitionWrapper><Blog /></TransitionWrapper>} />
        <Route path="/arsenal" element={<TransitionWrapper><TheArsenal /></TransitionWrapper>} />
        <Route path="/mission" element={<TransitionWrapper><MissionBrief /></TransitionWrapper>} />
        <Route path="/hub" element={<TransitionWrapper><TheHub /></TransitionWrapper>} />
        <Route path="/case-study/:id" element={<TransitionWrapper><CaseStudy /></TransitionWrapper>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<TransitionWrapper><NotFound /></TransitionWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider>
          <WeatherProvider>
            <SoundProvider>
              <AmbientSound />
              <AchievementProvider>
                <HackProvider>
                  <SmoothScroll>
                    <AnimatePresence mode="wait">
                      {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
                    </AnimatePresence>

                    <RouteChangeHandler />
                    <TooltipProvider>
                      <WeatherEffects />
                      <CinematicOverlay />
                      <CommandCenter />
                      <CustomCursor />
                      <DeveloperConsole />
                      <KonamiCode />
                      <WarpTransition />
                      <AIChatbot />
                      <KeyboardShortcuts />
                      <Toaster />
                      <Sonner />

                      <AnimatedRoutes />

                    </TooltipProvider>
                  </SmoothScroll>
                </HackProvider>
              </AchievementProvider>
            </SoundProvider>
          </WeatherProvider>
        </AuthProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
