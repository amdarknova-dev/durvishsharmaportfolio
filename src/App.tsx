import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Essential pages
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Core UI
import TransitionWrapper from "./components/TransitionWrapper";
import SmoothScroll from "./components/SmoothScroll";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { trackPageView } from "./lib/analytics";

const queryClient = new QueryClient();

const LanguageHandler = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  return null;
};

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
        <Route path="/contact" element={<TransitionWrapper><Contact /></TransitionWrapper>} />
        <Route path="*" element={<TransitionWrapper><NotFound /></TransitionWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HashRouter>
          <AuthProvider>
            <SmoothScroll>
              <Suspense fallback={null}>
                <LanguageHandler />
                <RouteChangeHandler />
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <AnimatedRoutes />
                </TooltipProvider>
              </Suspense>
            </SmoothScroll>
          </AuthProvider>
        </HashRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
