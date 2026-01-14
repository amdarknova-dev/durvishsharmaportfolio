import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import AboutMe from "./pages/AboutMe";
import BeyondWork from "./pages/BeyondWork";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TheLab from "./pages/TheLab";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import CustomCursor from "./components/CustomCursor";
import DeveloperConsole from "./components/DeveloperConsole";
import AudioVisualizer from "./components/AudioVisualizer";
import KonamiCode from "./components/KonamiCode";
import WarpTransition from "./components/WarpTransition";
import AIChatbot from "./components/AIChatbot";
import LoadingScreen from "./components/LoadingScreen";
import WeatherEffects from "./components/WeatherEffects";
import CommandCenter from "./components/CommandCenter";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

const queryClient = new QueryClient();

import SmoothScroll from "./components/SmoothScroll";
import { SoundProvider } from "./context/SoundContext";
import { AchievementProvider } from "./context/AchievementContext";
import { HackProvider } from "./context/HackContext";
import { CommentaryProvider } from "./context/CommentaryContext";
import { WeatherProvider } from "./context/WeatherContext";


import { useEffect } from "react";
import { trackPageView } from "./lib/analytics";

const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

import CommentaryOverlay from "./components/CommentaryOverlay";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <WeatherProvider>
        <SoundProvider>
          <AchievementProvider>
            <HackProvider>
              <CommentaryProvider>
                <SmoothScroll>
                  <RouteChangeHandler />
                  <TooltipProvider>
                    <LoadingScreen />
                    <WeatherEffects />
                    <CommandCenter />
                    <CustomCursor />
                    <DeveloperConsole />
                    <AudioVisualizer />
                    <KonamiCode />
                    <WarpTransition />
                    <AIChatbot />
                    <KeyboardShortcuts />
                    <CommentaryOverlay />
                    <Toaster />
                    <Sonner />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about-me" element={<AboutMe />} />
                      <Route path="/beyond-work" element={<BeyondWork />} />
                      <Route path="/lab" element={<TheLab />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/blog" element={<Blog />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </TooltipProvider>
                </SmoothScroll>
              </CommentaryProvider>
            </HackProvider>
          </AchievementProvider>
        </SoundProvider>
      </WeatherProvider>
    </HashRouter>
  </QueryClientProvider>
);

export default App;
